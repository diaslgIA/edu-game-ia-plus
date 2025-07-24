
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'ko' | 'zh' | 'ar' | 'ru' | 'hi';

interface Translations {
  [key: string]: {
    [key in Language]?: string;
  };
}

const translations: Translations = {
  // Home/Welcome
  'welcome': {
    pt: 'Bem-vindo ao EduGameIA',
    en: 'Welcome to EduGameIA',
    es: 'Bienvenido a EduGameIA',
    fr: 'Bienvenue à EduGameIA',
    de: 'Willkommen bei EduGameIA',
    it: 'Benvenuto in EduGameIA',
    ja: 'EduGameIAへようこそ',
    ko: 'EduGameIA에 오신 것을 환영합니다',
    zh: '欢迎来到EduGameIA',
    ar: 'مرحبا بك في EduGameIA',
    ru: 'Добро пожаловать в EduGameIA',
    hi: 'EduGameIA में आपका स्वागत है'
  },
  'tagline': {
    pt: 'Sua jornada rumo ao ENEM começa aqui',
    en: 'Your journey to success starts here',
    es: 'Tu viaje hacia el éxito comienza aquí',
    fr: 'Votre voyage vers le succès commence ici',
    de: 'Ihre Reise zum Erfolg beginnt hier',
    it: 'Il tuo viaggio verso il successo inizia qui',
    ja: '成功への旅がここから始まります',
    ko: '성공으로의 여정이 여기서 시작됩니다',
    zh: '您的成功之旅从这里开始',
    ar: 'رحلتك نحو النجاح تبدأ هنا',
    ru: 'Ваш путь к успеху начинается здесь',
    hi: 'सफलता की आपकी यात्रा यहाँ से शुरू होती है'
  },
  'login': {
    pt: 'Entrar na minha conta',
    en: 'Login to my account',
    es: 'Iniciar sesión en mi cuenta',
    fr: 'Se connecter à mon compte',
    de: 'In mein Konto einloggen',
    it: 'Accedi al mio account',
    ja: 'アカウントにログイン',
    ko: '내 계정에 로그인',
    zh: '登录我的账户',
    ar: 'تسجيل الدخول إلى حسابي',
    ru: 'Войти в мой аккаунт',
    hi: 'मेरे खाते में लॉगिन करें'
  },
  'register': {
    pt: 'Criar conta gratuita',
    en: 'Create free account',
    es: 'Crear cuenta gratuita',
    fr: 'Créer un compte gratuit',
    de: 'Kostenloses Konto erstellen',
    it: 'Crea account gratuito',
    ja: '無料アカウントを作成',
    ko: '무료 계정 만들기',
    zh: '创建免费账户',
    ar: 'إنشاء حساب مجاني',
    ru: 'Создать бесплатный аккаунт',
    hi: 'मुफ्त खाता बनाएं'
  },
  'dashboard': {
    pt: 'Painel',
    en: 'Dashboard',
    es: 'Panel',
    fr: 'Tableau de bord',
    de: 'Dashboard',
    it: 'Dashboard',
    ja: 'ダッシュボード',
    ko: '대시보드',
    zh: '仪表板',
    ar: 'لوحة القيادة',
    ru: 'Панель управления',
    hi: 'डैशबोर्ड'
  },
  'subjects': {
    pt: 'Matérias',
    en: 'Subjects',
    es: 'Materias',
    fr: 'Matières',
    de: 'Fächer',
    it: 'Materie',
    ja: '科目',
    ko: '과목',
    zh: '科目',
    ar: 'المواد',
    ru: 'Предметы',
    hi: 'विषय'
  },
  'exercises': {
    pt: 'Exercícios',
    en: 'Exercises',
    es: 'Ejercicios',
    fr: 'Exercices',
    de: 'Übungen',
    it: 'Esercizi',
    ja: '練習問題',
    ko: '연습문제',
    zh: '练习',
    ar: 'التمارين',
    ru: 'Упражнения',
    hi: 'अभ्यास'
  },
  'profile': {
    pt: 'Perfil',
    en: 'Profile',
    es: 'Perfil',
    fr: 'Profil',
    de: 'Profil',
    it: 'Profilo',
    ja: 'プロフィール',
    ko: '프로필',
    zh: '个人资料',
    ar: 'الملف الشخصي',
    ru: 'Профиль',
    hi: 'प्रोफाइल'
  },
  'points': {
    pt: 'Pontos',
    en: 'Points',
    es: 'Puntos',
    fr: 'Points',
    de: 'Punkte',
    it: 'Punti',
    ja: 'ポイント',
    ko: '포인트',
    zh: '分数',
    ar: 'النقاط',
    ru: 'Очки',
    hi: 'अंक'
  },
  'level': {
    pt: 'Nível',
    en: 'Level',
    es: 'Nivel',
    fr: 'Niveau',
    de: 'Level',
    it: 'Livello',
    ja: 'レベル',
    ko: '레벨',
    zh: '等级',
    ar: 'المستوى',
    ru: 'Уровень',
    hi: 'स्तर'
  },
  'welcome_back': {
    pt: 'Bem-vindo de volta!',
    en: 'Welcome back!',
    es: '¡Bienvenido de vuelta!',
    fr: 'Bon retour!',
    de: 'Willkommen zurück!',
    it: 'Bentornato!',
    ja: 'おかえりなさい！',
    ko: '다시 오신 것을 환영합니다!',
    zh: '欢迎回来！',
    ar: 'مرحبا بعودتك!',
    ru: 'С возвращением!',
    hi: 'वापसी पर स्वागत है!'
  },
  'email': {
    pt: 'Email',
    en: 'Email',
    es: 'Correo',
    fr: 'Email',
    de: 'E-Mail',
    it: 'Email',
    ja: 'メール',
    ko: '이메일',
    zh: '电子邮件',
    ar: 'البريد الإلكتروني',
    ru: 'Электронная почта',
    hi: 'ईमेल'
  },
  'password': {
    pt: 'Senha',
    en: 'Password',
    es: 'Contraseña',
    fr: 'Mot de passe',
    de: 'Passwort',
    it: 'Password',
    ja: 'パスワード',
    ko: '비밀번호',
    zh: '密码',
    ar: 'كلمة المرور',
    ru: 'Пароль',
    hi: 'पासवर्ड'
  },
  'enter': {
    pt: 'Entrar',
    en: 'Login',
    es: 'Entrar',
    fr: 'Connexion',
    de: 'Anmelden',
    it: 'Accedi',
    ja: 'ログイン',
    ko: '로그인',
    zh: '登录',
    ar: 'تسجيل الدخول',
    ru: 'Войти',
    hi: 'लॉगिन'
  },
  'full_name': {
    pt: 'Nome Completo',
    en: 'Full Name',
    es: 'Nombre Completo',
    fr: 'Nom Complet',
    de: 'Vollständiger Name',
    it: 'Nome Completo',
    ja: '氏名',
    ko: '전체 이름',
    zh: '全名',
    ar: 'الاسم الكامل',
    ru: 'Полное имя',
    hi: 'पूरा नाम'
  },
  'school_year': {
    pt: 'Ano Escolar',
    en: 'School Year',
    es: 'Año Escolar',
    fr: 'Année Scolaire',
    de: 'Schuljahr',
    it: 'Anno Scolastico',
    ja: '学年',
    ko: '학년',
    zh: '学年',
    ar: 'السنة الدراسية',
    ru: 'Учебный год',
    hi: 'स्कूल वर्ष'
  },
  'create_account': {
    pt: 'Criar conta',
    en: 'Create account',
    es: 'Crear cuenta',
    fr: 'Créer un compte',
    de: 'Konto erstellen',
    it: 'Crea account',
    ja: 'アカウント作成',
    ko: '계정 만들기',
    zh: '创建账户',
    ar: 'إنشاء حساب',
    ru: 'Создать аккаунт',
    hi: 'खाता बनाएं'
  },
  // Settings Modal
  'settings_title': { pt: 'Configurações', en: 'Settings', es: 'Configuración', ja: '設定' },
  'theme': { pt: 'Tema', en: 'Theme', es: 'Tema', ja: 'テーマ' },
  'dark_mode': { pt: 'Modo escuro', en: 'Dark Mode', es: 'Modo oscuro', ja: 'ダークモード' },
  'enabled': { pt: 'Ativado', en: 'Enabled', es: 'Activado', ja: '有効' },
  'disabled': { pt: 'Desativado', en: 'Disabled', es: 'Desactivado', ja: '無効' },
  'language': { pt: 'Idioma', en: 'Language', es: 'Idioma', ja: '言語' },
  'sound': { pt: 'Som', en: 'Sound', es: 'Sonido', ja: 'サウンド' },
  'silent_mode': { pt: 'Modo silencioso', en: 'Silent Mode', es: 'Modo silencioso', ja: 'サイレントモード' },
  'volume': { pt: 'Volume: {value}%', en: 'Volume: {value}%', es: 'Volumen: {value}%', ja: '音量: {value}%' },
  'app_settings': { pt: 'Configurações do App', en: 'App Settings', es: 'Configuración de la App', ja: 'アプリ設定' },
  'notifications': { pt: 'Notificações', en: 'Notifications', es: 'Notificaciones', ja: '通知' },
  'notifications_desc': { pt: 'Receba lembretes para estudar diariamente', en: 'Receive daily study reminders', es: 'Recibe recordatorios diarios para estudiar', ja: '毎日の学習リマインダーを受け取る' },
  'auto_backup': { pt: 'Backup Automático', en: 'Automatic Backup', es: 'Copia de Seguridad Automática', ja: '自動バックアップ' },
  'auto_backup_desc': { pt: 'Seus dados são salvos automaticamente na nuvem', en: 'Your data is automatically saved to the cloud', es: 'Tus datos se guardan automáticamente en la nube', ja: 'データは自動的にクラウドに保存されます' },
  'privacy': { pt: 'Privacidade', en: 'Privacy', es: 'Privacidad', ja: 'プライバシー' },
  'data_usage': { pt: 'Dados de Uso', en: 'Usage Data', es: 'Datos de Uso', ja: '利用データ' },
  'data_usage_desc': { pt: 'Coletamos dados para melhorar sua experiência de aprendizado', en: 'We collect data to improve your learning experience', es: 'Recopilamos datos para mejorar tu experiencia de aprendizaje', ja: '学習体験向上のためにデータを収集します' },
  'public_profile': { pt: 'Perfil Público', en: 'Public Profile', es: 'Perfil Público', ja: '公開プロフィール' },
  'public_profile_desc': { pt: 'Controle quais informações são visíveis para outros usuários', en: 'Control what information is visible to other users', es: 'Controla qué información es visible para otros usuarios', ja: '他のユーザーに表示される情報を管理します' },
  'help_support': { pt: 'Ajuda e Suporte', en: 'Help & Support', es: 'Ayuda y Soporte', ja: 'ヘルプとサポート' },
  'help_center': { pt: 'Central de Ajuda', en: 'Help Center', es: 'Centro de Ayuda', ja: 'ヘルプセンター' },
  'help_center_desc': { pt: 'Acesse tutoriais e guias de uso do aplicativo', en: 'Access tutorials and app usage guides', es: 'Accede a tutoriales y guías de uso de la aplicación', ja: 'チュートリアルやアプリ利用ガイドにアクセス' },
  'contact': { pt: 'Contato', en: 'Contact', es: 'Contacto', ja: 'お問い合わせ' },
  'contact_desc': { pt: 'Entre em contato conosco via email: suporte@edugameia.com', en: 'Contact us via email: support@edugameia.com', es: 'Contáctanos por email: support@edugameia.com', ja: 'メールでお問い合わせ: support@edugameia.com' },
  'report_problem': { pt: 'Reportar Problema', en: 'Report a Problem', es: 'Reportar un Problema', ja: '問題を報告' },
  'report_problem_desc': { pt: 'Relate bugs ou problemas técnicos', en: 'Report bugs or technical issues', es: 'Informa sobre errores o problemas técnicos', ja: 'バグや技術的な問題を報告' },
  'save_settings': { pt: 'Salvar Configurações', en: 'Save Settings', es: 'Guardar Configuración', ja: '設定を保存' },
  // Profile Page
  'edit': { pt: 'Editar', en: 'Edit', es: 'Editar', ja: '編集' },
  'save': { pt: 'Salvar', en: 'Save', es: 'Guardar', ja: '保存' },
  'studies': { pt: 'Estudos', en: 'Studies', es: 'Estudios', ja: '勉強' },
  'achievements': { pt: 'Conquistas', en: 'Achievements', es: 'Logros', ja: '実績' },
  'achievements_title': { pt: '🏆 Conquistas', en: '🏆 Achievements', es: '🏆 Logros', ja: '🏆 実績' },
  'languages': { pt: '🌍 Idiomas', en: '🌍 Languages', es: '🌍 Idiomas', ja: '🌍 言語' },
  'current_language': { pt: 'Idioma Atual:', en: 'Current Language:', es: 'Idioma Actual:', ja: '現在の言語:' },
  'all_languages': { pt: 'Todos os Idiomas:', en: 'All Languages:', es: 'Todos los Idiomas:', ja: 'すべての言語:' },
  'current': { pt: 'Atual', en: 'Current', es: 'Actual', ja: '現在' },
  'profile_updated': { pt: 'Perfil atualizado!', en: 'Profile updated!', es: '¡Perfil actualizado!', ja: 'プロフィールが更新されました！' },
  'profile_updated_desc': { pt: 'Suas informações foram salvas com sucesso.', en: 'Your information has been saved successfully.', es: 'Tu información se ha guardado con éxito.', ja: 'あなたの情報は正常に保存されました。' },
  'profile_update_error': { pt: 'Erro ao atualizar', en: 'Error updating', es: 'Error al actualizar', ja: '更新エラー' },
  'profile_update_error_desc': { pt: 'Não foi possível salvar as alterações.', en: 'Could not save changes.', es: 'No se pudieron guardar los cambios.', ja: '変更を保存できませんでした。' },
  'avatar_updated': { pt: 'Foto atualizada!', en: 'Photo updated!', es: '¡Foto actualizada!', ja: '写真が更新されました！' },
  'avatar_updated_desc': { pt: 'Sua foto de perfil foi salva com sucesso.', en: 'Your profile picture has been saved successfully.', es: 'Tu foto de perfil se ha guardado con éxito.', ja: 'プロフィール写真が正常に保存されました。' },
  'avatar_error': { pt: 'Erro ao salvar foto', en: 'Error saving photo', es: 'Error al guardar la foto', ja: '写真の保存エラー' },
  'avatar_error_desc': { pt: 'Não foi possível salvar sua foto.', en: 'Could not save your photo.', es: 'No se pudo guardar tu foto.', ja: '写真を保存できませんでした。' },
  'language_changed': { pt: 'Idioma alterado!', en: 'Language changed!', es: '¡Idioma cambiado!', ja: '言語が変更されました！' },
  'language_changed_desc': { pt: 'Idioma alterado para {langName}', en: 'Language changed to {langName}', es: 'Idioma cambiado a {langName}', ja: '{langName}に言語が変更されました' },
  // Achievements
  'ach_first_quiz_name': { pt: 'Primeiro Quiz', en: 'First Quiz', es: 'Primer Cuestionario', ja: '最初のクイズ' },
  'ach_first_quiz_desc': { pt: 'Complete seu primeiro quiz', en: 'Complete your first quiz', es: 'Completa tu primer cuestionario', ja: '最初のクイズを完了する' },
  'ach_dedicated_student_name': { pt: 'Estudante Dedicado', en: 'Dedicated Student', es: 'Estudiante Dedicado', ja: '熱心な学生' },
  'ach_dedicated_student_desc': { pt: 'Estude 5 dias seguidos', en: 'Study 5 days in a row', es: 'Estudia 5 días seguidos', ja: '5日間連続で勉強する' },
  'ach_mathematician_name': { pt: 'Matemático', en: 'Mathematician', es: 'Matemático', ja: '数学者' },
  'ach_mathematician_desc': { pt: 'Complete 10 quizzes de matemática', en: 'Complete 10 math quizzes', es: 'Completa 10 cuestionarios de matemáticas', ja: '数学のクイズを10回完了する' },
  'ach_writer_name': { pt: 'Escritor', en: 'Writer', es: 'Escritor', ja: '作家' },
  'ach_writer_desc': { pt: 'Complete 10 quizzes de português', en: 'Complete 10 Portuguese quizzes', es: 'Completa 10 cuestionarios de portugués', ja: 'ポルトガル語のクイズを10回完了する' },
  'ach_scientist_name': { pt: 'Cientista', en: 'Scientist', es: 'Científico', ja: '科学者' },
  'ach_scientist_desc': { pt: 'Complete 10 quizzes de ciências', en: 'Complete 10 science quizzes', es: 'Completa 10 cuestionarios de ciencias', ja: '科学のクイズを10回完了する' },
  'ach_historian_name': { pt: 'Historiador', en: 'Historian', es: 'Historiador', ja: '歴史家' },
  'ach_historian_desc': { pt: 'Complete 10 quizzes de história', en: 'Complete 10 history quizzes', es: 'Completa 10 cuestionarios de historia', ja: '歴史のクイズを10回完了する' },
  'ach_perfectionist_name': { pt: 'Perfeccionista', en: 'Perfectionist', es: 'Perfeccionista', ja: '完璧主義者' },
  'ach_perfectionist_desc': { pt: 'Acerte 100% em um quiz', en: 'Get 100% on a quiz', es: 'Obtén 100% en un cuestionario', ja: 'クイズで100%正解する' },
  'ach_marathoner_name': { pt: 'Maratonista', en: 'Marathoner', es: 'Maratonista', ja: 'マラソンランナー' },
  'ach_marathoner_desc': { pt: 'Estude por 2 horas seguidas', en: 'Study for 2 hours straight', es: 'Estudia por 2 horas seguidas', ja: '2時間連続で勉強する' },
  // Subjects
  'subject_math_name': { pt: 'Matemática', en: 'Mathematics', es: 'Matemáticas', ja: '数学' },
  'subject_math_desc': { pt: 'Álgebra, Geometria e Funções', en: 'Algebra, Geometry and Functions', es: 'Álgebra, Geometría y Funciones', ja: '代数、幾何、関数' },
  'subject_portuguese_name': { pt: 'Português', en: 'Portuguese', es: 'Portugués', ja: 'ポルトガル語' },
  'subject_portuguese_desc': { pt: 'Interpretação, Gramática e Literatura', en: 'Interpretation, Grammar and Literature', es: 'Interpretación, Gramática y Literatura', ja: '解釈、文法、文学' },
  'subject_physics_name': { pt: 'Física', en: 'Physics', es: 'Física', ja: '物理' },
  'subject_physics_desc': { pt: 'Mecânica, Eletricidade e Óptica', en: 'Mechanics, Electricity and Optics', es: 'Mecánica, Electricidad y Óptica', ja: '力学、電気、光学' },
  'subject_chemistry_name': { pt: 'Química', en: 'Chemistry', es: 'Química', ja: '化学' },
  'subject_chemistry_desc': { pt: 'Orgânica, Inorgânica e Físico-química', en: 'Organic, Inorganic and Physical-chemistry', es: 'Orgánica, Inorgánica y Fisicoquímica', ja: '有機、無機、物理化学' },
  'subject_biology_name': { pt: 'Biologia', en: 'Biology', es: 'Biología', ja: '生物学' },
  'subject_biology_desc': { pt: 'Ecologia, Genética e Citologia', en: 'Ecology, Genetics and Cytology', es: 'Ecología, Genética y Citología', ja: '生態学、遺伝学、細胞学' },
  'subject_history_name': { pt: 'História', en: 'History', es: 'Historia', ja: '歴史' },
  'subject_history_desc': { pt: 'Brasil, Mundo e Atualidades', en: 'Brazil, World and Current Events', es: 'Brasil, Mundo y Actualidad', ja: 'ブラジル、世界、時事' },
  'subject_geography_name': { pt: 'Geografia', en: 'Geography', es: 'Geografía', ja: '地理' },
  'subject_geography_desc': { pt: 'Física, Humana e Cartografia', en: 'Physical, Human and Cartography', es: 'Física, Humana y Cartografía', ja: '物理、人文、地図製作' },
  'subject_philosophy_name': { pt: 'Filosofia', en: 'Philosophy', es: 'Filosofía', ja: '哲学' },
  'subject_philosophy_desc': { pt: 'Ética, Política e Metafísica', en: 'Ethics, Politics and Metaphysics', es: 'Ética, Política y Metafísica', ja: '倫理、政治、形而上学' },
  'subject_sociology_name': { pt: 'Sociologia', en: 'Sociology', es: 'Sociología', ja: '社会学' },
  'subject_sociology_desc': { pt: 'Sociedade, Cultura e Movimentos', en: 'Society, Culture and Movements', es: 'Sociedad, Cultura y Movimientos', ja: '社会、文化、運動' },
  // Exercises Page
  'difficulty_easy': { pt: 'Fácil', en: 'Easy', es: 'Fácil', ja: '簡単' },
  'difficulty_medium': { pt: 'Médio', en: 'Medium', es: 'Medio', ja: '普通' },
  'difficulty_hard': { pt: 'Difícil', en: 'Hard', es: 'Difícil', ja: '難しい' },
  'exercises_title': { pt: 'Exercícios', en: 'Exercises', es: 'Ejercicios', ja: '練習問題' },
  'exercises_count': { pt: '{count} exercícios', en: '{count} exercises', es: '{count} ejercicios', ja: '{count} 問' },
  'activities_title': { pt: 'Atividades - {subject}', en: 'Activities - {subject}', es: 'Actividades - {subject}', ja: 'アクティビティ - {subject}' },
  'select_subject': { pt: 'Escolha uma Matéria:', en: 'Select a Subject:', es: 'Elige una Materia:', ja: '科目を選択してください:' },
  'progress': { pt: 'Progresso:', en: 'Progress:', es: 'Progreso:', ja: '進捗:' },
  'select_activity': { pt: 'Escolha uma atividade para começar:', en: 'Choose an activity to start:', es: 'Elige una actividad para empezar:', ja: '開始するアクティビティを選択してください:' },
  'step': { pt: 'Etapa {number}', en: 'Step {number}', es: 'Paso {number}', ja: 'ステップ {number}' },
  'back_to_subjects': { pt: 'Voltar para Matérias', en: 'Back to Subjects', es: 'Volver a Materias', ja: '科目に戻る' },
  'activity_slides_name': { pt: 'Conteúdo', en: 'Content', es: 'Contenido', ja: 'コンテンツ' },
  'activity_slides_desc': { pt: 'Slides educativos', en: 'Educational slides', es: 'Diapositivas educativas', ja: '教育スライド' },
  'activity_teacher_name': { pt: 'Professor IA', en: 'AI Teacher', es: 'Profesor IA', ja: 'AI先生' },
  'activity_teacher_desc': { pt: 'Aula virtual', en: 'Virtual class', es: 'Clase virtual', ja: 'バーチャル授業' },
  'activity_quiz_name': { pt: 'Quiz', en: 'Quiz', es: 'Cuestionario', ja: 'クイズ' },
  'activity_quiz_desc': { pt: 'Teste seus conhecimentos', en: 'Test your knowledge', es: 'Pon a prueba tus conocimientos', ja: '知識を試す' },
  'content_title': { pt: 'Conteúdo - {subject}', en: 'Content - {subject}', es: 'Contenido - {subject}', ja: 'コンテンツ - {subject}' },
  'virtual_teacher_title': { pt: 'Professor Virtual - {subject}', en: 'Virtual Teacher - {subject}', es: 'Profesor Virtual - {subject}', ja: 'バーチャル先生 - {subject}' },
  'quiz_title': { pt: 'Quiz - {subject}', en: 'Quiz - {subject}', es: 'Cuestionario - {subject}', ja: 'クイズ - {subject}' },
  // Quiz Results
  'quiz_results_title': { pt: 'Quiz de {subject} Concluído!', en: '{subject} Quiz Completed!', es: '¡Cuestionario de {subject} Completado!', ja: '{subject}クイズ完了！' },
  'quiz_results_points': { pt: '{score} pontos', en: '{score} points', es: '{score} puntos', ja: '{score}ポイント' },
  'quiz_results_percentage': { pt: '{percentage}% de acertos em {subject}', en: '{percentage}% correct in {subject}', es: '{percentage}% de aciertos en {subject}', ja: '{subject}で{percentage}%正解' },
  'quiz_results_saving': { pt: 'Salvando pontos...', en: 'Saving points...', es: 'Guardando puntos...', ja: 'ポイントを保存中...' },
  'quiz_results_saved': { pt: 'Pontos salvos na sua conta!', en: 'Points saved to your account!', es: '¡Puntos guardados en tu cuenta!', ja: 'ポイントがアカウントに保存されました！' },
  'quiz_results_score': { pt: 'Pontuação', en: 'Score', es: 'Puntuación', ja: 'スコア' },
  'quiz_results_correct': { pt: 'Acertos', en: 'Correct', es: 'Aciertos', ja: '正解' },
  'quiz_results_back': { pt: 'Voltar aos Exercícios', en: 'Back to Exercises', es: 'Volver a los Ejercicios', ja: '練習問題に戻る' },
  'quiz_feedback_good': { pt: 'Você acertou {correct} de {total} questões. Você está indo muito bem! Estude só um pouco mais para ser nota 10.', en: 'You got {correct} out of {total} questions right. You\'re doing great! Study just a little more to get a perfect score.', es: 'Acertaste {correct} de {total} preguntas. ¡Lo estás haciendo muy bien! Estudia un poco más para sacar un 10.', ja: '{total}問中{correct}問正解です。素晴らしいです！満点を取るためにもう少し勉強しましょう。' },
  'quiz_feedback_bad': { pt: 'Você acertou {correct} de {total} questões. Você precisa estudar muito, mas não desista! Com dedicação, você vai chegar lá. Continue firme!', en: 'You got {correct} out of {total} questions right. You need to study hard, but don\'t give up! With dedication, you\'ll get there. Keep it up!', es: 'Acertaste {correct} de {total} preguntas. Necesitas estudiar mucho, ¡pero no te rindas! Con dedicación, lo lograrás. ¡Sigue adelante!', ja: '{total}問中{correct}問正解です。もっと勉強が必要ですが、あきらめないで！努力すれば必ずできます。頑張り続けてください！' },
};

const languages = [
  { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
  { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
  { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' },
  { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
  { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
  { code: 'ar' as Language, name: 'العربية', flag: '🇸🇦' },
  { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' },
  { code: 'hi' as Language, name: 'हिन्दी', flag: '🇮🇳' }
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
  languages: typeof languages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    // Força re-render de todos os componentes quando o idioma muda
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
    
    // Atualiza o HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Força atualização imediata
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const t = (key: string, replacements?: { [key: string]: string | number }): string => {
    let translation = translations[key]?.[language] || translations[key]?.['en'] || key;
    if (replacements) {
      Object.keys(replacements).forEach(replaceKey => {
        translation = translation.replace(`{${replaceKey}}`, String(replacements[replaceKey]));
      });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
