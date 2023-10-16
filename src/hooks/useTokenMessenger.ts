import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { DestinationDomain, IBC_CHANNEL_FOR_PREFIX } from 'constants/chains'
import {
  TokenMessenger__factory,
  TokenMessengerWithMetadata__factory,
} from 'typechain/index'
import { addressToBytes32, nobleAddressToBytes32 } from 'utils'
import { getTokenMessengerContractAddress } from 'utils/addresses'

import type {
  TransactionResponse,
  Web3Provider,
} from '@ethersproject/providers'
import type { SupportedChainId } from 'constants/chains'
import type { BigNumber } from 'ethers'

/**
 * Returns a list of methods to call the Token Messenger contract
 * @param chainId the ID of the current connected chain/network
 */
const useTokenMessenger = (
  useWithMetadata: boolean,
  chainId: SupportedChainId | undefined
) => {
  const { library } = useWeb3React<Web3Provider>()

  const TOKEN_MESSENGER_CONTRACT_ADDRESS = getTokenMessengerContractAddress(
    useWithMetadata,
    chainId
  )

  /**
   * Returns transaction response from contract call
   * @param amount the amount to be deposit for burn on source chain
   * @param destinationDomain the Circle defined ID of target chain
   * @param mintRecipient the recipient address on target chain
   * @param burnToken the address of token to burn
   */
  const depositForBurn = useCallback(
    async (
      amount: BigNumber,
      destinationDomain: DestinationDomain,
      mintRecipient: string,
      burnToken: string,
      ibcRecipient?: string
    ) => {
      if (!library) return

      let depositForBurnCall

      // If we're using metadata (ie, for Noble), we need to do a bit more work to decode it and
      // use the metadata wrapper contract.  In practice this will only work for Noble right now
      // because the metadata contract has the Noble domain hardcoded, and we're doing
      // Noble-specific decoding on the addresses, but at least this will be relatively
      // easy to transition to a different chain should we want to do so.
      if (useWithMetadata) {
        if (!ibcRecipient) {
          throw new Error('Were told use metadata but ibcRecipient is empty')
        }

        const ibcRecipientDecoded = nobleAddressToBytes32(ibcRecipient)

        const channel =
          IBC_CHANNEL_FOR_PREFIX[ibcRecipientDecoded.prefixUnencoded]
        if (isNaN(channel)) {
          throw new Error(
            `Unable to find IBC channel for prefix ${ibcRecipientDecoded.prefixUnencoded}`
          )
        }

        depositForBurnCall = TokenMessengerWithMetadata__factory.connect(
          TOKEN_MESSENGER_CONTRACT_ADDRESS,
          library.getSigner()
        ).depositForBurn(
          channel,
          ibcRecipientDecoded.prefix,
          ibcRecipientDecoded.data,
          amount,
          nobleAddressToBytes32(mintRecipient).data,
          burnToken,
          []
        )
      } else {
        depositForBurnCall = TokenMessenger__factory.connect(
          TOKEN_MESSENGER_CONTRACT_ADDRESS,
          library.getSigner()
        ).depositForBurn(
          amount,
          destinationDomain,
          // TODO: Clean up!
          destinationDomain === DestinationDomain.NOBLE
            ? nobleAddressToBytes32(mintRecipient).data
            : addressToBytes32(mintRecipient),
          burnToken
        )
      }

      return await depositForBurnCall
        .then((response: TransactionResponse) => {
          return response
        })
        .catch((error: Error) => {
          throw new Error(error.message)
        })
    },
    [TOKEN_MESSENGER_CONTRACT_ADDRESS, library]
  )

  return {
    depositForBurn,
  }
}

export default useTokenMessenger
