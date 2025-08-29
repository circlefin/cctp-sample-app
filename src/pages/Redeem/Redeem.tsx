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

import { useEffect, useState } from 'react'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'

import { Button, Divider } from '@mui/material'

import RedeemComplete from 'components/Redeem/RedeemComplete'
import RedeemConfirmationDialog from 'components/Redeem/RedeemConfirmationDialog'
import RedeemForm from 'components/Redeem/RedeemForm'
import TransactionDialog from 'components/TransactionDialog/TransactionDialog'
import { TX_HASH_KEY } from 'constants/index'
import { TransactionStatus, TransactionType } from 'contexts/AppContext'
import { useQueryParam } from 'hooks/useQueryParam'
import { useTransactionPolling } from 'hooks/useTransactionPolling'

function Redeem() {
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false)
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false)
  const { txHash, transaction, setSearchParams } = useQueryParam()
  const navigate = useNavigate()

  useEffect(() => {
    if (transaction) {
      if (transaction.type === TransactionType.SEND) {
        // If send tx is incomplete or signature is missing, redirect to Send page
        if (
          transaction.status !== TransactionStatus.COMPLETE ||
          transaction.signature == null
        ) {
          navigate(
            {
              pathname: '/',
              search: createSearchParams({
                [TX_HASH_KEY]: txHash,
              }).toString(),
            },
            {
              replace: true,
            }
          )
        } else if (
          transaction.status === TransactionStatus.COMPLETE &&
          transaction.signature != null
        ) {
          // If send tx doesn't have a nextHash, open Redeem confirmation modal
          if (transaction.nextHash == null) {
            setIsConfirmationDialogOpen(true)
            // If send tx has a nextHash, replace with redeem tx hash
          } else {
            setSearchParams(
              { [TX_HASH_KEY]: transaction.nextHash },
              { replace: true }
            )
          }
        }
        // If redeem tx is not complete, open Redeem transaction modal
      } else if (
        transaction.type === TransactionType.REDEEM &&
        transaction.status !== TransactionStatus.COMPLETE
      ) {
        setIsTransactionDialogOpen(true)
      }
    }
  }, [navigate, setSearchParams, transaction, txHash])

  const handleNext = (txHash: string) => {
    setSearchParams({ [TX_HASH_KEY]: txHash }, { replace: true })
  }

  const handleConfirmation = (txHash: string) => {
    setSearchParams({ [TX_HASH_KEY]: txHash }, { replace: true })
    setIsConfirmationDialogOpen(false)
    setIsTransactionDialogOpen(true)
  }

  const handleComplete = () => {
    setIsTransactionDialogOpen(false)
  }

  const handleReturn = () => {
    navigate({
      pathname: '/',
    })
  }

  const { handleRedeemTransactionPolling } =
    useTransactionPolling(handleComplete)

  return (
    <>
      <div className="item-center mx-auto flex max-w-4xl flex-col justify-center">
        {transaction &&
          transaction.type === TransactionType.REDEEM &&
          transaction.status === TransactionStatus.COMPLETE && (
            <RedeemComplete
              handleReturn={handleReturn}
              transaction={transaction}
            />
          )}

        {(transaction == null || transaction.type === TransactionType.SEND) && (
          <>
            <h1>Receive</h1>
            <p className="mt-8 text-center text-xl">
              Already sent? Type in the transaction hash below to continue.
            </p>
            <div className="m-24 flex flex-col">
              <RedeemForm handleNext={handleNext} transaction={transaction} />

              <Divider className="mt-12">OR</Divider>

              <Link to="/">
                <Button
                  className="mt-12"
                  color="secondary"
                  size="large"
                  fullWidth={true}
                >
                  RETURN TO TRANSFER
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>

      {transaction && isConfirmationDialogOpen && (
        <RedeemConfirmationDialog
          handleClose={() => setIsConfirmationDialogOpen(false)}
          handleNext={handleConfirmation}
          open={isConfirmationDialogOpen}
          transaction={transaction}
        />
      )}

      {transaction && isTransactionDialogOpen && (
        <TransactionDialog
          handleTransactionPolling={handleRedeemTransactionPolling}
          open={isTransactionDialogOpen}
          transaction={transaction}
        />
      )}
    </>
  )
}

export default Redeem
