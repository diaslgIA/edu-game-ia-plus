
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { SoundProvider } from './contexts/SoundContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Subjects from './pages/Subjects';
import SubjectThemes from './pages/SubjectThemes';
import SubjectTopics from './pages/SubjectTopics';
import TopicContent from './pages/TopicContent';
import QuizComponent from './components/QuizComponent';
import FinalReportPage from './pages/FinalReportPage';
import Welcome from './pages/Welcome';
import Verification from './pages/Verification';
import Index from './pages/Index';
import EditProfile from './pages/EditProfile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <SoundProvider>
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/subjects" element={<Subjects />} />
                  <Route path="/subjects/:subject" element={<SubjectThemes />} />
                  <Route path="/subjects/:subject/:theme" element={<SubjectTopics />} />
                  <Route path="/content/:topicId" element={<TopicContent />} />
                  <Route path="/quiz/:topicId" element={<QuizComponent />} />
                  <Route path="/final-report" element={<FinalReportPage />} />
                  <Route path="/welcome" element={<Welcome />} />
                  <Route path="/verification" element={<Verification />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
                <Toaster />
              </QueryClientProvider>
            </AuthProvider>
          </SoundProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
