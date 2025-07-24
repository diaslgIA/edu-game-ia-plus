
-- Criar tabela para armazenar solicitações de suporte
CREATE TABLE public.support_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  request_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Adicionar RLS (Row Level Security) para que usuários possam ver apenas suas próprias solicitações
ALTER TABLE public.support_requests ENABLE ROW LEVEL SECURITY;

-- Política para que usuários possam criar suas próprias solicitações
CREATE POLICY "Users can create their own support requests" 
  ON public.support_requests 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Política para que usuários possam visualizar suas próprias solicitações
CREATE POLICY "Users can view their own support requests" 
  ON public.support_requests 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Política para que administradores possam visualizar todas as solicitações (se necessário)
CREATE POLICY "Enable read access for service role"
  ON public.support_requests
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'service_role');
