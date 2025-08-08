
-- Adicionar políticas RLS para permitir acesso às questões
CREATE POLICY "Allow authenticated users to view subject questions" 
  ON public.subject_questions 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow anonymous users to view subject questions" 
  ON public.subject_questions 
  FOR SELECT 
  USING (auth.role() = 'anon');
