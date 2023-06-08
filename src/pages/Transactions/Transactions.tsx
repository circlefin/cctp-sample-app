import { createSearchParams, Link } from 'react-router-dom'

import { Button, Card } from '@mui/material'

import { TX_HASH_KEY } from 'constants/index'
import {
  TransactionStatus,
  TransactionType,
  useTransactionContext,
} from 'contexts/AppContext'

import type { Transaction } from 'contexts/AppContext'

function Transactions() {
  const { allTransactions, removeTransaction } = useTransactionContext()

  const renderTransaction = (transaction: Transaction) => {
    const isComplete =
      (transaction.type === TransactionType.SEND &&
        transaction.status === TransactionStatus.COMPLETE &&
        transaction.signature != null &&
        transaction.nextHash != null) ||
      (transaction.type === TransactionType.REDEEM &&
        transaction.status === TransactionStatus.COMPLETE)

    const handleRemove = () => {
      void removeTransaction(transaction.hash)
    }

    return (
      <li key={transaction.hash}>
        <Card className="my-4 flex items-center justify-between p-4">
          <div className="flex w-4/5 flex-col">
            <p>Tx Hash: {transaction.hash}</p>
            <p>Type: {transaction.type}</p>
            <p>Status: {transaction.status}</p>
            <p>Source: {transaction.source}</p>
            <p>Target: {transaction.target}</p>
            <p>Address: {transaction.address}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Message Hash: {transaction.messageHash}</p>
            <p className="truncate">Signature: {transaction.signature}</p>
            <p>Next: {transaction.nextHash}</p>
          </div>

          <div className="flex flex-col">
            <Link
              to={{
                pathname: '/',
                search: createSearchParams({
                  [TX_HASH_KEY]: transaction.hash,
                }).toString(),
              }}
            >
              <Button fullWidth>Link</Button>
            </Link>

            {isComplete && (
              <Button className="mt-4" fullWidth onClick={handleRemove}>
                Remove
              </Button>
            )}
          </div>
        </Card>
      </li>
    )
  }

  return (
    <div className="item-center mx-auto flex max-w-4xl flex-col justify-center">
      <h1>Transactions</h1>

      <ul className="mt-8">
        {allTransactions.map((transaction) => renderTransaction(transaction))}
      </ul>
    </div>
  )
}

export default Transactions
