import { http, createConfig } from 'wagmi'
import { celo } from 'viem/chains'
import { farcasterFrame as miniAppConnector } from '@farcaster/frame-wagmi-connector'

export const config = createConfig({
  chains: [celo],
  transports: {
    [celo.id]: http(),
  },
  connectors: [
    miniAppConnector()
  ]
})

// Constants for the payment
export const PAYMENT_AMOUNT = BigInt('100000000000000000') // 0.1 CELO
export const RECIPIENT_ADDRESS = '0x4858aBb6dfF69904f1c155D40A48CD8846AEA2f6' 