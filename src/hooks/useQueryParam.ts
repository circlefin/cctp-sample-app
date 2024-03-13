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

import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { TX_HASH_KEY } from 'constants/index'
import { useTransactionContext } from 'contexts/AppContext'

import type { Transaction } from 'contexts/AppContext'

export function useQueryParam() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { getTransaction } = useTransactionContext()

  const txHash: string = useMemo(() => {
    const paramTxHash = searchParams.get(TX_HASH_KEY)
    if (paramTxHash != null) {
      return paramTxHash
    }
    return ''
  }, [searchParams])

  const transaction: Transaction | undefined = useMemo(
    () => getTransaction(txHash),
    [getTransaction, txHash]
  )

  useEffect(() => {
    if (txHash != null && transaction == null) {
      setSearchParams('')
    }
  }, [setSearchParams, txHash, transaction])

  return {
    txHash,
    transaction,
    searchParams,
    setSearchParams,
  }
}
