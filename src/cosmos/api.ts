import axios from 'axios'

import type { AxiosInstance } from 'axios'

// See https://docs.osmosis.zone/api/?v=LCD#/operations/Accounts
interface GetAccountResponse {
  account: Account
}

export interface Account {
  account_number: string
  address: string
  sequence: string
  pub_key: {
    '@type': string
    key: string
  }
}

// See https://docs.osmosis.zone/api/?v=LCD#/operations/GetTx
interface GetTxResponse {
  tx_response: TxResponse
}

interface TxResponse {
  code: number
}

// TODO: Stop hardcoding me!
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://lcd.testnet.noble.strange.love',
})

export const getAccount = async (address: string): Promise<Account> => {
  const response = await axiosInstance.get<GetAccountResponse>(
    `/cosmos/auth/v1beta1/accounts/${address}`
  )
  return response?.data?.account
}

export const getTx = async (txHash: string): Promise<TxResponse> => {
  const response = await axiosInstance.get<GetTxResponse>(
    `/cosmos/tx/v1beta1/txs/${txHash}`
  )
  return response?.data?.tx_response
}
