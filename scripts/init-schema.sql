-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users via trigger)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  account_type TEXT CHECK (account_type IN ('worker', 'client')) DEFAULT 'worker',
  balance DECIMAL(10, 2) DEFAULT 0.00,
  instant_pay_balance DECIMAL(10, 2) DEFAULT 0.00,
  bank_account_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table (posted by clients)
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  reward DECIMAL(10, 2) NOT NULL,
  time_estimate TEXT,
  location TEXT,
  tags TEXT[] DEFAULT '{}',
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')) DEFAULT 'Medium',
  max_completions INT DEFAULT NULL,
  completed_count INT DEFAULT 0,
  status TEXT CHECK (status IN ('active', 'paused', 'completed', 'cancelled')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Task Submissions (worker submissions for tasks)
CREATE TABLE IF NOT EXISTS public.task_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  worker_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('submitted', 'verified', 'rejected', 'paid')) DEFAULT 'submitted',
  submission_data JSONB,
  proof_media_url TEXT[],
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Instant Pay Withdrawals
CREATE TABLE IF NOT EXISTS public.payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  worker_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  task_submission_id UUID NOT NULL REFERENCES public.task_submissions(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
  processed_at TIMESTAMP WITH TIME ZONE,
  failure_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for tasks table
CREATE POLICY "Anyone can view active tasks" ON public.tasks
  FOR SELECT USING (status = 'active');

CREATE POLICY "Clients can insert their own tasks" ON public.tasks
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can update their own tasks" ON public.tasks
  FOR UPDATE USING (auth.uid() = client_id);

-- RLS Policies for task_submissions table
CREATE POLICY "Workers can view their own submissions" ON public.task_submissions
  FOR SELECT USING (auth.uid() = worker_id);

CREATE POLICY "Workers can insert submissions" ON public.task_submissions
  FOR INSERT WITH CHECK (auth.uid() = worker_id);

CREATE POLICY "Clients can view submissions for their tasks" ON public.task_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tasks WHERE tasks.id = task_submissions.task_id AND tasks.client_id = auth.uid()
    )
  );

-- RLS Policies for payouts table
CREATE POLICY "Workers can view their own payouts" ON public.payouts
  FOR SELECT USING (auth.uid() = worker_id);
