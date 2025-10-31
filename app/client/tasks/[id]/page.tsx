import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function TaskDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: task } = await supabase.from("tasks").select("*").eq("id", params.id).single()

  if (!task || task.client_id !== user.id) {
    redirect("/client/tasks")
  }

  // Get submissions for this task
  const { data: submissions } = await supabase
    .from("task_submissions")
    .select("*")
    .eq("task_id", task.id)
    .order("submitted_at", { ascending: false })

  const pendingCount = submissions?.filter((s) => s.status === "submitted").length || 0
  const verifiedCount = submissions?.filter((s) => s.status === "verified").length || 0
  const rejectedCount = submissions?.filter((s) => s.status === "rejected").length || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/client/tasks">
          <Button variant="outline" size="sm" className="mb-6 bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tasks
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Details */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{task.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{task.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                    <Badge className="mt-1">{task.difficulty}</Badge>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-semibold text-sm mt-1">{task.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="font-semibold text-sm mt-1">{task.time_estimate}</p>
                  </div>
                </div>

                {task.tags && task.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Task Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Reward</p>
                  <p className="text-2xl font-bold text-primary">${task.reward.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Completions</p>
                  <p className="text-2xl font-bold text-accent">{task.completed_count}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Posted</p>
                  <p className="text-sm font-semibold">{new Date(task.created_at).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Submissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Verified</p>
                  <p className="text-2xl font-bold text-green-600">{verifiedCount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
                </div>
              </CardContent>
            </Card>

            <Link href="/client/submissions">
              <Button className="w-full">Review Submissions</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
