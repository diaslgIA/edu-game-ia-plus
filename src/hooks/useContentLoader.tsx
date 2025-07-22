
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

// Hook para buscar todas as matérias
export const useSubjects = () => {
  return useQuery<Subject[], Error>({
    queryKey: ['subjects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Subjects')
        .select('id, name, description')
        .order('name');
      
      if (error) throw new Error(`Erro ao carregar matérias: ${error.message}`);
      return data || [];
    },
  });
};

// Hook para buscar os Temas de uma Matéria (Case-Insensitive)
export const useThemes = (subjectName: string | undefined) => {
  return useQuery<Theme[], Error>({
    queryKey: ['themes', subjectName],
    queryFn: async () => {
      if (!subjectName) return [];
      
      // Busca case-insensitive usando ilike
      const { data: subjectData, error: subjectError } = await supabase
        .from('Subjects')
        .select('id')
        .ilike('name', subjectName)
        .single();
      
      if (subjectError) throw new Error(`Matéria não encontrada: ${subjectError.message}`);

      const { data, error } = await supabase
        .from('Themes')
        .select('id, name')
        .eq('subject_id', subjectData.id)
        .order('name');
      
      if (error) throw new Error(`Erro ao carregar temas: ${error.message}`);
      return data || [];
    },
    enabled: !!subjectName,
  });
};

// Hook para buscar os Tópicos de um Tema (Case-Insensitive)
export const useTopics = (themeName: string | undefined) => {
  return useQuery<Topic[], Error>({
    queryKey: ['topics', themeName],
    queryFn: async () => {
      if (!themeName) return [];
      
      // Busca case-insensitive usando ilike
      const { data: themeData, error: themeError } = await supabase
        .from('Themes')
        .select('id')
        .ilike('name', themeName)
        .single();
      
      if (themeError) throw new Error(`Tema não encontrado: ${themeError.message}`);

      const { data, error } = await supabase
        .from('Topics')
        .select('id, name, explanation')
        .eq('theme_id', themeData.id)
        .order('name');
      
      if (error) throw new Error(`Erro ao carregar tópicos: ${error.message}`);
      return data || [];
    },
    enabled: !!themeName,
  });
};

// Hook para buscar o conteúdo de um Tópico por ID
export const useTopicContent = (topicId: string | null) => {
  return useQuery<Topic | null, Error>({
    queryKey: ['topicContent', topicId],
    queryFn: async () => {
      if (!topicId) return null;
      
      const { data, error } = await supabase
        .from('Topics')
        .select('id, name, explanation')
        .eq('id', topicId)
        .single();
      
      if (error) throw new Error(`Erro ao carregar conteúdo do tópico: ${error.message}`);
      return data;
    },
    enabled: !!topicId,
  });
};

// Hook para buscar uma matéria por nome (para navigation)
export const useSubjectByName = (subjectName: string | undefined) => {
  return useQuery<Subject | null, Error>({
    queryKey: ['subject', subjectName],
    queryFn: async () => {
      if (!subjectName) return null;
      
      const { data, error } = await supabase
        .from('Subjects')
        .select('id, name, description')
        .ilike('name', subjectName)
        .single();
      
      if (error) throw new Error(`Matéria não encontrada: ${error.message}`);
      return data;
    },
    enabled: !!subjectName,
  });
};
