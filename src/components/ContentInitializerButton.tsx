
import React from 'react';
import { Button } from '@/components/ui/button';
import { Database, Loader2 } from 'lucide-react';

interface ContentInitializerButtonProps {
  onInitialize: () => void;
  isLoading?: boolean;
}

const ContentInitializerButton: React.FC<ContentInitializerButtonProps> = ({ 
  onInitialize, 
  isLoading = false 
}) => {
  return (
    <Button 
      onClick={onInitialize}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Database className="h-4 w-4" />
      )}
      {isLoading ? 'Inicializando...' : 'Inicializar Conteúdo'}
    </Button>
  );
};

export default ContentInitializerButton;
