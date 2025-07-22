
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from './contexts/LanguageContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Subjects from './pages/Subjects';
import SubjectThemes from './pages/SubjectThemes';
import SubjectTopics from './pages/SubjectTopics';
import TopicContent from './pages/TopicContent';
import FinalReportPage from './pages/FinalReportPage';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:subject" element={<SubjectThemes />} />
            <Route path="/subjects/:subject/:theme" element={<SubjectTopics />} />
            <Route path="/content/:topicId" element={<TopicContent />} />
            <Route path="/final-report" element={<FinalReportPage />} />
          </Routes>
        </QueryClientProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
