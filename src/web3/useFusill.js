import { useMemo } from 'react'
import { AnchorProvider } from '@coral-xyz/anchor'
import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react'
import { FusillClient } from '@fusill/sdk'
import IDL from '../idl/fusill.json'

/**
 * Returns a FusillClient bound to the connected wallet, or null when no wallet
 * is connected. The browser path uses the provider branch of the SDK (no
 * Keypair) — the wallet signs transactions on .rpc().
 */
export function useFusill() {
  const { connection } = useConnection()
  const wallet = useAnchorWallet()

  return useMemo(() => {
    if (!wallet) return null
    const provider = new AnchorProvider(connection, wallet, { commitment: 'confirmed' })
    return new FusillClient(undefined, provider, IDL)
  }, [connection, wallet])
}
