
export interface SubjectContent {
  id: string;
  subject: string;
  title: string;
  description?: string;
  content_type: string;
  difficulty_level?: string;
  content_data?: any;
  estimated_time?: number;
  is_premium?: boolean;
  order_index?: number;
  key_concepts?: any; // Alterado de any[] para any para compatibilizar com JSON do Supabase
  examples?: string;
  practical_applications?: string;
  study_tips?: string;
  infographic_url?: string;
  interactive_activities?: any;
  challenge_question?: any;
  available_badges?: any[];
  detailed_explanation?: string;
  grande_tema?: string;
  topic_name?: string;
  explanation?: string;
  created_at: string;
  updated_at: string;
}
