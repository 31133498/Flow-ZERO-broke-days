import { NextResponse } from "next/server"
import { DummyDataStore } from "@/lib/dummy-data"

export async function GET() {
  try {
    // For demo purposes, use worker-1 as the current user
    const workerId = 'worker-1'

    const earnings = DummyDataStore.getUserEarnings(workerId)
    
    return NextResponse.json(earnings)
  } catch (error) {
    console.error("Error fetching earnings:", error)
    return NextResponse.json({ error: "Failed to fetch earnings" }, { status: 500 })
  }
}
