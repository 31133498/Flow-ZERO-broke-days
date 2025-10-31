"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, DollarSign, Clock, CheckCircle, ArrowLeft } from "lucide-react"
import { TopNav } from "./top-nav"
import Link from "next/link"
import { DummyDataStore } from "@/lib/dummy-data"

export function EarningsDashboard() {
  const [earnings, setEarnings] = useState<any>(null)
  const [submissions, setSubmissions] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const earningsRes = await fetch('/api/user/earnings')
        const earningsData = await earningsRes.json()
        
        // Get user submissions and tasks for history
        const userSubmissions = DummyDataStore.getSubmissions('worker-1')
        const allTasks = DummyDataStore.getTasks()
        
        setEarnings(earningsData)
        setSubmissions(userSubmissions)
        setTasks(allTasks)
      } catch (error) {
        console.error('Error fetching earnings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <TopNav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading earnings...</p>
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
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Your Earnings</h1>
          <p className="text-muted-foreground">Track your income and payment history</p>
        </div>

        {/* Earnings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{earnings?.today || '$0.00'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{earnings?.week || '$0.00'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{earnings?.month || '$0.00'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Tasks Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{earnings?.completedTasks || 0}</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500 mb-2">
                {earnings?.successRate || 0}%
              </div>
              <p className="text-sm text-muted-foreground">
                Tasks approved on first submission
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Average Task Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">
                {earnings?.avgTaskTime || 0} min
              </div>
              <p className="text-sm text-muted-foreground">
                Time per completed task
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hourly Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent mb-2">
                $24.50
              </div>
              <p className="text-sm text-muted-foreground">
                Based on average completion time
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Submissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submissions.length > 0 ? (
              <div className="space-y-4">
                {submissions.map((submission) => {
                  const task = tasks.find(t => t.id === submission.task_id)
                  return (
                    <div key={submission.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">
                          {task?.title || 'Unknown Task'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Submitted: {new Date(submission.submitted_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground">
                          ${task?.reward?.toFixed(2) || '0.00'}
                        </span>
                        <Badge 
                          variant={
                            submission.status === 'verified' ? 'default' : 
                            submission.status === 'submitted' ? 'secondary' : 
                            'destructive'
                          }
                        >
                          {submission.status === 'verified' ? 'Paid' : 
                           submission.status === 'submitted' ? 'Pending' : 
                           'Rejected'}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No submissions yet. Start completing tasks to see your earnings history!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}