
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DebugReport {
  timestamp: string;
  databaseAnalysis: any;
  apiTests: any;
  routeTests: any;
  nameInconsistencies: any;
  errors: any[];
}

const DebugAnalyzer = () => {
  const [report, setReport] = useState<DebugReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeDatabase = async () => {
    console.log('🔍 Analisando banco de dados...');
    const analysis: any = {
      tables: {},
      totalContents: 0,
      subjects: []
    };

    try {
      // Verificar tabela subject_contents
      const { data: contents, error: contentsError } = await supabase
        .from('subject_contents')
        .select('*');

      if (contentsError) {
        console.error('❌ Erro ao buscar subject_contents:', contentsError);
        analysis.errors = analysis.errors || [];
        analysis.errors.push(`subject_contents: ${contentsError.message}`);
      } else {
        analysis.tables.subject_contents = {
          total: contents?.length || 0,
          contents: contents || []
        };
        console.log(`📊 subject_contents: ${contents?.length || 0} registros`);
        
        // Agrupar por disciplina
        const subjectGroups = contents?.reduce((acc: any, content: any) => {
          const subject = content.subject;
          if (!acc[subject]) {
            acc[subject] = [];
          }
          acc[subject].push(content);
          return acc;
        }, {}) || {};

        analysis.subjects = Object.keys(subjectGroups).map(subject => ({
          name: subject,
          count: subjectGroups[subject].length,
          contents: subjectGroups[subject],
          grandesTemas: [...new Set(subjectGroups[subject].map((c: any) => c.grande_tema).filter(Boolean))]
        }));

        console.log('📚 Disciplinas encontradas:', analysis.subjects);
      }

      // Verificar tabela subject_questions
      const { data: questions, error: questionsError } = await supabase
        .from('subject_questions')
        .select('*');

      if (questionsError) {
        console.error('❌ Erro ao buscar subject_questions:', questionsError);
        analysis.errors = analysis.errors || [];
        analysis.errors.push(`subject_questions: ${questionsError.message}`);
      } else {
        analysis.tables.subject_questions = {
          total: questions?.length || 0,
          contents: questions || []
        };
        console.log(`❓ subject_questions: ${questions?.length || 0} registros`);
      }

      // Verificar outras tabelas relacionadas usando type assertions
      const tablesToCheck = [
        { name: 'content_progress', table: 'content_progress' as const },
        { name: 'subject_progress', table: 'subject_progress' as const },
        { name: 'quiz_scores', table: 'quiz_scores' as const }
      ];
      
      for (const { name, table } of tablesToCheck) {
        try {
          const { data, error } = await supabase
            .from(table)
            .select('*');

          if (error) {
            console.error(`❌ Erro ao buscar ${name}:`, error);
            analysis.errors = analysis.errors || [];
            analysis.errors.push(`${name}: ${error.message}`);
          } else {
            analysis.tables[name] = {
              total: data?.length || 0,
              contents: data || []
            };
            console.log(`📋 ${name}: ${data?.length || 0} registros`);
          }
        } catch (err) {
          console.error(`🚫 Falha ao acessar ${name}:`, err);
        }
      }

    } catch (error) {
      console.error('💥 Erro geral na análise do banco:', error);
      analysis.errors = analysis.errors || [];
      analysis.errors.push(`Erro geral: ${error}`);
    }

    return analysis;
  };

  const testApiRoutes = async () => {
    console.log('🌐 Testando rotas da API...');
    const apiTests: any = {
      baseConnection: false,
      subjectContents: {},
      errors: []
    };

    try {
      // Testar conexão base
      const { data: testConnection } = await supabase
        .from('subject_contents')
        .select('subject')
        .limit(1);

      apiTests.baseConnection = !!testConnection;
      console.log('🔗 Conexão base com Supabase:', apiTests.baseConnection ? '✅' : '❌');

      // Testar busca por disciplinas específicas
      const subjects = ['Matemática', 'História', 'Português', 'Física', 'Química', 'Biologia'];
      
      for (const subject of subjects) {
        try {
          const { data: subjectData, error } = await supabase
            .from('subject_contents')
            .select('*')
            .eq('subject', subject);

          apiTests.subjectContents[subject] = {
            success: !error,
            count: subjectData?.length || 0,
            data: subjectData || [],
            error: error?.message || null
          };

          console.log(`📖 ${subject}: ${subjectData?.length || 0} conteúdos encontrados`);
        } catch (err) {
          apiTests.subjectContents[subject] = {
            success: false,
            count: 0,
            data: [],
            error: `${err}`
          };
          console.error(`❌ Erro ao buscar ${subject}:`, err);
        }
      }

    } catch (error) {
      console.error('💥 Erro nos testes de API:', error);
      apiTests.errors.push(`${error}`);
    }

    return apiTests;
  };

  const analyzeNameInconsistencies = async () => {
    console.log('🔍 Analisando inconsistências de nomes...');
    const inconsistencies: any = {
      subjectNames: [],
      routeVariations: [],
      caseIssues: [],
      accentIssues: []
    };

    try {
      // Buscar todos os nomes de disciplinas únicos
      const { data: contents } = await supabase
        .from('subject_contents')
        .select('subject');

      const uniqueSubjects = [...new Set(contents?.map((c: any) => c.subject) || [])];
      inconsistencies.subjectNames = uniqueSubjects;

      console.log('📝 Nomes únicos de disciplinas encontrados:', uniqueSubjects);

      // Verificar variações comuns
      const expectedNames = ['Matemática', 'História', 'Português', 'Física', 'Química', 'Biologia', 'Geografia', 'Filosofia', 'Sociologia'];
      
      for (const expected of expectedNames) {
        const variations = uniqueSubjects.filter((name: string) => 
          name.toLowerCase().includes(expected.toLowerCase().replace(/[áàâã]/g, 'a').replace(/[éêë]/g, 'e').replace(/[íîï]/g, 'i').replace(/[óôõ]/g, 'o').replace(/[úûü]/g, 'u').replace(/[ç]/g, 'c'))
        );
        
        if (variations.length > 1 || (variations.length === 1 && variations[0] !== expected)) {
          inconsistencies.routeVariations.push({
            expected: expected,
            found: variations
          });
        }
      }

      console.log('🔄 Variações encontradas:', inconsistencies.routeVariations);

    } catch (error) {
      console.error('💥 Erro na análise de inconsistências:', error);
      inconsistencies.errors = [`${error}`];
    }

    return inconsistencies;
  };

  const testRoutes = async () => {
    console.log('🛣️ Testando rotas do front-end...');
    const routeTests: any = {
      currentRoute: window.location.pathname,
      availableRoutes: [],
      errors: []
    };

    try {
      // Simular navegação para diferentes rotas (sem realmente navegar)
      const testRoutes = [
        '/subjects',
        '/subjects/matematica',
        '/subjects/historia',
        '/subjects/portugues'
      ];

      routeTests.availableRoutes = testRoutes;
      console.log('🗺️ Rotas disponíveis para teste:', testRoutes);
      console.log('📍 Rota atual:', routeTests.currentRoute);

    } catch (error) {
      console.error('💥 Erro nos testes de rota:', error);
      routeTests.errors.push(`${error}`);
    }

    return routeTests;
  };

  const generateReport = async () => {
    setIsAnalyzing(true);
    console.log('🚀 Iniciando análise completa...');

    try {
      const timestamp = new Date().toISOString();
      const databaseAnalysis = await analyzeDatabase();
      const apiTests = await testApiRoutes();
      const nameInconsistencies = await analyzeNameInconsistencies();
      const routeTests = await testRoutes();

      const fullReport: DebugReport = {
        timestamp,
        databaseAnalysis,
        apiTests,
        nameInconsistencies,
        routeTests,
        errors: []
      };

      setReport(fullReport);

      // Gerar arquivo de relatório
      const reportContent = `
RELATÓRIO DE DEBUG - CONTEÚDOS DAS DISCIPLINAS
==============================================
Timestamp: ${timestamp}

1. ANÁLISE DO BANCO DE DADOS
----------------------------
Total de tabelas analisadas: ${Object.keys(databaseAnalysis.tables).length}

subject_contents: ${databaseAnalysis.tables.subject_contents?.total || 0} registros
subject_questions: ${databaseAnalysis.tables.subject_questions?.total || 0} registros
content_progress: ${databaseAnalysis.tables.content_progress?.total || 0} registros
subject_progress: ${databaseAnalysis.tables.subject_progress?.total || 0} registros
quiz_scores: ${databaseAnalysis.tables.quiz_scores?.total || 0} registros

Disciplinas encontradas:
${databaseAnalysis.subjects.map((s: any) => `- ${s.name}: ${s.count} conteúdos, ${s.grandesTemas.length} grandes temas`).join('\n')}

2. TESTES DE API
----------------
Conexão base: ${apiTests.baseConnection ? 'OK' : 'FALHA'}

Testes por disciplina:
${Object.entries(apiTests.subjectContents).map(([subject, data]: [string, any]) => 
  `- ${subject}: ${data.success ? 'OK' : 'FALHA'} (${data.count} conteúdos)${data.error ? ` - Erro: ${data.error}` : ''}`
).join('\n')}

3. INCONSISTÊNCIAS DE NOMES
---------------------------
Nomes únicos encontrados: ${nameInconsistencies.subjectNames.join(', ')}

Variações detectadas:
${nameInconsistencies.routeVariations.map((v: any) => `- Esperado: ${v.expected}, Encontrado: ${v.found.join(', ')}`).join('\n')}

4. TESTES DE ROTAS
------------------
Rota atual: ${routeTests.currentRoute}
Rotas disponíveis: ${routeTests.availableRoutes.join(', ')}

5. ERROS ENCONTRADOS
--------------------
Banco de dados: ${databaseAnalysis.errors?.length || 0} erro(s)
API: ${apiTests.errors?.length || 0} erro(s)
Nomes: ${nameInconsistencies.errors?.length || 0} erro(s)
Rotas: ${routeTests.errors?.length || 0} erro(s)

6. DIAGNÓSTICO GERAL
--------------------
${databaseAnalysis.tables.subject_contents?.total > 0 ? 
  '✅ Dados existem no banco de dados' : 
  '❌ Não foram encontrados dados no banco'}

${apiTests.baseConnection ? 
  '✅ Conexão com a API está funcionando' : 
  '❌ Falha na conexão com a API'}

${nameInconsistencies.routeVariations.length === 0 ? 
  '✅ Nomes das disciplinas estão consistentes' : 
  '⚠️ Inconsistências de nomes detectadas'}

CONCLUSÃO:
${databaseAnalysis.tables.subject_contents?.total > 0 && apiTests.baseConnection ?
  'Os dados estão no banco e a API funciona. O problema pode estar na renderização do front-end.' :
  'Problema detectado na camada de dados ou API.'
}
`;

      // Simular criação do arquivo (no console para visualização)
      console.log('📄 RELATÓRIO COMPLETO:');
      console.log(reportContent);

      // Criar arquivo virtual
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'relatorio_debug_conteudos.txt';
      a.click();
      URL.revokeObjectURL(url);

      console.log('✅ Análise completa finalizada!');

    } catch (error) {
      console.error('💥 Erro durante a análise:', error);
      setReport({
        timestamp: new Date().toISOString(),
        databaseAnalysis: {},
        apiTests: {},
        nameInconsistencies: {},
        routeTests: {},
        errors: [`${error}`]
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>🔍</span>
          <span>Debug Analyzer - Diagnóstico de Conteúdos</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600">
          Esta ferramenta analisa por que os conteúdos das disciplinas não estão aparecendo no front-end.
          <br />
          <strong>Importante:</strong> Apenas diagnostica, não altera nada no app.
        </div>

        <Button 
          onClick={generateReport} 
          disabled={isAnalyzing}
          className="w-full"
        >
          {isAnalyzing ? '🔄 Analisando...' : '🚀 Iniciar Análise Completa'}
        </Button>

        {report && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">📊 Resumo do Diagnóstico</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded border">
                <h4 className="font-medium text-sm">🗄️ Banco de Dados</h4>
                <p className="text-sm">
                  {report.databaseAnalysis.subjects?.length || 0} disciplinas encontradas
                </p>
                <p className="text-sm">
                  {report.databaseAnalysis.tables?.subject_contents?.total || 0} conteúdos totais
                </p>
              </div>

              <div className="p-3 bg-white rounded border">
                <h4 className="font-medium text-sm">🌐 API</h4>
                <p className="text-sm">
                  Conexão: {report.apiTests.baseConnection ? '✅ OK' : '❌ Falha'}
                </p>
                <p className="text-sm">
                  {Object.keys(report.apiTests.subjectContents || {}).length} disciplinas testadas
                </p>
              </div>

              <div className="p-3 bg-white rounded border">
                <h4 className="font-medium text-sm">📝 Nomes</h4>
                <p className="text-sm">
                  {report.nameInconsistencies.subjectNames?.length || 0} nomes únicos
                </p>
                <p className="text-sm">
                  {report.nameInconsistencies.routeVariations?.length || 0} inconsistências
                </p>
              </div>

              <div className="p-3 bg-white rounded border">
                <h4 className="font-medium text-sm">🛣️ Rotas</h4>
                <p className="text-sm">
                  Atual: {report.routeTests.currentRoute}
                </p>
                <p className="text-sm">
                  {report.routeTests.availableRoutes?.length || 0} rotas testadas
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded border">
              <h4 className="font-medium text-sm">🎯 Diagnóstico Principal</h4>
              <p className="text-sm mt-1">
                {report.databaseAnalysis.tables?.subject_contents?.total > 0 && report.apiTests.baseConnection
                  ? '✅ Dados existem no banco e API funciona. Problema pode estar na renderização do front-end.'
                  : '❌ Problema detectado na camada de dados ou API.'
                }
              </p>
            </div>

            <div className="mt-3 text-xs text-gray-500">
              📄 Relatório completo salvo como 'relatorio_debug_conteudos.txt' e disponível no console do navegador.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DebugAnalyzer;
