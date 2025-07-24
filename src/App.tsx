
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SoundProvider } from "@/contexts/SoundContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { EmailValidationProvider } from "@/contexts/EmailValidationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Exercises from "./pages/Exercises";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import Ranking from "./pages/Ranking";
import Progress from "./pages/Progress";
import Guilds from "./pages/Guilds";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <EmailValidationProvider>
          <AuthProvider>
            <LanguageProvider>
              <SoundProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/subjects" element={<Subjects />} />
                    <Route path="/exercises" element={<Exercises />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/ranking" element={<Ranking />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/guilds" element={<Guilds />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Router>
              </SoundProvider>
            </LanguageProvider>
          </AuthProvider>
        </EmailValidationProvider>
      </ThemeProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
