"use client"

import { MapPin, Clock, Users } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Task {
  id: string
  title: string
  description: string
  reward: number
  timeEstimate: string
  location: string
  tags: string[]
  difficulty: string
  completedCount: number
}

export function TaskCard({ task }: { task: Task }) {
  const [isHovering, setIsHovering] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleStartTask = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/tasks/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId: task.id }),
      })

      if (!response.ok) {
        throw new Error("Failed to claim task")
      }

      toast.success("Task claimed! Redirecting to submission...")
      router.push(`/tasks/${task.id}/submit`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to claim task")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`
        group relative bg-card rounded-lg border border-border p-4 
        transition-all duration-300 cursor-pointer
        hover:shadow-lg hover:border-primary/30
        ${isHovering ? "translate-y-[-4px]" : ""}
      `}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Difficulty Indicator */}
      <div className="absolute top-4 right-4">
        <span
          className={`
          text-xs font-semibold px-2 py-1 rounded-full
          ${task.difficulty === "Easy" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200" : task.difficulty === "Medium" ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200" : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"}
        `}
        >
          {task.difficulty}
        </span>
      </div>

      <h4 className="font-semibold text-foreground mb-2 pr-16">{task.title}</h4>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>

      {/* Tags */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {task.tags.map((tag) => (
          <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-3 gap-3 mb-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{task.timeEstimate}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{task.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{task.completedCount.toLocaleString()}</span>
        </div>
      </div>

      {/* Reward & CTA */}
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">${task.reward.toFixed(2)}</div>
        <button
          onClick={handleStartTask}
          disabled={isLoading}
          className="
            px-4 py-2 bg-primary text-primary-foreground rounded-full 
            text-sm font-semibold transition-all duration-300
            hover:shadow-md group-hover:shadow-lg
            group-hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isLoading ? "Claiming..." : "Start Now"}
        </button>
      </div>
    </div>
  )
}
