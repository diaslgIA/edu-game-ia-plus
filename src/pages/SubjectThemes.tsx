import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import MobileContainer from '@/components/MobileContainer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SubjectThemesDebugger = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const [debugMessage, setDebugMessage] = useState('Iniciando depuração...');

  const subjectNames: { [key: string]: string } = {
    'matematica': 'Matemática',
    'portugues': 'Português',
    'fisica': 'Física',
    'quimica': 'Química',
    'biologia': 'Biologia',
    'historia': 'História',
    'geografia': 'Geografia',
    'filosofia': 'Filosofia',
    'sociologia': 'Sociologia',
  };

  useEffect(() => {
    if (!subject) {
      console.error("DEBUG: Parâmetro 'subject' da URL não encontrado.");
      setDebugMessage("ERRO: Matéria não encontrada na URL.");
      return;
    }

    const capitalizedSubject = subjectNames[subject.toLowerCase()];

    if (!capitalizedSubject) {
      console.error(`DEBUG: Nome de matéria inválido na URL: ${subject}`);
      setDebugMessage(`ERRO: "${subject}" não é uma matéria válida.`);
      return;
    }

    console.log(`DEBUG: Iniciando busca para a matéria: "${capitalizedSubject}"`);
    setDebugMessage(`Buscando temas para "${capitalizedSubject}"...`);

    const loadThemesForDebug = async () => {
      const { data, error } = await supabase
        .from('subject_contents')
        .select('grande_tema')
        .eq('subject', capitalizedSubject)
        .not('grande_tema', 'is', null);

      console.log("---------- RESULTADO DO BANCO DE DADOS ----------");
      if (error) {
        console.error("ERRO DO SUPABASE:", error);
        setDebugMessage(`Erro ao consultar o banco: ${error.message}`);
      } else {
        console.log("DADOS RECEBIDOS:", data);
        const temasUnicos = [...new Set(data.map(item => item.grande_tema).filter(Boolean) as string[])];
        console.log("TEMAS ÚNICOS FILTRADOS:", temasUnicos);
        
        if (temasUnicos.length > 0) {
            setDebugMessage(`Sucesso! Encontrados ${temasUnicos.length} temas: ${temasUnicos.join(', ')}`);
        } else {
            setDebugMessage(`Consulta bem-sucedida, mas nenhum tema encontrado para "${capitalizedSubject}". Verifique se o conteúdo foi inserido corretamente no banco.`);
        }
      }
      console.log("-----------------------------------------------");
    };

    loadThemesForDebug();

  }, [subject]);

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full text-white p-4">
        <Button onClick={() => navigate('/subjects')} className="self-start mb-4">
          <ArrowLeft className="mr-2" /> Voltar
        </Button>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Página de Depuração</h1>
          <p className="text-lg">Abra o console do navegador para ver os resultados.</p>
          <div className="mt-6 p-4 bg-black/30 rounded-lg">
            <h2 className="font-semibold mb-2">Status da Busca:</h2>
            <p className="font-mono text-left whitespace-pre-wrap">{debugMessage}</p>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
};

export default SubjectThemesDebugger;
