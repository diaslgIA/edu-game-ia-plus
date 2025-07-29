
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SoundProvider } from "@/contexts/SoundContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Import pages
import Index from "./pages/Index";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Exercises from "./pages/Exercises";
import Support from "./pages/Support";
import Guilds from "./pages/Guilds";
import GuildDetails from "./pages/GuildDetails";
import Ranking from "./pages/Ranking";
import Profile from "./pages/Profile";
import Premium from "./pages/Premium";
import Subjects from "./pages/Subjects";
import SubjectTopics from "./pages/SubjectTopics";
import SubjectThemes from "./pages/SubjectThemes";
import Progress from "./pages/Progress";
import StudyRecommendations from "./pages/StudyRecommendations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SoundProvider>
            <LanguageProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/welcome" element={<Welcome />} />
                  
                  {/* Protected routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/exercises" element={
                    <ProtectedRoute>
                      <Exercises />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/support" element={
                    <ProtectedRoute>
                      <Support />
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
                  
                  <Route path="/ranking" element={
                    <ProtectedRoute>
                      <Ranking />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/premium" element={
                    <ProtectedRoute>
                      <Premium />
                    </ProtectedRoute>
                  } />

                  <Route path="/subjects" element={
                    <ProtectedRoute>
                      <Subjects />
                    </ProtectedRoute>
                  } />

                  <Route path="/subjects/:subjectId" element={
                    <ProtectedRoute>
                      <SubjectTopics />
                    </ProtectedRoute>
                  } />

                  <Route path="/subjects/:subject/:theme" element={
                    <ProtectedRoute>
                      <SubjectThemes />
                    </ProtectedRoute>
                  } />

                  <Route path="/progress" element={
                    <ProtectedRoute>
                      <Progress />
                    </ProtectedRoute>
                  } />

                  <Route path="/study-recommendations" element={
                    <ProtectedRoute>
                      <StudyRecommendations />
                    </ProtectedRoute>
                  } />
                  
                  {/* Redirect subscriptions to premium */}
                  <Route path="/subscriptions" element={<Navigate to="/premium" replace />} />
                  <Route path="/subscription" element={<Navigate to="/premium" replace />} />
                  
                  {/* Catch all route */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </TooltipProvider>
            </LanguageProvider>
          </SoundProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
