import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { EarningsChart } from "@/components/earnings-chart"
import { PayoutHistory } from "@/components/payout-history"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, TrendingUp, Target } from "lucide-react"
import Link from "next/link"

export default async function EarningsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user data
  const { data: userData } = await supabase.from("users").select("*").eq("id", user.id).single()

  // Get payouts for analytics
  const { data: payouts } = await supabase
    .from("payouts")
    .select("*")
    .eq("worker_id", user.id)
    .order("created_at", { ascending: false })

  // Calculate stats
  const totalEarned =
    payouts?.filter((p) => p.status === "completed").reduce((sum, p) => sum + Number(p.amount), 0) || 0

  const pendingPayout =
    payouts?.filter((p) => p.status === "pending").reduce((sum, p) => sum + Number(p.amount), 0) || 0

  const processingPayout =
    payouts?.filter((p) => p.status === "processing").reduce((sum, p) => sum + Number(p.amount), 0) || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Earnings & Payouts</h1>
        <p className="text-muted-foreground mb-8">Track your earnings and manage withdrawals</p>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Total Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">${totalEarned.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Instant Pay Ready
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-accent">${pendingPayout.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-2">Available in 60 seconds</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-500">${processingPayout.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-2">In your account soon</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts and Analytics */}
          <div className="lg:col-span-2">
            <EarningsChart payouts={payouts || []} />
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payout Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {userData?.bank_account_id ? (
                  <>
                    <p className="text-sm text-muted-foreground">
                      Bank account ending in <span className="font-semibold">****</span>
                    </p>
                    <Link href="/payout-settings">
                      <Button variant="outline" className="w-full bg-transparent">
                        Update Method
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground">No payout method set up yet</p>
                    <Link href="/payout-settings">
                      <Button className="w-full">Add Bank Account</Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Instant Payout</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">Get paid up to 60 seconds after task verification</p>
                <Button disabled={pendingPayout === 0} className="w-full">
                  Withdraw ${pendingPayout.toFixed(2)}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Payout History */}
        <div className="mt-8">
          <PayoutHistory payouts={payouts || []} />
        </div>
      </div>
    </div>
  )
}
