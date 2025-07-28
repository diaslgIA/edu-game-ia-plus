
-- Primeiro, vamos limpar e recriar completamente as tabelas relacionadas aos quizzes
-- Isso vai garantir que não haja conflitos ou duplicações

-- Remover triggers e funções existentes
DROP TRIGGER IF EXISTS trigger_update_user_points ON public.quiz_scores;
DROP TRIGGER IF EXISTS trigger_update_user_rankings ON public.profiles;
DROP FUNCTION IF EXISTS update_user_points_after_quiz();
DROP FUNCTION IF EXISTS update_user_rankings();
DROP FUNCTION IF EXISTS register_quiz_question_activity(text, text, uuid, integer, integer, integer);

-- Recriar tabela quiz_scores (limpa e nova)
DROP TABLE IF EXISTS public.quiz_scores CASCADE;
CREATE TABLE public.quiz_scores (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subject text NOT NULL,
    score integer NOT NULL DEFAULT 0,
    total_questions integer NOT NULL DEFAULT 0,
    time_spent integer DEFAULT 0,
    completed_at timestamp with time zone DEFAULT now()
);

-- Recriar tabela user_activities (limpa e nova)
DROP TABLE IF EXISTS public.user_activities CASCADE;
CREATE TABLE public.user_activities (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_type text NOT NULL,
    subject text NOT NULL,
    topic text,
    question_id uuid,
    user_answer integer,
    correct_answer integer,
    is_correct boolean,
    points_earned integer DEFAULT 0,
    time_spent integer DEFAULT 0,
    metadata jsonb DEFAULT '{}',
    created_at timestamp with time zone DEFAULT now()
);

-- Limpar e recriar tabela user_rankings
DROP TABLE IF EXISTS public.user_rankings CASCADE;
CREATE TABLE public.user_rankings (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name text NOT NULL,
    total_points integer NOT NULL DEFAULT 0,
    position integer NOT NULL DEFAULT 0,
    title text DEFAULT 'Explorador do Saber',
    badge text DEFAULT '📚',
    updated_at timestamp with time zone DEFAULT now()
);

-- Criar índice único para user_id na tabela user_rankings
CREATE UNIQUE INDEX idx_user_rankings_user_id ON public.user_rankings(user_id);

-- Habilitar RLS nas tabelas
ALTER TABLE public.quiz_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_rankings ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para quiz_scores (simples e diretas)
CREATE POLICY "quiz_scores_policy" ON public.quiz_scores
    FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para user_activities (simples e diretas)
CREATE POLICY "user_activities_policy" ON public.user_activities
    FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para user_rankings (leitura pública, escrita restrita)
CREATE POLICY "user_rankings_select" ON public.user_rankings
    FOR SELECT USING (true);

CREATE POLICY "user_rankings_insert" ON public.user_rankings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_rankings_update" ON public.user_rankings
    FOR UPDATE USING (auth.uid() = user_id);

-- Função para recalcular rankings (simplificada)
CREATE OR REPLACE FUNCTION public.recalculate_all_rankings()
RETURNS void AS $$
BEGIN
    -- Atualizar posições baseadas nos pontos
    WITH ranked_users AS (
        SELECT 
            user_id,
            total_points,
            ROW_NUMBER() OVER (ORDER BY total_points DESC) as new_position
        FROM public.user_rankings
    )
    UPDATE public.user_rankings ur
    SET 
        position = ru.new_position,
        title = CASE 
            WHEN ru.new_position = 1 THEN 'Herói da Educação'
            WHEN ru.new_position = 2 THEN 'Guardião do Conhecimento'
            WHEN ru.new_position = 3 THEN 'Mestre dos Estudos'
            WHEN ru.new_position <= 5 THEN 'Especialista Acadêmico'
            WHEN ru.new_position <= 10 THEN 'Estudante Exemplar'
            WHEN ru.new_position <= 20 THEN 'Aprendiz Dedicado'
            ELSE 'Explorador do Saber'
        END,
        badge = CASE 
            WHEN ru.new_position = 1 THEN '🏆'
            WHEN ru.new_position = 2 THEN '🥈'
            WHEN ru.new_position = 3 THEN '🥉'
            WHEN ru.new_position <= 5 THEN '⭐'
            WHEN ru.new_position <= 10 THEN '🌟'
            WHEN ru.new_position <= 20 THEN '💫'
            ELSE '📚'
        END,
        updated_at = now()
    FROM ranked_users ru
    WHERE ur.user_id = ru.user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para atualizar pontos após quiz (simplificada)
CREATE OR REPLACE FUNCTION public.update_user_points_after_quiz()
RETURNS TRIGGER AS $$
BEGIN
    -- Atualizar pontos no perfil do usuário
    UPDATE public.profiles 
    SET 
        points = COALESCE(points, 0) + NEW.score,
        level = GREATEST(1, FLOOR((COALESCE(points, 0) + NEW.score) / 100) + 1),
        updated_at = now()
    WHERE id = NEW.user_id;
    
    -- Inserir ou atualizar ranking do usuário
    INSERT INTO public.user_rankings (user_id, full_name, total_points)
    SELECT 
        NEW.user_id,
        p.full_name,
        p.points
    FROM public.profiles p
    WHERE p.id = NEW.user_id
    ON CONFLICT (user_id) 
    DO UPDATE SET
        total_points = EXCLUDED.total_points,
        updated_at = now();
    
    -- Recalcular posições
    PERFORM public.recalculate_all_rankings();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para registrar atividade de questão (simplificada)
CREATE OR REPLACE FUNCTION public.register_quiz_question_activity(
    p_subject text,
    p_topic text,
    p_question_id uuid,
    p_user_answer integer,
    p_correct_answer integer,
    p_time_spent integer
) RETURNS void AS $$
BEGIN
    INSERT INTO public.user_activities (
        user_id,
        activity_type,
        subject,
        topic,
        question_id,
        user_answer,
        correct_answer,
        is_correct,
        points_earned,
        time_spent
    ) VALUES (
        auth.uid(),
        'quiz_question',
        p_subject,
        p_topic,
        p_question_id,
        p_user_answer,
        p_correct_answer,
        p_user_answer = p_correct_answer,
        CASE WHEN p_user_answer = p_correct_answer THEN 10 ELSE 0 END,
        p_time_spent
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recriar o trigger para quiz_scores
CREATE TRIGGER trigger_update_user_points
    AFTER INSERT ON public.quiz_scores
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_points_after_quiz();

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_quiz_scores_user_id ON public.quiz_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_scores_subject ON public.quiz_scores(subject);
CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON public.user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_subject ON public.user_activities(subject);

-- Inserir dados iniciais no ranking para usuários existentes
INSERT INTO public.user_rankings (user_id, full_name, total_points)
SELECT 
    p.id,
    p.full_name,
    COALESCE(p.points, 0)
FROM public.profiles p
WHERE NOT EXISTS (
    SELECT 1 FROM public.user_rankings ur WHERE ur.user_id = p.id
);

-- Recalcular posições iniciais
SELECT public.recalculate_all_rankings();
