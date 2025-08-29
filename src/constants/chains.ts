/**
 * List of all the chains/networks supported
 */
export enum Chain {
  ETH = 'ETH',
  AVAX = 'AVAX',
  ARB = 'ARB',
  BASE = 'BASE',
}

/**
 * List of all the chain/network IDs supported
 */
export enum SupportedChainId {
  ETH_SEPOLIA = 11155111,
  AVAX_FUJI = 43113,
  ARB_SEPOLIA = 421614,
  BASE_SEPOLIA = 84532,
}

/**
 * List of all the chain/network IDs supported in hexadecimals
 * TODO: Infer from SupportedChainId
 */
export const SupportedChainIdHex = {
  ETH_SEPOLIA: '0xaa36a7',
  AVAX_FUJI: '0xa869',
  ARB_SEPOLIA: '0x66eee',
  BASE_SEPOLIA: '0x14a34',
}

interface ChainToChainIdMap {
  [key: string]: number
}

/**
 * Maps a chain to it's chain ID
 */

export const CHAIN_TO_CHAIN_ID: ChainToChainIdMap = {
  [Chain.ETH]: SupportedChainId.ETH_SEPOLIA,
  [Chain.AVAX]: SupportedChainId.AVAX_FUJI,
  [Chain.ARB]: SupportedChainId.ARB_SEPOLIA,
  [Chain.BASE]: SupportedChainId.BASE_SEPOLIA,
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
  ARB: 'Arbitrum',
  BASE: 'Base',
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
  ARB = 3,
  BASE = 6,
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

const ETH_SEPOLIA: AddEthereumChainParameter = {
  chainId: SupportedChainIdHex.ETH_SEPOLIA,
  blockExplorerUrls: ['https://sepolia.etherscan.io'],
  chainName: 'Sepolia Test Network',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia.infura.io/v3/'],
}

const AVAX_FUJI: AddEthereumChainParameter = {
  chainId: SupportedChainIdHex.AVAX_FUJI,
  blockExplorerUrls: ['https://testnet.snowtrace.io/'],
  chainName: 'Avalanche FUJI C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
}

const ARB_SEPOLIA: AddEthereumChainParameter = {
  chainId: SupportedChainIdHex.ARB_SEPOLIA,
  blockExplorerUrls: ['https://sepolia.arbiscan.io/'],
  chainName: 'Arbitrum Sepolia Testnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://arb-sepolia.g.alchemy.com/v2/demo'],
}

const BASE_SEPOLIA: AddEthereumChainParameter = {
  chainId: SupportedChainIdHex.BASE_SEPOLIA,
  blockExplorerUrls: ['https://sepolia.basescan.org/'],
  chainName: 'Base Sepolia Testnet',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://sepolia.base.org'],
}

interface ChainIdToChainParameters {
  [key: string]: AddEthereumChainParameter
}

export const CHAIN_ID_HEXES_TO_PARAMETERS: ChainIdToChainParameters = {
  [SupportedChainIdHex.ETH_SEPOLIA]: ETH_SEPOLIA,
  [SupportedChainIdHex.AVAX_FUJI]: AVAX_FUJI,
  [SupportedChainIdHex.ARB_SEPOLIA]: ARB_SEPOLIA,
  [SupportedChainIdHex.BASE_SEPOLIA]: BASE_SEPOLIA,
}
