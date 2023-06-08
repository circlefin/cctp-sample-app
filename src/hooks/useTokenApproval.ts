import { useCallback } from 'react'

import { MaxUint256 } from '@ethersproject/constants'
import { useWeb3React } from '@web3-react/core'

import { Erc20__factory } from 'typechain/index'

import type {
  TransactionResponse,
  Web3Provider,
} from '@ethersproject/providers'
import type { BigNumber } from 'ethers'

interface TokenApprovalResponse {
  approve: (amountToApprove: BigNumber) => Promise<
    | {
        response: TransactionResponse
        tokenAddress: string
        spenderAddress: string
      }
    | undefined
  >
}

/**
 * Returns a approve method that can be used to approve allowance
 * @param tokenAddress the given token contract address
 * @param spenderAddress the spender's address that the allowance is granted on
 * @param useExact boolean to approve exact amount or infinite amount
 */
const useTokenApproval = (
  tokenAddress: string,
  spenderAddress: string,
  useExact = true
): TokenApprovalResponse => {
  const { library } = useWeb3React<Web3Provider>()

  const approve = useCallback(
    async (amountToApprove: BigNumber) => {
      if (!library) return
      const token = Erc20__factory.connect(tokenAddress, library.getSigner())

      return await token
        .approve(
          spenderAddress,
          useExact ? amountToApprove.toString() : MaxUint256
        )
        .then((response: TransactionResponse) => {
          return {
            response,
            tokenAddress,
            spenderAddress,
          }
        })
        .catch((error: Error) => {
          throw new Error(error.message)
        })
    },
    [library, spenderAddress, tokenAddress, useExact]
  )

  return {
    approve,
  }
}

export default useTokenApproval
