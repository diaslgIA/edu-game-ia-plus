
-- Criar tabela para armazenar solicitações de suporte
CREATE TABLE public.suporte_duvidas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo_solicitacao text NOT NULL,
  assunto text NOT NULL,
  mensagem text NOT NULL,
  usuario_email text NOT NULL,
  data_criacao timestamp with time zone DEFAULT now() NOT NULL
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.suporte_duvidas ENABLE ROW LEVEL SECURITY;

-- Política para permitir que usuários autenticados insiram suas próprias solicitações
CREATE POLICY "Users can insert their own support requests" ON public.suporte_duvidas
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Política para permitir que usuários vejam apenas suas próprias solicitações
CREATE POLICY "Users can view their own support requests" ON public.suporte_duvidas
  FOR SELECT USING (usuario_email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Política para permitir acesso de leitura para service role (para administradores)
CREATE POLICY "Enable read access for service role" ON public.suporte_duvidas
  FOR SELECT USING (auth.jwt() ->> 'role' = 'service_role');
