import { useWeb3React } from '@web3-react/core'

import {
  CHAIN_ID_HEXES_TO_PARAMETERS,
  CHAIN_TO_CHAIN_ID,
} from 'constants/chains'
import { WalletProviderError } from 'constants/errors'
import { numToHex } from 'utils'

import type { Web3Provider } from '@ethersproject/providers'

// https://eips.ethereum.org/EIPS/eip-1193#errors
interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}

const useSwitchNetwork = (chain: string) => {
  const { library, chainId } = useWeb3React<Web3Provider>()

  const switchNetwork = async () => {
    if (library?.provider?.request == null) return

    if (chainId != null) {
      const switchChainId = CHAIN_TO_CHAIN_ID[chain]
      // only attempt to switch if the state is mismatched
      if (chainId !== switchChainId) {
        const hexChainId = numToHex(CHAIN_TO_CHAIN_ID[chain])
        try {
          await library.provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: hexChainId }],
          })
        } catch (error) {
          const switchError = error as ProviderRpcError
          if (switchError.code === WalletProviderError.CHAIN_NOT_ADDED) {
            try {
              await library.provider.request({
                method: 'wallet_addEthereumChain',
                params: [CHAIN_ID_HEXES_TO_PARAMETERS[hexChainId]],
              })
            } catch (error) {
              console.error(error)
            }
          } else {
            console.error(switchError.message)
          }
        }
      }
    }
  }

  return { switchNetwork }
}

export default useSwitchNetwork
