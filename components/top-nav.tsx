import { Bell, Settings, User } from "lucide-react"

export function TopNav() {
  return (
    <div className="border-b border-border bg-card sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-end gap-4">
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <User className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
