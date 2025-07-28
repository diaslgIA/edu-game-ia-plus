
-- Remover todos os triggers existentes na tabela quiz_scores
DROP TRIGGER IF EXISTS update_user_points_trigger ON public.quiz_scores;
DROP TRIGGER IF EXISTS update_user_rankings_trigger ON public.quiz_scores;
DROP TRIGGER IF EXISTS update_guild_points_trigger ON public.quiz_scores;

-- Remover trigger duplicado na tabela profiles se existir
DROP TRIGGER IF EXISTS update_user_rankings_trigger ON public.profiles;

-- Recriar uma função de trigger mais simples e robusta
CREATE OR REPLACE FUNCTION public.update_user_points_after_quiz()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    user_full_name text;
    user_current_points integer;
BEGIN
    -- Buscar informações do usuário
    SELECT full_name, COALESCE(points, 0) INTO user_full_name, user_current_points
    FROM public.profiles 
    WHERE id = NEW.user_id;
    
    -- Se o usuário não existe, criar um registro básico
    IF user_full_name IS NULL THEN
        INSERT INTO public.profiles (id, full_name, email, school_year, points)
        VALUES (NEW.user_id, 'Usuário', 'user@example.com', 'Não informado', NEW.score)
        ON CONFLICT (id) DO UPDATE SET
            points = COALESCE(profiles.points, 0) + NEW.score,
            updated_at = now();
        
        user_full_name := 'Usuário';
        user_current_points := NEW.score;
    ELSE
        -- Atualizar pontos no perfil existente
        UPDATE public.profiles 
        SET 
            points = user_current_points + NEW.score,
            level = GREATEST(1, FLOOR((user_current_points + NEW.score) / 100) + 1),
            updated_at = now()
        WHERE id = NEW.user_id;
        
        user_current_points := user_current_points + NEW.score;
    END IF;
    
    -- Atualizar ranking de forma simples
    INSERT INTO public.user_rankings (user_id, full_name, total_points)
    VALUES (NEW.user_id, user_full_name, user_current_points)
    ON CONFLICT (user_id) 
    DO UPDATE SET
        full_name = EXCLUDED.full_name,
        total_points = EXCLUDED.total_points,
        updated_at = now();
    
    RETURN NEW;
END;
$function$;

-- Criar apenas um trigger simples
CREATE TRIGGER update_user_points_trigger
    AFTER INSERT ON public.quiz_scores
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_points_after_quiz();

-- Simplificar a função de recálculo de rankings
CREATE OR REPLACE FUNCTION public.recalculate_all_rankings()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
    UPDATE public.user_rankings ur
    SET 
        position = ranked_users.new_position,
        title = CASE 
            WHEN ranked_users.new_position = 1 THEN 'Herói da Educação'
            WHEN ranked_users.new_position = 2 THEN 'Guardião do Conhecimento'
            WHEN ranked_users.new_position = 3 THEN 'Mestre dos Estudos'
            WHEN ranked_users.new_position <= 5 THEN 'Especialista Acadêmico'
            WHEN ranked_users.new_position <= 10 THEN 'Estudante Exemplar'
            WHEN ranked_users.new_position <= 20 THEN 'Aprendiz Dedicado'
            ELSE 'Explorador do Saber'
        END,
        badge = CASE 
            WHEN ranked_users.new_position = 1 THEN '🏆'
            WHEN ranked_users.new_position = 2 THEN '🥈'
            WHEN ranked_users.new_position = 3 THEN '🥉'
            WHEN ranked_users.new_position <= 5 THEN '⭐'
            WHEN ranked_users.new_position <= 10 THEN '🌟'
            WHEN ranked_users.new_position <= 20 THEN '💫'
            ELSE '📚'
        END,
        updated_at = now()
    FROM (
        SELECT 
            id,
            user_id,
            total_points,
            ROW_NUMBER() OVER (ORDER BY total_points DESC, updated_at ASC) as new_position
        FROM public.user_rankings
        WHERE total_points > 0
    ) ranked_users
    WHERE ur.id = ranked_users.id;
END;
$function$;
