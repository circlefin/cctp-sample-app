// https://github.com/Uniswap/interface/blob/13d7d2c99235aacd199641a9bfcae8aa6f7d94ae/src/hooks/web3.ts#L19
import { useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'

import { metaMask } from 'components/Wallet/Connectors'

import type { Web3Provider } from '@ethersproject/providers'

export function useEagerConnect() {
  const { activate } = useWeb3React<Web3Provider>()

  useEffect(() => {
    const initWallet = async () => {
      const isAuthorized = await metaMask.isAuthorized()
      if (isAuthorized) {
        await activate(metaMask)
      }
    }
    void initWallet()
  }, [activate])
}
