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

import useSWR from 'swr'

import useContract from './useContract'

import type { BigNumber } from 'ethers'
import type { Erc20 } from 'typechain'

const fetcher =
  (contract: Erc20 | null) =>
  (...args: string[]): Promise<BigNumber> | null => {
    if (contract === null) return null

    const [method, ...params] = args
    if (method === 'allowance') {
      const [ownerAddress, spenderAddress] = params
      return contract.allowance(ownerAddress, spenderAddress)
    } else if (method === 'balanceOf') {
      const [ownerAddress] = params
      return contract.balanceOf(ownerAddress)
    }

    return null
  }

/**
 * Returns the fetcher to read a contract and fetch data
 * @param address the given contract address
 * @param args string array that contains method name and method params
 */
const useContractFetcher = (
  address: string,
  args?: Array<string | undefined | null>
) => {
  const contract = useContract(address, false) as Erc20

  return useSWR(args, {
    fetcher: fetcher(contract),
  })
}

export default useContractFetcher
