
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SoundProvider } from '@/contexts/SoundContext';
import { EmailValidationProvider } from '@/contexts/EmailValidationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Index from './pages/Index';
import Welcome from './pages/Welcome';
import Auth from './pages/Auth';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Verification from './pages/Verification';
import Profile from './pages/Profile';
import Subjects from './pages/Subjects';
import SubjectTopics from './pages/SubjectTopics';
import Exercises from './pages/Exercises';
import Progress from './pages/Progress';
import Ranking from './pages/Ranking';
import StudyRecommendations from './pages/StudyRecommendations';
import Subscriptions from './pages/Subscriptions';
import Support from './pages/Support';
import Guilds from './pages/Guilds';
import GuildDetails from './pages/GuildDetails';
import MentorImages from './pages/MentorImages';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <SoundProvider>
            <AuthProvider>
              <EmailValidationProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verification" element={<Verification />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/subjects" element={<Subjects />} />
                    <Route path="/subjects/:subjectName" element={<SubjectTopics />} />
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/ranking" element={<Ranking />} />
                    <Route path="/study-recommendations" element={<StudyRecommendations />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/guilds" element={<Guilds />} />
                    <Route path="/guild/:guildId" element={<GuildDetails />} />
                    <Route path="/mentor-images" element={<MentorImages />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
                <Toaster />
                <Sonner />
              </EmailValidationProvider>
            </AuthProvider>
          </SoundProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
