
-- Corrigir a função de trigger para ser mais robusta e evitar erro 500
CREATE OR REPLACE FUNCTION public.update_user_points_after_quiz()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
    user_full_name text;
    user_current_points integer;
    user_exists boolean;
BEGIN
    -- Verificar se o usuário existe no profiles
    SELECT EXISTS(SELECT 1 FROM public.profiles WHERE id = NEW.user_id) INTO user_exists;
    
    IF NOT user_exists THEN
        -- Se o usuário não existe, criar um registro básico
        INSERT INTO public.profiles (id, full_name, email, school_year, points)
        VALUES (NEW.user_id, 'Usuário', 'user@example.com', 'Não informado', NEW.score)
        ON CONFLICT (id) DO UPDATE SET
            points = COALESCE(profiles.points, 0) + NEW.score,
            updated_at = now();
        
        user_full_name := 'Usuário';
        user_current_points := NEW.score;
    ELSE
        -- Buscar informações do usuário existente
        SELECT full_name, COALESCE(points, 0) INTO user_full_name, user_current_points
        FROM public.profiles 
        WHERE id = NEW.user_id;
        
        -- Atualizar pontos no perfil
        UPDATE public.profiles 
        SET 
            points = user_current_points + NEW.score,
            level = GREATEST(1, FLOOR((user_current_points + NEW.score) / 100) + 1),
            updated_at = now()
        WHERE id = NEW.user_id;
        
        user_current_points := user_current_points + NEW.score;
    END IF;
    
    -- Inserir ou atualizar ranking de forma mais segura
    BEGIN
        INSERT INTO public.user_rankings (user_id, full_name, total_points)
        VALUES (NEW.user_id, user_full_name, user_current_points)
        ON CONFLICT (user_id) 
        DO UPDATE SET
            full_name = EXCLUDED.full_name,
            total_points = EXCLUDED.total_points,
            updated_at = now();
        
        -- Tentar recalcular rankings, mas não falhar se houver erro
        BEGIN
            PERFORM public.recalculate_all_rankings();
        EXCEPTION WHEN OTHERS THEN
            -- Log do erro mas não falha a transação
            RAISE NOTICE 'Erro ao recalcular rankings: %', SQLERRM;
        END;
        
    EXCEPTION WHEN OTHERS THEN
        -- Se falhar o ranking, pelo menos salvar os pontos do usuário
        RAISE NOTICE 'Erro ao atualizar ranking: %', SQLERRM;
    END;
    
    RETURN NEW;
END;
$function$;

-- Melhorar a função recalculate_all_rankings para ser mais robusta
CREATE OR REPLACE FUNCTION public.recalculate_all_rankings()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
    -- Tentar atualizar posições e títulos, mas de forma mais segura
    BEGIN
        WITH ranked_users AS (
            SELECT 
                id,
                user_id,
                total_points,
                ROW_NUMBER() OVER (ORDER BY total_points DESC, updated_at ASC) as new_position
            FROM public.user_rankings
            WHERE total_points > 0  -- Apenas usuários com pontos
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
        WHERE ur.id = ru.id;
        
    EXCEPTION WHEN OTHERS THEN
        -- Log do erro mas não falha
        RAISE NOTICE 'Erro no recálculo de rankings: %', SQLERRM;
    END;
END;
$function$;

-- Criar índice único para evitar duplicatas na tabela mentor_affinities
CREATE UNIQUE INDEX IF NOT EXISTS idx_mentor_affinities_user_mentor 
ON public.mentor_affinities (user_id, mentor_id);
