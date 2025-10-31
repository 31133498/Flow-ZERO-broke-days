"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

interface TaskFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  difficulty: string
  location: string
  sortBy: string
}

export function TaskFilters({ onFilterChange }: TaskFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    difficulty: "all",
    location: "all",
    sortBy: "reward",
  })

  const handleChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <div className="flex gap-3 mb-6 items-center flex-wrap">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span>Filter:</span>
      </div>

      <Select value={filters.difficulty} onValueChange={(value) => handleChange("difficulty", value)}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Difficulty</SelectItem>
          <SelectItem value="Easy">Easy</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Hard">Hard</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.location} onValueChange={(value) => handleChange("location", value)}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="remote">Remote Only</SelectItem>
          <SelectItem value="local">Local Only</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.sortBy} onValueChange={(value) => handleChange("sortBy", value)}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="reward">Highest Reward</SelectItem>
          <SelectItem value="new">Newest</SelectItem>
          <SelectItem value="popularity">Most Popular</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
