import { useCallback, useState } from 'react'

import { Button, Fade, Menu, MenuItem } from '@mui/material'
import { useWeb3React } from '@web3-react/core'

import ConnectWalletDialog from 'components/ConnectWallet/ConnectWalletDialog'
import { useEagerConnect } from 'hooks/useEagerConnect'
import { getAddressAbbreviation } from 'utils'

import type { Web3Provider } from '@ethersproject/providers'
import type { AbstractConnector } from '@web3-react/abstract-connector'

const ConnectWallet = () => {
  const { activate, active, account, deactivate, error } =
    useWeb3React<Web3Provider>()
  useEagerConnect()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isConnectWalletDialogOpen, setIsConnectWalletDialogOpen] =
    useState<boolean>(false)
  const open = Boolean(anchorEl)

  const closeConnectWalletDialog = () => {
    setIsConnectWalletDialogOpen(false)
  }

  const openConnectWalletDialog = () => {
    setIsConnectWalletDialogOpen(true)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(account ?? '')
    handleMenuClose()
  }, [account, handleMenuClose])

  const handleConnect = async (connector: AbstractConnector) => {
    closeConnectWalletDialog()
    await activate(connector)
  }

  const handleDisconnect = useCallback(() => {
    deactivate()
    handleMenuClose()
  }, [deactivate, handleMenuClose])

  return (
    <>
      {account && active ? (
        <Button
          id="connected-wallet-button"
          aria-controls={open ? 'connected-wallet-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleMenuClick}
        >
          {getAddressAbbreviation(account)}
        </Button>
      ) : (
        <div className="relative inline">
          <Button onClick={openConnectWalletDialog}>Connect Wallet</Button>
          {error != null && (
            <span className="absolute left-0 top-10 text-sm text-redhot-500">
              {error?.message}
            </span>
          )}
        </div>
      )}
      <Menu
        id="connected-wallet-menu"
        MenuListProps={{
          'aria-labelledby': 'connected-wallet-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleCopy}>Copy Address</MenuItem>
        <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
      </Menu>
      <ConnectWalletDialog
        handleClose={closeConnectWalletDialog}
        handleConnect={handleConnect}
        open={isConnectWalletDialogOpen}
      />
    </>
  )
}

export default ConnectWallet
