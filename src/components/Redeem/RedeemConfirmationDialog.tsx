import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { useWeb3React } from '@web3-react/core'

import NetworkAlert from 'components/NetworkAlert/NetworkAlert'
import TransactionDetails from 'components/TransactionDetails/TransactionDetails'
import { CHAIN_TO_CHAIN_ID } from 'constants/chains'
import {
  TransactionStatus,
  TransactionType,
  useTransactionContext,
} from 'contexts/AppContext'
import useMessageTransmitter from 'hooks/useMessageTransmitter'

import type { Web3Provider } from '@ethersproject/providers'
import type { SxProps } from '@mui/material'
import type { Transaction } from 'contexts/AppContext'

interface Props {
  handleClose: () => void
  handleNext: (hash: string) => void
  open: boolean
  transaction: Transaction
  sx?: SxProps
}

const RedeemConfirmation: React.FC<Props> = ({
  handleClose,
  handleNext,
  open,
  transaction,
  sx = {},
}) => {
  const { chainId } = useWeb3React<Web3Provider>()
  const [isRedeeming, setIsRedeeming] = useState(false)
  const { receiveMessage } = useMessageTransmitter(chainId)
  const { addTransaction, setTransaction } = useTransactionContext()

  const handleRedeem = async () => {
    const { messageBytes, signature } = transaction
    if (!messageBytes || !signature) {
      alert('Missing messageBytes and signature from transaction')
    } else {
      setIsRedeeming(true)
      try {
        const response = await receiveMessage(messageBytes, signature)
        if (!response) return

        const { hash } = response

        // Link redeem txHash to correlated send transaction
        const sendTx = {
          ...transaction,
          nextHash: hash,
        }
        setTransaction(transaction.hash, sendTx)

        // Add redeem transaction to store
        const redeemTx = {
          source: transaction.source,
          target: transaction.target,
          address: transaction.address,
          amount: transaction.amount,
          hash,
          type: TransactionType.REDEEM,
          status: TransactionStatus.PENDING,
        }
        addTransaction(hash, redeemTx)

        handleNext(hash)

        setIsRedeeming(false)
      } catch (err) {
        console.error(err)
        setIsRedeeming(false)
      }
    }
  }

  return (
    <Dialog
      maxWidth="md"
      fullWidth={true}
      onClose={handleClose}
      open={open}
      sx={sx}
    >
      <DialogTitle>Receive</DialogTitle>
      <DialogContentText className="mx-12">
        Confirm that you want to receive the following amount of USDC to the
        destination address shown below.
      </DialogContentText>
      <DialogContent>
        <TransactionDetails transaction={transaction} />

        <NetworkAlert className="mt-8" chain={transaction.target} />
      </DialogContent>

      <DialogActions className="mt-8">
        <Button size="large" color="secondary" onClick={handleClose}>
          BACK
        </Button>
        <LoadingButton
          size="large"
          loading={isRedeeming}
          disabled={
            isRedeeming || CHAIN_TO_CHAIN_ID[transaction.target] !== chainId
          }
          onClick={async () => await handleRedeem()}
        >
          RECEIVE
        </LoadingButton>
      </DialogActions>

      <IconButton className="absolute right-3 top-3" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Dialog>
  )
}

export default RedeemConfirmation
