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

import { Button } from '@mui/material'

import TransactionDetails from 'components/TransactionDetails/TransactionDetails'

import type { Transaction } from 'contexts/AppContext'

interface Props {
  handleReturn: () => void
  transaction: Transaction | undefined
}

const RedeemComplete: React.FC<Props> = ({ handleReturn, transaction }) => {
  return (
    <>
      <h1>Transfer completed</h1>
      <p className="mt-8 text-center text-xl">
        Your transfer of USDC across chains was successful. See below for
        details.
      </p>

      <div className="m-24 flex flex-col">
        <TransactionDetails transaction={transaction} />

        <Button
          className="mt-12"
          size="large"
          fullWidth={true}
          onClick={handleReturn}
        >
          Start a new transfer
        </Button>
      </div>
    </>
  )
}

export default RedeemComplete
