import { NextResponse, type NextRequest } from "next/server"
import { DummyDataStore } from "@/lib/dummy-data"

export async function POST(request: NextRequest) {
  try {
    const { taskId } = await request.json()

    if (!taskId) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 })
    }

    // For demo purposes, use worker-1 as the current user
    const workerId = 'worker-1'

    // Check if task exists and is active
    const task = DummyDataStore.getTask(taskId)
    if (!task || task.status !== 'active') {
      return NextResponse.json({ error: "Task not found or not active" }, { status: 404 })
    }

    // Claim the task
    const result = DummyDataStore.claimTask(taskId, workerId)
    
    return NextResponse.json({ success: true, message: result.message })
  } catch (error) {
    console.error("Error claiming task:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
