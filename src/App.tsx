
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SoundProvider } from './contexts/SoundContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { EmailValidationProvider } from './contexts/EmailValidationContext';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Progress from './pages/Progress';
import Ranking from './pages/Ranking';
import Guilds from './pages/Guilds';
import GuildDetail from './pages/GuildDetail';
import CreateGuild from './pages/CreateGuild';
import JoinGuild from './pages/JoinGuild';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Welcome from './pages/Welcome';
import Subscription from './pages/Subscription';
import Subscriptions from './pages/Subscriptions';
import Exercises from './pages/Exercises';
import Support from './pages/Support';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import LessonViewer from '@/components/LessonViewer';
import ProtectedRoute from '@/components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <SoundProvider>
              <AuthProvider>
                <LanguageProvider>
                  <EmailValidationProvider>
                    <Toaster />
                    <Routes>
                      <Route path="/" element={<Auth />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/welcome" element={<Welcome />} />
                      
                      <Route 
                        path="/dashboard" 
                        element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/subjects" 
                        element={
                          <ProtectedRoute>
                            <Subjects />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/exercises" 
                        element={
                          <ProtectedRoute>
                            <Exercises />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/progress" 
                        element={
                          <ProtectedRoute>
                            <Progress />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/ranking" 
                        element={
                          <ProtectedRoute>
                            <Ranking />
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
                        path="/guilds/:guildId" 
                        element={
                          <ProtectedRoute>
                            <GuildDetail />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/guilds/create" 
                        element={
                          <ProtectedRoute>
                            <CreateGuild />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/guilds/join/:inviteCode" 
                        element={
                          <ProtectedRoute>
                            <JoinGuild />
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
                        path="/subscription" 
                        element={
                          <ProtectedRoute>
                            <Subscription />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/subscriptions" 
                        element={
                          <ProtectedRoute>
                            <Subscriptions />
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
                      
                      {/* Add new lesson route */}
                      <Route 
                        path="/lesson/:subject/:lessonId" 
                        element={
                          <ProtectedRoute>
                            <LessonViewer />
                          </ProtectedRoute>
                        } 
                      />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </EmailValidationProvider>
                </LanguageProvider>
              </AuthProvider>
            </SoundProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </div>
    </Router>
  );
}

export default App;
