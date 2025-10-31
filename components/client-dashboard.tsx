"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, CheckCircle, Plus, Eye, Clock, DollarSign } from "lucide-react"
import { TopNav } from "./top-nav"
import Link from "next/link"

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
  status: string
  created_at: string
}

interface Submission {
  id: string
  task_id: string
  worker_id: string
  status: string
  submission_data: any
  submitted_at: string
}

export function ClientDashboard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, submissionsRes] = await Promise.all([
          fetch('/api/client/tasks'),
          fetch('/api/client/submissions')
        ])
        
        const tasksData = await tasksRes.json()
        const submissionsData = await submissionsRes.json()
        
        setTasks(tasksData.tasks || [])
        setSubmissions(submissionsData.submissions || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const pendingSubmissions = submissions.filter(s => s.status === 'submitted')
  const verifiedSubmissions = submissions.filter(s => s.status === 'verified')
  const totalSpent = verifiedSubmissions.reduce((sum, sub) => {
    const task = tasks.find(t => t.id === sub.task_id)
    return sum + (task?.reward || 0)
  }, 0)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <TopNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <TopNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Client Dashboard</h1>
          <p className="text-muted-foreground">Manage your tasks and review worker submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Active Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{tasks.filter(t => t.status === 'active').length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{pendingSubmissions.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{verifiedSubmissions.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                Total Spent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link href="/client/post-task">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-dashed border-primary/30 hover:border-primary/60">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  Post New Task
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Create a new task for workers to complete
                </p>
                <Button className="w-full">
                  Create Task
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/client/submissions">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-accent" />
                  Review Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {pendingSubmissions.length} submissions awaiting your review
                </p>
                <Button variant="outline" className="w-full">
                  Review Now
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Your Recent Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length > 0 ? (
              <div className="space-y-4">
                {tasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{task.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{task.difficulty}</Badge>
                        <Badge variant="secondary">${task.reward}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {task.completed_count} completions
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={task.status === 'active' ? 'default' : 'secondary'}
                      >
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No tasks created yet. Start by posting your first task!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}