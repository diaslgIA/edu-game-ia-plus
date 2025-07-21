
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, Target, Lightbulb, Users, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TopicDetail = () => {
  const { subject, theme, topicId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { data: topic, isLoading } = useQuery({
    queryKey: ['topic-detail', topicId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subject_contents')
        .select('*')
        .eq('id', topicId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!topicId
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-4">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-48 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold text-muted-foreground">Tópico não encontrado</h1>
          <Button onClick={() => navigate('/subjects')} className="mt-4">
            Voltar às Matérias
          </Button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'easy': return 'bg-green-500/20 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-500/20 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-500/20 text-red-700 border-red-200';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyText = (level: string) => {
    switch (level) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return 'Não especificado';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Cabeçalho */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(`/subjects/${subject}/${theme}`)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{subject}</span>
            <span>→</span>
            <span>{decodeURIComponent(theme || '')}</span>
          </div>
        </div>

        {/* Título e Informações Básicas */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{topic.title}</CardTitle>
                <p className="text-muted-foreground text-lg mb-4">{topic.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <Badge className={getDifficultyColor(topic.difficulty_level)}>
                    {getDifficultyText(topic.difficulty_level)}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{topic.estimated_time} min</span>
                  </div>
                  {topic.grande_tema && (
                    <Badge variant="outline">{topic.grande_tema}</Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Explicação Principal */}
        {topic.explanation && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Explicação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{topic.explanation}</p>
            </CardContent>
          </Card>
        )}

        {/* Explicação Detalhada */}
        {topic.detailed_explanation && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Conteúdo Completo para Estudo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-base leading-relaxed whitespace-pre-wrap">{topic.detailed_explanation}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Exemplos */}
        {topic.examples && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Exemplos Práticos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-base leading-relaxed whitespace-pre-wrap">{topic.examples}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conceitos-Chave */}
        {topic.key_concepts && Array.isArray(topic.key_concepts) && topic.key_concepts.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Conceitos-Chave
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {topic.key_concepts.map((concept: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {concept}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Aplicações Práticas */}
        {topic.practical_applications && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Como isso aparece no ENEM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-base leading-relaxed whitespace-pre-wrap">{topic.practical_applications}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dicas de Estudo */}
        {topic.study_tips && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Dicas de Estudo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-base leading-relaxed whitespace-pre-wrap">{topic.study_tips}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ações */}
        <div className="flex gap-4 mt-8">
          <Button 
            onClick={() => navigate(`/subjects/${subject}/${theme}`)}
            variant="outline"
            className="flex-1"
          >
            Voltar aos Tópicos
          </Button>
          <Button 
            onClick={() => navigate(`/subjects/${subject}`)}
            className="flex-1"
          >
            Fazer Quiz desta Matéria
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
