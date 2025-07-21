
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, BookOpen, Clock, Target, Lightbulb } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSound } from '@/contexts/SoundContext';

const ThemeTopics = () => {
  const { subject = '', theme = '' } = useParams<{ subject: string; theme: string }>();
  const navigate = useNavigate();
  const { playSound, isMuted } = useSound();

  const decodedTheme = decodeURIComponent(theme);
  const decodedSubject = decodeURIComponent(subject);

  const { data: topics = [], isLoading, error } = useQuery({
    queryKey: ['theme-topics', decodedSubject, decodedTheme],
    queryFn: async () => {
      console.log('Fetching topics for:', decodedSubject, decodedTheme);
      
      const { data, error } = await supabase
        .from('subject_contents')
        .select('*')
        .eq('subject', decodedSubject)
        .eq('grande_tema', decodedTheme)
        .order('order_index', { ascending: true });

      if (error) {
        console.error('Error fetching topics:', error);
        throw error;
      }

      console.log('Found topics:', data);
      return data || [];
    },
    enabled: !!decodedSubject && !!decodedTheme,
  });

  const handleTopicClick = (topicId: string) => {
    if (!isMuted) playSound('click');
    navigate(`/subjects/${subject}/${theme}/${topicId}`);
  };

  const handleBackClick = () => {
    if (!isMuted) playSound('click');
    navigate(`/subjects/${subject}`);
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (level: string) => {
    switch (level) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return level;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-8 w-64" />
          </div>
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <p className="text-red-600">Erro ao carregar tópicos. Tente novamente.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackClick}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{decodedTheme}</h1>
            <p className="text-gray-600">{decodedSubject}</p>
          </div>
        </div>

        {/* Topics Grid */}
        {topics.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhum tópico encontrado para este tema.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {topics.map((topic) => (
              <Card 
                key={topic.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                onClick={() => handleTopicClick(topic.id)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{topic.title}</CardTitle>
                      <CardDescription className="text-base mb-3">
                        {topic.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Badge className={getDifficultyColor(topic.difficulty_level)}>
                        {getDifficultyLabel(topic.difficulty_level)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-gray-700 line-clamp-3">
                      {topic.explanation}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{topic.estimated_time} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>Conteúdo Teórico</span>
                      </div>
                      {topic.key_concepts && topic.key_concepts.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Lightbulb className="h-4 w-4" />
                          <span>{topic.key_concepts.length} conceitos</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeTopics;
