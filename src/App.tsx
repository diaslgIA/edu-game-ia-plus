
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import { SoundProvider } from "@/contexts/SoundContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import SubjectThemes from "./pages/SubjectThemes";
import ThemeTopics from "./pages/ThemeTopics";
import TopicDetail from "./pages/TopicDetail";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import Guilds from "./pages/Guilds";
import GuildDetails from "./pages/GuildDetails";
import CreateGuild from "./pages/CreateGuild";
import Rankings from "./pages/Rankings";
import StudyPlans from "./pages/StudyPlans";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <SoundProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/subjects" element={
                  <ProtectedRoute>
                    <Subjects />
                  </ProtectedRoute>
                } />
                <Route path="/subjects/:subject" element={
                  <ProtectedRoute>
                    <SubjectThemes />
                  </ProtectedRoute>
                } />
                <Route path="/subjects/:subject/:theme" element={
                  <ProtectedRoute>
                    <ThemeTopics />
                  </ProtectedRoute>
                } />
                <Route path="/subjects/:subject/:theme/:topicId" element={
                  <ProtectedRoute>
                    <TopicDetail />
                  </ProtectedRoute>
                } />
                <Route path="/quiz/:subject" element={
                  <ProtectedRoute>
                    <Quiz />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/guilds" element={
                  <ProtectedRoute>
                    <Guilds />
                  </ProtectedRoute>
                } />
                <Route path="/guilds/:guildId" element={
                  <ProtectedRoute>
                    <GuildDetails />
                  </ProtectedRoute>
                } />
                <Route path="/create-guild" element={
                  <ProtectedRoute>
                    <CreateGuild />
                  </ProtectedRoute>
                } />
                <Route path="/rankings" element={
                  <ProtectedRoute>
                    <Rankings />
                  </ProtectedRoute>
                } />
                <Route path="/study-plans" element={
                  <ProtectedRoute>
                    <StudyPlans />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SoundProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}

export default App;
