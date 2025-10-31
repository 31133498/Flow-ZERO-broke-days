export interface Task {
  id: string
  title: string
  description: string
  reward: number
  time_estimate: string
  location: string
  tags: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  completed_count: number
  status: 'active' | 'paused' | 'completed' | 'cancelled'
  client_id: string
  created_at: string
}

export interface TaskSubmission {
  id: string
  task_id: string
  worker_id: string
  status: 'submitted' | 'verified' | 'rejected' | 'paid'
  submission_data: {
    description: string
    [key: string]: any
  }
  proof_media_url: string[]
  submitted_at: string
  verified_at?: string
  rejection_reason?: string
}

export interface User {
  id: string
  email: string
  display_name: string
  account_type: 'worker' | 'client'
  balance: number
  instant_pay_balance: number
  avatar_url?: string
}

export interface Payout {
  id: string
  worker_id: string
  task_submission_id: string
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  processed_at?: string
  created_at: string
}

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: 'worker-1',
    email: 'alex@example.com',
    display_name: 'Alex Chen',
    account_type: 'worker',
    balance: 1847.50,
    instant_pay_balance: 1847.50,
    avatar_url: '/placeholder-user.jpg'
  },
  {
    id: 'client-1',
    email: 'jordan@example.com',
    display_name: 'Jordan Miller',
    account_type: 'client',
    balance: 5000.00,
    instant_pay_balance: 0,
    avatar_url: '/placeholder-user.jpg'
  }
]

// Mock Tasks
export const MOCK_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Data Entry - Customer Records',
    description: 'Input 50 customer records into our CRM system. Each record includes name, email, phone, and company details.',
    reward: 15.00,
    time_estimate: '25 min',
    location: 'Remote',
    tags: ['Data Entry', 'Remote', 'CRM'],
    difficulty: 'Easy',
    completed_count: 1243,
    status: 'active',
    client_id: 'client-1',
    created_at: new Date().toISOString()
  },
  {
    id: 'task-2',
    title: 'Social Media Content Review',
    description: 'Review and moderate 30 social media posts for inappropriate content. Flag any violations according to community guidelines.',
    reward: 22.50,
    time_estimate: '35 min',
    location: 'Remote',
    tags: ['Content Moderation', 'Remote', 'Social Media'],
    difficulty: 'Medium',
    completed_count: 856,
    status: 'active',
    client_id: 'client-1',
    created_at: new Date().toISOString()
  },
  {
    id: 'task-3',
    title: 'Product Research Summary',
    description: 'Research 5 competing products and create a brief summary of features, pricing, and key differentiators.',
    reward: 28.00,
    time_estimate: '45 min',
    location: 'Remote',
    tags: ['Research', 'Analysis', 'Remote'],
    difficulty: 'Medium',
    completed_count: 567,
    status: 'active',
    client_id: 'client-1',
    created_at: new Date().toISOString()
  },
  {
    id: 'task-4',
    title: 'Survey Completion - Market Research',
    description: 'Complete 3 consumer behavior surveys. Each survey takes about 8-10 minutes to complete thoroughly.',
    reward: 18.75,
    time_estimate: '30 min',
    location: 'Remote',
    tags: ['Survey', 'Market Research', 'Remote'],
    difficulty: 'Easy',
    completed_count: 2104,
    status: 'active',
    client_id: 'client-1',
    created_at: new Date().toISOString()
  },
  {
    id: 'task-5',
    title: 'Image Classification Project',
    description: 'Categorize 200 product images into predefined categories. Clear guidelines and examples provided.',
    reward: 20.00,
    time_estimate: '40 min',
    location: 'Remote',
    tags: ['Classification', 'Images', 'Remote'],
    difficulty: 'Easy',
    completed_count: 945,
    status: 'active',
    client_id: 'client-1',
    created_at: new Date().toISOString()
  },
  {
    id: 'task-6',
    title: 'Local Package Delivery',
    description: 'Pick up package from downtown office and deliver to nearby location. Must have reliable transportation.',
    reward: 35.00,
    time_estimate: '1h 15min',
    location: 'Downtown - 3km radius',
    tags: ['Physical', 'Delivery', 'Local'],
    difficulty: 'Easy',
    completed_count: 234,
    status: 'active',
    client_id: 'client-1',
    created_at: new Date().toISOString()
  },
  {
    id: 'task-7',
    title: 'Video Transcription Service',
    description: 'Transcribe 2 interview videos (15 minutes each). Accurate transcription with proper formatting required.',
    reward: 42.00,
    time_estimate: '1h',
    location: 'Remote',
    tags: ['Transcription', 'Video', 'Remote'],
    difficulty: 'Hard',
    completed_count: 123,
    status: 'active',
    client_id: 'client-1',
    created_at: new Date().toISOString()
  },
  {
    id: 'task-8',
    title: 'Email List Verification',
    description: 'Verify 100 email addresses for deliverability and format correctness. Remove duplicates and invalid entries.',
    reward: 12.50,
    time_estimate: '20 min',
    location: 'Remote',
    tags: ['Verification', 'Email', 'Remote'],
    difficulty: 'Easy',
    completed_count: 1567,
    status: 'active',
    client_id: 'client-1',
    created_at: new Date().toISOString()
  }
]

