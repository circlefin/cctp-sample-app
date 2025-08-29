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

import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import type { TransactionReceipt, Web3Provider } from '@ethersproject/providers'

const useTransaction = () => {
  const { library } = useWeb3React<Web3Provider>()

  /**
   * Returns a Promise with the transaction receipt with transactionHash.
   * @param transactionHash the amount to be deposit for burn on source chain
   */
  const getTransactionReceipt = useCallback(
    async (transactionHash: string) => {
      return library != null
        ? await library
            .getTransactionReceipt(transactionHash)
            .then((response: TransactionReceipt) => {
              return response
            })
            .catch((err: Error) => {
              throw new Error(err.message)
            })
        : null
    },
    [library]
  )

  return {
    getTransactionReceipt,
  }
}

export default useTransaction
