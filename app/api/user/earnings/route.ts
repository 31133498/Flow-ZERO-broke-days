import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user earnings data
    const { data: payouts, error: payoutError } = await supabase.from("payouts").select("*").eq("worker_id", user.id)

    if (payoutError) throw payoutError

    // Calculate earnings by time period
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getFullYear(), now.getMonth(), 1)

    const todayEarnings = payouts
      .filter((p) => new Date(p.created_at) >= today && p.status === "completed")
      .reduce((sum, p) => sum + Number(p.amount), 0)

    const weekEarnings = payouts
      .filter((p) => new Date(p.created_at) >= weekAgo && p.status === "completed")
      .reduce((sum, p) => sum + Number(p.amount), 0)

    const monthEarnings = payouts
      .filter((p) => new Date(p.created_at) >= monthAgo && p.status === "completed")
      .reduce((sum, p) => sum + Number(p.amount), 0)

    // Get task submissions for stats
    const { data: submissions, error: submissionError } = await supabase
      .from("task_submissions")
      .select("*")
      .eq("worker_id", user.id)

    if (submissionError) throw submissionError

    const completedCount = submissions.filter((s) => s.status === "verified").length
    const successRate = submissions.length > 0 ? Math.round((completedCount / submissions.length) * 100) : 0

    return NextResponse.json({
      today: `$${todayEarnings.toFixed(2)}`,
      week: `$${weekEarnings.toFixed(2)}`,
      month: `$${monthEarnings.toFixed(2)}`,
      completedTasks: completedCount,
      successRate,
      avgTaskTime: "24",
    })
  } catch (error) {
    console.error("Error fetching earnings:", error)
    return NextResponse.json({ error: "Failed to fetch earnings" }, { status: 500 })
  }
}
