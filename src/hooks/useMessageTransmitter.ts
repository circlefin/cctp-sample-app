import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { MessageTransmitter__factory } from 'typechain/index'
import { getMessageTransmitterContractAddress } from 'utils/addresses'

import type {
  TransactionResponse,
  Web3Provider,
} from '@ethersproject/providers'
import type { SupportedChainId } from 'constants/chains'
import type { Bytes } from 'ethers'

/**
 * Returns a list of methods to call the Message Transmitter contract
 * @param chainId the ID of the current connected chain/network
 */
const useMessageTransmitter = (chainId: SupportedChainId | undefined) => {
  const { library } = useWeb3React<Web3Provider>()

  const MESSAGE_TRANSMITTER_CONTRACT_ADDRESS =
    getMessageTransmitterContractAddress(chainId)

  /**
   * Returns transaction response from contract call
   * @param message the message bytes from the source chain depositForBurn transaction
   * @param signature the signature returned from attestation service by messageHash
   */
  const receiveMessage = useCallback(
    async (message: Bytes, signature: string) => {
      if (!library) return
      const contract = MessageTransmitter__factory.connect(
        MESSAGE_TRANSMITTER_CONTRACT_ADDRESS,
        library.getSigner()
      )

      return await contract
        .receiveMessage(message, signature)
        .then((response: TransactionResponse) => {
          return response
        })
        .catch((error: Error) => {
          throw new Error(error.message)
        })
    },
    [MESSAGE_TRANSMITTER_CONTRACT_ADDRESS, library]
  )

  return {
    receiveMessage,
  }
}

export default useMessageTransmitter
