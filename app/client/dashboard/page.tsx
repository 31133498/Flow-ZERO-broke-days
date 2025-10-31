import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

export default async function ClientDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user account type
  const { data: userData } = await supabase.from("users").select("account_type").eq("id", user.id).single()

  if (userData?.account_type !== "client") {
    redirect("/dashboard")
  }

  // Get client stats
  const { data: tasks } = await supabase.from("tasks").select("*").eq("client_id", user.id)

  const { data: submissions } = await supabase
    .from("task_submissions")
    .select("*")
    .in("task_id", tasks?.map((t) => t.id) || [])

  const pendingCount = submissions?.filter((s) => s.status === "submitted").length || 0
  const approvedCount = submissions?.filter((s) => s.status === "verified").length || 0
  const totalSpent = tasks?.reduce((sum, t) => sum + Number(t.reward) * t.completed_count, 0) || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Client Dashboard</h1>
          <p className="text-muted-foreground">Manage your tasks and verify worker submissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Active Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{tasks?.length || 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                Pending Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{pendingCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                Total Approved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{approvedCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/client/submissions">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  Review Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{pendingCount} submissions awaiting review</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Review Now
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/client/post-task">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Post New Task
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Create a new task for workers</p>
                <Button className="w-full">Post Task</Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
