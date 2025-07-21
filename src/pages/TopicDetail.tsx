
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, BookOpen, Clock, Target, Lightbulb, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useSound } from '@/contexts/SoundContext';

const TopicDetail = () => {
  const { subject = '', theme = '', topicId = '' } = useParams<{ 
    subject: string; 
    theme: string; 
    topicId: string; 
  }>();
  const navigate = useNavigate();
  const { playSound, isMuted } = useSound();

  const decodedTheme = decodeURIComponent(theme);
  const decodedSubject = decodeURIComponent(subject);

  const { data: topic, isLoading, error } = useQuery({
    queryKey: ['topic-detail', topicId],
    queryFn: async () => {
      console.log('Fetching topic detail for:', topicId);
      
      const { data, error } = await supabase
        .from('subject_contents')
        .select('*')
        .eq('id', topicId)
        .single();

      if (error) {
        console.error('Error fetching topic:', error);
        throw error;
      }

      console.log('Found topic:', data);
      return data;
    },
    enabled: !!topicId,
  });

  const handleBackClick = () => {
    if (!isMuted) playSound('click');
    navigate(`/subjects/${subject}/${theme}`);
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
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <p className="text-red-600">Erro ao carregar o conteúdo. Tente novamente.</p>
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
            <h1 className="text-3xl font-bold text-gray-900">{topic.title}</h1>
            <p className="text-gray-600">{decodedTheme} • {decodedSubject}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Topic Overview */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">Visão Geral</CardTitle>
                  <CardDescription className="text-base">
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
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{topic.estimated_time} minutos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span>Conteúdo Teórico</span>
                </div>
                {topic.key_concepts && topic.key_concepts.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Lightbulb className="h-4 w-4" />
                    <span>{topic.key_concepts.length} conceitos principais</span>
                  </div>
                )}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {topic.explanation}
              </p>
            </CardContent>
          </Card>

          {/* Detailed Explanation */}
          {topic.detailed_explanation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Explicação Detalhada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {topic.detailed_explanation}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Examples */}
          {topic.examples && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Exemplos Práticos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {topic.examples}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Key Concepts */}
          {topic.key_concepts && topic.key_concepts.length > 0 && (
            <Card>
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

          {/* Practical Applications */}
          {topic.practical_applications && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Aplicações Práticas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {topic.practical_applications}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Study Tips */}
          {topic.study_tips && (
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <AlertCircle className="h-5 w-5" />
                  Dicas de Estudo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 leading-relaxed">
                  {topic.study_tips}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
