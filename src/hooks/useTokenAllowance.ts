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
 * Returns the allowance of the given tokenAddress from the ownerAddress,
 * to be spent by the spenderAddress
 * @param tokenAddress the given token contract address
 * @param ownerAddress the wallet owner's address
 * @param spenderAddress the spender's address that the allowance is granted on
 */
const useTokenAllowance = (
  tokenAddress: string,
  ownerAddress: string,
  spenderAddress: string
): BigNumber => {
  const inputs = ['allowance', ownerAddress, spenderAddress]
  const allowance = useContractFetcher(tokenAddress, inputs).data
  return useMemo(() => allowance ?? BigNumber.from(0), [allowance])
}

export default useTokenAllowance
