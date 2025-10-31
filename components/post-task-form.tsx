"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export function PostTaskForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reward: "",
    time_estimate: "",
    location: "",
    difficulty: "Easy",
    tags: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const tags = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t)

      const taskData = {
        title: formData.title,
        description: formData.description,
        reward: Number.parseFloat(formData.reward),
        time_estimate: formData.time_estimate,
        location: formData.location,
        difficulty: formData.difficulty as 'Easy' | 'Medium' | 'Hard',
        tags
      }

      const response = await fetch('/api/client/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      })

      if (!response.ok) {
        throw new Error('Failed to post task')
      }

      const result = await response.json()
      const taskCount = result.atomizedTasks?.length || 1
      toast.success(`Task atomized into ${taskCount} smaller tasks!`)
      router.push("/client/dashboard")
    } catch (error) {
      console.error("Error posting task:", error)
      toast.error(error instanceof Error ? error.message : "Failed to post task")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-2">
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g., Data Entry - CRM Update"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe the task, requirements, and expectations..."
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="reward">Reward ($)</Label>
          <Input
            id="reward"
            name="reward"
            type="number"
            step="0.50"
            placeholder="10.00"
            value={formData.reward}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="time_estimate">Estimated Time</Label>
          <Input
            id="time_estimate"
            name="time_estimate"
            placeholder="e.g., 30 min"
            value={formData.time_estimate}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          placeholder="e.g., Remote or specific address"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="difficulty">Difficulty</Label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border rounded-md bg-background"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          name="tags"
          placeholder="e.g., Data Entry, Remote, Research"
          value={formData.tags}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={() => window.history.back()} className="flex-1 bg-transparent">
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "AI Atomizing..." : "Post Task (Auto-Atomized)"}
        </Button>
      </div>
    </form>
  )
}
