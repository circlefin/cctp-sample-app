import * as testnet from 'constants/addresses'

import type { SupportedChainId } from 'constants/chains'

export const getUSDCContractAddress = (chainId?: SupportedChainId): string => {
  if (chainId == null) {
    return ''
  }
  return testnet.CHAIN_IDS_TO_USDC_ADDRESSES[chainId]
}

// TODO: Clean this up
export const getTokenMessengerContractAddress = (
  useWithMetadata: boolean,
  chainId?: SupportedChainId
): string => {
  if (chainId == null) {
    return ''
  }
  return (
    useWithMetadata
      ? testnet.CHAIN_IDS_TO_TOKEN_MESSENGER_WITH_METADATA_ADDRESSES
      : testnet.CHAIN_IDS_TO_TOKEN_MESSENGER_ADDRESSES
  )[chainId]
}

export const getMessageTransmitterContractAddress = (
  chainId?: SupportedChainId
): string => {
  if (chainId == null) {
    return ''
  }
  return testnet.CHAIN_IDS_TO_MESSAGE_TRANSMITTER_ADDRESSES[chainId]
}
