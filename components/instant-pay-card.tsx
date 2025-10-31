"use client"

import { ChevronRight, Zap } from "lucide-react"
import { useState } from "react"

export function InstantPayCard() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary via-primary to-blue-600 p-8 shadow-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mt-32 blur-3xl" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-accent/20 p-2 rounded-full">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm font-semibold text-primary-foreground uppercase tracking-wide">
              InstantPay Available
            </span>
          </div>

          <h2 className="text-4xl font-bold text-primary-foreground mb-2">$247.50</h2>

          <p className="text-primary-foreground/90 text-sm flex items-center gap-2">
            Available to withdraw <span className="font-semibold">60 seconds</span> after task completion
          </p>
        </div>

        {/* CTA Button */}
        <button
          className={`
            group flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground 
            rounded-full font-semibold transition-all duration-300 whitespace-nowrap
            hover:shadow-lg ${isHovering ? "translate-x-1" : ""}
          `}
        >
          Withdraw Now
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="absolute bottom-0 right-0 opacity-5">
        <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" />
          <path d="M 50 50 L 50 10" stroke="currentColor" strokeWidth="2" />
          <path d="M 50 50 L 85 45" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        </svg>
      </div>
    </div>
  )
}
