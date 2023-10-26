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

import { Alert, Button } from '@mui/material'
import { useWeb3React } from '@web3-react/core'

import { CHAIN_TO_CHAIN_ID } from 'constants/chains'
import useSwitchNetwork from 'hooks/useSwitchNetwork'

import type { Web3Provider } from '@ethersproject/providers'

interface Props {
  chain: string
  className?: string
}

const NetworkAlert: React.FC<Props> = ({ chain, className }) => {
  const { chainId } = useWeb3React<Web3Provider>()
  const { switchNetwork } = useSwitchNetwork(chain)

  if (chainId != null && CHAIN_TO_CHAIN_ID[chain] !== chainId) {
    return (
      <Alert
        className={className}
        severity="error"
        action={
          <Button size="small" onClick={async () => await switchNetwork()}>
            Switch
          </Button>
        }
      >
        Source chain and selected network in wallet must be the same
      </Alert>
    )
  }
  return null
}

export default NetworkAlert
