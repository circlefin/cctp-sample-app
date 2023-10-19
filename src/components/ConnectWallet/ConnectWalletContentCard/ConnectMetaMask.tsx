import { useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'

import IconMetaMask from 'assets/icon-metamask.png'
import { metaMask } from 'components/Wallet/Connectors'

import ConnectCard from './ConnectCard'

import type { Web3Provider } from '@ethersproject/providers'

const ConnectMetaMask: DefaultComponentType = ({ className }) => {
  const { activate, active, account, deactivate } = useWeb3React<Web3Provider>()

  useEffect(() => {
    // Attemp an eager connection
    const initWallet = async () => {
      const isAuthorized = await metaMask.isAuthorized()
      if (isAuthorized) {
        await activate(metaMask)
      }
    }
    void initWallet()
  }, [activate])

  const handleConnect = async () => {
    await activate(metaMask)
  }

  const handleDisconnect = () => {
    deactivate()
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(account ?? '')
  }

  return (
    <ConnectCard
      className={className}
      title="MetaMask"
      subtitle="Connect using MetaMask"
      imgSrc={IconMetaMask}
      walletAvailable={true}
      connected={active && !!account}
      handleConnect={handleConnect}
      handleDisconnect={handleDisconnect}
      handleCopy={handleCopy}
    />
  )
}

export default ConnectMetaMask
