
-- Primeiro, vamos verificar e corrigir a estrutura da tabela quiz_scores
-- Garantir que todos os campos necessários estejam presentes e corretos

-- Verificar se a tabela quiz_scores existe e tem a estrutura correta
CREATE TABLE IF NOT EXISTS public.quiz_scores (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    subject text NOT NULL,
    score integer NOT NULL DEFAULT 0,
    total_questions integer NOT NULL DEFAULT 0,
    time_spent integer DEFAULT 0,
    completed_at timestamp with time zone DEFAULT now()
);

-- Garantir que a tabela user_activities tenha a estrutura correta para registrar atividades
CREATE TABLE IF NOT EXISTS public.user_activities (
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

-- Garantir que os triggers estejam funcionando corretamente
-- Trigger para atualizar pontos do usuário após salvar quiz_score
CREATE OR REPLACE FUNCTION update_user_points_after_quiz()
RETURNS TRIGGER AS $$
BEGIN
    -- Atualizar pontos e nível do usuário
    UPDATE public.profiles 
    SET 
        points = COALESCE(points, 0) + NEW.score,
        level = GREATEST(1, FLOOR((COALESCE(points, 0) + NEW.score) / 100) + 1),
        updated_at = now()
    WHERE id = NEW.user_id;
    
    -- Atualizar ranking do usuário
    INSERT INTO public.user_rankings (user_id, full_name, total_points)
    SELECT 
        p.id,
        p.full_name,
        p.points
    FROM public.profiles p
    WHERE p.id = NEW.user_id
    ON CONFLICT (user_id) 
    DO UPDATE SET
        total_points = EXCLUDED.total_points,
        updated_at = now();
    
    -- Recalcular posições do ranking
    PERFORM public.recalculate_all_rankings();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recriar o trigger se necessário
DROP TRIGGER IF EXISTS trigger_update_user_points ON public.quiz_scores;
CREATE TRIGGER trigger_update_user_points
    AFTER INSERT ON public.quiz_scores
    FOR EACH ROW
    EXECUTE FUNCTION update_user_points_after_quiz();

-- Função para registrar atividade de questão individual
CREATE OR REPLACE FUNCTION register_quiz_question_activity(
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

-- Garantir que as políticas RLS estejam corretas
-- Política para quiz_scores
DROP POLICY IF EXISTS "Users can insert their own quiz scores" ON public.quiz_scores;
CREATE POLICY "Users can insert their own quiz scores" 
    ON public.quiz_scores FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own quiz scores" ON public.quiz_scores;
CREATE POLICY "Users can view their own quiz scores" 
    ON public.quiz_scores FOR SELECT 
    USING (auth.uid() = user_id);

-- Política para user_activities
DROP POLICY IF EXISTS "Users can insert their own activities" ON public.user_activities;
CREATE POLICY "Users can insert their own activities" 
    ON public.user_activities FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own activities" ON public.user_activities;
CREATE POLICY "Users can view their own activities" 
    ON public.user_activities FOR SELECT 
    USING (auth.uid() = user_id);

-- Habilitar RLS nas tabelas
ALTER TABLE public.quiz_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

-- Criar índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_quiz_scores_user_id ON public.quiz_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_scores_subject ON public.quiz_scores(subject);
CREATE INDEX IF NOT EXISTS idx_quiz_scores_completed_at ON public.quiz_scores(completed_at);

CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON public.user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_subject ON public.user_activities(subject);
CREATE INDEX IF NOT EXISTS idx_user_activities_activity_type ON public.user_activities(activity_type);
