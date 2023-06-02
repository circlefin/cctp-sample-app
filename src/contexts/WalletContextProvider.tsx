import type { FC, ReactNode } from 'react'

import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'

import type { ExternalProvider } from '@ethersproject/providers'

export const WalletContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const getLibrary = (provider: ExternalProvider) => {
    return new Web3Provider(provider)
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
  )
}

export default WalletContextProvider
