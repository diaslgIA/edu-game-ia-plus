
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Star } from 'lucide-react';

interface GamifiedContentViewerProps {
  title?: string;
  content?: string;
  points?: number;
}

const GamifiedContentViewer: React.FC<GamifiedContentViewerProps> = ({ 
  title = 'Conteúdo Gamificado', 
  content = 'Nenhum conteúdo disponível',
  points = 0 
}) => {
  return (
    <Card className="w-full border-2 border-purple-200">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5" />
            {title}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{points} pts</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="prose prose-sm max-w-none">
          {content}
        </div>
      </CardContent>
    </Card>
  );
};

export default GamifiedContentViewer;
