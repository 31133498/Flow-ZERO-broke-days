-- Clear existing data (be careful in production!)
DELETE FROM public.task_submissions CASCADE;
DELETE FROM public.payouts CASCADE;
DELETE FROM public.tasks CASCADE;
DELETE FROM public.users CASCADE;

-- Insert worker users with realistic balances
INSERT INTO public.users (id, email, display_name, account_type, balance, instant_pay_balance)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'alex.worker@example.com', 'Alex Chen', 'worker', 2450.75, 500.00),
  ('22222222-2222-2222-2222-222222222222', 'jordan.task@example.com', 'Jordan Lee', 'worker', 1875.50, 250.00),
  ('33333333-3333-3333-3333-333333333333', 'sam.hustler@example.com', 'Sam Rodriguez', 'worker', 3200.25, 800.00),
  ('44444444-4444-4444-4444-444444444444', 'maya.quickpay@example.com', 'Maya Patel', 'worker', 1650.00, 350.00);

-- Insert client users (enterprise clients)
INSERT INTO public.users (id, email, display_name, account_type, balance)
VALUES
  ('55555555-5555-5555-5555-555555555555', 'hiring@acmemarketing.com', 'Acme Marketing', 'client', -5000.00),
  ('66666666-6666-6666-6666-666666666666', 'ops@techailabs.com', 'Tech AI Labs', 'client', -8500.00),
  ('77777777-7777-7777-7777-777777777777', 'jobs@ecomlaunchpad.com', 'Ecom Launchpad', 'client', -3200.00),
  ('88888888-8888-8888-8888-888888888888', 'tasks@freshgroceries.com', 'FreshGroceries Inc', 'client', -6700.00),
  ('99999999-9999-9999-9999-999999999999', 'admin@megamart.com', 'MegaMart Retail', 'client', -12000.00),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'hr@legalservices.com', 'Legal Services Firm', 'client', -4200.00);

-- ===== DIGITAL TASKS (Remote/Online) =====

-- Data Verification Tasks
INSERT INTO public.tasks (client_id, title, description, reward, time_estimate, location, tags, difficulty, completed_count)
VALUES
  ('55555555-5555-5555-5555-555555555555', 'Verify 15 Email Addresses', 'Check email validity and format compliance in our marketing list', 500, '7 min', 'Remote', ARRAY['Data Verification', 'Email', 'Remote', 'Quick'], 'Easy', 342),
  ('55555555-5555-5555-5555-555555555555', 'Validate Phone Numbers (50)', 'Verify 50 phone numbers against telecom database for campaign outreach', 750, '12 min', 'Remote', ARRAY['Data Verification', 'Phone', 'Remote'], 'Easy', 218),
  ('66666666-6666-6666-6666-666666666666', 'Classify 20 Images', 'Label 20 product images with correct category tags for AI training', 450, '5 min', 'Remote', ARRAY['AI Training', 'Classification', 'Remote'], 'Easy', 1205),
  ('66666666-6666-6666-6666-666666666666', 'Categorize 100 Articles', 'Sort 100 news articles into 8 predefined categories (tech, business, health, etc)', 1200, '18 min', 'Remote', ARRAY['AI Training', 'Content', 'Remote'], 'Medium', 567),

-- Content Review & Editing Tasks
  ('77777777-7777-7777-7777-777777777777', 'Proofread Ad Copy (5 ads)', 'Review and correct 5 product ad descriptions for grammar and clarity', 900, '12 min', 'Remote', ARRAY['Content Review', 'Writing', 'Remote'], 'Easy', 445),
  ('77777777-7777-7777-7777-777777777777', 'Edit Product Listings (20)', 'Fix formatting and improve 20 e-commerce product descriptions', 1400, '25 min', 'Remote', ARRAY['Content Review', 'E-commerce', 'Remote'], 'Medium', 334),
  ('88888888-8888-8888-8888-888888888888', 'Review Menu Item Descriptions', 'Proofread and enhance 30 restaurant menu item descriptions', 600, '10 min', 'Remote', ARRAY['Content Review', 'Food', 'Remote'], 'Easy', 156),

