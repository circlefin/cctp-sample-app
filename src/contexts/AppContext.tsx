import { createContext, useContext, useMemo, useState } from 'react'
import type { FC, ReactNode } from 'react'

import type { Bytes } from 'ethers/lib/utils'

export enum TransactionType {
  SEND = 'SEND',
  REDEEM = 'REDEEM',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  COMPLETE = 'COMPLETE',
}

export interface TransactionInputs {
  source: string
  target: string
  address: string
  amount: string
}

export interface Transaction extends TransactionInputs {
  // transaction hash (txHash)
  hash: string
  type: TransactionType
  status: TransactionStatus
  // above will be after `depositForBurn` but before `transactionReceipt`. will need to display all of these
  messageBytes?: Bytes
  messageHash?: string
  // above will be after `transactionReceipt` but before attestation
  signature?: string
  // above will be after attestation but before redeem flow (Only for Send transaction)
  nextHash?: string
  // above will be after redeem tx is submitted (Only for Send transaction)
}

interface TransactionMap {
  [key: string]: Transaction
}

interface TransactionState {
  allTransactions: Transaction[]
  getTransaction: (hash: string) => Transaction | undefined
  setTransaction: (hash: string, transaction: Transaction) => void
  addTransaction: (hash: string, transaction: Transaction) => void
  removeTransaction: (hash: string) => void
}

interface AppState {
  transaction: TransactionState
}

const TRANSACTION_KEY = 'Transactions'
const setStorageTransactions = (transactionMap: TransactionMap) => {
  const value = JSON.stringify(transactionMap)
  localStorage.setItem(TRANSACTION_KEY, value)
}
const getStorageTransactions = (): TransactionMap => {
  const transactions = localStorage.getItem(TRANSACTION_KEY)
  if (transactions) {
    return JSON.parse(transactions) as TransactionMap
  }
  return {}
}

const initialState: AppState = {
  transaction: {
    allTransactions: [],
    getTransaction: () => undefined,
    setTransaction: () => null,
    addTransaction: () => null,
    removeTransaction: () => null,
  },
}

const AppContext = createContext<AppState>(initialState)

const useTransactionState = () => {
  const [transactionMap, setTransactionMap] = useState<TransactionMap>(
    getStorageTransactions()
  )

  const allTransactions = useMemo(
    () => Object.values(transactionMap),
    [transactionMap]
  )

  const getTransaction = (hash: string) => {
    return transactionMap[hash]
  }

  const setTransaction = (hash: string, newTransaction: Transaction) => {
    setTransactionMap((transactionMap) => {
      const newTransactionMap = { ...transactionMap, [hash]: newTransaction }
      setStorageTransactions(newTransactionMap)
      return newTransactionMap
    })
  }

  const addTransaction = (hash: string, newTransaction: Transaction) => {
    setTransactionMap((transactionMap) => {
      const newTransactionMap = { ...transactionMap, [hash]: newTransaction }
      setStorageTransactions(newTransactionMap)
      return newTransactionMap
    })
  }

  const removeTransaction = (hash: string) => {
    setTransactionMap((transactionMap) => {
      const { [hash]: value, ...newTransactionMap } = transactionMap
      setStorageTransactions(newTransactionMap)
      return newTransactionMap
    })
  }

  return {
    allTransactions,
    getTransaction,
    setTransaction,
    addTransaction,
    removeTransaction,
  }
}

export const AppContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <AppContext.Provider
      value={{
        transaction: useTransactionState(),
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

export const useTransactionContext = () => {
  const { transaction } = useAppContext()
  return transaction
}
