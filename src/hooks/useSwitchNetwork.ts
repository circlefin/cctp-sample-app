/**
 * Copyright 2023 Circle Internet Financial, LTD.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
