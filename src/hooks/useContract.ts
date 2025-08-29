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

import { useWeb3React } from '@web3-react/core'

import { Erc20__factory } from 'typechain/index'

import type { Web3Provider } from '@ethersproject/providers'

/**
 * Returns the contract object
 * @param address the given contract address
 * @param withSigner boolean to use a Provider or a Signer
 */
const useContract = (address: string, withSigner = true) => {
  const { library } = useWeb3React<Web3Provider>()

  return useMemo(
    () =>
      library != null
        ? Erc20__factory.connect(
            address,
            withSigner ? library.getSigner() : library
          )
        : null,
    [address, library, withSigner]
  )
}

export default useContract
