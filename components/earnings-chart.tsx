"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Payout {
  id: string
  amount: number
  status: string
  created_at: string
}

export function EarningsChart({ payouts }: { payouts: Payout[] }) {
  // Group earnings by day
  const chartData = payouts
    .filter((p) => p.status === "completed")
    .reduce(
      (acc, payout) => {
        const date = new Date(payout.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })

        const existing = acc.find((item) => item.date === date)
        if (existing) {
          existing.earnings += Number(payout.amount)
        } else {
          acc.push({ date, earnings: Number(payout.amount) })
        }
        return acc
      },
      [] as Array<{ date: string; earnings: number }>,
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30) // Last 30 days

  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Daily Earnings"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
