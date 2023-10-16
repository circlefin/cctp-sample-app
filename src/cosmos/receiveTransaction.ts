import { base64 } from 'ethers/lib/utils'
import { SignMode } from 'cosmjs-types/cosmos/tx/signing/v1beta1/signing'
import { Any } from 'cosmjs-types/google/protobuf/any'
import { PubKey } from 'cosmjs-types/cosmos/crypto/secp256k1/keys'
import { AuthInfo, Fee, TxBody, TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx'

import Long from 'long'

import {
  MsgReceiveMessage,
  msgReceiveMessageUrl,
} from 'cosmos/msgReceiveMessage'

import type { Bytes } from 'ethers'

import type { Account } from 'cosmos/api'

// Function to build a complete CCTP receive transaction using one or
// more MsgReceiveMessages.
// Entries in messages and bytes are expected to correspond
// to each other.
// TODO: Refactor so that messages and signatures are passed around as a single object

export const buildReceiveTransaction = (messages: Bytes[], signatures: string[], account: Account, chainId: string) => {
  // Create one receive message for each message / signature pair
  const receiveMessages = messages.map((message, i) =>
    Any.fromPartial({
      typeUrl: msgReceiveMessageUrl,
      value: MsgReceiveMessage.encode(
        MsgReceiveMessage.create({
          // TODO: Was signingKey.bech32address; is this the same?
          from: account.address,
          message: base64.encode(messages[i]),
          attestation: base64.encode(signatures[i]),
        })
      ).finish(),
    })
  )

  // Then build and sign the boilerplate
  const signDoc = {
    bodyBytes: TxBody.encode(
      TxBody.fromPartial({
        messages: receiveMessages
      })
    ).finish(),
    authInfoBytes: AuthInfo.encode({
      signerInfos: [
        {
          publicKey: {
            typeUrl: '/cosmos.crypto.secp256k1.PubKey',
            // TODO: Was different, does this stlll work?
            value: PubKey.encode(PubKey.fromJSON(account.pub_key)).finish(),
          },
          modeInfo: {
            single: {
              mode: SignMode.SIGN_MODE_DIRECT,
            },
            multi: undefined,
          },
          sequence: Long.fromString(account.sequence),
        },
      ],
      fee: Fee.fromPartial({
        // If the Noble testnet ever adds fees, will probably have to fix this
        amount: [],
        // Figure out how to automatically fetch this / stop hardcoding this
        gasLimit: '200000',
        payer: '',
        granter: '',
      }),
    }).finish(),
    chainId: chainId,
    accountNumber: Long.fromString(account.account_number),
  }

  return signDoc
}
