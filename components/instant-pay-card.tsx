"use client"

import { ChevronRight, Zap, Clock } from "lucide-react"
import { useState } from "react"

export function InstantPayCard() {
  const [isHovering, setIsHovering] = useState(false)

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
            <h2 className="text-5xl font-bold text-accent-foreground mb-1">¥1,847.50</h2>
            <p className="text-accent-foreground/90 text-sm">Completed Tasks This Week</p>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-3 p-4 bg-accent-foreground/10 rounded-xl backdrop-blur-sm border border-accent-foreground/10">
            <Clock className="w-5 h-5 text-accent-foreground" />
            <div>
              <p className="text-xs font-semibold text-accent-foreground/80 uppercase tracking-wide">Next Payment</p>
              <p className="text-lg font-bold text-accent-foreground">60 Seconds</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            className={`
              w-full group flex items-center justify-center gap-2 px-6 py-4 
              bg-accent-foreground text-accent rounded-xl font-bold 
              transition-all duration-300 hover:shadow-xl transform
              ${isHovering ? "scale-105" : "scale-100"}
            `}
          >
            <span>Withdraw Now</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}
