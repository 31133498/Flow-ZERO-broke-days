"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { FlowDashboard } from "@/components/flow-dashboard"
import { useDummyAuth } from "@/hooks/use-dummy-auth"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useDummyAuth()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/")
      } else if (user.type === 'client') {
        router.push("/client/dashboard")
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.type !== 'worker') {
    return null
  }

  return <FlowDashboard />
}
