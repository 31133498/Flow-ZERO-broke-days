import { NextResponse, type NextRequest } from "next/server"
import { DummyDataStore } from "@/lib/dummy-data"

export async function POST(request: NextRequest) {
  try {
    const { taskId, submissionData, proofMediaUrl } = await request.json()

    if (!taskId || !submissionData) {
      return NextResponse.json({ error: "Task ID and submission data are required" }, { status: 400 })
    }

    // For demo purposes, use worker-1 as the current user
    const workerId = 'worker-1'

    // Submit the task
    const submission = DummyDataStore.submitTask(taskId, workerId, submissionData, proofMediaUrl || [])
    
    return NextResponse.json({ submission })
  } catch (error) {
    console.error("Error submitting task:", error)
    return NextResponse.json({ error: "Failed to submit task" }, { status: 500 })
  }
}
