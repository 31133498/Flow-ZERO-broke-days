"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, CheckCircle, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { DummyDataStore } from "@/lib/dummy-data"
import Link from "next/link"

export default function TaskSubmitPage() {
  const router = useRouter()
  const params = useParams()
  const taskId = params.id as string

  const [task, setTask] = useState<any>(null)
  const [submission, setSubmission] = useState("")
  const [proofFiles, setProofFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Get task details
    const taskData = DummyDataStore.getTask(taskId)
    if (taskData) {
      setTask(taskData)
    } else {
      toast.error("Task not found")
      router.push("/dashboard")
    }
  }, [taskId, router])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setProofFiles([...proofFiles, ...files])
    toast.success(`${files.length} file(s) uploaded`)
  }

  const handleRemoveFile = (index: number) => {
    setProofFiles(proofFiles.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock file upload URLs
      const proofUrls = proofFiles.map((file, index) => 
        `/uploads/${taskId}-${Date.now()}-${index}-${file.name}`
      )

      // Submit the task
      const response = await fetch("/api/tasks/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId,
          submissionData: { description: submission },
          proofMediaUrl: proofUrls,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit task")
      }

      toast.success("Task submitted for verification! You'll be paid within 60 seconds once approved.")
      router.push("/dashboard")
    } catch (error) {
      console.error("Submission error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to submit task")
    } finally {
      setIsLoading(false)
    }
  }

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading task...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{task.title}</CardTitle>
            <CardDescription>{task.description}</CardDescription>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>Reward: <strong className="text-primary">${task.reward}</strong></span>
              <span>Time: {task.time_estimate}</span>
              <span>Difficulty: {task.difficulty}</span>
            </div>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary" />
              Submit Your Work
            </CardTitle>
            <CardDescription>Upload proof and describe what you completed for instant payment</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Submission Details */}
              <div className="space-y-2">
                <Label htmlFor="submission">Work Description</Label>
                <Textarea
                  id="submission"
                  placeholder="Describe what you completed. Include any notes or details..."
                  value={submission}
                  onChange={(e) => setSubmission(e.target.value)}
                  required
                  rows={5}
                  className="resize-none"
                />
              </div>

              {/* Proof Upload */}
              <div className="space-y-3">
                <Label>Proof of Work (Photos/Documents)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="proofUpload"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <label htmlFor="proofUpload" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="font-semibold">Click to upload proof</span>
                    <span className="text-xs text-muted-foreground">PNG, JPG, PDF up to 10MB</span>
                  </label>
                </div>

                {/* Uploaded Files List */}
                {proofFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Uploaded Files:</p>
                    <div className="space-y-1">
                      {proofFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                          <span className="text-sm text-foreground truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="text-xs text-destructive hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Submitting..." : "Submit for Verification"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
