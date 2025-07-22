import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { QueryClient } from '@tanstack/react-query';
import Subjects from './pages/Subjects';
import SubjectThemes from './pages/SubjectThemes';
import SubjectTopics from './pages/SubjectTopics';
import TopicContent from './pages/TopicContent';
import FinalReportPage from './pages/FinalReportPage';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <QueryClient>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:subject" element={<SubjectThemes />} />
            <Route path="/subjects/:subject/:theme" element={<SubjectTopics />} />
            <Route path="/content/:topicId" element={<TopicContent />} />
            <Route path="/final-report" element={<FinalReportPage />} />
          </Routes>
        </QueryClient>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
