
-- Corrigir as políticas RLS da tabela user_rankings
-- O problema é que o trigger precisa de permissões especiais para inserir/atualizar

-- Remover políticas existentes
DROP POLICY IF EXISTS "user_rankings_select" ON public.user_rankings;
DROP POLICY IF EXISTS "user_rankings_insert" ON public.user_rankings;
DROP POLICY IF EXISTS "user_rankings_update" ON public.user_rankings;

-- Criar novas políticas mais permissivas para permitir que triggers funcionem
CREATE POLICY "user_rankings_select_all" ON public.user_rankings
    FOR SELECT USING (true);

CREATE POLICY "user_rankings_insert_authenticated" ON public.user_rankings
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "user_rankings_update_authenticated" ON public.user_rankings
    FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Atualizar a função para ser mais robusta
CREATE OR REPLACE FUNCTION public.update_user_points_after_quiz()
RETURNS TRIGGER AS $$
DECLARE
    user_full_name text;
    user_current_points integer;
BEGIN
    -- Buscar informações do usuário
    SELECT full_name, COALESCE(points, 0) INTO user_full_name, user_current_points
    FROM public.profiles 
    WHERE id = NEW.user_id;
    
    -- Se não encontrar o usuário, criar um registro básico
    IF user_full_name IS NULL THEN
        INSERT INTO public.profiles (id, full_name, email, school_year, points)
        VALUES (NEW.user_id, 'Usuário', 'user@example.com', 'Não informado', NEW.score)
        ON CONFLICT (id) DO UPDATE SET
            points = COALESCE(profiles.points, 0) + NEW.score,
            updated_at = now();
        
        user_full_name := 'Usuário';
        user_current_points := NEW.score;
    ELSE
        -- Atualizar pontos no perfil
        UPDATE public.profiles 
        SET 
            points = user_current_points + NEW.score,
            level = GREATEST(1, FLOOR((user_current_points + NEW.score) / 100) + 1),
            updated_at = now()
        WHERE id = NEW.user_id;
        
        user_current_points := user_current_points + NEW.score;
    END IF;
    
    -- Inserir ou atualizar ranking (usando SECURITY DEFINER para bypass RLS)
    INSERT INTO public.user_rankings (user_id, full_name, total_points)
    VALUES (NEW.user_id, user_full_name, user_current_points)
    ON CONFLICT (user_id) 
    DO UPDATE SET
        full_name = EXCLUDED.full_name,
        total_points = EXCLUDED.total_points,
        updated_at = now();
    
    -- Recalcular posições
    PERFORM public.recalculate_all_rankings();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Garantir que o trigger existe
DROP TRIGGER IF EXISTS trigger_update_user_points ON public.quiz_scores;
CREATE TRIGGER trigger_update_user_points
    AFTER INSERT ON public.quiz_scores
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_points_after_quiz();
