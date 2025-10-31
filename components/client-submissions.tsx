"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Clock, Eye, ArrowLeft } from "lucide-react"
import { TopNav } from "./top-nav"
import { toast } from "sonner"
import Link from "next/link"
import { DummyDataStore } from "@/lib/dummy-data"

interface Submission {
  id: string
  task_id: string
  worker_id: string
  status: string
  submission_data: any
  proof_media_url: string[]
  submitted_at: string
}

interface Task {
  id: string
  title: string
  reward: number
}

export function ClientSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isVerifying, setIsVerifying] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [submissionsRes, tasksRes] = await Promise.all([
          fetch('/api/client/submissions'),
          fetch('/api/client/tasks')
        ])
        
        const submissionsData = await submissionsRes.json()
        const tasksData = await tasksRes.json()
        
        setSubmissions(submissionsData.submissions || [])
        setTasks(tasksData.tasks || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleVerify = async (submissionId: string, approved: boolean) => {
    setIsVerifying(submissionId)
    
    try {
      const response = await fetch('/api/submissions/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId,
          approved,
          rejectionReason: approved ? undefined : rejectionReason
        })
      })

      if (!response.ok) {
        throw new Error('Failed to verify submission')
      }

      const result = await response.json()
      toast.success(result.message)
      
      // Update local state
      setSubmissions(prev => prev.map(sub => 
        sub.id === submissionId 
          ? { ...sub, status: approved ? 'verified' : 'rejected' }
          : sub
      ))
      
      setRejectionReason("")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to verify')
    } finally {
      setIsVerifying(null)
    }
  }

  const getTaskInfo = (taskId: string) => {
    return tasks.find(t => t.id === taskId)
  }

  const pendingSubmissions = submissions.filter(s => s.status === 'submitted')
  const verifiedSubmissions = submissions.filter(s => s.status === 'verified')
  const rejectedSubmissions = submissions.filter(s => s.status === 'rejected')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <TopNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading submissions...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <TopNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/client/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Review Submissions</h1>
          <p className="text-muted-foreground">Review and approve worker submissions for instant payment</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{pendingSubmissions.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{verifiedSubmissions.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{rejectedSubmissions.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Submissions */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            Pending Review ({pendingSubmissions.length})
          </h2>
          
          {pendingSubmissions.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No pending submissions to review.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingSubmissions.map((submission) => {
                const task = getTaskInfo(submission.task_id)
                const isExpanded = expandedId === submission.id
                
                return (
                  <Card key={submission.id}>
                    <CardHeader 
                      className="cursor-pointer" 
                      onClick={() => setExpandedId(isExpanded ? null : submission.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{task?.title || 'Unknown Task'}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Worker ID: {submission.worker_id} • Reward: ${task?.reward?.toFixed(2) || '0.00'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Submitted: {new Date(submission.submitted_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            <Eye className="w-3 h-3 mr-1" />
                            {isExpanded ? 'Hide' : 'View'}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    {isExpanded && (
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Submission Details</h4>
                          <div className="bg-muted p-3 rounded">
                            <p className="text-sm">
                              {submission.submission_data?.description || 'No description provided'}
                            </p>
                          </div>
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
                                  className="text-primary text-sm underline hover:no-underline"
                                >
                                  📎 Attachment {idx + 1}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="border-t pt-4">
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <Textarea
                                placeholder="Rejection reason (if rejecting)..."
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                className="mb-2"
                                rows={2}
                              />
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              onClick={() => handleVerify(submission.id, false)}
                              disabled={isVerifying === submission.id}
                              className="flex-1"
                            >
                              {isVerifying === submission.id ? 'Processing...' : 'Reject'}
                            </Button>
                            <Button 
                              onClick={() => handleVerify(submission.id, true)}
                              disabled={isVerifying === submission.id}
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              {isVerifying === submission.id ? 'Processing...' : 'Approve & Pay'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          )}
        </section>

        {/* Completed Submissions */}
        {(verifiedSubmissions.length > 0 || rejectedSubmissions.length > 0) && (
          <section>
            <h2 className="text-xl font-bold mb-4">Completed Reviews</h2>
            
            <div className="space-y-3">
              {verifiedSubmissions.map((submission) => {
                const task = getTaskInfo(submission.task_id)
                return (
                  <div
                    key={submission.id}
                    className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-green-900 dark:text-green-100">
                          {task?.title || 'Unknown Task'}
                        </p>
                        <p className="text-sm text-green-800 dark:text-green-200">
                          Worker: {submission.worker_id} • ${task?.reward?.toFixed(2) || '0.00'} paid
                        </p>
                      </div>
                      <Badge className="bg-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                      </Badge>
                    </div>
                  </div>
                )
              })}

              {rejectedSubmissions.map((submission) => {
                const task = getTaskInfo(submission.task_id)
                return (
                  <div
                    key={submission.id}
                    className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-red-900 dark:text-red-100">
                          {task?.title || 'Unknown Task'}
                        </p>
                        <p className="text-sm text-red-800 dark:text-red-200">
                          Worker: {submission.worker_id}
                        </p>
                      </div>
                      <Badge variant="destructive">
                        <XCircle className="w-3 h-3 mr-1" />
                        Rejected
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}