
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { EmailValidationProvider } from "@/contexts/EmailValidationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SoundProvider } from "@/contexts/SoundContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Verification from "./pages/Verification";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Progress from "./pages/Progress";
import Ranking from "./pages/Ranking";
import Subjects from "./pages/Subjects";
import SubjectThemes from "./pages/SubjectThemes";
import SubjectTopics from "./pages/SubjectTopics";
import Exercises from "./pages/Exercises";
import StudyRecommendations from "./pages/StudyRecommendations";
import Classes from "./pages/Classes";
import Guilds from "./pages/Guilds";
import GuildDetails from "./pages/GuildDetails";
import Subscriptions from "./pages/Subscriptions";
import Support from "./pages/Support";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <SoundProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AuthProvider>
              <EmailValidationProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verification" element={<Verification />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/ranking" element={<Ranking />} />
                    <Route path="/subjects" element={<Subjects />} />
                    <Route path="/subjects/:subject" element={<SubjectThemes />} />
                    <Route path="/subjects/:subject/:theme" element={<SubjectTopics />} />
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/recommendations" element={<StudyRecommendations />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/guilds" element={<Guilds />} />
                    <Route path="/guilda/:id" element={<GuildDetails />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </EmailValidationProvider>
            </AuthProvider>
          </TooltipProvider>
        </SoundProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
