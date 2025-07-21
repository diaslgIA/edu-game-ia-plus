
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SoundProvider } from "@/contexts/SoundContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import SubjectThemes from "./pages/SubjectThemes";
import ThemeTopics from "./pages/ThemeTopics";
import TopicDetail from "./pages/TopicDetail";
import Profile from "./pages/Profile";
import Guilds from "./pages/Guilds";
import GuildDetails from "./pages/GuildDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SoundProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/subjects/:subject" element={<SubjectThemes />} />
                <Route path="/subjects/:subject/:theme" element={<ThemeTopics />} />
                <Route path="/subjects/:subject/:theme/:topicId" element={<TopicDetail />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/guilds" element={<Guilds />} />
                <Route path="/guilds/:guildId" element={<GuildDetails />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SoundProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
