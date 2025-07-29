
import React from 'react';
import { useParams } from 'react-router-dom';
import GuildDetails from './GuildDetails';

const GuildDetail: React.FC = () => {
  // Redirecionar para GuildDetails usando o mesmo parâmetro
  return <GuildDetails />;
};

export default GuildDetail;