-- Research Tasks
  ('88888888-8888-8888-8888-888888888888', 'Find Competitor Pricing', 'Research and document current prices from 15 competitor stores', 750, '10 min', 'Remote', ARRAY['Research', 'Market Analysis', 'Remote'], 'Easy', 289),
  ('77777777-7777-7777-7777-777777777777', 'Analyze Website Features', 'Compare features across 10 competitor e-commerce sites and create comparison table', 1800, '30 min', 'Remote', ARRAY['Research', 'Competitive Analysis', 'Remote'], 'Medium', 198),
  ('88888888-8888-8888-8888-888888888888', 'Find Local Service Providers', 'Locate and document contact info for 20 local plumbers/electricians/contractors', 1100, '20 min', 'Remote', ARRAY['Research', 'Local Business', 'Remote'], 'Medium', 112),

-- Transcription & Audio Tasks
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Transcribe 3-min Legal Audio', 'Transcribe and format a 3-minute legal meeting recording with timestamps', 1200, '15 min', 'Remote', ARRAY['Transcription', 'Legal', 'Remote', 'Premium'], 'Medium', 267),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Transcribe Interview (10 min)', 'Convert 10-minute podcast interview into structured text document', 2000, '35 min', 'Remote', ARRAY['Transcription', 'Media', 'Remote'], 'Medium', 89),
  ('66666666-6666-6666-6666-666666666666', 'Caption 5 Short Videos', 'Create accurate captions for 5 short (1-2 min) product demo videos', 1500, '20 min', 'Remote', ARRAY['Transcription', 'Video', 'Remote'], 'Medium', 176),

-- Summarization & Writing Tasks
  ('55555555-5555-5555-5555-555555555555', 'Summarize 1-Page Report', 'Create concise one-paragraph executive summary of research report', 1500, '20 min', 'Remote', ARRAY['Writing', 'Summarization', 'Remote'], 'Easy', 412),
  ('77777777-7777-7777-7777-777777777777', 'Write Product Descriptions (5)', 'Compose engaging 100-word descriptions for 5 new products', 2200, '40 min', 'Remote', ARRAY['Writing', 'E-commerce', 'Remote'], 'Medium', 203),
  ('66666666-6666-6666-6666-666666666666', 'Write Social Media Captions (10)', 'Create catchy Instagram captions for 10 product photos', 850, '15 min', 'Remote', ARRAY['Social Media', 'Writing', 'Remote'], 'Easy', 678),

-- Survey & Data Entry Tasks
  ('55555555-5555-5555-5555-555555555555', 'Complete 3 Surveys (Market Research)', 'Fill out 3 consumer surveys (10 min each) on product preferences', 1200, '35 min', 'Remote', ARRAY['Survey', 'Research', 'Remote'], 'Easy', 892),
  ('88888888-8888-8888-8888-888888888888', 'Data Entry - CRM Update (100 records)', 'Input 100 customer records into Salesforce CRM with verification', 1800, '45 min', 'Remote', ARRAY['Data Entry', 'CRM', 'Remote'], 'Easy', 1043),
  ('77777777-7777-7777-7777-777777777777', 'Data Entry - Spreadsheet (50 rows)', 'Enter 50 data entries into Excel with specific formatting requirements', 950, '25 min', 'Remote', ARRAY['Data Entry', 'Spreadsheet', 'Remote'], 'Easy', 534),

-- Quality Assurance & Moderation
  ('66666666-6666-6666-6666-666666666666', 'Review User Comments (50)', 'Moderate and flag 50 user comments for policy violations', 1100, '20 min', 'Remote', ARRAY['Moderation', 'QA', 'Remote'], 'Medium', 445),
  ('77777777-7777-7777-7777-777777777777', 'Test Website Forms (5)', 'Test 5 website forms for bugs, missing fields, and user experience issues', 1600, '30 min', 'Remote', ARRAY['QA', 'Testing', 'Remote'], 'Medium', 267),

-- ===== PHYSICAL TASKS (Location-Based) =====

