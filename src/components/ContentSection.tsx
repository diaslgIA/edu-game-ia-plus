
import React from 'react';
import { BookOpen, Target, Lightbulb, TrendingUp, Bookmark } from 'lucide-react';

interface ContentSectionProps {
  title: string;
  content: string;
  type: 'explanation' | 'detailed_explanation' | 'examples' | 'practical_applications' | 'study_tips';
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, content, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'explanation': return BookOpen;
      case 'detailed_explanation': return Target;
      case 'examples': return Lightbulb;
      case 'practical_applications': return TrendingUp;
      case 'study_tips': return Bookmark;
      default: return BookOpen;
    }
  };

  const IconComponent = getIcon();

  return (
    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
      <div className="flex items-center mb-4">
        <IconComponent size={24} className="text-blue-400 mr-3" />
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="text-white/90 text-base leading-relaxed whitespace-pre-line">
        {content}
      </div>
    </div>
  );
};

export default ContentSection;
