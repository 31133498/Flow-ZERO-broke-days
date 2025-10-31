"use client"

import { TrendingUp, Award, Target } from "lucide-react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function EarningsPanel() {
  const { data, isLoading } = useSWR("/api/user/earnings", fetcher, { revalidateOnFocus: false })

  const stats = [
    { label: "Today", value: data?.today || "$0.00", icon: TrendingUp, color: "text-primary" },
    { label: "This Week", value: data?.week || "$0.00", icon: Award, color: "text-accent" },
    { label: "This Month", value: data?.month || "$0.00", icon: Target, color: "text-green-500" },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-foreground mb-4">Your Earnings</h3>

      {/* Earnings Stats */}
      <div className="space-y-3">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground">{isLoading ? "..." : stat.value}</div>
            </div>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4 mt-6">
        <h4 className="font-semibold text-foreground mb-3">Quick Stats</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tasks Completed</span>
            <span className="font-semibold text-foreground">{data?.completedTasks || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Success Rate</span>
            <span className="font-semibold text-foreground">{data?.successRate || "0"}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Avg. Task Time</span>
            <span className="font-semibold text-foreground">{data?.avgTaskTime || "0"} min</span>
          </div>
        </div>
      </div>

      {/* Payout Settings */}
      <button className="w-full mt-6 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-md transition-all">
        Payout Settings
      </button>
    </div>
  )
}
