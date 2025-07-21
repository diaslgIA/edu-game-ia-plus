
-- Adicionar coluna de explicação na tabela subject_contents para armazenar o conteúdo detalhado
ALTER TABLE "public"."subject_contents" 
ADD COLUMN IF NOT EXISTS "explanation" TEXT;

-- Atualizar a estrutura para suportar melhor os quizzes por tópico
-- Verificar se a tabela subject_questions já tem as colunas necessárias
-- Se não tiver, vamos garantir que ela tenha tudo que precisamos

-- Adicionar coluna quiz_title se não existir
ALTER TABLE "public"."subject_questions" 
ADD COLUMN IF NOT EXISTS "quiz_title" TEXT;

-- Adicionar índices para melhor performance nas consultas
CREATE INDEX IF NOT EXISTS idx_subject_contents_subject_grande_tema 
ON "public"."subject_contents" (subject, grande_tema);

CREATE INDEX IF NOT EXISTS idx_subject_questions_subject_topic 
ON "public"."subject_questions" (subject, topic);
