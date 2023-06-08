import { defaultAbiCoder, id, keccak256 } from 'ethers/lib/utils'

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
 * Returns message bytes from decoding the event logs
 * @param logs the event logs of a transaction
 * @param topic the topic to be filter from the log
 */
export function getMessageBytesFromEventLogs(
  logs: Log[],
  topic: string
): Bytes {
  const eventTopic = id(topic)
  const log = logs.filter((l) => l.topics[0] === eventTopic)[0]
  return defaultAbiCoder.decode(['bytes'], log.data)[0] as Bytes
}

/**
 * Returns message hash from the message bytes
 * @param message the message bytes
 */
export function getMessageHashFromBytes(message: Bytes): string {
  return keccak256(message)
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
