import { fromBech32 } from '@cosmjs/encoding'
import { defaultAbiCoder, hexZeroPad, id, keccak256 } from 'ethers/lib/utils'

import type { BigNumber } from '@ethersproject/bignumber'
import type { Log } from '@ethersproject/providers'
import type { Bytes } from 'ethers/lib/utils'

/**
 * Returns the gas value plus a margin for unexpected or variable gas costs
 * @param value the gas value to pad
 */
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(120).div(100)
}

/**
 * Returns the abbreviation of an address
 * @param address the address to be convert to abbreviation
 */
export function getAddressAbbreviation(address: string): string {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

/**
 * Returns bytes32 from an address
 * @param address the address to be convert to bytes32
 */
export function addressToBytes32(address: string) {
  // "0x" + 24 zeros + Rest of the address string with leading "0x" trimmed
  return (
    address.slice(0, 2) +
    '000000000000000000000000' +
    address.slice(2, address.length)
  )
}

/**
 * Decode a Noble address into bytes32 hex strings
 */
export function nobleAddressToBytes32(address: string) {
  const { prefix, data } = fromBech32(address)
  return {
    // Convenience for human readable and later lookup
    prefixUnencoded: prefix,
    prefix: hexZeroPad(new TextEncoder().encode(prefix), 32),
    data: hexZeroPad(data, 32),
  }
}

/**
 * Returns all matching messages as bytes for a given topic in some logs.
 * @param logs the event logs of a transaction
 * @param topic the topic to be filter from the log
 */
export function getMessageBytesFromEventLogs(
  logs: Log[],
  topic: string
): Bytes[] {
  const eventTopic = id(topic)
  return logs
    .filter((l) => l.topics[0] === eventTopic)
    .map((l) => defaultAbiCoder.decode(['bytes'], l.data)[0] as Bytes)
}

/**
 * Returns message hash from the message bytes
 * @param message the message bytes
 */
export function getMessageHashesFromBytes(messages: Bytes[]): string[] {
  return messages.map(keccak256)
}

/**
 * @param value the value to be copied to clipboard
 */
export function copyToClipboard(value: string) {
  /* Copy the text inside the text field */
  void navigator.clipboard.writeText(value)
}

/**
 * Returns the hexadecimal representation of a number
 * @param num the number to be converted to hexadecimals
 */

export const numToHex = (num: number) => {
  const val = Number(num)
  return '0x' + val.toString(16)
}
