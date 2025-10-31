"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LandingPage } from "@/components/landing-page"
import { useDummyAuth } from "@/hooks/use-dummy-auth"

export default function Home() {
  const router = useRouter()
  const { user, isLoading } = useDummyAuth()

  useEffect(() => {
    if (!isLoading && user) {
      const targetPath = user.type === 'client' ? '/client/dashboard' : '/dashboard'
      router.push(targetPath)
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading Flow...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return null
  }

  return <LandingPage />
}
