import CloseIcon from '@mui/icons-material/Close'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'

import ConnectMetaMask from 'components/ConnectWallet/ConnectWalletContentCard/ConnectMetaMask'
import ConnectPhantom from 'components/ConnectWallet/ConnectWalletContentCard/ConnectPhantom'

interface Props {
  handleClose: () => void
  open: boolean
}

const ConnectWalletDialog: React.FC<Props> = ({ handleClose, open }) => {
  return (
    <Dialog fullWidth={true} onClose={handleClose} open={open}>
      <DialogTitle>Connect wallet</DialogTitle>
      <DialogContent>
        <ConnectMetaMask />
        <ConnectPhantom className="mt-8" />
      </DialogContent>

      <IconButton className="absolute right-3 top-3" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Dialog>
  )
}

export default ConnectWalletDialog
