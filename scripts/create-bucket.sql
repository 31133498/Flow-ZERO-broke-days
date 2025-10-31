-- Create storage bucket for task submissions (run once)
INSERT INTO storage.buckets (id, name, public)
VALUES ('task-submissions', 'task-submissions', true)
ON CONFLICT DO NOTHING;
