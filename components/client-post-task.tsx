"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PostTaskForm } from "@/components/post-task-form"
import { TopNav } from "@/components/top-nav"
import { ArrowLeft, Lightbulb, Users, Zap } from "lucide-react"
import Link from "next/link"

export function ClientPostTask() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <TopNav />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/client/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2 text-foreground">Post a New Task</h1>
          <p className="text-muted-foreground">Create a task for Flow workers to complete instantly</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Task Details</CardTitle>
                <CardDescription>
                  Provide clear information so workers can understand and complete your task efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PostTaskForm />
              </CardContent>
            </Card>
          </div>

          {/* Tips Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  Task Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-1">Be Specific</h4>
                  <p className="text-muted-foreground">Clear instructions lead to better results and faster completion.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Fair Pricing</h4>
                  <p className="text-muted-foreground">Competitive rewards attract quality workers and ensure quick completion.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Realistic Time</h4>
                  <p className="text-muted-foreground">Accurate time estimates help workers plan and prioritize your task.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-primary" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <p className="font-semibold">Post Task</p>
                    <p className="text-muted-foreground">Create your task with clear requirements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <p className="font-semibold">Workers Apply</p>
                    <p className="text-muted-foreground">Qualified workers claim and complete your task</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <p className="font-semibold">Review & Pay</p>
                    <p className="text-muted-foreground">Approve work and workers get paid instantly</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5 text-green-500" />
                  Quality Assurance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>All workers are verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Quality ratings system</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Proof of work required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Money-back guarantee</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}