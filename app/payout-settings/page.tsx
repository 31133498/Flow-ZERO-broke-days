import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BankForm } from "@/components/bank-form"

export default async function PayoutSettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: userData } = await supabase.from("users").select("bank_account_id").eq("id", user.id).single()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Payout Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle>Bank Account Information</CardTitle>
            <CardDescription>Add or update your bank account for instant payouts</CardDescription>
          </CardHeader>
          <CardContent>
            <BankForm existingAccountId={userData?.bank_account_id} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
