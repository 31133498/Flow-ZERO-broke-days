import { NextResponse, type NextRequest } from "next/server"
import { DummyDataStore } from "@/lib/dummy-data"

export async function POST(request: NextRequest) {
  try {
    const { submissionId, approved, rejectionReason } = await request.json()

    if (!submissionId || approved === undefined) {
      return NextResponse.json({ error: "Submission ID and approval status are required" }, { status: 400 })
    }

    // Verify the submission
    const submission = DummyDataStore.verifySubmission(submissionId, approved, rejectionReason)
    
    if (!submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 })
    }

    const message = approved 
      ? "Submission approved and instant payout initiated" 
      : "Submission rejected"
    
    return NextResponse.json({ success: true, message, submission })
  } catch (error) {
    console.error("Error verifying submission:", error)
    return NextResponse.json({ error: "Failed to verify submission" }, { status: 500 })
  }
}
