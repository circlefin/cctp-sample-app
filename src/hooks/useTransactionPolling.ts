import { useState } from 'react'

import { DEFAULT_API_DELAY, DEFAULT_BLOCKCHAIN_DELAY } from 'constants/index'
import { TransactionStatus, useTransactionContext } from 'contexts/AppContext'
import { useQueryParam } from 'hooks/useQueryParam'
import useTransaction from 'hooks/useTransaction'
import { AttestationStatus, getAttestation } from 'services/attestationService'
import { getMessageBytesFromEventLogs, getMessageHashFromBytes } from 'utils'

import type { Transaction } from 'contexts/AppContext'
import type { Bytes } from 'ethers'

interface HandleTransactionReceiptPollingParams {
  messageBytes: Bytes
  messageHash: string
}

export function useTransactionPolling(handleComplete: () => void) {
  const { getTransactionReceipt } = useTransaction()
  const { setTransaction } = useTransactionContext()
  const { txHash, transaction } = useQueryParam()
  const [messageHash, setMessageHash] = useState(transaction?.messageHash)
  const [signature, setSignature] = useState(transaction?.signature)

  const handleTransactionReceiptPolling = (
    handleSuccess: (params?: HandleTransactionReceiptPollingParams) => void,
    hash: string,
    messageType?: string
  ) => {
    // Polling transaction receipt until status = 1
    const interval = setInterval(async () => {
      const transactionReceipt = await getTransactionReceipt(hash)
      if (transactionReceipt != null) {
        const { status, logs } = transactionReceipt

        // Success
        if (status === 1) {
          clearInterval(interval)

          if (messageType) {
            // decode log to get messageBytes
            const messageBytes = getMessageBytesFromEventLogs(logs, messageType)
            // hash the message bytes
            const messageHash = getMessageHashFromBytes(messageBytes)

            return handleSuccess({ messageBytes, messageHash })
          } else {
            return handleSuccess()
          }
        }
      }
    }, DEFAULT_BLOCKCHAIN_DELAY)

    return () => clearInterval(interval)
  }

  const handleApproveAllowanceTransactionReceiptPolling = (hash: string) => {
    if (hash) {
      const handleSuccess = () => {
        return handleComplete()
      }
      return handleTransactionReceiptPolling(handleSuccess, hash)
    }
  }

  const handleSendTransactionReceiptPolling = () => {
    if (transaction) {
      const handleSuccess = (
        params?: HandleTransactionReceiptPollingParams
      ) => {
        if (params) {
          const { messageBytes, messageHash } = params
          const newTransaction: Transaction = {
            ...transaction,
            status: TransactionStatus.COMPLETE,
            messageBytes,
            messageHash,
          }
          setTransaction(txHash, newTransaction)
          setMessageHash(messageHash)

          return handleAttestationPolling()
        }
      }
      return handleTransactionReceiptPolling(
        handleSuccess,
        txHash,
        'MessageSent(bytes)'
      )
    }
  }

  const handleRedeemTransactionReceiptPolling = () => {
    if (transaction) {
      const handleSuccess = () => {
        const newTransaction: Transaction = {
          ...transaction,
          status: TransactionStatus.COMPLETE,
        }
        setTransaction(txHash, newTransaction)

        return handleComplete()
      }
      return handleTransactionReceiptPolling(handleSuccess, txHash)
    }
  }

  const handleAttestationPolling = () => {
    if (txHash && transaction && messageHash) {
      // Polling transaction receipt until status = complete
      const interval = setInterval(async () => {
        const attestation = await getAttestation(messageHash)
        if (attestation != null) {
          const { status, message } = attestation

          // Success
          if (status === AttestationStatus.complete && message !== null) {
            const newTransaction: Transaction = {
              ...transaction,
              signature: message,
            }
            setTransaction(txHash, newTransaction)
            setSignature(message)

            handleComplete()
            clearInterval(interval)
          }
        }
      }, DEFAULT_API_DELAY)

      return () => clearInterval(interval)
    }
  }

  const handleApproveAllowanceTransactionPolling = (hash: string) => {
    return handleApproveAllowanceTransactionReceiptPolling(hash)
  }

  const handleSendTransactionPolling = () => {
    if (txHash && transaction?.status !== TransactionStatus.COMPLETE) {
      // Poll send transaction receipt for messageBytes and messageHash
      return handleSendTransactionReceiptPolling()
    } else if (
      txHash &&
      transaction?.status === TransactionStatus.COMPLETE &&
      !signature
    ) {
      // Poll attestation service for signature
      return handleAttestationPolling()
    }
  }

  const handleRedeemTransactionPolling = () => {
    // Poll redeem transaction receipt for completion
    if (
      txHash &&
      transaction &&
      transaction.status !== TransactionStatus.COMPLETE
    ) {
      return handleRedeemTransactionReceiptPolling()
    }
  }

  return {
    handleApproveAllowanceTransactionPolling,
    handleSendTransactionPolling,
    handleRedeemTransactionPolling,
  }
}
