
import React from 'react';
import { Navigate } from 'react-router-dom';

const CreateGuild: React.FC = () => {
  // Redirect to existing Guilds page
  return <Navigate to="/guilds" replace />;
};

export default CreateGuild;
