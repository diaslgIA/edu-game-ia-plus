
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface ContentLimits {
  videosWatched: number;
  activitiesCompleted: number;
  maxVideos: number;
  maxActivities: number;
  canWatchVideo: boolean;
  canDoActivity: boolean;
}

export const useContentLimits = (): ContentLimits & {
  watchVideo: () => Promise<void>;
  completeActivity: () => Promise<void>;
  resetLimits: () => Promise<void>;
} => {
  const { user, profile } = useAuth();
  const [videosWatched, setVideosWatched] = useState(0);
  const [activitiesCompleted, setActivitiesCompleted] = useState(0);

  const isPremium = profile?.subscription_type === 'premium' || profile?.is_verified || false;
  const maxVideos = isPremium ? Infinity : 2;
  const maxActivities = isPremium ? Infinity : 2;

  // Load limits from Supabase
  useEffect(() => {
    if (!user) return;

    const fetchContentUsage = async () => {
      try {
        const { data, error } = await supabase
          .from('content_usage')
          .select('videos_watched, activities_completed')
          .eq('user_id', user.id)
          .eq('reset_date', new Date().toISOString().split('T')[0])
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching content usage:', error);
          return;
        }

        if (data) {
          setVideosWatched(data.videos_watched || 0);
          setActivitiesCompleted(data.activities_completed || 0);
        }
      } catch (error) {
        console.error('Error fetching content usage:', error);
      }
    };

    fetchContentUsage();
  }, [user]);

  const updateContentUsage = async (field: 'videos_watched' | 'activities_completed', increment: number = 1) => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      // First, try to update existing record
      const { error: updateError } = await supabase
        .from('content_usage')
        .update({
          [field]: field === 'videos_watched' ? videosWatched + increment : activitiesCompleted + increment,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('reset_date', today);

      if (updateError) {
        // If update fails, try to insert new record
        const { error: insertError } = await supabase
          .from('content_usage')
          .insert({
            user_id: user.id,
            [field]: increment,
            reset_date: today
          });

        if (insertError) {
          console.error('Error inserting content usage:', insertError);
          return;
        }
      }

      // Update local state
      if (field === 'videos_watched') {
        setVideosWatched(prev => prev + increment);
      } else {
        setActivitiesCompleted(prev => prev + increment);
      }
    } catch (error) {
      console.error('Error updating content usage:', error);
    }
  };

  const watchVideo = async () => {
    if (videosWatched < maxVideos) {
      await updateContentUsage('videos_watched');
    }
  };

  const completeActivity = async () => {
    if (activitiesCompleted < maxActivities) {
      await updateContentUsage('activities_completed');
    }
  };

  const resetLimits = async () => {
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { error } = await supabase
        .from('content_usage')
        .update({
          videos_watched: 0,
          activities_completed: 0,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('reset_date', today);

      if (error) {
        console.error('Error resetting limits:', error);
        return;
      }

      setVideosWatched(0);
      setActivitiesCompleted(0);
    } catch (error) {
      console.error('Error resetting limits:', error);
    }
  };

  return {
    videosWatched,
    activitiesCompleted,
    maxVideos,
    maxActivities,
    canWatchVideo: videosWatched < maxVideos,
    canDoActivity: activitiesCompleted < maxActivities,
    watchVideo,
    completeActivity,
    resetLimits
  };
};
