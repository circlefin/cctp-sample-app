import { useMemo } from 'react'

import { useWeb3React } from '@web3-react/core'

import { Erc20__factory } from 'typechain/index'

import type { Web3Provider } from '@ethersproject/providers'

/**
 * Returns the contract object
 * @param address the given contract address
 * @param withSigner boolean to use a Provider or a Signer
 */
const useContract = (address: string, withSigner = true) => {
  const { library } = useWeb3React<Web3Provider>()

  return useMemo(
    () =>
      library != null
        ? Erc20__factory.connect(
            address,
            withSigner ? library.getSigner() : library
          )
        : null,
    [address, library, withSigner]
  )
}

export default useContract
