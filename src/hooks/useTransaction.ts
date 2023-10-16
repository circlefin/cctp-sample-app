import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getTx } from 'cosmos/api'

import type { TransactionReceipt, Web3Provider } from '@ethersproject/providers'
// import { TendermintTxTracer } from "@keplr-wallet/cosmos";

import type { Chain } from 'constants/chains'

const useTransactionNoble = () => {
  const getTransactionReceipt = useCallback(async (transactionHash: string) => {
    try {
      const txResponse = await getTx(transactionHash)

      return {
        // EVM transaction receipts return true/1 for success, and false/0 for
        // failure.  For Cosmos, 0 is good, and anything else is an error message
        status: txResponse.code === 0 ? 1 : 0,
        logs: [],
      }
    } catch (e) {
      // Likely a 404 or similar; in any event, we don't have a good response for the
      // transaction yet
      console.error(e)
      return {
        status: 0,
        logs: []
      }
    }
  }, [])

  return {
    getTransactionReceipt,
  }
}

const useTransactionEVM = () => {
  const { library } = useWeb3React<Web3Provider>()

  /**
   * Returns a Promise with the transaction receipt with transactionHash.
   * @param transactionHash the amount to be deposit for burn on source chain
   */
  const getTransactionReceipt = useCallback(
    async (transactionHash: string) => {
      return library != null
        ? await library
            .getTransactionReceipt(transactionHash)
            .then((response: TransactionReceipt) => {
              return response
            })
            .catch((err: Error) => {
              throw new Error(err.message)
            })
        : null
    },
    [library]
  )

  return {
    getTransactionReceipt,
  }
}

const useTransaction = (chain: Chain) => {
  // TODO: Do some better abstraction / overriding instead of having
  // wholy different functions for Noble and EVM
  if (chain === 'NOBLE') {
    return useTransactionNoble()
  } else {
    return useTransactionEVM()
  }
}

export default useTransaction
