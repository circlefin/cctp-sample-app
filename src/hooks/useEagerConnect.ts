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

// https://github.com/Uniswap/interface/blob/13d7d2c99235aacd199641a9bfcae8aa6f7d94ae/src/hooks/web3.ts#L19
import { useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'

import { injected } from 'components/Wallet/Connectors'

import type { Web3Provider } from '@ethersproject/providers'

export function useEagerConnect() {
  const { activate } = useWeb3React<Web3Provider>()

  useEffect(() => {
    const initWallet = async () => {
      const isAuthorized = await injected.isAuthorized()
      if (isAuthorized) {
        await activate(injected)
      }
    }
    void initWallet()
  }, [activate])
}
