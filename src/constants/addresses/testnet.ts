import { SupportedChainId } from 'constants/chains'

/**
 * Map of supported chains to USDC contract addresses
 */
export const CHAIN_IDS_TO_USDC_ADDRESSES = {
  [SupportedChainId.ETH_GOERLI]: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',

  [SupportedChainId.AVAX_FUJI]: '0x5425890298aed601595a70AB815c96711a31Bc65',

  [SupportedChainId.ARB_GOERLI]: '0xfd064a18f3bf249cf1f87fc203e90d8f650f2d63',
}

/**
 * Map of supported chains to Token Messenger contract addresses
 */
export const CHAIN_IDS_TO_TOKEN_MESSENGER_ADDRESSES = {
  [SupportedChainId.ETH_GOERLI]: '0xd0c3da58f55358142b8d3e06c1c30c5c6114efe8',

  [SupportedChainId.AVAX_FUJI]: '0xeb08f243e5d3fcff26a9e38ae5520a669f4019d0',

  [SupportedChainId.ARB_GOERLI]: '0x12dcfd3fe2e9eac2859fd1ed86d2ab8c5a2f9352',
}

/**
 * Map of supported chains to Message Transmitter contract addresses
 */
export const CHAIN_IDS_TO_MESSAGE_TRANSMITTER_ADDRESSES = {
  [SupportedChainId.ETH_GOERLI]: '0x26413e8157cd32011e726065a5462e97dd4d03d9',

  [SupportedChainId.AVAX_FUJI]: '0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79',

  [SupportedChainId.ARB_GOERLI]: '0x109bc137cb64eab7c0b1dddd1edf341467dc2d35',
}