// Mock Submissions
export const MOCK_SUBMISSIONS: TaskSubmission[] = [
  {
    id: 'sub-1',
    task_id: 'task-1',
    worker_id: 'worker-1',
    status: 'verified',
    submission_data: {
      description: 'Completed all 50 customer records with accurate data entry. Double-checked all email formats and phone numbers.'
    },
    proof_media_url: ['/placeholder.jpg'],
    submitted_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    verified_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'sub-2',
    task_id: 'task-2',
    worker_id: 'worker-1',
    status: 'submitted',
    submission_data: {
      description: 'Reviewed all 30 posts. Found 3 violations which I flagged according to guidelines. Detailed report attached.'
    },
    proof_media_url: ['/placeholder.jpg'],
    submitted_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 'sub-3',
    task_id: 'task-3',
    worker_id: 'worker-1',
    status: 'submitted',
    submission_data: {
      description: 'Completed comprehensive research on 5 competing products. Created detailed comparison with features, pricing, and market positioning. All sources verified and documented.'
    },
    proof_media_url: ['/uploads/research-report.pdf', '/uploads/comparison-chart.xlsx'],
    submitted_at: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    id: 'sub-4',
    task_id: 'task-4',
    worker_id: 'worker-1',
    status: 'verified',
    submission_data: {
      description: 'Completed all 3 consumer surveys with detailed responses. Provided thoughtful feedback on product preferences and market trends.'
    },
    proof_media_url: ['/uploads/survey-responses.pdf'],
    submitted_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    verified_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'sub-5',
    task_id: 'task-5',
    worker_id: 'worker-1',
    status: 'submitted',
    submission_data: {
      description: 'Categorized all 200 product images according to the provided guidelines. Created organized folder structure with clear naming conventions.'
    },
    proof_media_url: ['/uploads/categorization-summary.xlsx'],
    submitted_at: new Date(Date.now() - 45 * 60 * 1000).toISOString()
  }
]

// Mock Payouts
export const MOCK_PAYOUTS: Payout[] = [
  {
    id: 'payout-1',
    worker_id: 'worker-1',
    task_submission_id: 'sub-1',
    amount: 15.00,
    status: 'completed',
    processed_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'payout-2',
    worker_id: 'worker-1',
    task_submission_id: 'sub-4',
    amount: 18.75,
    status: 'completed',
    processed_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  }
]

// Helper functions for data manipulation
export class DummyDataStore {
  private static tasks = [...MOCK_TASKS]
  private static submissions = [...MOCK_SUBMISSIONS]
  private static payouts = [...MOCK_PAYOUTS]
  private static users = [...MOCK_USERS]

