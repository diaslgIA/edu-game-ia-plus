
import React from 'react';
import { Navigate } from 'react-router-dom';

const GuildDetail: React.FC = () => {
  // Redirect to existing GuildDetails page
  return <Navigate to="/guilds" replace />;
};

export default GuildDetail;
