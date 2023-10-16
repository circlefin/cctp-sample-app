/**
 * List of all the chains/networks supported
 */
export enum Chain {
  ETH = 'ETH',
  AVAX = 'AVAX',
  OP = 'OP',
  ARB = 'ARB',
  NOBLE = 'NOBLE',
}

/**
 * List of all the chain/network IDs supported
 */
export enum SupportedChainId {
  ETH_GOERLI = 5,
  AVAX_FUJI = 43113,
  OP_GOERLI = 420,
  ARB_GOERLI = 421613,
}

/**
 * List of all the chain/network IDs supported in hexadecimals
 * TODO: Infer from SupportedChainId
 */
export const SupportedChainIdHex = {
  ETH_GOERLI: '0x5',
  AVAX_FUJI: '0xa869',
  OP_GOERLI: '0x1a4',
  ARB_GOERLI: '0x66eed',
}

interface ChainToChainIdMap {
  [key: string]: number
}

/**
 * Maps a chain to its chain ID
 */

export const CHAIN_TO_CHAIN_ID: ChainToChainIdMap = {
  [Chain.ETH]: SupportedChainId.ETH_GOERLI,
  [Chain.AVAX]: SupportedChainId.AVAX_FUJI,
  [Chain.OP]: SupportedChainId.OP_GOERLI,
  [Chain.ARB]: SupportedChainId.ARB_GOERLI,
}

interface ChainToChainNameMap {
  [key: string]: string
}

/**
 * Maps a chain to it's readable name
 */
export const CHAIN_TO_CHAIN_NAME: ChainToChainNameMap = {
  ETH: 'Ethereum',
  AVAX: 'Avalanche',
  OP: 'Optimism',
  ARB: 'Arbitrum',
  NOBLE: 'Noble',
}

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === 'number') as SupportedChainId[]

/**
 * List of Circle-defined IDs referring to specific domains
 */
export enum DestinationDomain {
  ETH = 0,
  AVAX = 1,
  OP = 2,
  ARB = 3,
  NOBLE = 4,
}

// https://eips.ethereum.org/EIPS/eip-3085
interface AddEthereumChainParameter {
  chainId: string
  blockExplorerUrls?: string[]
  chainName?: string
  iconUrls?: string[]
  nativeCurrency?: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls?: string[]
}

const ETH_GOERLI: AddEthereumChainParameter = {
  chainId: '0x5',
  blockExplorerUrls: ['https://goerli.etherscan.io'],
  chainName: 'Goerli Test Network',
  nativeCurrency: {
    name: 'Goerli ETH',
    symbol: 'gorETH',
    decimals: 18,
  },
  rpcUrls: ['https://goerli.infura.io/v3/'],
}

const AVAX_FUJI: AddEthereumChainParameter = {
  chainId: '0xa869',
  blockExplorerUrls: ['https://testnet.snowtrace.io/'],
  chainName: 'Avalanche FUJI C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
}

const OP_GOERLI: AddEthereumChainParameter = {
  chainId: SupportedChainIdHex.OP_GOERLI,
  blockExplorerUrls: ['https://goerli.etherscan.io/'],
  chainName: 'Optimism Goerli Testnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://goerli.optimism.io'],
}

const ARB_GOERLI: AddEthereumChainParameter = {
  chainId: SupportedChainIdHex.ARB_GOERLI,
  blockExplorerUrls: ['https://goerli.arbiscan.io/'],
  chainName: 'Arbitrum Goerli Testnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://arb-goerli.g.alchemy.com/v2/demo'],
}

interface ChainIdToChainParameters {
  [key: string]: AddEthereumChainParameter
}

export const CHAIN_ID_HEXES_TO_PARAMETERS: ChainIdToChainParameters = {
  [SupportedChainIdHex.ETH_GOERLI]: ETH_GOERLI,
  [SupportedChainIdHex.AVAX_FUJI]: AVAX_FUJI,
  [SupportedChainIdHex.OP_GOERLI]: OP_GOERLI,
  [SupportedChainIdHex.ARB_GOERLI]: ARB_GOERLI,
}

/**
 * This is a map of the channel from Noble testnet to the (probably testnet)
 * IBC chain indicated by the prefix.
 * Findable via https://testnet.mintscan.io/noble-testnet/relayers.
 */
export const IBC_CHANNEL_FOR_PREFIX: { [key: string]: number } = {
  dydx: 20,
  osmo: 10,
}
