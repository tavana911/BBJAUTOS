export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      cars: {
        Row: {
          category: string;
          created_at: string;
          currency: string;
          description: string;
          drivetrain: string | null;
          engine: string | null;
          exterior_color: string | null;
          featured: boolean;
          fuel_type: string | null;
          gallery: Json;
          hero_image: string;
          horsepower: string | null;
          id: string;
          interior_color: string | null;
          make: string;
          mileage: number | null;
          model: string;
          name: string;
          narrative: string | null;
          price: number;
          status: string;
          top_speed: string | null;
          transmission: string | null;
          updated_at: string;
          vin: string | null;
          year: number;
          zero_to_sixty: string | null;
        };
        Insert: {
          category: string;
          created_at?: string;
          currency?: string;
          description?: string;
          drivetrain?: string | null;
          engine?: string | null;
          exterior_color?: string | null;
          featured?: boolean;
          fuel_type?: string | null;
          gallery?: Json;
          hero_image: string;
          horsepower?: string | null;
          id?: string;
          interior_color?: string | null;
          make: string;
          mileage?: number | null;
          model: string;
          name: string;
          narrative?: string | null;
          price: number;
          status?: string;
          top_speed?: string | null;
          transmission?: string | null;
          updated_at?: string;
          vin?: string | null;
          year: number;
          zero_to_sixty?: string | null;
        };
        Update: {
          category?: string;
          created_at?: string;
          currency?: string;
          description?: string;
          drivetrain?: string | null;
          engine?: string | null;
          exterior_color?: string | null;
          featured?: boolean;
          fuel_type?: string | null;
          gallery?: Json;
          hero_image?: string;
          horsepower?: string | null;
          id?: string;
          interior_color?: string | null;
          make?: string;
          mileage?: number | null;
          model?: string;
          name?: string;
          narrative?: string | null;
          price?: number;
          status?: string;
          top_speed?: string | null;
          transmission?: string | null;
          updated_at?: string;
          vin?: string | null;
          year?: number;
          zero_to_sixty?: string | null;
        };
        Relationships: [];
      };
      contact_inquiries: {
        Row: {
          car_id: string | null;
          created_at: string;
          email: string;
          id: string;
          inquiry_type: string;
          message: string;
          name: string;
          phone: string | null;
          subject: string | null;
        };
        Insert: {
          car_id?: string | null;
          created_at?: string;
          email: string;
          id?: string;
          inquiry_type?: string;
          message: string;
          name: string;
          phone?: string | null;
          subject?: string | null;
        };
        Update: {
          car_id?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          inquiry_type?: string;
          message?: string;
          name?: string;
          phone?: string | null;
          subject?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "contact_inquiries_car_id_fkey";
            columns: ["car_id"];
            isOneToOne: false;
            referencedRelation: "cars";
            referencedColumns: ["id"];
          },
        ];
      };
      newsletter_subscribers: {
        Row: {
          created_at: string;
          email: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
        };
        Relationships: [];
      };
      rentals: {
        Row: {
          available: boolean;
          category: string;
          created_at: string;
          currency: string;
          daily_rate: number;
          description: string;
          fuel_type: string | null;
          gallery: Json;
          hero_image: string;
          id: string;
          monthly_rate: number | null;
          name: string;
          rental_type: string;
          seats: number | null;
          tags: Json;
          transmission: string | null;
          updated_at: string;
          weekly_rate: number | null;
        };
        Insert: {
          available?: boolean;
          category: string;
          created_at?: string;
          currency?: string;
          daily_rate: number;
          description?: string;
          fuel_type?: string | null;
          gallery?: Json;
          hero_image: string;
          id?: string;
          monthly_rate?: number | null;
          name: string;
          rental_type?: string;
          seats?: number | null;
          tags?: Json;
          transmission?: string | null;
          updated_at?: string;
          weekly_rate?: number | null;
        };
        Update: {
          available?: boolean;
          category?: string;
          created_at?: string;
          currency?: string;
          daily_rate?: number;
          description?: string;
          fuel_type?: string | null;
          gallery?: Json;
          hero_image?: string;
          id?: string;
          monthly_rate?: number | null;
          name?: string;
          rental_type?: string;
          seats?: number | null;
          tags?: Json;
          transmission?: string | null;
          updated_at?: string;
          weekly_rate?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
