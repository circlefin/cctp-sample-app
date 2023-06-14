import { useCallback } from 'react'

import { useWeb3React } from '@web3-react/core'

import type { TransactionReceipt, Web3Provider } from '@ethersproject/providers'

const useTransaction = () => {
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

export default useTransaction
