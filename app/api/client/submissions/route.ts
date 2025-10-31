import { NextResponse } from "next/server"
import { DummyDataStore } from "@/lib/dummy-data"

export async function GET() {
  try {
    // For demo purposes, use client-1 as the current user
    const clientId = 'client-1'

    const submissions = DummyDataStore.getSubmissions(undefined, clientId)
    
    return NextResponse.json({ submissions })
  } catch (error) {
    console.error("Error fetching submissions:", error)
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}