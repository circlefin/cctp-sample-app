import { useEffect, useMemo } from 'react'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EastIcon from '@mui/icons-material/East'
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

import { CHAIN_ICONS } from 'assets/chains'
import { useBeforeUnload } from 'hooks/useBeforeUnload'
import { copyToClipboard } from 'utils'

import styles from './TransactionDialog.module.css'

import type { SxProps } from '@mui/material'
import type { Chain } from 'constants/chains'
import type { Transaction } from 'contexts/AppContext'

interface Props {
  handleTransactionPolling: () => void
  open: boolean
  transaction: Transaction
  sx?: SxProps
}

const TransactionDialog: React.FC<Props> = ({
  handleTransactionPolling,
  open,
  transaction,
  sx = {},
}) => {
  useBeforeUnload((event: BeforeUnloadEvent) => {
    event.preventDefault()
    event.returnValue = ''
  })

  useEffect(() => {
    return handleTransactionPolling()
  }, [handleTransactionPolling])

  const chainIcons = useMemo(() => {
    const source = CHAIN_ICONS[transaction.source as Chain]
    const target = CHAIN_ICONS[transaction.target as Chain]
    return {
      source,
      target,
    }
  }, [transaction])

  const copyUrl = () => copyToClipboard(window.location.href)

  return (
    <Dialog
      fullScreen={true}
      open={open}
      sx={sx}
      classes={{ paper: styles.aurora }}
    >
      <DialogTitle className="text-7xl">Transferring...</DialogTitle>
      <DialogContentText className="text-xl">
        Please do not close your browser window. This may take a few minutes to
        complete.
      </DialogContentText>
      <DialogContent className="mb-20 flex-initial text-center">
        <div className="flex items-center justify-center">
          <img
            className="h-24"
            src={chainIcons.source}
            alt={transaction.source}
          />
          <EastIcon className="mx-8" sx={{ fontSize: 60 }} />
          <img
            className="h-24"
            src={chainIcons.target}
            alt={transaction.target}
          />
        </div>
        <div className="mt-20">
          <p>Save this URL in case something goes wrong</p>
          <Button variant="text" onClick={copyUrl}>
            Copy to clipboard
            <ContentCopyIcon className="ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TransactionDialog
