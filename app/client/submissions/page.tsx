import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SubmissionsList } from "@/components/submissions-list"

export default async function ClientSubmissionsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user account type
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("account_type")
    .eq("id", user.id)
    .single()

  if (userError || userData?.account_type !== "client") {
    redirect("/dashboard")
  }

  // Get submissions for client's tasks
  const { data: submissions, error: submissionError } = await supabase
    .from("task_submissions")
    .select(
      `
      *,
      tasks(title, reward, client_id),
      profiles:users(display_name)
    `,
    )
    .eq("tasks.client_id", user.id)
    .order("submitted_at", { ascending: false })

  if (submissionError) {
    console.error("Error fetching submissions:", submissionError)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Verify Submissions</h1>
        <SubmissionsList submissions={submissions || []} />
      </div>
    </div>
  )
}
