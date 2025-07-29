
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle, Loader } from 'lucide-react';
import { initializeGamifiedContent, normalizeSubjectNames } from '@/utils/contentInitializer';
import { useToast } from '@/hooks/use-toast';

const ContentInitializerButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const { toast } = useToast();

  const handleInitialize = async () => {
    setLoading(true);
    
    try {
      // Primeiro normalizar nomes de matérias
      await normalizeSubjectNames();
      
      // Depois inicializar conteúdo gamificado
      const success = await initializeGamifiedContent();
      
      if (success) {
        setInitialized(true);
        toast({
          title: "Conteúdo Gamificado Inicializado! 🎉",
          description: "Todo o conteúdo interativo foi carregado com sucesso. Agora você pode explorar os módulos gamificados!",
        });
      } else {
        toast({
          title: "Erro na Inicialização",
          description: "Houve um problema ao carregar o conteúdo. Verifique o console para mais detalhes.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Erro durante inicialização:', error);
      toast({
        title: "Erro Inesperado",
        description: "Ocorreu um erro inesperado durante a inicialização.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-white/20">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-2">
          🎮 Ativar Conteúdo Gamificado
        </h3>
        <p className="text-white/80 text-sm">
          Carregue todo o conteúdo interativo com teoria, atividades e desafios
        </p>
      </div>
      
      <Button
        onClick={handleInitialize}
        disabled={loading || initialized}
        className={`w-full ${
          initialized 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-purple-500 hover:bg-purple-600'
        } text-white font-bold py-3`}
      >
        {loading ? (
          <>
            <Loader className="mr-2 animate-spin" size={20} />
            Inicializando...
          </>
        ) : initialized ? (
          <>
            <CheckCircle className="mr-2" size={20} />
            Conteúdo Ativo!
          </>
        ) : (
          <>
            <Download className="mr-2" size={20} />
            Inicializar Conteúdo
          </>
        )}
      </Button>
      
      {initialized && (
        <p className="text-green-400 text-center text-xs mt-2">
          ✅ Agora você pode acessar os módulos gamificados completos!
        </p>
      )}
    </div>
  );
};

export default ContentInitializerButton;
