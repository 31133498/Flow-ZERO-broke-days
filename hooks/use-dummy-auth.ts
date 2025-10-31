"use client"

import { useEffect, useState } from "react"

export interface DummyUser {
  id: string
  email: string
  name: string
  type: "worker" | "client"
  avatar: string
}

const DUMMY_USERS = {
  worker: {
    id: "worker-1",
    email: "worker@example.com",
    name: "Alex Chen",
    type: "worker" as const,
    avatar: "AC",
  },
  client: {
    id: "client-1",
    email: "client@example.com",
    name: "Jordan Miller",
    type: "client" as const,
    avatar: "JM",
  },
}

export function useDummyAuth() {
  const [user, setUser] = useState<DummyUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate auth check from localStorage
    const storedUser = localStorage.getItem("flow_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (type: "worker" | "client") => {
    const user = DUMMY_USERS[type]
    localStorage.setItem("flow_user", JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem("flow_user")
    setUser(null)
  }

  return { user, isLoading, login, logout }
}
