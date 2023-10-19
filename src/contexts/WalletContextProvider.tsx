import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'

import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'

import type { ExternalProvider } from '@ethersproject/providers'

interface ConnectorState {
  connected: boolean
}

interface WalletState {
  metaMask: ConnectorState
  phantom: ConnectorState
}

interface ContextProps {
  wallet: WalletState
  connected: boolean
  setWallet: (wallet: WalletState) => void
}

const initialState: ContextProps = {
  wallet: {
    metaMask: {
      connected: false,
    },
    phantom: {
      connected: false,
    },
  },
  connected: false,
  setWallet: () => null,
}

const WalletContext = createContext<ContextProps>(initialState)

export const WalletContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [wallet, setWallet] = useState<WalletState>(initialState.wallet)

  const connected = useMemo(
    () => wallet.metaMask.connected || wallet.phantom.connected,
    [wallet]
  )

  const getLibrary = (provider: ExternalProvider) => {
    return new Web3Provider(provider)
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connected,
        setWallet,
      }}
    >
      <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
    </WalletContext.Provider>
  )
}

export const useWalletContext = () => useContext(WalletContext)
