-- Criar trigger para automaticamente criar perfil quando usuário se registra
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Verificar se todos os usuários existentes têm perfil
-- e criar perfis para usuários sem perfil
DO $$
DECLARE
  user_record RECORD;
BEGIN
  FOR user_record IN 
    SELECT id, email, raw_user_meta_data, email_confirmed_at 
    FROM auth.users 
    WHERE id NOT IN (SELECT id FROM public.profiles)
  LOOP
    INSERT INTO public.profiles (id, email, full_name, school_year, is_verified)
    VALUES (
      user_record.id,
      user_record.email,
      COALESCE(user_record.raw_user_meta_data->>'full_name', 'Usuário'),
      COALESCE(user_record.raw_user_meta_data->>'school_year', 'Não informado'),
      CASE 
        WHEN user_record.email_confirmed_at IS NOT NULL THEN true 
        ELSE false 
      END
    );
    
    -- Criar registro inicial de uso de conteúdo
    INSERT INTO public.content_usage (user_id)
    VALUES (user_record.id)
    ON CONFLICT (user_id) DO NOTHING;
  END LOOP;
END $$;