  static getTasks(filters?: {
    difficulty?: string
    location?: string
    sortBy?: string
  }) {
    let filtered = [...this.tasks].filter(task => task.status === 'active')

    if (filters?.difficulty && filters.difficulty !== 'all') {
      filtered = filtered.filter(task => task.difficulty === filters.difficulty)
    }

    if (filters?.location) {
      if (filters.location === 'remote') {
        filtered = filtered.filter(task => task.location.toLowerCase().includes('remote'))
      } else if (filters.location !== 'all') {
        filtered = filtered.filter(task => 
          task.location.toLowerCase().includes(filters.location.toLowerCase())
        )
      }
    }

    if (filters?.sortBy === 'reward') {
      filtered.sort((a, b) => b.reward - a.reward)
    } else if (filters?.sortBy === 'new') {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (filters?.sortBy === 'popularity') {
      filtered.sort((a, b) => b.completed_count - a.completed_count)
    }

    return filtered
  }

  static getTask(id: string) {
    return this.tasks.find(task => task.id === id)
  }

  static claimTask(taskId: string, workerId: string) {
    // In a real app, this would create a claim record
    return { success: true, message: 'Task claimed successfully' }
  }

  static submitTask(taskId: string, workerId: string, submissionData: any, proofUrls: string[]) {
    const submission: TaskSubmission = {
      id: `sub-${Date.now()}`,
      task_id: taskId,
      worker_id: workerId,
      status: 'submitted',
      submission_data: submissionData,
      proof_media_url: proofUrls,
      submitted_at: new Date().toISOString()
    }
    
    this.submissions.push(submission)
    return submission
  }

  static getSubmissions(workerId?: string, clientId?: string) {
    let filtered = [...this.submissions]
    
    if (workerId) {
      filtered = filtered.filter(sub => sub.worker_id === workerId)
    }
    
    if (clientId) {
      // Get submissions for tasks owned by this client
      const clientTaskIds = this.tasks
        .filter(task => task.client_id === clientId)
        .map(task => task.id)
      filtered = filtered.filter(sub => clientTaskIds.includes(sub.task_id))
    }
    
    return filtered
  }

  static verifySubmission(submissionId: string, approved: boolean, reason?: string) {
    const submission = this.submissions.find(sub => sub.id === submissionId)
    if (submission) {
      submission.status = approved ? 'verified' : 'rejected'
      submission.verified_at = new Date().toISOString()
      if (!approved && reason) {
        submission.rejection_reason = reason
      }
      
      // If approved, create instant payout
      if (approved) {
        const task = this.getTask(submission.task_id)
        if (task) {
          const payout: Payout = {
            id: `payout-${Date.now()}`,
            worker_id: submission.worker_id,
            task_submission_id: submission.id,
            amount: task.reward,
            status: 'completed',
            processed_at: new Date().toISOString(),
            created_at: new Date().toISOString()
          }
          this.payouts.push(payout)
          
          // Update user balance
          const user = this.users.find(u => u.id === submission.worker_id)
          if (user) {
            user.balance += task.reward
            user.instant_pay_balance += task.reward
          }
        }
      }
    }
    return submission
  }

  static getUserEarnings(userId: string) {
    const userPayouts = this.payouts.filter(p => p.worker_id === userId && p.status === 'completed')
    const today = new Date()
    const weekStart = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)

    const todayEarnings = userPayouts
      .filter(p => new Date(p.processed_at!).toDateString() === today.toDateString())
      .reduce((sum, p) => sum + p.amount, 0)

    const weekEarnings = userPayouts
      .filter(p => new Date(p.processed_at!) >= weekStart)
      .reduce((sum, p) => sum + p.amount, 0)

    const monthEarnings = userPayouts
      .filter(p => new Date(p.processed_at!) >= monthStart)
      .reduce((sum, p) => sum + p.amount, 0)

    const completedTasks = userPayouts.length
    const successRate = this.submissions.filter(s => s.worker_id === userId).length > 0 
      ? Math.round((userPayouts.length / this.submissions.filter(s => s.worker_id === userId).length) * 100)
      : 0

    return {
      today: `$${todayEarnings.toFixed(2)}`,
      week: `$${weekEarnings.toFixed(2)}`,
      month: `$${monthEarnings.toFixed(2)}`,
      completedTasks,
      successRate,
      avgTaskTime: '23'
    }
  }

  static getUser(id: string) {
    return this.users.find(user => user.id === id)
  }

  static createTask(clientId: string, taskData: Partial<Task>) {
    const task: Task = {
      id: `task-${Date.now()}`,
      client_id: clientId,
      title: taskData.title || '',
      description: taskData.description || '',
      reward: taskData.reward || 0,
      time_estimate: taskData.time_estimate || '',
      location: taskData.location || 'Remote',
      tags: taskData.tags || [],
      difficulty: taskData.difficulty || 'Medium',
      completed_count: 0,
      status: 'active',
      created_at: new Date().toISOString()
    }
    
    this.tasks.push(task)
    return task
  }

  static getClientTasks(clientId: string) {
    return this.tasks.filter(task => task.client_id === clientId)
  }
}