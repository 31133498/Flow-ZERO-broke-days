-- This script runs all seeding operations in the correct order

-- Step 1: Create schema if not exists
\i ./init-schema.sql

-- Step 2: Seed creative tasks and dummy data
\i ./seed-tasks-creative.sql

-- Output confirmation
SELECT 'Seeding complete!' as status;
SELECT 
  (SELECT COUNT(*) FROM public.tasks) as total_tasks,
  (SELECT COUNT(*) FROM public.users) as total_users,
  (SELECT COUNT(*) FROM public.task_submissions) as total_submissions;
