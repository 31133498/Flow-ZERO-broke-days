"use client"

import { useState } from "react"
import { InstantPayCard } from "./instant-pay-card"
import { TaskGrid } from "./task-grid"
import { EarningsPanel } from "./earnings-panel"
import { TopNav } from "./top-nav"

export function FlowDashboard() {
  const [activeTab, setActiveTab] = useState("tasks")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <TopNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-flow-slide">
          <InstantPayCard />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Tasks (Main) */}
          <div className="lg:col-span-2">
            <TaskGrid />
          </div>

          {/* Right: Earnings Sidebar */}
          <div>
            <EarningsPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
