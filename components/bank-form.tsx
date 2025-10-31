"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function BankForm({ existingAccountId }: { existingAccountId?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    accountHolder: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "checking",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("Not authenticated")

      // Save bank account info (in production, use Stripe or another payment processor)
      const { error } = await supabase
        .from("users")
        .update({
          bank_account_id: `${formData.accountNumber.slice(-4)}-${Date.now()}`,
        })
        .eq("id", user.id)

      if (error) throw error

      toast.success("Bank account saved successfully")
      router.push("/earnings")
    } catch (error) {
      console.error("Error saving bank account:", error)
      toast.error("Failed to save bank account")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="accountHolder">Account Holder Name</Label>
        <Input
          id="accountHolder"
          name="accountHolder"
          placeholder="John Doe"
          value={formData.accountHolder}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="accountNumber">Account Number</Label>
        <Input
          id="accountNumber"
          name="accountNumber"
          placeholder="1234567890"
          value={formData.accountNumber}
          onChange={handleChange}
          type="password"
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="routingNumber">Routing Number</Label>
        <Input
          id="routingNumber"
          name="routingNumber"
          placeholder="021000021"
          value={formData.routingNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="accountType">Account Type</Label>
        <select
          id="accountType"
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border rounded-md"
        >
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
        </select>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Saving..." : "Save Bank Account"}
      </Button>
    </form>
  )
}
