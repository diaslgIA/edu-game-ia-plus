
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SoundProvider } from "./contexts/SoundContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import SubjectThemes from "./pages/SubjectThemes";
import SubjectTopics from "./pages/SubjectTopics";
import Exercises from "./pages/Exercises";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Guilds from "./pages/Guilds";
import GuildDetails from "./pages/GuildDetails";
import Ranking from "./pages/Ranking";
import Subscriptions from "./pages/Subscriptions";
import Support from "./pages/Support";
import StudyRecommendations from "./pages/StudyRecommendations";
import MentorImages from "./pages/MentorImages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/verification" element={<Verification />} />
                  <Route path="/welcome" element={<Welcome />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/subjects" element={<Subjects />} />
                  <Route path="/subjects/:subject" element={<SubjectThemes />} />
                  <Route path="/subjects/:subject/:theme" element={<SubjectTopics />} />
                  <Route path="/exercises" element={<Exercises />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/guilds" element={<Guilds />} />
                  <Route path="/guilds/:id" element={<GuildDetails />} />
                  <Route path="/ranking" element={<Ranking />} />
                  <Route path="/subscriptions" element={<Subscriptions />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/recommendations" element={<StudyRecommendations />} />
                  <Route path="/mentor-images" element={<MentorImages />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
