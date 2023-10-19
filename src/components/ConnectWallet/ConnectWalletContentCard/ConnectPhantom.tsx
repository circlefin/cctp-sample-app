import { useEffect, useState } from 'react'

import IconPhantom from 'assets/icon-phantom.png'

import ConnectCard from './ConnectCard'

import type { PublicKey } from '@solana/web3.js'

type PhantomEvent = 'disconnect' | 'connect' | 'accountChanged'

interface ConnectOpts {
  onlyIfTrusted: boolean
}

interface PhantomProvider {
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>
  disconnect: () => Promise<void>
  on: (event: PhantomEvent, callback: (publicKey: PublicKey) => void) => void
  isPhantom: boolean
}

type WindowWithSolana = Window & {
  solana?: PhantomProvider
}

const ConnectPhantom: DefaultComponentType = ({ className }) => {
  const [provider, setProvider] = useState<PhantomProvider | null>(null)
  const [walletAvailable, setwalletAvailable] = useState(false)
  const [connected, setConnected] = useState(false)
  const [pubKey, setPubKey] = useState<PublicKey | null>(null)

  useEffect(() => {
    if ('solana' in window) {
      const solWindow = window as WindowWithSolana
      if (solWindow?.solana?.isPhantom) {
        setProvider(solWindow.solana)
        setwalletAvailable(true)
        // Attemp an eager connection
        try {
          void solWindow.solana.connect({ onlyIfTrusted: true })
        } catch (error) {
          console.error(error)
        }
      }
    }
  }, [])

  useEffect(() => {
    provider?.on('connect', (publicKey: PublicKey) => {
      setConnected(true)
      setPubKey(publicKey)
    })
    provider?.on('disconnect', () => {
      setConnected(false)
      setPubKey(null)
    })
  }, [provider])

  const handleConnect = () => {
    provider?.connect().catch((err) => {
      console.error('connect ERROR:', err)
    })
  }

  const handleDisconnect = () => {
    provider?.disconnect().catch((err) => {
      console.error('disconnect ERROR:', err)
    })
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pubKey?.toBase58() ?? '')
  }

  return (
    <ConnectCard
      className={className}
      title="Phantom"
      subtitle="Connect using Phantom"
      imgSrc={IconPhantom}
      walletAvailable={walletAvailable}
      connected={connected}
      handleConnect={handleConnect}
      handleDisconnect={handleDisconnect}
      handleCopy={handleCopy}
    />
  )
}

export default ConnectPhantom
