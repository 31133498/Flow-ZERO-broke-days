import { NextResponse, type NextRequest } from "next/server"
import { DummyDataStore } from "@/lib/dummy-data"

export async function GET() {
  try {
    // For demo purposes, use client-1 as the current user
    const clientId = 'client-1'

    const tasks = DummyDataStore.getClientTasks(clientId)
    
    return NextResponse.json({ tasks })
  } catch (error) {
    console.error("Error fetching client tasks:", error)
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const taskData = await request.json()
    const clientId = 'client-1'

    // Always atomize tasks automatically
    const { atomizeTask } = await import('@/lib/ai-atomizer')
    
    try {
      const atomizedTasks = await atomizeTask(taskData)
      const createdTasks = atomizedTasks.map(atomTask => 
        DummyDataStore.createTask(clientId, {
          title: atomTask.title,
          description: atomTask.description,
          reward: atomTask.reward,
          time_estimate: atomTask.estimatedTime,
          difficulty: atomTask.difficulty,
          location: taskData.location,
          tags: taskData.tags
        })
      )
      
      return NextResponse.json({ 
        tasks: createdTasks,
        atomizedTasks: createdTasks,
        message: `Task automatically atomized into ${createdTasks.length} smaller tasks`
      })
    } catch (atomizeError) {
      console.error('Atomization failed, creating single task:', atomizeError)
      const task = DummyDataStore.createTask(clientId, taskData)
      return NextResponse.json({ task, atomizedTasks: [task] })
    }
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}