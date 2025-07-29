
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

interface ContentViewerProps {
  title?: string;
  content?: string;
}

const ContentViewer: React.FC<ContentViewerProps> = ({ 
  title = 'Conteúdo', 
  content = 'Nenhum conteúdo disponível' 
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          {content}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentViewer;
