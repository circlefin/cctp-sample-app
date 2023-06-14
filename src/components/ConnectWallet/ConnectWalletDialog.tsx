import CloseIcon from '@mui/icons-material/Close'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'

import IconMetaMask from 'assets/icon-metamask.png'
import ConnectWalletDialogButton from 'components/ConnectWallet/ConnectWalletDialogButton'
import { injected } from 'components/Wallet/Connectors'

import type { SxProps } from '@mui/material'
import type { AbstractConnector } from '@web3-react/abstract-connector'

interface Props {
  handleClose: () => void
  handleConnect: (connector: AbstractConnector) => void
  open: boolean
  sx?: SxProps
}

const ConnectWalletDialog: React.FC<Props> = ({
  handleClose,
  handleConnect,
  open,
  sx = {},
}) => {
  return (
    <Dialog fullWidth={true} onClose={handleClose} open={open}>
      <DialogTitle>Connect wallet</DialogTitle>
      <DialogContent>
        <ConnectWalletDialogButton
          onClick={() => handleConnect(injected)}
          subtitle="Connect using MetaMask"
          title="MetaMask"
          imgSrc={IconMetaMask}
        />
      </DialogContent>

      <IconButton className="absolute right-3 top-3" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Dialog>
  )
}

export default ConnectWalletDialog
