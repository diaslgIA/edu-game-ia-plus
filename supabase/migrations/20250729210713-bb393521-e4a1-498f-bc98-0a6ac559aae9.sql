
-- Create new tables for the gamified lesson system
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  max_score INTEGER DEFAULT 100,
  attempts INTEGER DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  hearts_remaining INTEGER DEFAULT 3,
  perfect_score BOOLEAN DEFAULT FALSE,
  last_attempt_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_study_date DATE,
  streak_frozen BOOLEAN DEFAULT FALSE,
  freeze_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  achievement_description TEXT,
  achievement_icon TEXT DEFAULT '🏆',
  points_awarded INTEGER DEFAULT 0,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subject TEXT,
  UNIQUE(user_id, achievement_id)
);

CREATE TABLE IF NOT EXISTS lesson_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  interaction_type TEXT NOT NULL, -- 'question_answer', 'drag_drop', 'fill_blank', etc.
  question_data JSONB,
  user_answer JSONB,
  correct_answer JSONB,
  is_correct BOOLEAN,
  time_taken INTEGER, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS daily_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  goal_type TEXT NOT NULL, -- 'lessons', 'xp', 'time'
  target_value INTEGER NOT NULL,
  current_value INTEGER DEFAULT 0,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, goal_type, date)
);

-- Add new fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS xp_points INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS global_level INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS hearts INTEGER DEFAULT 3,
ADD COLUMN IF NOT EXISTS gems INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS daily_goal_lessons INTEGER DEFAULT 3;

-- Add RLS policies
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_goals ENABLE ROW LEVEL SECURITY;

-- Policies for lesson_progress
CREATE POLICY "Users can manage their own lesson progress" ON lesson_progress
  FOR ALL USING (auth.uid() = user_id);

-- Policies for user_streaks
CREATE POLICY "Users can manage their own streaks" ON user_streaks
  FOR ALL USING (auth.uid() = user_id);

-- Policies for user_achievements
CREATE POLICY "Users can view their own achievements" ON user_achievements
  FOR ALL USING (auth.uid() = user_id);

-- Policies for lesson_interactions
CREATE POLICY "Users can manage their own interactions" ON lesson_interactions
  FOR ALL USING (auth.uid() = user_id);

-- Policies for daily_goals
CREATE POLICY "Users can manage their own daily goals" ON daily_goals
  FOR ALL USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_subject ON lesson_progress(user_id, subject);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_subject ON user_achievements(user_id, subject);
CREATE INDEX IF NOT EXISTS idx_lesson_interactions_user_lesson ON lesson_interactions(user_id, lesson_id);
CREATE INDEX IF NOT EXISTS idx_daily_goals_user_date ON daily_goals(user_id, date);
