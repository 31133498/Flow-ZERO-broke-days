import { createClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { taskId } = await request.json()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create task submission record
    const { data, error } = await supabase.from("task_submissions").insert({
      task_id: taskId,
      worker_id: user.id,
      status: "submitted",
    })

    if (error) throw error

    return NextResponse.json({ submission: data })
  } catch (error) {
    console.error("Error claiming task:", error)
    return NextResponse.json({ error: "Failed to claim task" }, { status: 500 })
  }
}
