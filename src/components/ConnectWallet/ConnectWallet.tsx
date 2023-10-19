import { useState } from 'react'

import { Button } from '@mui/material'

import ConnectWalletDialog from 'components/ConnectWallet/ConnectWalletDialog'

const ConnectWallet = () => {
  const [isConnectWalletDialogOpen, setIsConnectWalletDialogOpen] =
    useState<boolean>(false)

  return (
    <>
      <div className="relative inline">
        <Button onClick={() => setIsConnectWalletDialogOpen(true)}>
          Connect Wallet
        </Button>
      </div>
      <ConnectWalletDialog
        handleClose={() => setIsConnectWalletDialogOpen(false)}
        open={isConnectWalletDialogOpen}
      />
    </>
  )
}

export default ConnectWallet
