"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { toast } from "sonner"

interface Submission {
  id: string
  task_id: string
  worker_id: string
  status: string
  submission_data: Record<string, any>
  proof_media_url: string[]
  submitted_at: string
  tasks: {
    title: string
    reward: number
    client_id: string
  }
  profiles: {
    display_name: string
  }
}

export function SubmissionsList({ submissions }: { submissions: Submission[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isVerifying, setIsVerifying] = useState<{ id: string; type: "approve" | "reject" } | null>(null)

  const handleVerify = async (submissionId: string, approved: boolean) => {
    setIsVerifying({ id: submissionId, type: approved ? "approve" : "reject" })
  }

  const confirmVerification = async (submissionId: string, approved: boolean) => {
    try {
      const response = await fetch("/api/submissions/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          approved,
          rejectionReason: approved ? undefined : rejectionReason,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to verify submission")
      }

      toast.success(approved ? "Submission approved! Payment initiated." : "Submission rejected.")
      setIsVerifying(null)
      setRejectionReason("")
      // Refresh page or update state
      window.location.reload()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to verify")
    }
  }

  const pendingSubmissions = submissions.filter((s) => s.status === "submitted")
  const verifiedSubmissions = submissions.filter((s) => s.status === "verified")
  const rejectedSubmissions = submissions.filter((s) => s.status === "rejected")

  return (
    <div className="space-y-6">
      {/* Pending Submissions */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          Pending Review ({pendingSubmissions.length})
        </h2>
        <div className="space-y-3">
          {pendingSubmissions.length === 0 ? (
            <p className="text-muted-foreground">No pending submissions.</p>
          ) : (
            pendingSubmissions.map((submission) => (
              <SubmissionCard
                key={submission.id}
                submission={submission}
                isExpanded={expandedId === submission.id}
                onToggleExpand={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
                onApprove={() => handleVerify(submission.id, true)}
                onReject={() => handleVerify(submission.id, false)}
              />
            ))
          )}
        </div>
      </section>

      {/* Verified Submissions */}
      {verifiedSubmissions.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Approved ({verifiedSubmissions.length})
          </h2>
          <div className="space-y-2">
            {verifiedSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-100">{submission.tasks.title}</p>
                    <p className="text-sm text-green-800 dark:text-green-200">{submission.profiles.display_name}</p>
                  </div>
                  <Badge variant="default" className="bg-green-600">
                    Paid
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Rejected Submissions */}
      {rejectedSubmissions.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5 text-destructive" />
            Rejected ({rejectedSubmissions.length})
          </h2>
          <div className="space-y-2">
            {rejectedSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-3"
              >
                <p className="font-semibold text-red-900 dark:text-red-100">{submission.tasks.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Verification Dialog */}
      {isVerifying && (
        <AlertDialog open={true} onOpenChange={() => setIsVerifying(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {isVerifying.type === "approve" ? "Approve Submission?" : "Reject Submission?"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {isVerifying.type === "approve"
                  ? "This will approve the submission and immediately initiate payment."
                  : "Provide a reason for rejection (worker will be notified)."}
              </AlertDialogDescription>
            </AlertDialogHeader>

            {isVerifying.type === "reject" && (
              <Textarea
                placeholder="Reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="mb-4"
              />
            )}

            <div className="flex gap-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => confirmVerification(isVerifying.id, isVerifying.type === "approve")}
                className={isVerifying.type === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-destructive"}
              >
                {isVerifying.type === "approve" ? "Approve & Pay" : "Reject"}
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}

function SubmissionCard({
  submission,
  isExpanded,
  onToggleExpand,
  onApprove,
  onReject,
}: {
  submission: Submission
  isExpanded: boolean
  onToggleExpand: () => void
  onApprove: () => void
  onReject: () => void
}) {
  return (
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggleExpand}>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{submission.tasks.title}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Worker: {submission.profiles.display_name} • Reward: ${submission.tasks.reward.toFixed(2)}
            </p>
          </div>
          <Badge variant="outline" className="ml-2">
            {isExpanded ? "Hide Details" : "Show Details"}
          </Badge>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Submission Details</h4>
            <p className="text-sm text-foreground bg-muted p-3 rounded">
              {submission.submission_data?.description || "No description"}
            </p>
          </div>

          {submission.proof_media_url && submission.proof_media_url.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Proof of Work</h4>
              <div className="grid grid-cols-2 gap-2">
                {submission.proof_media_url.map((url, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm underline"
                  >
                    File {idx + 1}
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onReject} className="flex-1 bg-transparent">
              Reject
            </Button>
            <Button onClick={onApprove} className="flex-1 bg-green-600 hover:bg-green-700">
              Approve & Pay
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
