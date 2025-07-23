
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Interfaces para os tipos de dados
export interface Subject { 
  id: string; 
  name: string; 
  description: string | null; 
}

export interface Theme { 
  id: string; 
  name: string; 
}

export interface Topic { 
  id: string; 
  name: string; 
  explanation: string | null; 
}

// Interface para compatibilidade com dados antigos
export interface LegacyContent {
  id: string;
  title: string;
  subject: string;
  grande_tema?: string;
  explanation?: string;
}

// Hook para buscar todas as matérias com fallback
export const useSubjects = () => {
  return useQuery<Subject[], Error>({
    queryKey: ['subjects'],
    queryFn: async () => {
      // Primeiro tenta buscar na nova estrutura
      const { data: newData, error: newError } = await supabase
        .from('Subjects')
        .select('id, name, description')
        .order('name');
      
      if (!newError && newData && newData.length > 0) {
        console.log('Usando dados da nova estrutura (Subjects):', newData);
        return newData;
      }
      
      // Fallback para a estrutura antiga
      console.log('Fallback: buscando na estrutura antiga (subject_contents)');
      const { data: legacyData, error: legacyError } = await supabase
        .from('subject_contents')
        .select('subject')
        .not('subject', 'is', null);
      
      if (legacyError) throw new Error(`Erro ao carregar matérias: ${legacyError.message}`);
      
      // Converte dados antigos para nova interface
      const uniqueSubjects = [...new Set(legacyData?.map(item => item.subject) || [])];
      const convertedData = uniqueSubjects.map((subject, index) => ({
        id: `legacy-${index}`,
        name: subject,
        description: `Matéria migrada do sistema anterior`
      }));
      
      console.log('Dados convertidos da estrutura antiga:', convertedData);
      return convertedData;
    },
  });
};

// Hook para buscar os Temas de uma Matéria com fallback
export const useThemes = (subjectName: string | undefined) => {
  return useQuery<Theme[], Error>({
    queryKey: ['themes', subjectName],
    queryFn: async () => {
      if (!subjectName) return [];
      
      // Primeiro tenta buscar na nova estrutura
      const { data: subjectData, error: subjectError } = await supabase
        .from('Subjects')
        .select('id')
        .ilike('name', subjectName)
        .single();
      
      if (!subjectError && subjectData) {
        const { data: themesData, error: themesError } = await supabase
          .from('Themes')
          .select('id, name')
          .eq('subject_id', subjectData.id)
          .order('name');
        
        if (!themesError && themesData && themesData.length > 0) {
          console.log('Usando temas da nova estrutura:', themesData);
          return themesData;
        }
      }
      
      // Fallback para a estrutura antiga usando grande_tema
      console.log('Fallback: buscando grandes temas da estrutura antiga');
      const { data: legacyData, error: legacyError } = await supabase
        .from('subject_contents')
        .select('grande_tema')
        .ilike('subject', subjectName)
        .not('grande_tema', 'is', null);
      
      if (legacyError) {
        console.error('Erro no fallback para temas:', legacyError);
        return [];
      }
      
      // Converte grandes temas para interface de Theme
      const uniqueThemes = [...new Set(legacyData?.map(item => item.grande_tema).filter(Boolean) || [])];
      const convertedThemes = uniqueThemes.map((theme, index) => ({
        id: `legacy-theme-${index}`,
        name: theme
      }));
      
      console.log('Temas convertidos da estrutura antiga:', convertedThemes);
      return convertedThemes;
    },
    enabled: !!subjectName,
  });
};

