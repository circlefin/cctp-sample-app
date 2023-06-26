import * as testnet from 'constants/addresses'

import type { SupportedChainId } from 'constants/chains'

export const getUSDCContractAddress = (chainId?: SupportedChainId): string => {
  if (chainId == null) {
    return ''
  }
  return testnet.CHAIN_IDS_TO_USDC_ADDRESSES[chainId]
}

export const getTokenMessengerContractAddress = (
  chainId?: SupportedChainId
): string => {
  if (chainId == null) {
    return ''
  }
  return testnet.CHAIN_IDS_TO_TOKEN_MESSENGER_ADDRESSES[chainId]
}

export const getMessageTransmitterContractAddress = (
  chainId?: SupportedChainId
): string => {
  if (chainId == null) {
    return ''
  }
  return testnet.CHAIN_IDS_TO_MESSAGE_TRANSMITTER_ADDRESSES[chainId]
}
