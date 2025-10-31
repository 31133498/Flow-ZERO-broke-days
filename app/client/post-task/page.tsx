import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PostTaskForm } from "@/components/post-task-form"

export default async function PostTaskPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: userData } = await supabase.from("users").select("account_type").eq("id", user.id).single()

  if (userData?.account_type !== "client") {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Post a New Task</h1>
        <p className="text-muted-foreground mb-8">Create a task for Flow workers to complete</p>

        <Card>
          <CardHeader>
            <CardTitle>Task Details</CardTitle>
            <CardDescription>
              Provide all the information workers need to understand and complete your task
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PostTaskForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
