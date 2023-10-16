import { useCallback } from 'react'

import { toHex } from '@cosmjs/encoding'
import { useWeb3React } from '@web3-react/core'
import { AuthInfo, Fee, TxBody, TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'
import { base64 } from 'ethers/lib/utils'

import { CHAIN_TO_CHAIN_ID } from 'constants/chains'
import { getAccount } from 'cosmos/api'
import { getKeplrFromWindow } from 'cosmos/getKeplrFromWindow'
import { buildReceiveTransaction } from 'cosmos/receiveTransaction'
import { MessageTransmitter__factory } from 'typechain/index'
import { getMessageTransmitterContractAddress } from 'utils/addresses'

import type { Bytes } from 'ethers'
import type {
  TransactionResponse,
  Web3Provider,
} from '@ethersproject/providers'
import type { BroadcastMode } from '@keplr-wallet/types'
import type { Chain, SupportedChainId } from 'constants/chains'

// TODO: Fix The final argument passed to useCallback changed size between renders. The order and size of this array must remain constant.

const useMessageTransmitterNoble = () => {
  const receiveMessage = useCallback(
    async (messages: Bytes[], signatures: string[]) => {
      // Get a handle to the wallet
      const keplr = await getKeplrFromWindow()
      if (!keplr) {
        alert('Unable to find keplr')
        return
      }

      // Build the transaction for it to sign
      // TODO: Do some checking that the key we get from the wallet is actually the destination of
      // the transaction.  That's basically the validation that the other UI components were doing, so
      // we should be doing the same thing
      // TODO: Teach it how to do multiple messages for automatic IBC
      // Fetch some information: get the intended key from Keplr, and then its account number and
      // sequence number (nonce) from Noble
      // TODO: Stop hardcoding grand-1
      const signingKey = await keplr.getKey('grand-1')
      const account = await getAccount(signingKey.bech32Address)

      // TODO: If the signing key is missing on the account (ie, because the address has never been used so
      // the RPC endpoint doesn't know about it) put it on from the signing key
      // account.pub_key = signingKey.pubKey

      // Build the transaction and request a signing of it
      const signDoc = buildReceiveTransaction(messages, signatures, account, 'grand-1')
      const signed = await keplr.signDirect(
        'grand-1',
        signingKey.bech32Address,
        signDoc
      )

      // Broadcast it
      const signedTx = {
        tx: TxRaw.encode({
          bodyBytes: signed.signed.bodyBytes,
          authInfoBytes: signed.signed.authInfoBytes,
          signatures: [base64.decode(signed.signature.signature)],
        }).finish(),
        signDoc: signed.signed,
      }

      const txHash = await keplr.sendTx(
        'grand-1',
        signedTx.tx,
        'sync' as BroadcastMode
      )

      return {
        hash: toHex(txHash).toUpperCase(),
      }
    },
    []
  )

  return {
    receiveMessage,
  }
}

const useMessageTransmitterEVM = (chain: Chain) => {
  const { library } = useWeb3React<Web3Provider>()

  const MESSAGE_TRANSMITTER_CONTRACT_ADDRESS =
    getMessageTransmitterContractAddress(CHAIN_TO_CHAIN_ID[chain])

  /**
   * Returns transaction response from contract call
   * @param message the message bytes from the source chain depositForBurn transaction
   * @param signature the signature returned from attestation service by messageHash
   */
  const receiveMessage = useCallback(
    async (messages: Bytes[], signatures: string[]) => {
      if (!library) return

      const contract = MessageTransmitter__factory.connect(
        MESSAGE_TRANSMITTER_CONTRACT_ADDRESS,
        library.getSigner()
      )

      return await contract
        // This assumes we only need the one message and signature for anything EVM.
        // For now this is true as the only multiple ones are for going to Cosmos.
        .receiveMessage(messages[0], signatures[0])
        .then((response: TransactionResponse) => {
          return response
        })
        .catch((error: Error) => {
          throw new Error(error.message)
        })
    },
    [MESSAGE_TRANSMITTER_CONTRACT_ADDRESS, library]
  )

  return {
    receiveMessage,
  }
}

/**
 * Returns a list of methods to call the Message Transmitter contract
 * @param chain the chain to call it on
 */
const useMessageTransmitter = (chain: Chain) => {
  // TODO: Do some better abstraction / overriding instead of having wholy different functions
  // for Noble and EVM

  if (chain === 'NOBLE') {
    return useMessageTransmitterNoble()
  } else {
    return useMessageTransmitterEVM(chain)
  }
}

export default useMessageTransmitter
