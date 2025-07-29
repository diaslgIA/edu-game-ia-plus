
import { supabase } from '@/integrations/supabase/client';
import { gamifiedContentUpdates } from '@/data/gamifiedContent';

export const initializeGamifiedContent = async () => {
  try {
    console.log('Inicializando conteúdo gamificado...');
    
    // Primeiro, verificar se já existem registros
    const { data: existing } = await supabase
      .from('subject_contents')
      .select('id, subject, title')
      .eq('subject', 'portugues');
      
    console.log('Registros existentes:', existing);

    // Atualizar ou inserir cada conteúdo
    for (const content of gamifiedContentUpdates) {
      const existingRecord = existing?.find(record => 
        record.title.toLowerCase().includes('gramática') || 
        record.title.toLowerCase().includes('morfologia')
      );

      if (existingRecord) {
        console.log(`Atualizando registro existente: ${existingRecord.title}`);
        
        const { error } = await supabase
          .from('subject_contents')
          .update({
            description: content.description,
            content_data: content.content_data,
            interactive_activities: content.interactive_activities,
            challenge_question: content.challenge_question,
            examples: content.examples,
            study_tips: content.study_tips,
            infographic_url: content.infographic_url,
            difficulty_level: content.difficulty_level,
            estimated_time: content.estimated_time,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingRecord.id);
          
        if (error) {
          console.error(`Erro ao atualizar ${existingRecord.title}:`, error);
        } else {
          console.log(`✅ ${existingRecord.title} atualizado com sucesso!`);
        }
      } else {
        console.log(`Inserindo novo registro: ${content.title}`);
        
        const { error } = await supabase
          .from('subject_contents')
          .insert({
            subject: content.subject,
            title: content.title,
            description: content.description,
            content_type: content.content_type,
            difficulty_level: content.difficulty_level,
            estimated_time: content.estimated_time,
            order_index: content.order_index,
            content_data: content.content_data,
            interactive_activities: content.interactive_activities,
            challenge_question: content.challenge_question,
            examples: content.examples,
            study_tips: content.study_tips,
            infographic_url: content.infographic_url,
            is_premium: false
          });
          
        if (error) {
          console.error(`Erro ao inserir ${content.title}:`, error);
        } else {
          console.log(`✅ ${content.title} inserido com sucesso!`);
        }
      }
    }
    
    console.log('🎉 Conteúdo gamificado inicializado com sucesso!');
    return true;
    
  } catch (error) {
    console.error('Erro ao inicializar conteúdo gamificado:', error);
    return false;
  }
};

// Função para verificar e corrigir subject names
export const normalizeSubjectNames = async () => {
  try {
    // Atualizar registros que podem ter "Português" para "portugues"
    const { error } = await supabase
      .from('subject_contents')
      .update({ subject: 'portugues' })
      .or('subject.eq.Português,subject.eq.português,subject.eq.Portugues');
      
    if (error) {
      console.error('Erro ao normalizar nomes de matérias:', error);
    } else {
      console.log('✅ Nomes de matérias normalizados!');
    }
  } catch (error) {
    console.error('Erro na normalização:', error);
  }
};
