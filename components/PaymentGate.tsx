'use client'

import { useAccount, useConnect, useSendTransaction } from 'wagmi'
import { PAYMENT_AMOUNT, RECIPIENT_ADDRESS } from '@/lib/wagmi'
import { Button } from './ui/button'

interface PaymentGateProps {
  onSuccess: () => void
  children: React.ReactNode
}

export function PaymentGate({ onSuccess, children }: PaymentGateProps) {
  const { isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { sendTransaction, isPending, isSuccess, error } = useSendTransaction()

  const handlePayment = async () => {
    try {
      await sendTransaction({
        to: RECIPIENT_ADDRESS,
        value: PAYMENT_AMOUNT,
      })
      if (isSuccess) {
        onSuccess()
      }
    } catch (err) {
      console.error('Payment failed:', err)
    }
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
        <p className="text-center">Connect your wallet to see your IQ score</p>
        <Button onClick={() => connect({ connector: connectors[0] })}>
          Connect Wallet
        </Button>
      </div>
    )
  }

  if (isSuccess) {
    return <>{children}</>
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
      <p className="text-center">Pay 0.1 CELO to see your IQ score</p>
      <Button 
        onClick={handlePayment} 
        disabled={isPending}
      >
        {isPending ? 'Processing...' : 'Pay 0.1 CELO'}
      </Button>
      {error && (
        <p className="text-red-500 text-sm">
          Error: {error.message}
        </p>
      )}
    </div>
  )
} 