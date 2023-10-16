import { useState } from 'react'

import { DEFAULT_API_DELAY, DEFAULT_BLOCKCHAIN_DELAY } from 'constants/index'
import { TransactionStatus, useTransactionContext } from 'contexts/AppContext'
import { useQueryParam } from 'hooks/useQueryParam'
import useTransaction from 'hooks/useTransaction'
import { AttestationStatus, getAttestation } from 'services/attestationService'
import { getMessageBytesFromEventLogs, getMessageHashesFromBytes } from 'utils'

import type { Chain } from 'constants/chains'
import type { Transaction } from 'contexts/AppContext'
import type { Bytes } from 'ethers'

interface HandleTransactionReceiptPollingParams {
  messageBytes: Bytes[]
  messageHashes: string[]
}

export function useTransactionPolling(handleComplete: () => void) {
  const { setTransaction } = useTransactionContext()
  const { txHash, transaction } = useQueryParam()
  const { getTransactionReceipt } = useTransaction(transaction?.target as Chain)
  const [messageHashes, setMessageHashes] = useState(transaction?.messageHashes)
  const [signatures, setSignatures] = useState(transaction?.signatures)

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
            // decode log to get the messagesBytes needing signing
            const messageBytes = getMessageBytesFromEventLogs(logs, messageType)
            // hash the message bytes
            const messageHashes = getMessageHashesFromBytes(messageBytes)

            return handleSuccess({ messageBytes, messageHashes })
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
          const { messageBytes, messageHashes } = params
          const newTransaction: Transaction = {
            ...transaction,
            status: TransactionStatus.COMPLETE,
            messageBytes,
            messageHashes,
          }
          setTransaction(txHash, newTransaction)
          setMessageHashes(messageHashes)

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
    if (txHash && transaction && messageHashes) {
      // The callback we return, called by React to indicate we should stop, sets this
      // to false
      let keepPolling = true
      // We could consider trying to figure out whether there are any entries in the signatures
      // array that can be re-used, but for simplicity for now we're just fetching all new ones
      let i = 0
      const newSignatures: string[] = []
      // Keep polling while we haven't been told to stop, and we have more to fetch

      const doNextPoll = () =>
        setTimeout(async () => {
          // React told us to stop
          if (!keepPolling) return

          // Fetch the next attestation
          const attestation = await getAttestation(messageHashes[i])
          if (attestation == null) {
            // Something went wrong, so try again
            doNextPoll()
            return
          }

          const { status, message } = attestation

          // Got back an attestation
          if (status === AttestationStatus.complete && message !== null) {
            // We explicitly set newSignatures at i rather than just appending message to the end
            // in case signatures is a different length than where we're fetching right now (ie, if
            // something weird goes on in the React state management and this gets called multiple times
            // or similar)
            newSignatures[i] = message

            // We've filled in all of them, so we're done
            if (++i >= messageHashes.length) {
              // Only tell React about the new state once we've filled in all of the attestations.  Otherwise
              // React will cancel this render run as it tries to re-render.
              const newTransaction: Transaction = {
                ...transaction,
                signatures: newSignatures,
              }
              setTransaction(txHash, newTransaction)
              setSignatures(newSignatures)
              keepPolling = false
              handleComplete()
              return
            }
          }

          // We fell through, so we have more work to do.  Try again.
          doNextPoll()
        }, DEFAULT_API_DELAY)

      // Start the first poll
      doNextPoll()

      return () => (keepPolling = false)
    }
  }

  const handleApproveAllowanceTransactionPolling = (hash: string) => {
    return handleApproveAllowanceTransactionReceiptPolling(hash)
  }

  const handleSendTransactionPolling = () => {
    if (txHash && transaction?.status !== TransactionStatus.COMPLETE) {
      // Poll send transaction receipt for messageBytes and messageHashes
      return handleSendTransactionReceiptPolling()
    } else if (
      txHash &&
      transaction?.status === TransactionStatus.COMPLETE &&
      // TODO: Update this for checking if all signatures are complete
      !signatures
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
