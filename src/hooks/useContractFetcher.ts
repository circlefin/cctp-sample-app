import useSWR from 'swr'

import useContract from './useContract'

import type { BigNumber } from 'ethers'
import type { Erc20 } from 'typechain'

const fetcher =
  (contract: Erc20 | null) =>
  (...args: string[]): Promise<BigNumber> | null => {
    if (contract === null) return null

    const [method, ...params] = args
    if (method === 'allowance') {
      const [ownerAddress, spenderAddress] = params
      return contract.allowance(ownerAddress, spenderAddress)
    } else if (method === 'balanceOf') {
      const [ownerAddress] = params
      return contract.balanceOf(ownerAddress)
    }

    return null
  }

/**
 * Returns the fetcher to read a contract and fetch data
 * @param address the given contract address
 * @param args string array that contains method name and method params
 */
const useContractFetcher = (
  address: string,
  args?: Array<string | undefined | null>
) => {
  const contract = useContract(address, false) as Erc20

  return useSWR(args, {
    fetcher: fetcher(contract),
  })
}

export default useContractFetcher
