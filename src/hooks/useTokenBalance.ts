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

import { useMemo } from 'react'

import { BigNumber } from 'ethers'

import useContractFetcher from './useContractFetcher'

/**
 * Returns the token balance of the given tokenAddress from the ownerAddress
 * @param tokenAddress the given token contract address
 * @param ownerAddress the wallet owner's address
 */
const useTokenBalance = (
  tokenAddress: string,
  ownerAddress: string
): BigNumber => {
  const inputs = ['balanceOf', ownerAddress]
  const balance = useContractFetcher(tokenAddress, inputs).data
  return useMemo(() => balance ?? BigNumber.from(0), [balance])
}

export default useTokenBalance
