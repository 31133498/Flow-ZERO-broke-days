"use client"

import { Bell, Settings, User, LogOut, Briefcase } from "lucide-react"
import { useDummyAuth } from "@/hooks/use-dummy-auth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function TopNav() {
  const { user, logout } = useDummyAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const switchToClient = () => {
    router.push('/client/dashboard')
  }

  return (
    <div className="border-b border-border bg-card sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            ⚡
          </div>
          <div>
            <span className="text-lg font-bold text-foreground">FLOW</span>
            <p className="text-xs text-accent font-semibold">Zero Broke Days</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">
            Welcome, {user?.name}
          </span>
          
          {user?.type === 'worker' && (
            <Button
              size="sm"
              variant="outline"
              onClick={switchToClient}
              className="text-xs"
            >
              <Briefcase className="w-4 h-4 mr-1" />
              Client View
            </Button>
          )}
          
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
            <User className="w-5 h-5 text-muted-foreground" />
          </button>
          <button 
            onClick={handleLogout}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
