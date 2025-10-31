interface AtomizedTask {
  id: string
  title: string
  description: string
  estimatedTime: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  reward: number
}

export async function atomizeTask(originalTask: {
  title: string
  description: string
  reward: number
  time_estimate: string
}): Promise<AtomizedTask[]> {
  try {
    const prompt = `Break down this large task into smaller, atomic work units (5-60 minutes each):

Title: ${originalTask.title}
Description: ${originalTask.description}
Total Budget: $${originalTask.reward}
Estimated Time: ${originalTask.time_estimate}

Create 2-4 smaller tasks that:
1. Can be completed independently
2. Take 5-60 minutes each
3. Have clear deliverables
4. Split the budget proportionally

Format as JSON array with: title, description, estimatedTime, difficulty (Easy/Medium/Hard), reward`

    const response = await fetch('https://chatgpt-42.p.rapidapi.com/conversationgpt4-2', {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'e2b9507f2bmsh2ab87b5b1a01727p1890dajsn024e36a56f93e2b9507f2bmsh2ab87b5b1a01727p1890dajsn024e36a56f93',
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [{
          role: 'user',
          content: prompt
        }],
        system_prompt: 'You are a task atomization AI. Always respond with valid JSON array format.',
        temperature: 0.7,
        max_tokens: 1000
      })
    })

    const data = await response.json()
    
    // Parse AI response and create atomized tasks
    const aiText = data.result || data.choices?.[0]?.message?.content || data.text || ''
    
    // Fallback atomization if AI fails
    if (!aiText || !aiText.includes('[')) {
      return createFallbackAtomization(originalTask)
    }

    try {
      const jsonMatch = aiText.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return parsed.map((task: any, index: number) => ({
          id: `atom-${Date.now()}-${index}`,
          title: task.title || `${originalTask.title} - Part ${index + 1}`,
          description: task.description || `Subtask of: ${originalTask.description}`,
          estimatedTime: task.estimatedTime || '30 min',
          difficulty: task.difficulty || 'Medium',
          reward: task.reward || Math.round(originalTask.reward / parsed.length * 100) / 100
        }))
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
    }

    return createFallbackAtomization(originalTask)
  } catch (error) {
    console.error('AI atomization failed:', error)
    return createFallbackAtomization(originalTask)
  }
}

function createFallbackAtomization(originalTask: {
  title: string
  description: string
  reward: number
  time_estimate: string
}): AtomizedTask[] {
  const numTasks = originalTask.reward > 50 ? 3 : 2
  const rewardPerTask = Math.round(originalTask.reward / numTasks * 100) / 100
  
  return Array.from({ length: numTasks }, (_, i) => ({
    id: `atom-${Date.now()}-${i}`,
    title: `${originalTask.title} - Phase ${i + 1}`,
    description: `Part ${i + 1} of: ${originalTask.description}`,
    estimatedTime: '25 min',
    difficulty: 'Medium' as const,
    reward: rewardPerTask
  }))
}