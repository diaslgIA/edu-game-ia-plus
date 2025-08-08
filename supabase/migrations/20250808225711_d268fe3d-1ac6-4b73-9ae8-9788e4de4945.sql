
-- Create trigger to automatically award points when activities are recorded
CREATE OR REPLACE FUNCTION public.award_activity_points()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Only award points if the activity was successful
  IF NEW.points_earned > 0 THEN
    -- Update user profile with points
    UPDATE public.profiles 
    SET 
      points = COALESCE(points, 0) + NEW.points_earned,
      level = GREATEST(1, FLOOR((COALESCE(points, 0) + NEW.points_earned) / 100) + 1),
      updated_at = now()
    WHERE id = NEW.user_id;
    
    -- Update ranking
    INSERT INTO public.user_rankings (user_id, full_name, total_points)
    SELECT 
      p.id,
      p.full_name,
      p.points
    FROM public.profiles p
    WHERE p.id = NEW.user_id
    ON CONFLICT (user_id) 
    DO UPDATE SET
      total_points = EXCLUDED.total_points,
      updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger on user_activities table
DROP TRIGGER IF EXISTS trigger_award_activity_points ON public.user_activities;
CREATE TRIGGER trigger_award_activity_points
  AFTER INSERT ON public.user_activities
  FOR EACH ROW
  EXECUTE FUNCTION public.award_activity_points();
