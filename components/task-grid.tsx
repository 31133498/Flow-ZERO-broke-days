"use client"

import { TrendingUp } from "lucide-react"
import { TaskCard } from "./task-card"
import { TaskFilters, type FilterState } from "./task-filters"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface Task {
  id: string
  title: string
  description: string
  reward: number
  time_estimate: string
  location: string
  tags: string[]
  difficulty: string
  completed_count: number
}

export function TaskGrid() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    difficulty: "all",
    location: "all",
    sortBy: "reward",
  })

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true)
      try {
        const params = new URLSearchParams()
        if (filters.difficulty !== "all") params.append("difficulty", filters.difficulty)
        if (filters.location !== "all") params.append("location", filters.location)
        params.append("sortBy", filters.sortBy)

        const response = await fetch(`/api/tasks?${params.toString()}`)
        const data = await response.json()
        setTasks(data.tasks || [])
      } catch (error) {
        console.error("Error fetching tasks:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [filters])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground">Available Tasks</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="w-4 h-4" />
          Top Earner Tasks
        </div>
      </div>

      <TaskFilters onFilterChange={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
          ))
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={{
                ...task,
                timeEstimate: task.time_estimate,
              }}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-12 text-muted-foreground">
            <p>No tasks available with these filters. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
