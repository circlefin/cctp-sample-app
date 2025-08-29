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