-- Retail & Inventory Tasks
  ('99999999-9999-9999-9999-999999999999', 'Shelf Stock Audit (Store A)', 'Complete inventory check of designated aisle section with photo documentation', 2800, '25 min', 'MegaMart Downtown - 2 km away', ARRAY['Retail', 'Inventory', 'Physical', 'GPS'], 'Easy', 156),
  ('99999999-9999-9999-9999-999999999999', 'Price Tag Verification (100 items)', 'Verify and correct price labels on 100 shelf items in grocery section', 1900, '30 min', 'MegaMart East Location - 4 km away', ARRAY['Retail', 'Physical', 'GPS'], 'Easy', 234),
  ('99999999-9999-9999-9999-999999999999', 'Store Display Setup (3 locations)', 'Set up promotional displays at 3 different shelf locations with brand materials', 3500, '45 min', 'MegaMart Multiple Locations - 5 km radius', ARRAY['Retail', 'Marketing', 'Physical', 'GPS'], 'Medium', 89),

-- Delivery & Logistics
  ('88888888-8888-8888-8888-888888888888', 'Deliver Urgent Documents (10 stops)', 'Deliver important papers to 10 offices in business district', 4200, '1h 15m', 'Downtown Business District - 3 km', ARRAY['Delivery', 'Logistics', 'Physical', 'GPS', 'Premium'], 'Easy', 145),
  ('77777777-7777-7777-7777-777777777777', 'Package Pickup & Relay', 'Pick up packages from 3 locations and deliver to central warehouse', 2600, '50 min', 'Warehouse Area - 6 km', ARRAY['Logistics', 'Physical', 'GPS'], 'Easy', 198),

-- Local Service Tasks
  ('55555555-5555-5555-5555-555555555555', 'Flyer Distribution (500 units)', 'Hand out promotional flyers in assigned neighborhood (500 pieces)', 2200, '1h 30m', 'Downtown District - 3 km', ARRAY['Marketing', 'Distribution', 'Physical', 'GPS'], 'Easy', 267),
  ('88888888-8888-8888-8888-888888888888', 'Store Layout Photography', 'Photograph storefront and interior layout from multiple angles', 1500, '20 min', 'Commercial Street - 2 km away', ARRAY['Photography', 'Physical', 'GPS'], 'Easy', 112),
  ('99999999-9999-9999-9999-999999999999', 'Mystery Shop (Location A)', 'Visit store, evaluate customer service, make $50 purchase, write report', 3800, '1h', 'Central Mall - 3.5 km', ARRAY['Mystery Shop', 'QA', 'Physical', 'GPS'], 'Medium', 76),

-- Installation & Setup Tasks
  ('77777777-7777-7777-7777-777777777777', 'Poster Installation (20 locations)', 'Install promotional posters at 20 predetermined locations', 2400, '1h', 'City Center District - 4 km', ARRAY['Marketing', 'Installation', 'Physical', 'GPS'], 'Easy', 143),
  ('88888888-8888-8888-8888-888888888888', 'Sign Maintenance Check', 'Inspect and photograph all building signs for damage/wear', 1800, '35 min', 'Commercial Area - 5 km', ARRAY['Maintenance', 'Physical', 'GPS'], 'Easy', 89),

-- Cleaning & Stocking
  ('99999999-9999-9999-9999-999999999999', 'Aisle Restocking (Grocery section)', 'Stock shelves with 200 units of grocery items per planogram', 2100, '40 min', 'MegaMart South - 3 km', ARRAY['Retail', 'Stocking', 'Physical', 'GPS'], 'Easy', 267),
  ('55555555-5555-5555-5555-555555555555', 'Parking Lot Cleanup (2 hours)', 'Clean and organize parking lot including trash removal and sweeping', 3200, '2h', 'Shopping Complex - 2 km', ARRAY['Maintenance', 'Cleaning', 'Physical', 'GPS'], 'Easy', 98);

-- Verify inserts
SELECT COUNT(*) as total_tasks FROM public.tasks;
SELECT COUNT(*) as total_users FROM public.users;
