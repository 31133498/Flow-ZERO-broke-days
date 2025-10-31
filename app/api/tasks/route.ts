import { NextResponse, type NextRequest } from "next/server"
import { DummyDataStore } from "@/lib/dummy-data"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const difficulty = searchParams.get("difficulty")
    const location = searchParams.get("location")
    const sortBy = searchParams.get("sortBy") || "reward"

    const tasks = DummyDataStore.getTasks({
      difficulty: difficulty || undefined,
      location: location || undefined,
      sortBy
    })

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "Failed to fetch tasks", tasks: [] }, { status: 500 })
  }
}
