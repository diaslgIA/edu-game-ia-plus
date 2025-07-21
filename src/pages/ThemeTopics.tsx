
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ThemeTopics = () => {
  const { subject, theme } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const { data: topics, isLoading } = useQuery({
    queryKey: ['theme-topics', subject, theme],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subject_contents')
        .select('*')
        .eq('subject', subject)
        .eq('grande_tema', decodeURIComponent(theme || ''))
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!subject && !!theme
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-4">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 bg-muted rounded"></div>
              ))}
            </div>
          </div>
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
      <div className="container mx-auto p-6">
        {/* Cabeçalho */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(`/subjects/${subject}`)}
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{decodeURIComponent(theme || '')}</h1>
          <p className="text-muted-foreground">
            Selecione um tópico para estudar o conteúdo completo
          </p>
        </div>

        {topics && topics.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Card 
                key={topic.id} 
                className="group hover:shadow-lg transition-all duration-200 cursor-pointer h-full"
                onClick={() => navigate(`/subjects/${subject}/${theme}/${topic.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getDifficultyColor(topic.difficulty_level)}>
                      {getDifficultyText(topic.difficulty_level)}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{topic.estimated_time}min</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {topic.description}
                  </p>
                  
                  {topic.explanation && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {topic.explanation}
                    </p>
                  )}

                  {topic.key_concepts && Array.isArray(topic.key_concepts) && topic.key_concepts.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {topic.key_concepts.slice(0, 3).map((concept: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {concept}
                          </Badge>
                        ))}
                        {topic.key_concepts.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{topic.key_concepts.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <BookOpen className="h-3 w-3" />
                      <span>Conteúdo completo</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum tópico encontrado</h3>
              <p className="text-muted-foreground mb-4">
                Não encontramos tópicos para este tema ainda.
              </p>
              <Button onClick={() => navigate(`/subjects/${subject}`)}>
                Voltar à Matéria
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ThemeTopics;
