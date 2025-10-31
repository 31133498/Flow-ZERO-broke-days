-- Insert sample worker users (extended auth users)
INSERT INTO public.users (id, email, display_name, account_type, balance)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'worker1@example.com', 'Alex Worker', 'worker', 247.50),
  ('22222222-2222-2222-2222-222222222222', 'worker2@example.com', 'Jordan Task', 'worker', 0.00);

-- Insert sample client users
INSERT INTO public.users (id, email, display_name, account_type, balance)
VALUES
  ('33333333-3333-3333-3333-333333333333', 'client1@example.com', 'Quick Corp', 'client', -500.00),
  ('44444444-4444-4444-4444-444444444444', 'client2@example.com', 'Data Labs Inc', 'client', -1200.00);

-- Insert sample tasks
INSERT INTO public.tasks (client_id, title, description, reward, time_estimate, location, tags, difficulty, completed_count)
VALUES
  ('33333333-3333-3333-3333-333333333333', 'Data Entry - CRM Update', 'Input 100 records into our system', 12.50, '20 min', 'Remote', ARRAY['Data Entry', 'Remote'], 'Easy', 1243),
  ('33333333-3333-3333-3333-333333333333', 'Product Research - Tech Review', 'Research and summarize 5 tech products', 18.00, '30 min', 'Remote', ARRAY['Research', 'Remote'], 'Medium', 856),
  ('44444444-4444-4444-4444-444444444444', 'Social Media Verification', 'Verify account authenticity (5 accounts)', 15.00, '15 min', 'Remote', ARRAY['Verification', 'Remote'], 'Easy', 2104),
  ('44444444-4444-4444-4444-444444444444', 'Survey Completion - Market Research', 'Complete 3 consumer surveys (10 min each)', 22.50, '40 min', 'Remote', ARRAY['Survey', 'Research'], 'Easy', 1678),
  ('33333333-3333-3333-3333-333333333333', 'Photo Categorization', 'Organize 500 images by category', 20.00, '35 min', 'Remote', ARRAY['Classification', 'Remote'], 'Medium', 945),
  ('44444444-4444-4444-4444-444444444444', 'Local Errands - Package Pickup', 'Pick up package from downtown location', 25.00, '1h', 'Downtown - 2 km away', ARRAY['Physical', 'Local'], 'Easy', 567),
  ('33333333-3333-3333-3333-333333333333', 'Content Moderation - Review Comments', 'Review and moderate 50 user comments', 16.50, '25 min', 'Remote', ARRAY['Moderation', 'Remote'], 'Medium', 723),
  ('44444444-4444-4444-4444-444444444444', 'Video Transcription - 30 min clips', 'Transcribe 3 video clips (10 min each)', 28.00, '45 min', 'Remote', ARRAY['Transcription', 'Remote'], 'Hard', 334);
