"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Upload, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function TaskSubmitPage() {
  const router = useRouter()
  const params = useParams()
  const taskId = params.id as string

  const [submission, setSubmission] = useState("")
  const [proofFiles, setProofFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

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
      const supabase = createClient()

      // Upload proof files to Supabase Storage (mock implementation)
      const proofUrls: string[] = []
      if (proofFiles.length > 0) {
        setIsUploading(true)
        for (const file of proofFiles) {
          const fileName = `${taskId}-${Date.now()}-${file.name}`
          const { error: uploadError } = await supabase.storage.from("task-submissions").upload(fileName, file)

          if (uploadError) {
            console.error("Upload error:", uploadError)
          } else {
            const { data } = supabase.storage.from("task-submissions").getPublicUrl(fileName)
            proofUrls.push(data.publicUrl)
          }
        }
        setIsUploading(false)
      }

      // Update submission with proof and mark as ready for verification
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

      toast.success("Task submitted for verification!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Submission error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to submit task")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary" />
              Submit Your Work
            </CardTitle>
            <CardDescription>Upload proof and describe what you completed</CardDescription>
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
                <Button type="submit" disabled={isLoading || isUploading} className="flex-1">
                  {isLoading || isUploading ? "Submitting..." : "Submit for Verification"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
