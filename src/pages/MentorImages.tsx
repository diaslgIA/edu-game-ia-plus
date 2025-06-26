
import React from 'react';
import MentorImageGenerator from '@/components/MentorImageGenerator';

const MentorImages: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <MentorImageGenerator />
      </div>
    </div>
  );
};

export default MentorImages;
