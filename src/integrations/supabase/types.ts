export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
