import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ClientTasksList } from "@/components/client-tasks-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function ClientTasksPage() {
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

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("client_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Tasks</h1>
            <p className="text-muted-foreground">Manage all your posted tasks</p>
          </div>
          <Link href="/client/post-task">
            <Button>Post New Task</Button>
          </Link>
        </div>

        <ClientTasksList tasks={tasks || []} />
      </div>
    </div>
  )
}
