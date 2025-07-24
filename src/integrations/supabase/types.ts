export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      Answers: {
        Row: {
          answer_text: string
          created_at: string | null
          id: string
          is_correct: boolean
          question_id: string
        }
        Insert: {
          answer_text: string
          created_at?: string | null
          id?: string
          is_correct: boolean
          question_id: string
        }
        Update: {
          answer_text?: string
          created_at?: string | null
          id?: string
          is_correct?: boolean
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "Questions"
            referencedColumns: ["id"]
          },
        ]
      }
      content_progress: {
        Row: {
          completed: boolean | null
          content_id: string
          created_at: string
          id: string
          last_accessed: string | null
          progress_percentage: number | null
          time_spent: number | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          content_id: string
          created_at?: string
          id?: string
          last_accessed?: string | null
          progress_percentage?: number | null
          time_spent?: number | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          content_id?: string
          created_at?: string
          id?: string
          last_accessed?: string | null
          progress_percentage?: number | null
          time_spent?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_progress_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "subject_contents"
            referencedColumns: ["id"]
          },
        ]
      }
      content_usage: {
        Row: {
          activities_completed: number | null
          created_at: string | null
          id: string
          reset_date: string | null
          updated_at: string | null
          user_id: string
          videos_watched: number | null
        }
        Insert: {
          activities_completed?: number | null
          created_at?: string | null
          id?: string
          reset_date?: string | null
          updated_at?: string | null
          user_id: string
          videos_watched?: number | null
        }
        Update: {
          activities_completed?: number | null
          created_at?: string | null
          id?: string
          reset_date?: string | null
          updated_at?: string | null
          user_id?: string
          videos_watched?: number | null
        }
        Relationships: []
      }
      game_modules: {
        Row: {
          content_data: Json | null
          created_at: string | null
          description: string | null
          difficulty: number | null
          id: string
          is_premium: boolean | null
          subject_area: string | null
          target_school_years: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content_data?: Json | null
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          id?: string
          is_premium?: boolean | null
          subject_area?: string | null
          target_school_years?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content_data?: Json | null
          created_at?: string | null
          description?: string | null
          difficulty?: number | null
          id?: string
          is_premium?: boolean | null
          subject_area?: string | null
          target_school_years?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      guild_chat_messages: {
        Row: {
          content: string
          created_at: string | null
          guild_id: string | null
          id: number
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          guild_id?: string | null
          id?: number
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          guild_id?: string | null
          id?: number
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guild_chat_messages_guild_id_fkey"
            columns: ["guild_id"]
            isOneToOne: false
            referencedRelation: "guilds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guild_chat_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      guild_invites: {
        Row: {
          created_at: string
          guild_id: string
          id: string
          invited_user_id: string
          inviter_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          guild_id: string
          id?: string
          invited_user_id: string
          inviter_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          guild_id?: string
          id?: string
          invited_user_id?: string
          inviter_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guild_invites_guild_id_fkey"
            columns: ["guild_id"]
            isOneToOne: false
            referencedRelation: "guilds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guild_invites_invited_user_id_fkey"
            columns: ["invited_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guild_invites_inviter_id_fkey"
            columns: ["inviter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      guild_join_requests: {
        Row: {
          created_at: string
          guild_id: string
          id: string
          message: string | null
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          guild_id: string
          id?: string
          message?: string | null
          requester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          guild_id?: string
          id?: string
          message?: string | null
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guild_join_requests_guild_id_fkey"
            columns: ["guild_id"]
            isOneToOne: false
            referencedRelation: "guilds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guild_join_requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      guild_library_files: {
        Row: {
          created_at: string | null
          description: string | null
          file_name: string
          guild_id: string | null
          id: string
          storage_path: string
          uploader_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          file_name: string
          guild_id?: string | null
          id?: string
          storage_path: string
          uploader_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          file_name?: string
          guild_id?: string | null
          id?: string
          storage_path?: string
          uploader_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guild_library_files_guild_id_fkey"
            columns: ["guild_id"]
            isOneToOne: false
            referencedRelation: "guilds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guild_library_files_uploader_id_fkey"
            columns: ["uploader_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      guild_members: {
        Row: {
          guild_id: string
          joined_at: string | null
          profile_id: string
          role: string | null
        }
        Insert: {
          guild_id: string
          joined_at?: string | null
          profile_id: string
          role?: string | null
        }
        Update: {
          guild_id?: string
          joined_at?: string | null
          profile_id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guild_members_guild_id_fkey"
            columns: ["guild_id"]
            isOneToOne: false
            referencedRelation: "guilds"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guild_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      guild_mural_posts: {
        Row: {
          author_id: string | null
          body: string
          created_at: string | null
          guild_id: string | null
          id: string
          is_answered: boolean | null
          title: string
        }
        Insert: {
          author_id?: string | null
          body: string
          created_at?: string | null
          guild_id?: string | null
          id?: string
          is_answered?: boolean | null
          title: string
        }
        Update: {
          author_id?: string | null
          body?: string
          created_at?: string | null
          guild_id?: string | null
          id?: string
          is_answered?: boolean | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "guild_mural_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guild_mural_posts_guild_id_fkey"
            columns: ["guild_id"]
            isOneToOne: false
            referencedRelation: "guilds"
            referencedColumns: ["id"]
          },
        ]
      }
      guilds: {
        Row: {
          created_at: string | null
          description: string | null
          guild_code: string
          id: string
          is_public: boolean | null
          name: string
          owner_id: string
          total_points: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          guild_code: string
          id?: string
          is_public?: boolean | null
          name: string
          owner_id: string
          total_points?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          guild_code?: string
          id?: string
          is_public?: boolean | null
          name?: string
          owner_id?: string
          total_points?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "guilds_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_affinities: {
        Row: {
          affinity_level: number
          created_at: string
          experience_points: number
          id: string
          last_interaction: string | null
          mentor_id: string
          unlocked_content: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          affinity_level?: number
          created_at?: string
          experience_points?: number
          id?: string
          last_interaction?: string | null
          mentor_id: string
          unlocked_content?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          affinity_level?: number
          created_at?: string
          experience_points?: number
          id?: string
          last_interaction?: string | null
          mentor_id?: string
          unlocked_content?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          first_login: boolean | null
          full_name: string
          id: string
          is_verified: boolean | null
          last_login: string | null
          level: number | null
          login_streak: number | null
          phone_number: string | null
          points: number | null
          profile_picture_url: string | null
          school_year: string
          subscription_type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_login?: boolean | null
          full_name: string
          id: string
          is_verified?: boolean | null
          last_login?: string | null
          level?: number | null
          login_streak?: number | null
          phone_number?: string | null
          points?: number | null
          profile_picture_url?: string | null
          school_year: string
          subscription_type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_login?: boolean | null
          full_name?: string
          id?: string
          is_verified?: boolean | null
          last_login?: string | null
          level?: number | null
          login_streak?: number | null
          phone_number?: string | null
          points?: number | null
          profile_picture_url?: string | null
          school_year?: string
          subscription_type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      Questions: {
        Row: {
          created_at: string | null
          id: string
          question_text: string
          quiz_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          question_text: string
          quiz_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          question_text?: string
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "Quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_scores: {
        Row: {
          completed_at: string | null
          id: string
          score: number
          subject: string
          time_spent: number | null
          total_questions: number
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          score: number
          subject: string
          time_spent?: number | null
          total_questions: number
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          score?: number
          subject?: string
          time_spent?: number | null
          total_questions?: number
          user_id?: string
        }
        Relationships: []
      }
      Quizzes: {
        Row: {
          created_at: string | null
          id: string
          title: string
          topic_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          title: string
          topic_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string
          topic_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Quizzes_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          },
        ]
      }
      subject_contents: {
        Row: {
          content_data: Json | null
          content_type: string
          created_at: string
          description: string | null
          detailed_explanation: string | null
          difficulty_level: string | null
          estimated_time: number | null
          examples: string | null
          explanation: string | null
          grande_tema: string | null
          id: string
          is_premium: boolean | null
          key_concepts: Json | null
          order_index: number | null
          practical_applications: string | null
          study_tips: string | null
          subject: string
          title: string
          topic_name: string | null
          updated_at: string
        }
        Insert: {
          content_data?: Json | null
          content_type?: string
          created_at?: string
          description?: string | null
          detailed_explanation?: string | null
          difficulty_level?: string | null
          estimated_time?: number | null
          examples?: string | null
          explanation?: string | null
          grande_tema?: string | null
          id?: string
          is_premium?: boolean | null
          key_concepts?: Json | null
          order_index?: number | null
          practical_applications?: string | null
          study_tips?: string | null
          subject: string
          title: string
          topic_name?: string | null
          updated_at?: string
        }
        Update: {
          content_data?: Json | null
          content_type?: string
          created_at?: string
          description?: string | null
          detailed_explanation?: string | null
          difficulty_level?: string | null
          estimated_time?: number | null
          examples?: string | null
          explanation?: string | null
          grande_tema?: string | null
          id?: string
          is_premium?: boolean | null
          key_concepts?: Json | null
          order_index?: number | null
          practical_applications?: string | null
          study_tips?: string | null
          subject?: string
          title?: string
          topic_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      subject_progress: {
        Row: {
          completed_activities: number
          created_at: string
          id: string
          last_activity_date: string
          progress_percentage: number
          subject: string
          total_activities: number
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_activities?: number
          created_at?: string
          id?: string
          last_activity_date?: string
          progress_percentage?: number
          subject: string
          total_activities?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_activities?: number
          created_at?: string
          id?: string
          last_activity_date?: string
          progress_percentage?: number
          subject?: string
          total_activities?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      subject_questions: {
        Row: {
          correct_answer: number
          created_at: string
          difficulty_level: string | null
          explanation: string | null
          grande_tema: string | null
          id: string
          options: Json
          question: string
          quiz_title: string | null
          subject: string
          topic: string
        }
        Insert: {
          correct_answer: number
          created_at?: string
          difficulty_level?: string | null
          explanation?: string | null
          grande_tema?: string | null
          id?: string
          options: Json
          question: string
          quiz_title?: string | null
          subject: string
          topic: string
        }
        Update: {
          correct_answer?: number
          created_at?: string
          difficulty_level?: string | null
          explanation?: string | null
          grande_tema?: string | null
          id?: string
          options?: Json
          question?: string
          quiz_title?: string | null
          subject?: string
          topic?: string
        }
        Relationships: []
      }
      Subjects: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      support_requests: {
        Row: {
          created_at: string
          id: string
          message: string
          request_type: string
          status: string
          subject: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          request_type: string
          status?: string
          subject: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          request_type?: string
          status?: string
          subject?: string
          user_id?: string | null
        }
        Relationships: []
      }
      Themes: {
        Row: {
          created_at: string | null
          display_name: string | null
          id: string
          name: string
          subject_id: string
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          name: string
          subject_id: string
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          name?: string
          subject_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Themes_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "Subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      Topics: {
        Row: {
          created_at: string | null
          display_name: string | null
          explanation: string | null
          id: string
          name: string
          theme_id: string
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          explanation?: string | null
          id?: string
          name: string
          theme_id: string
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          explanation?: string | null
          id?: string
          name?: string
          theme_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Topics_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "Themes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activities: {
        Row: {
          activity_type: string
          correct_answer: number | null
          created_at: string
          id: string
          is_correct: boolean | null
          metadata: Json | null
          points_earned: number | null
          question_id: string | null
          subject: string
          time_spent: number | null
          topic: string | null
          user_answer: number | null
          user_id: string
        }
        Insert: {
          activity_type: string
          correct_answer?: number | null
          created_at?: string
          id?: string
          is_correct?: boolean | null
          metadata?: Json | null
          points_earned?: number | null
          question_id?: string | null
          subject: string
          time_spent?: number | null
          topic?: string | null
          user_answer?: number | null
          user_id: string
        }
        Update: {
          activity_type?: string
          correct_answer?: number | null
          created_at?: string
          id?: string
          is_correct?: boolean | null
          metadata?: Json | null
          points_earned?: number | null
          question_id?: string | null
          subject?: string
          time_spent?: number | null
          topic?: string | null
          user_answer?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed_at: string | null
          id: string
          last_played_at: string | null
          module_id: string
          progress_details: Json | null
          score: number | null
          started_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          last_played_at?: string | null
          module_id: string
          progress_details?: Json | null
          score?: number | null
          started_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          last_played_at?: string | null
          module_id?: string
          progress_details?: Json | null
          score?: number | null
          started_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "game_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      user_rankings: {
        Row: {
          badge: string | null
          full_name: string
          id: string
          position: number
          title: string | null
          total_points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          badge?: string | null
          full_name: string
          id?: string
          position?: number
          title?: string | null
          total_points?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          badge?: string | null
          full_name?: string
          id?: string
          position?: number
          title?: string | null
          total_points?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_topic_progress: {
        Row: {
          completed_at: string | null
          id: string
          topic_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          topic_id: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          topic_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_topic_progress_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "Topics"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_guild_with_owner: {
        Args: {
          guild_name: string
          guild_description: string
          guild_code: string
          owner_id: string
          is_public: boolean
        }
        Returns: Json
      }
      is_guild_member_safe: {
        Args: { target_guild_id: string; target_user_id: string }
        Returns: boolean
      }
      is_guild_owner_safe: {
        Args: { target_guild_id: string; target_user_id: string }
        Returns: boolean
      }
      recalculate_all_rankings: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      register_quiz_question_activity: {
        Args: {
          p_subject: string
          p_topic: string
          p_question_id: string
          p_user_answer: number
          p_correct_answer: number
          p_time_spent: number
        }
        Returns: undefined
      }
      unaccent: {
        Args: { "": string }
        Returns: string
      }
      unaccent_init: {
        Args: { "": unknown }
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
