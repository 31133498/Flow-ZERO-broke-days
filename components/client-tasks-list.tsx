"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Pause, Trash2 } from "lucide-react"
import Link from "next/link"

interface Task {
  id: string
  title: string
  description: string
  reward: number
  time_estimate: string
  location: string
  difficulty: string
  completed_count: number
  status: string
  created_at: string
}

export function ClientTasksList({ tasks }: { tasks: Task[] }) {
  const activeTasks = tasks.filter((t) => t.status === "active")
  const pausedTasks = tasks.filter((t) => t.status === "paused")
  const completedTasks = tasks.filter((t) => t.status === "completed")

  return (
    <Tabs defaultValue="active" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="active">Active ({activeTasks.length})</TabsTrigger>
        <TabsTrigger value="paused">Paused ({pausedTasks.length})</TabsTrigger>
        <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="space-y-3">
        {activeTasks.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              <p>No active tasks. Start by posting one!</p>
            </CardContent>
          </Card>
        ) : (
          activeTasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </TabsContent>

      <TabsContent value="paused" className="space-y-3">
        {pausedTasks.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              <p>No paused tasks.</p>
            </CardContent>
          </Card>
        ) : (
          pausedTasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </TabsContent>

      <TabsContent value="completed" className="space-y-3">
        {completedTasks.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              <p>No completed tasks yet.</p>
            </CardContent>
          </Card>
        ) : (
          completedTasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </TabsContent>
    </Tabs>
  )
}

function TaskCard({ task }: { task: Task }) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="mb-2">{task.title}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
          </div>
          <Badge className={getDifficultyColor(task.difficulty)}>{task.difficulty}</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Reward</p>
            <p className="text-lg font-bold text-primary">${task.reward.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="text-lg font-bold">{task.time_estimate}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Completions</p>
            <p className="text-lg font-bold text-accent">{task.completed_count}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/client/tasks/${task.id}`} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