// Hook para buscar os Tópicos de um Tema com fallback
export const useTopics = (themeName: string | undefined) => {
  return useQuery<Topic[], Error>({
    queryKey: ['topics', themeName],
    queryFn: async () => {
      if (!themeName) return [];
      
      // Primeiro tenta buscar na nova estrutura
      const { data: themeData, error: themeError } = await supabase
        .from('Themes')
        .select('id')
        .ilike('name', themeName)
        .single();
      
      if (!themeError && themeData) {
        const { data: topicsData, error: topicsError } = await supabase
          .from('Topics')
          .select('id, name, explanation')
          .eq('theme_id', themeData.id)
          .order('name');
        
        if (!topicsError && topicsData && topicsData.length > 0) {
          console.log('Usando tópicos da nova estrutura:', topicsData);
          return topicsData;
        }
      }
      
      // Fallback para a estrutura antiga
      console.log('Fallback: buscando conteúdos da estrutura antiga por grande_tema');
      const { data: legacyData, error: legacyError } = await supabase
        .from('subject_contents')
        .select('id, title, explanation')
        .ilike('grande_tema', themeName);
      
      if (legacyError) {
        console.error('Erro no fallback para tópicos:', legacyError);
        return [];
      }
      
      // Converte conteúdos antigos para interface de Topic
      const convertedTopics = legacyData?.map(content => ({
        id: content.id,
        name: content.title,
        explanation: content.explanation || null
      })) || [];
      
      console.log('Tópicos convertidos da estrutura antiga:', convertedTopics);
      return convertedTopics;
    },
    enabled: !!themeName,
  });
};

// Hook para buscar o conteúdo de um Tópico por ID com fallback
export const useTopicContent = (topicId: string | null) => {
  return useQuery<Topic | null, Error>({
    queryKey: ['topicContent', topicId],
    queryFn: async () => {
      if (!topicId) return null;
      
      // Primeiro tenta buscar na nova estrutura
      const { data: topicData, error: topicError } = await supabase
        .from('Topics')
        .select('id, name, explanation')
        .eq('id', topicId)
        .single();
      
      if (!topicError && topicData) {
        console.log('Usando conteúdo da nova estrutura:', topicData);
        return topicData;
      }
      
      // Fallback para a estrutura antiga
      console.log('Fallback: buscando na estrutura antiga (subject_contents)');
      const { data: legacyData, error: legacyError } = await supabase
        .from('subject_contents')
        .select('id, title, explanation')
        .eq('id', topicId)
        .single();
      
      if (legacyError) {
        console.error('Erro no fallback para conteúdo:', legacyError);
        throw new Error(`Conteúdo não encontrado: ${legacyError.message}`);
      }
      
      // Converte dados antigos para interface de Topic
      const convertedData = {
        id: legacyData.id,
        name: legacyData.title,
        explanation: legacyData.explanation || null
      };
      
      console.log('Conteúdo convertido da estrutura antiga:', convertedData);
      return convertedData;
    },
    enabled: !!topicId,
  });
};

// Hook para buscar uma matéria por nome com fallback
export const useSubjectByName = (subjectName: string | undefined) => {
  return useQuery<Subject | null, Error>({
    queryKey: ['subject', subjectName],
    queryFn: async () => {
      if (!subjectName) return null;
      
      // Primeiro tenta buscar na nova estrutura
      const { data: newData, error: newError } = await supabase
        .from('Subjects')
        .select('id, name, description')
        .ilike('name', subjectName)
        .single();
      
      if (!newError && newData) {
        console.log('Usando matéria da nova estrutura:', newData);
        return newData;
      }
      
      // Fallback para verificar se existe na estrutura antiga
      console.log('Fallback: verificando na estrutura antiga');
      const { data: legacyData, error: legacyError } = await supabase
        .from('subject_contents')
        .select('subject')
        .ilike('subject', subjectName)
        .limit(1)
        .single();
      
      if (legacyError) {
        console.error('Matéria não encontrada em nenhuma estrutura:', legacyError);
        throw new Error(`Matéria não encontrada: ${subjectName}`);
      }
      
      // Converte dados antigos para interface de Subject
      const convertedData = {
        id: 'legacy-subject',
        name: legacyData.subject,
        description: 'Matéria migrada do sistema anterior'
      };
      
      console.log('Matéria convertida da estrutura antiga:', convertedData);
      return convertedData;
    },
    enabled: !!subjectName,
  });
};
