"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
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
    timeEstimate: "",
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
      const supabase = createClient()

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("Not authenticated")

      const tags = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t)

      const { error } = await supabase.from("tasks").insert({
        client_id: user.id,
        title: formData.title,
        description: formData.description,
        reward: Number.parseFloat(formData.reward),
        time_estimate: formData.timeEstimate,
        location: formData.location,
        difficulty: formData.difficulty,
        tags,
        status: "active",
      })

      if (error) throw error

      toast.success("Task posted successfully!")
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
          <Label htmlFor="timeEstimate">Estimated Time</Label>
          <Input
            id="timeEstimate"
            name="timeEstimate"
            placeholder="e.g., 30 min"
            value={formData.timeEstimate}
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
          {isLoading ? "Posting..." : "Post Task"}
        </Button>
      </div>
    </form>
  )
}
