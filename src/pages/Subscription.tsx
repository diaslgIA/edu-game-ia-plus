
import React from 'react';
import { Navigate } from 'react-router-dom';

const Subscription: React.FC = () => {
  // Redirect to existing Subscriptions page
  return <Navigate to="/subscriptions" replace />;
};

export default Subscription;
