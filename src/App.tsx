
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SoundProvider } from "./contexts/SoundContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Subscription from "./pages/Subscription";
import Guilds from "./pages/Guilds";
import GuildDetail from "./pages/GuildDetail";
import CreateGuild from "./pages/CreateGuild";
import JoinGuild from "./pages/JoinGuild";
import Rankings from "./pages/Rankings";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <SoundProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/support"
                  element={
                    <ProtectedRoute>
                      <Support />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subscription"
                  element={
                    <ProtectedRoute>
                      <Subscription />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/guilds"
                  element={
                    <ProtectedRoute>
                      <Guilds />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/guilds/:id"
                  element={
                    <ProtectedRoute>
                      <GuildDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create-guild"
                  element={
                    <ProtectedRoute>
                      <CreateGuild />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/join-guild"
                  element={
                    <ProtectedRoute>
                      <JoinGuild />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/rankings"
                  element={
                    <ProtectedRoute>
                      <Rankings />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </SoundProvider>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
