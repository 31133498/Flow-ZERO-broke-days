import { createClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { submissionId, approved, rejectionReason } = await request.json()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get submission to verify it's for user's task
    const { data: submission, error: fetchError } = await supabase
      .from("task_submissions")
      .select("*, tasks(client_id, reward)")
      .eq("id", submissionId)
      .single()

    if (fetchError || !submission) {
      throw new Error("Submission not found")
    }

    const task = submission.tasks as any
    if (task.client_id !== user.id) {
      return NextResponse.json({ error: "Not authorized to verify this submission" }, { status: 403 })
    }

    if (approved) {
      // Mark as verified and create payout
      const { error: updateError } = await supabase
        .from("task_submissions")
        .update({
          status: "verified",
          verified_at: new Date().toISOString(),
        })
        .eq("id", submissionId)

      if (updateError) throw updateError

      // Create instant payout record (60-second withdrawal)
      const { error: payoutError } = await supabase.from("payouts").insert({
        worker_id: submission.worker_id,
        task_submission_id: submissionId,
        amount: task.reward,
        status: "pending",
      })

      if (payoutError) throw payoutError

      return NextResponse.json({ success: true, message: "Submission approved and instant payout initiated" })
    } else {
      // Reject submission
      const { error: updateError } = await supabase
        .from("task_submissions")
        .update({
          status: "rejected",
          rejection_reason: rejectionReason,
        })
        .eq("id", submissionId)

      if (updateError) throw updateError

      return NextResponse.json({ success: true, message: "Submission rejected" })
    }
  } catch (error) {
    console.error("Error verifying submission:", error)
    return NextResponse.json({ error: "Failed to verify submission" }, { status: 500 })
  }
}
