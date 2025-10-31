"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CreditCard, Shield, Zap } from "lucide-react"
import { TopNav } from "./top-nav"
import { toast } from "sonner"
import Link from "next/link"

export function PayoutSettingsForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    accountNumber: "",
    routingNumber: "",
    accountHolderName: "",
    bankName: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast.success("Bank account added successfully! You can now receive instant payments.")
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <TopNav />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Payout Settings</h1>
          <p className="text-muted-foreground">Set up your bank account for instant 60-second payments</p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Zap className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold mb-1">60-Second Payouts</h3>
              <p className="text-xs text-muted-foreground">Get paid instantly after task approval</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Bank-Level Security</h3>
              <p className="text-xs text-muted-foreground">Your information is encrypted and secure</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <CreditCard className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Zero Fees</h3>
              <p className="text-xs text-muted-foreground">Keep 100% of your earnings</p>
            </CardContent>
          </Card>
        </div>

        {/* Bank Account Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Add Bank Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="accountHolderName">Account Holder Name</Label>
                <Input
                  id="accountHolderName"
                  name="accountHolderName"
                  placeholder="Full name as it appears on your account"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  name="bankName"
                  placeholder="e.g., Chase, Bank of America, Wells Fargo"
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input
                    id="routingNumber"
                    name="routingNumber"
                    placeholder="9-digit routing number"
                    value={formData.routingNumber}
                    onChange={handleChange}
                    maxLength={9}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    placeholder="Your account number"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Your Security is Our Priority</h4>
                    <p className="text-xs text-muted-foreground">
                      All banking information is encrypted with bank-level security. We never store your full account details 
                      and use secure third-party processors for all transactions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => window.history.back()} 
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="flex-1"
                >
                  {isLoading ? "Adding Account..." : "Add Bank Account"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">How Instant Payouts Work</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <div>
                <p className="font-semibold">Complete a Task</p>
                <p className="text-muted-foreground">Submit your work with proof of completion</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <div>
                <p className="font-semibold">Client Approves</p>
                <p className="text-muted-foreground">Client reviews and approves your submission</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <div>
                <p className="font-semibold">Instant Payment</p>
                <p className="text-muted-foreground">Money hits your account within 60 seconds</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}