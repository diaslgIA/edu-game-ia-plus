
-- Add the missing max_members column to guilds table
ALTER TABLE public.guilds 
ADD COLUMN max_members integer DEFAULT 50;

-- Update existing guilds to have a default max_members value
UPDATE public.guilds 
SET max_members = 50 
WHERE max_members IS NULL;
