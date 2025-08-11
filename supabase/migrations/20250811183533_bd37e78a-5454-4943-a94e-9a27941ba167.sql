-- Fix security vulnerability: Restrict public access to user_rankings table
-- Remove all public read policies and replace with authenticated-only access

-- Drop existing public policies
DROP POLICY IF EXISTS "Public can read user_rankings" ON public.user_rankings;
DROP POLICY IF EXISTS "Users can view rankings" ON public.user_rankings;
DROP POLICY IF EXISTS "user_rankings_select_all" ON public.user_rankings;

-- Create new secure policy that only allows authenticated users to view rankings
CREATE POLICY "Authenticated users can view rankings" 
ON public.user_rankings 
FOR SELECT 
TO authenticated
USING (true);

-- Keep existing policies for insert/update (they already require authentication)
-- user_rankings_insert_authenticated and user_rankings_update_authenticated are already secure