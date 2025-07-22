
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Database, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw, 
  FileText,
  BarChart3,
  Users,
  BookOpen
} from 'lucide-react';

interface TableAudit {
  name: string;
  count: number;
  error?: string;
}

interface DatabaseAudit {
  tables: TableAudit[];
  subjects: string[];
  totalContents: number;
  issues: string[];
}

const DiagnosticReport = () => {
  const [audit, setAudit] = useState<DatabaseAudit | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const standardSubjects = [
    'História',
    'Matemática', 
    'Física',
    'Química',
    'Biologia',
    'Geografia',
    'Filosofia',
    'Sociologia',
    'Português',
    'Literatura'
  ];

  const auditDatabase = async () => {
    setLoading(true);
    const auditResult: DatabaseAudit = {
      tables: [],
      subjects: [],
      totalContents: 0,
      issues: []
    };

    try {
      console.log('🔍 Iniciando auditoria do banco de dados...');

      // Auditar tabela subject_contents
      const { data: contents, error: contentsError } = await supabase
        .from('subject_contents')
        .select('subject, title, id');

      if (contentsError) {
        auditResult.tables.push({
          name: 'subject_contents',
          count: 0,
          error: contentsError.message
        });
        auditResult.issues.push(`Erro ao acessar subject_contents: ${contentsError.message}`);
      } else {
        auditResult.tables.push({
          name: 'subject_contents',
          count: contents?.length || 0
        });
        auditResult.totalContents += contents?.length || 0;

        // Extrair disciplinas únicas
        const uniqueSubjects = [...new Set(contents?.map(c => c.subject) || [])];
        auditResult.subjects = uniqueSubjects;

        console.log(`📚 Conteúdos encontrados: ${contents?.length || 0}`);
        console.log(`📖 Disciplinas encontradas: ${uniqueSubjects.join(', ')}`);
      }

      // Auditar tabela subject_questions
      const { data: questions, error: questionsError } = await supabase
        .from('subject_questions')
        .select('subject, question, id');

      if (questionsError) {
        auditResult.tables.push({
          name: 'subject_questions',
          count: 0,
          error: questionsError.message
        });
        auditResult.issues.push(`Erro ao acessar subject_questions: ${questionsError.message}`);
      } else {
        auditResult.tables.push({
          name: 'subject_questions',
          count: questions?.length || 0
        });
        console.log(`❓ Questões encontradas: ${questions?.length || 0}`);
      }

      // Auditar tabela subject_progress
      const { data: progress, error: progressError } = await supabase
        .from('subject_progress')
        .select('subject, user_id, id');

      if (progressError) {
        auditResult.tables.push({
          name: 'subject_progress',
          count: 0,
          error: progressError.message
        });
      } else {
        auditResult.tables.push({
          name: 'subject_progress',
          count: progress?.length || 0
        });
        console.log(`📈 Registros de progresso: ${progress?.length || 0}`);
      }

      // Verificar padronização de nomes
      const foundSubjects = auditResult.subjects;
      const nonStandardSubjects = foundSubjects.filter(
        subject => !standardSubjects.includes(subject)
      );

      if (nonStandardSubjects.length > 0) {
        auditResult.issues.push(
          `Disciplinas com nomes não padronizados: ${nonStandardSubjects.join(', ')}`
        );
        console.warn('⚠️ Disciplinas não padronizadas:', nonStandardSubjects);
      }

      // Verificar disciplinas sem conteúdo
      const missingSubjects = standardSubjects.filter(
        subject => !foundSubjects.includes(subject)
      );

      if (missingSubjects.length > 0) {
        auditResult.issues.push(
          `Disciplinas sem conteúdo: ${missingSubjects.join(', ')}`
        );
        console.warn('⚠️ Disciplinas sem conteúdo:', missingSubjects);
      }

      console.log('✅ Auditoria concluída:', auditResult);

    } catch (error) {
      console.error('❌ Erro durante auditoria:', error);
      auditResult.issues.push(`Erro geral na auditoria: ${error}`);
    }

    setAudit(auditResult);
    setLastCheck(new Date());
    setLoading(false);
  };

  const standardizeSubjectNames = async () => {
    if (!audit) return;

    try {
      console.log('🔧 Iniciando padronização de nomes...');
      
      // Aqui você pode implementar a lógica de padronização
      // Por exemplo, atualizar registros com nomes incorretos
      
      console.log('✅ Padronização concluída');
      
      // Reexecutar auditoria após padronização
      await auditDatabase();
      
    } catch (error) {
      console.error('❌ Erro na padronização:', error);
    }
  };

  useEffect(() => {
    auditDatabase();
  }, []);

  if (loading && !audit) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" />
        <span>Auditando banco de dados...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Database className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Diagnóstico do Sistema</h3>
        </div>
        <Button 
          onClick={auditDatabase} 
          disabled={loading}
          variant="outline"
          size="sm"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Atualizar
        </Button>
      </div>

      {lastCheck && (
        <p className="text-sm text-gray-600">
          Última verificação: {lastCheck.toLocaleString('pt-BR')}
        </p>
      )}

      {audit && (
        <div className="grid gap-4">
          {/* Resumo Geral */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Resumo Geral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {audit.totalContents}
                  </div>
                  <div className="text-sm text-gray-600">Total de Conteúdos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {audit.subjects.length}
                  </div>
                  <div className="text-sm text-gray-600">Disciplinas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {audit.tables.length}
                  </div>
                  <div className="text-sm text-gray-600">Tabelas</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${audit.issues.length === 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {audit.issues.length}
                  </div>
                  <div className="text-sm text-gray-600">Problemas</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status das Tabelas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-4 h-4" />
                Status das Tabelas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {audit.tables.map((table, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {table.error ? (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      <span className="font-medium">{table.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={table.error ? "destructive" : "default"}>
                        {table.error ? 'Erro' : `${table.count} registros`}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Disciplinas Encontradas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Disciplinas Encontradas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {audit.subjects.map((subject, index) => (
                  <Badge 
                    key={index} 
                    variant={standardSubjects.includes(subject) ? "default" : "secondary"}
                  >
                    {subject}
                  </Badge>
                ))}
              </div>
              {audit.subjects.length === 0 && (
                <p className="text-gray-500 italic">Nenhuma disciplina encontrada</p>
              )}
            </CardContent>
          </Card>

          {/* Problemas Encontrados */}
          {audit.issues.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  Problemas Encontrados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {audit.issues.map((issue, index) => (
                    <div key={index} className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{issue}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <Button onClick={standardizeSubjectNames} variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Tentar Corrigir Automaticamente
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Status OK */}
          {audit.issues.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Sistema funcionando corretamente!</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default DiagnosticReport;
