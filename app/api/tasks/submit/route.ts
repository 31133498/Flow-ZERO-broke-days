import { createClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { taskId, submissionData, proofMediaUrl } = await request.json()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Update submission with proof and mark as submitted
    const { data, error } = await supabase
      .from("task_submissions")
      .update({
        status: "submitted",
        submission_data: submissionData,
        proof_media_url: proofMediaUrl,
        submitted_at: new Date().toISOString(),
      })
      .eq("task_id", taskId)
      .eq("worker_id", user.id)
      .select()

    if (error) throw error

    return NextResponse.json({ submission: data })
  } catch (error) {
    console.error("Error submitting task:", error)
    return NextResponse.json({ error: "Failed to submit task" }, { status: 500 })
  }
}
