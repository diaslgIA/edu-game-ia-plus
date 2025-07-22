
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Database, AlertCircle, CheckCircle } from 'lucide-react';

interface DatabaseStats {
  table: string;
  count: number;
  subjects: string[];
}

interface SubjectMapping {
  original: string;
  standardized: string;
  needsUpdate: boolean;
}

const DiagnosticReport = () => {
  const [stats, setStats] = useState<DatabaseStats[]>([]);
  const [subjectMappings, setSubjectMappings] = useState<SubjectMapping[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<string>('');

  const standardSubjects = {
    'matematica': 'Matemática',
    'portugues': 'Português',
    'historia': 'História',
    'geografia': 'Geografia',
    'fisica': 'Física',
    'quimica': 'Química',
    'biologia': 'Biologia',
    'filosofia': 'Filosofia',
    'sociologia': 'Sociologia',
    'literatura': 'Literatura',
    'ingles': 'Inglês',
    'espanhol': 'Espanhol',
    'redacao': 'Redação'
  };

  const auditDatabase = async () => {
    setIsLoading(true);
    const reportLines: string[] = [];
    reportLines.push('=== RELATÓRIO DE AUDITORIA - CONTEÚDOS DAS DISCIPLINAS ===');
    reportLines.push(`Data: ${new Date().toLocaleString('pt-BR')}`);
    reportLines.push('');

    try {
      // 1. Auditar tabela subject_contents
      console.log('🔍 Auditando tabela subject_contents...');
      const { data: contents, error: contentsError } = await supabase
        .from('subject_contents')
        .select('subject, grande_tema, title, id');

      if (contentsError) {
        console.error('Erro ao buscar subject_contents:', contentsError);
        reportLines.push('❌ ERRO: Não foi possível acessar a tabela subject_contents');
        reportLines.push(`Erro: ${contentsError.message}`);
      } else {
        const subjectCounts = contents?.reduce((acc: any, item) => {
          acc[item.subject] = (acc[item.subject] || 0) + 1;
          return acc;
        }, {}) || {};

        reportLines.push('📊 TABELA: subject_contents');
        reportLines.push(`Total de registros: ${contents?.length || 0}`);
        reportLines.push('Distribuição por disciplina:');
        Object.entries(subjectCounts).forEach(([subject, count]) => {
          reportLines.push(`  - ${subject}: ${count} conteúdos`);
        });
        reportLines.push('');

        // Verificar padronização de nomes
        const foundSubjects = Object.keys(subjectCounts);
        const mappings: SubjectMapping[] = foundSubjects.map(subject => {
          const normalized = subject.toLowerCase().replace(/[áàâã]/g, 'a').replace(/[éê]/g, 'e').replace(/[í]/g, 'i').replace(/[óôõ]/g, 'o').replace(/[ú]/g, 'u').replace(/[ç]/g, 'c');
          const standardized = standardSubjects[normalized as keyof typeof standardSubjects] || subject;
          return {
            original: subject,
            standardized,
            needsUpdate: subject !== standardized
          };
        });
        setSubjectMappings(mappings);

        reportLines.push('🔤 ANÁLISE DE PADRONIZAÇÃO:');
        mappings.forEach(mapping => {
          if (mapping.needsUpdate) {
            reportLines.push(`  ⚠️  "${mapping.original}" → "${mapping.standardized}" (PRECISA ATUALIZAR)`);
          } else {
            reportLines.push(`  ✅ "${mapping.original}" (PADRONIZADO)`);
          }
        });
        reportLines.push('');

        setStats([{
          table: 'subject_contents',
          count: contents?.length || 0,
          subjects: foundSubjects
        }]);
      }

      // 2. Auditar tabela subject_questions
      console.log('🔍 Auditando tabela subject_questions...');
      const { data: questions, error: questionsError } = await supabase
        .from('subject_questions')
        .select('subject, topic, id');

      if (questionsError) {
        console.error('Erro ao buscar subject_questions:', questionsError);
        reportLines.push('❌ ERRO: Não foi possível acessar a tabela subject_questions');
      } else {
        const questionCounts = questions?.reduce((acc: any, item) => {
          acc[item.subject] = (acc[item.subject] || 0) + 1;
          return acc;
        }, {}) || {};

        reportLines.push('📊 TABELA: subject_questions');
        reportLines.push(`Total de registros: ${questions?.length || 0}`);
        reportLines.push('Distribuição por disciplina:');
        Object.entries(questionCounts).forEach(([subject, count]) => {
          reportLines.push(`  - ${subject}: ${count} questões`);
        });
        reportLines.push('');
      }

      // 3. Verificar status das rotas de API
      reportLines.push('🌐 TESTE DE CONECTIVIDADE:');
      const testSubjects = ['História', 'Matemática', 'Física'];
      for (const subject of testSubjects) {
        try {
          const { data, error } = await supabase
            .from('subject_contents')
            .select('*')
            .eq('subject', subject)
            .limit(1);
          
          if (error) {
            reportLines.push(`  ❌ ${subject}: Erro na consulta - ${error.message}`);
          } else {
            reportLines.push(`  ✅ ${subject}: Conexão OK (${data?.length || 0} resultado(s))`);
          }
        } catch (err) {
          reportLines.push(`  ❌ ${subject}: Erro de conexão`);
        }
      }
      reportLines.push('');

      // 4. Recomendações
      reportLines.push('📋 RECOMENDAÇÕES:');
      const needsStandardization = mappings.filter(m => m.needsUpdate);
      if (needsStandardization.length > 0) {
        reportLines.push('  1. Padronizar nomes das disciplinas no banco de dados');
        reportLines.push('  2. Atualizar rotas do front-end para usar nomes padronizados');
        reportLines.push('  3. Verificar mapeamentos de URL nas páginas de disciplinas');
      } else {
        reportLines.push('  ✅ Nomes das disciplinas estão padronizados');
      }

      if (contents && contents.length > 0) {
        reportLines.push('  ✅ Conteúdos encontrados no banco de dados');
      } else {
        reportLines.push('  ❌ Poucos ou nenhum conteúdo encontrado');
      }

      const finalReport = reportLines.join('\n');
      setReport(finalReport);
      console.log('\n' + finalReport);

    } catch (error) {
      console.error('Erro durante auditoria:', error);
      reportLines.push(`❌ ERRO GERAL: ${error}`);
      setReport(reportLines.join('\n'));
    } finally {
      setIsLoading(false);
    }
  };

  const fixStandardization = async () => {
    console.log('🔧 Iniciando correção de padronização...');
    const fixReport: string[] = [];
    
    for (const mapping of subjectMappings) {
      if (mapping.needsUpdate) {
        try {
          // Atualizar subject_contents
          const { error: contentsError } = await supabase
            .from('subject_contents')
            .update({ subject: mapping.standardized })
            .eq('subject', mapping.original);

          if (contentsError) {
            fixReport.push(`❌ Erro ao atualizar ${mapping.original} em subject_contents: ${contentsError.message}`);
          } else {
            fixReport.push(`✅ Atualizado ${mapping.original} → ${mapping.standardized} em subject_contents`);
          }

          // Atualizar subject_questions
          const { error: questionsError } = await supabase
            .from('subject_questions')
            .update({ subject: mapping.standardized })
            .eq('subject', mapping.original);

          if (questionsError) {
            fixReport.push(`❌ Erro ao atualizar ${mapping.original} em subject_questions: ${questionsError.message}`);
          } else {
            fixReport.push(`✅ Atualizado ${mapping.original} → ${mapping.standardized} em subject_questions`);
          }

        } catch (error) {
          fixReport.push(`❌ Erro geral ao atualizar ${mapping.original}: ${error}`);
        }
      }
    }

    console.log('Correções aplicadas:', fixReport.join('\n'));
    
    // Re-executar auditoria
    await auditDatabase();
  };

  useEffect(() => {
    auditDatabase();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>Diagnóstico do Banco de Dados</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Button onClick={auditDatabase} disabled={isLoading}>
              {isLoading ? 'Auditando...' : 'Executar Auditoria'}
            </Button>
            {subjectMappings.some(m => m.needsUpdate) && (
              <Button onClick={fixStandardization} variant="outline">
                Corrigir Padronização
              </Button>
            )}
          </div>

          {stats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{stat.table}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.count}</div>
                    <div className="text-sm text-gray-600">registros</div>
                    <div className="mt-2 text-xs">
                      {stat.subjects.length} disciplinas encontradas
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {subjectMappings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Status da Padronização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {subjectMappings.map((mapping, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {mapping.needsUpdate ? (
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      <span className="text-sm">
                        {mapping.original}
                        {mapping.needsUpdate && ` → ${mapping.standardized}`}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {report && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Relatório Completo</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-gray-50 p-4 rounded overflow-auto max-h-96">
                  {report}
                </pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticReport;
