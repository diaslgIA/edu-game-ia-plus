
-- Create mentor_affinities table to track user relationships with mentors
CREATE TABLE public.mentor_affinities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mentor_id TEXT NOT NULL,
  affinity_level INTEGER NOT NULL DEFAULT 1,
  experience_points INTEGER NOT NULL DEFAULT 0,
  unlocked_content JSONB DEFAULT '[]'::jsonb,
  last_interaction TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure one record per user-mentor combination
  UNIQUE(user_id, mentor_id)
);

-- Add Row Level Security
ALTER TABLE public.mentor_affinities ENABLE ROW LEVEL SECURITY;

-- Create policies for mentor_affinities
CREATE POLICY "Users can view their own mentor affinities"
  ON public.mentor_affinities
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own mentor affinities"
  ON public.mentor_affinities
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mentor affinities"
  ON public.mentor_affinities
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Add trigger to update updated_at column
CREATE TRIGGER update_mentor_affinities_updated_at
  BEFORE UPDATE ON public.mentor_affinities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for better performance
CREATE INDEX idx_mentor_affinities_user_mentor ON public.mentor_affinities(user_id, mentor_id);
