
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Users, Lock, Unlock, Loader2 } from 'lucide-react';

const CreateGuild: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: true
  });

  const generateGuildCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || loading) return;

    // Validações
    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "Nome da guilda é obrigatório.",
        variant: "destructive"
      });
      return;
    }

    if (formData.name.trim().length < 3) {
      toast({
        title: "Erro",
        description: "Nome da guilda deve ter pelo menos 3 caracteres.",
        variant: "destructive"
      });
      return;
    }

    if (formData.name.trim().length > 50) {
      toast({
        title: "Erro",
        description: "Nome da guilda deve ter no máximo 50 caracteres.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      const guildCode = generateGuildCode();

      console.log('Creating guild with data:', {
        name: formData.name.trim(),
        description: formData.description.trim(),
        code: guildCode,
        isPublic: formData.isPublic,
        ownerId: user.id
      });

      // Criar guilda usando a função do banco
      const { data, error } = await supabase.rpc('create_guild_with_owner', {
        guild_name: formData.name.trim(),
        guild_description: formData.description.trim() || '',
        guild_code: guildCode,
        owner_id: user.id,
        is_public: formData.isPublic
      });

      if (error) {
        console.error('Error creating guild:', error);
        
        let errorMessage = "Não foi possível criar a guilda. Tente novamente.";
        
        if (error.message?.includes('duplicate key')) {
          errorMessage = "Já existe uma guilda com este nome ou código. Tente novamente.";
        } else if (error.message?.includes('permission')) {
          errorMessage = "Você não tem permissão para criar guildas. Verifique se está logado.";
        }
        
        toast({
          title: "Erro ao criar guilda",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }

      console.log('Guild creation response:', data);

      // Parse the JSON response properly e verificar se tem ID
      let guildResult;
      try {
        guildResult = typeof data === 'string' ? JSON.parse(data) : data;
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        guildResult = data;
      }
      
      if (guildResult && typeof guildResult === 'object' && 'id' in guildResult && guildResult.id) {
        console.log('Guild created successfully with ID:', guildResult.id);
        
        toast({
          title: "Guilda criada!",
          description: `Guilda "${formData.name}" criada com sucesso. Código: ${guildCode}`,
        });

        // Navegar para a nova guilda
        navigate(`/guilds/${guildResult.id}`);
      } else {
        console.error('Unexpected response format:', data);
        
        // Tentar buscar a guilda recém-criada pelo código
        const { data: searchData, error: searchError } = await supabase
          .from('guilds')
          .select('id')
          .eq('guild_code', guildCode)
          .eq('owner_id', user.id)
          .maybeSingle();
          
        if (searchData?.id) {
          console.log('Found guild by code:', searchData.id);
          toast({
            title: "Guilda criada!",
            description: `Guilda "${formData.name}" criada com sucesso. Código: ${guildCode}`,
          });
          navigate(`/guilds/${searchData.id}`);
        } else {
          console.error('Could not find created guild');
          toast({
            title: "Guilda criada",
            description: "Guilda criada com sucesso! Redirecionando para a lista de guildas.",
          });
          navigate('/guilds');
        }
      }
    } catch (error) {
      console.error('Error creating guild:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        {/* Header */}
        <div className="bg-white/15 backdrop-blur-md text-white p-4 rounded-b-3xl shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/guilds')}
              className="text-white p-2"
              disabled={loading}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold flex items-center">
              <Users className="mr-3" size={24} />
              Criar Guilda
            </h1>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">
                Nome da Guilda *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Digite o nome da sua guilda..."
                className="bg-white/90 border-white/30 text-gray-900 placeholder:text-gray-500"
                maxLength={50}
                required
                disabled={loading}
              />
              <p className="text-xs text-white/70 mt-1">
                Entre 3 e 50 caracteres ({formData.name.length}/50)
              </p>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Descrição
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva o objetivo da sua guilda..."
                className="bg-white/90 border-white/30 min-h-[100px] text-gray-900 placeholder:text-gray-500"
                maxLength={200}
                disabled={loading}
              />
              <p className="text-xs text-white/70 mt-1">
                Opcional - Máximo 200 caracteres ({formData.description.length}/200)
              </p>
            </div>

            <div>
              <label className="block text-white font-medium mb-3">
                Privacidade
              </label>
              <div className="space-y-3">
                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.isPublic 
                      ? 'bg-white/20 border-white/50' 
                      : 'bg-white/10 border-white/20'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => !loading && setFormData(prev => ({ ...prev, isPublic: true }))}
                >
                  <div className="flex items-center space-x-3">
                    <Unlock size={20} className="text-green-400" />
                    <div>
                      <h3 className="text-white font-semibold">Pública</h3>
                      <p className="text-white/70 text-sm">
                        Qualquer usuário pode encontrar e se juntar à guilda
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    !formData.isPublic 
                      ? 'bg-white/20 border-white/50' 
                      : 'bg-white/10 border-white/20'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => !loading && setFormData(prev => ({ ...prev, isPublic: false }))}
                >
                  <div className="flex items-center space-x-3">
                    <Lock size={20} className="text-orange-400" />
                    <div>
                      <h3 className="text-white font-semibold">Privada</h3>
                      <p className="text-white/70 text-sm">
                        Apenas usuários com convite podem se juntar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading || !formData.name.trim() || formData.name.trim().length < 3}
                className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={16} />
                    Criando Guilda...
                  </>
                ) : (
                  'Criar Guilda'
                )}
              </Button>
              
              {formData.name.trim() && formData.name.trim().length < 3 && (
                <p className="text-yellow-300 text-sm mt-2 text-center">
                  Nome deve ter pelo menos 3 caracteres
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      <BottomNavigation />
    </MobileContainer>
  );
};

export default CreateGuild;
