
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ContentLimits {
  videosWatched: number;
  activitiesCompleted: number;
  maxVideos: number;
  maxActivities: number;
  canWatchVideo: boolean;
  canDoActivity: boolean;
}

export const useContentLimits = (): ContentLimits & {
  watchVideo: () => void;
  completeActivity: () => void;
  resetLimits: () => void;
} => {
  const { user } = useAuth();
  const [videosWatched, setVideosWatched] = useState(0);
  const [activitiesCompleted, setActivitiesCompleted] = useState(0);

  const isPremium = user?.isVerified || false; // Assuming verified users are premium
  const maxVideos = isPremium ? Infinity : 2;
  const maxActivities = isPremium ? Infinity : 2;

  // Load limits from localStorage
  useEffect(() => {
    const savedVideos = localStorage.getItem('videosWatched');
    const savedActivities = localStorage.getItem('activitiesCompleted');
    
    if (savedVideos) setVideosWatched(parseInt(savedVideos));
    if (savedActivities) setActivitiesCompleted(parseInt(savedActivities));
  }, []);

  // Save to localStorage whenever limits change
  useEffect(() => {
    localStorage.setItem('videosWatched', videosWatched.toString());
  }, [videosWatched]);

  useEffect(() => {
    localStorage.setItem('activitiesCompleted', activitiesCompleted.toString());
  }, [activitiesCompleted]);

  const watchVideo = () => {
    if (videosWatched < maxVideos) {
      setVideosWatched(prev => prev + 1);
    }
  };

  const completeActivity = () => {
    if (activitiesCompleted < maxActivities) {
      setActivitiesCompleted(prev => prev + 1);
    }
  };

  const resetLimits = () => {
    setVideosWatched(0);
    setActivitiesCompleted(0);
    localStorage.removeItem('videosWatched');
    localStorage.removeItem('activitiesCompleted');
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
