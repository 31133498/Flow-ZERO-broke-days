import { createClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient({ serviceRole: true })
    const searchParams = request.nextUrl.searchParams

    const difficulty = searchParams.get("difficulty")
    const location = searchParams.get("location")
    const minReward = searchParams.get("minReward")
    const maxReward = searchParams.get("maxReward")
    const sortBy = searchParams.get("sortBy") || "reward"

    let query = supabase.from("tasks").select("*").eq("status", "active")

    if (difficulty && difficulty !== "all") {
      query = query.eq("difficulty", difficulty)
    }

    if (location === "remote") {
      query = query.ilike("location", "%Remote%")
    } else if (location && location !== "all") {
      query = query.ilike("location", `%${location}%`)
    }

    if (minReward) {
      query = query.gte("reward", Number.parseFloat(minReward))
    }

    if (maxReward) {
      query = query.lte("reward", Number.parseFloat(maxReward))
    }

    if (sortBy === "reward") {
      query = query.order("reward", { ascending: false })
    } else if (sortBy === "new") {
      query = query.order("created_at", { ascending: false })
    } else if (sortBy === "popularity") {
      query = query.order("completed_count", { ascending: false })
    }

    query = query.limit(50)

    const { data, error } = await query

    if (error) {
      console.error("[v0] Supabase error:", error)
      throw error
    }

    console.log("[v0] Fetched tasks:", data?.length || 0)
    return NextResponse.json({ tasks: data || [] })
  } catch (error) {
    console.error("[v0] Error fetching tasks:", error)
    return NextResponse.json({ error: "Failed to fetch tasks", tasks: [] }, { status: 200 })
  }
}
