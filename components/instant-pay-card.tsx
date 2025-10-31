"use client"

import { ChevronRight, Zap, Clock, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { DummyDataStore } from "@/lib/dummy-data"
import { toast } from "sonner"

export function InstantPayCard() {
  const [isHovering, setIsHovering] = useState(false)
  const [balance, setBalance] = useState(0)
  const [countdown, setCountdown] = useState(60)
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  useEffect(() => {
    // Get user balance
    const user = DummyDataStore.getUser('worker-1')
    if (user) {
      setBalance(user.instant_pay_balance)
    }

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          return 60 // Reset to 60 seconds
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleWithdraw = async () => {
    if (balance <= 0) {
      toast.error("No funds available to withdraw")
      return
    }

    setIsWithdrawing(true)
    
    // Simulate instant withdrawal
    setTimeout(() => {
      toast.success(`$${balance.toFixed(2)} withdrawn instantly to your account!`)
      setBalance(0)
      setIsWithdrawing(false)
    }, 1500)
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent via-accent/90 to-orange-500 p-8 shadow-2xl border border-accent/30"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-foreground/5 rounded-full -ml-20 -mb-20 blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-accent-foreground/20 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="text-sm font-bold text-accent-foreground uppercase tracking-widest">ZERO BROKE DAYS</span>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <p className="text-accent-foreground/80 text-sm font-semibold uppercase tracking-wide mb-2">
              Ready to Withdraw
            </p>
            <h2 className="text-5xl font-bold text-accent-foreground mb-1">${balance.toFixed(2)}</h2>
            <p className="text-accent-foreground/90 text-sm flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Earned from completed tasks
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-3 p-4 bg-accent-foreground/10 rounded-xl backdrop-blur-sm border border-accent-foreground/10">
            <Clock className="w-5 h-5 text-accent-foreground" />
            <div>
              <p className="text-xs font-semibold text-accent-foreground/80 uppercase tracking-wide">
                {balance > 0 ? 'Instant Withdrawal' : 'Next Task Available'}
              </p>
              <p className="text-lg font-bold text-accent-foreground">
                {balance > 0 ? 'Available Now' : `${countdown}s`}
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleWithdraw}
            disabled={balance <= 0 || isWithdrawing}
            className={`
              w-full group flex items-center justify-center gap-2 px-6 py-4 
              bg-accent-foreground text-accent rounded-xl font-bold 
              transition-all duration-300 hover:shadow-xl transform
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isHovering && balance > 0 ? "scale-105" : "scale-100"}
            `}
          >
            <span>
              {isWithdrawing ? 'Processing...' : balance > 0 ? 'Withdraw Now' : 'Complete Tasks to Earn'}
            </span>
            {balance > 0 && !isWithdrawing && (
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
