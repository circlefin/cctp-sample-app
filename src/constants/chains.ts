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

/**
 * List of all the chains/networks supported
 */
export enum Chain {
  ETH = 'ETH',
  AVAX = 'AVAX',
  ARB = 'ARB',
}

/**
 * List of all the chain/network IDs supported
 */
export enum SupportedChainId {
  ETH_SEPOLIA = 11155111,
  AVAX_FUJI = 43113,
  ARB_SEPOLIA = 421614,
}

/**
 * List of all the chain/network IDs supported in hexadecimals
 * TODO: Infer from SupportedChainId
 */
export const SupportedChainIdHex = {
  ETH_SEPOLIA: '0xaa36a7',
  AVAX_FUJI: '0xa869',
  ARB_SEPOLIA: '0x66eee',
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

interface ChainIdToChainParameters {
  [key: string]: AddEthereumChainParameter
}

export const CHAIN_ID_HEXES_TO_PARAMETERS: ChainIdToChainParameters = {
  [SupportedChainIdHex.ETH_SEPOLIA]: ETH_SEPOLIA,
  [SupportedChainIdHex.AVAX_FUJI]: AVAX_FUJI,
  [SupportedChainIdHex.ARB_SEPOLIA]: ARB_SEPOLIA,
}
