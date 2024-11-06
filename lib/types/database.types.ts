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
      categories: {
        Row: {
          allow_multiple: boolean
          created_at: string
          description: string | null
          display_order: number
          event_id: string
          id: number
          is_activate: boolean
          title: string
          title_en: string | null
        }
        Insert: {
          allow_multiple?: boolean
          created_at?: string
          description?: string | null
          display_order: number
          event_id: string
          id?: number
          is_activate?: boolean
          title: string
          title_en?: string | null
        }
        Update: {
          allow_multiple?: boolean
          created_at?: string
          description?: string | null
          display_order?: number
          event_id?: string
          id?: number
          is_activate?: boolean
          title?: string
          title_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_event_belongs_to_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          activate_from: string
          activate_until: string
          created_at: string
          date_end: string
          date_start: string
          description: string | null
          homepage: string | null
          id: string
          image_url: string | null
          link_facebook: string | null
          link_instagram: string | null
          link_youtube: string | null
          organizer_id: string | null
          title: string
          venue: string
        }
        Insert: {
          activate_from: string
          activate_until: string
          created_at?: string
          date_end: string
          date_start: string
          description?: string | null
          homepage?: string | null
          id?: string
          image_url?: string | null
          link_facebook?: string | null
          link_instagram?: string | null
          link_youtube?: string | null
          organizer_id?: string | null
          title: string
          venue: string
        }
        Update: {
          activate_from?: string
          activate_until?: string
          created_at?: string
          date_end?: string
          date_start?: string
          description?: string | null
          homepage?: string | null
          id?: string
          image_url?: string | null
          link_facebook?: string | null
          link_instagram?: string | null
          link_youtube?: string | null
          organizer_id?: string | null
          title?: string
          venue?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "organizer_info"
            referencedColumns: ["id"]
          },
        ]
      }
      order_details: {
        Row: {
          created_at: string
          id: string
          orderId: string | null
          payment_id: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          total: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id: string
          orderId?: string | null
          payment_id?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          orderId?: string | null
          payment_id?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_details_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payment_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          product_id: string | null
          quantity: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          product_id?: string | null
          quantity?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string | null
          quantity?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      organizer_info: {
        Row: {
          address: string | null
          avatar_url: string | null
          corp_name: string | null
          corp_number: number | null
          created_at: string
          email: string | null
          id: string
          phone: string | null
          provider: string | null
          rep_name: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          corp_name?: string | null
          corp_number?: number | null
          created_at?: string
          email?: string | null
          id?: string
          phone?: string | null
          provider?: string | null
          rep_name: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          corp_name?: string | null
          corp_number?: number | null
          created_at?: string
          email?: string | null
          id?: string
          phone?: string | null
          provider?: string | null
          rep_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payment_details: {
        Row: {
          created_at: string
          id: string
          method: string | null
          order_id: string | null
          provider: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          method?: string | null
          order_id?: string | null
          provider?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          method?: string | null
          order_id?: string | null
          provider?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          activate_from: string
          category_id: number | null
          created_at: string
          event_id: string
          id: string
          image_url: string | null
          max_quantity: number
          price: number
          sub_category_id: number | null
          title: string
          title_en: string | null
        }
        Insert: {
          activate_from?: string
          category_id?: number | null
          created_at?: string
          event_id: string
          id?: string
          image_url?: string | null
          max_quantity: number
          price: number
          sub_category_id?: number | null
          title: string
          title_en?: string | null
        }
        Update: {
          activate_from?: string
          category_id?: number | null
          created_at?: string
          event_id?: string
          id?: string
          image_url?: string | null
          max_quantity?: number
          price?: number
          sub_category_id?: number | null
          title?: string
          title_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_event_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_sub_category_id_fkey"
            columns: ["sub_category_id"]
            isOneToOne: false
            referencedRelation: "sub_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_categories: {
        Row: {
          allow_multiple: boolean
          category_id: number
          created_at: string
          description: string | null
          display_order: number
          event_id: string
          id: number
          is_activate: boolean
          title: string
          title_en: string | null
        }
        Insert: {
          allow_multiple?: boolean
          category_id: number
          created_at?: string
          description?: string | null
          display_order: number
          event_id: string
          id?: number
          is_activate?: boolean
          title: string
          title_en?: string | null
        }
        Update: {
          allow_multiple?: boolean
          category_id?: number
          created_at?: string
          description?: string | null
          display_order?: number
          event_id?: string
          id?: number
          is_activate?: boolean
          title?: string
          title_en?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sub_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sub_categories_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_details: {
        Row: {
          attendee_email: string | null
          attendee_en_name: string | null
          attendee_name: string | null
          attendee_nickname: string | null
          attendee_phone: string | null
          created_at: string
          event_id: string | null
          id: number
          order_item_id: string | null
          product_id: string | null
        }
        Insert: {
          attendee_email?: string | null
          attendee_en_name?: string | null
          attendee_name?: string | null
          attendee_nickname?: string | null
          attendee_phone?: string | null
          created_at?: string
          event_id?: string | null
          id?: number
          order_item_id?: string | null
          product_id?: string | null
        }
        Update: {
          attendee_email?: string | null
          attendee_en_name?: string | null
          attendee_name?: string | null
          attendee_nickname?: string | null
          attendee_phone?: string | null
          created_at?: string
          event_id?: string | null
          id?: number
          order_item_id?: string | null
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ticket_details_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_details_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ticket_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          community: string | null
          created_at: string
          email: string
          id: string
          is_organizer: boolean | null
          name: string
          nickname: string | null
          phone: string | null
          provider: string | null
          username_en: string | null
        }
        Insert: {
          avatar_url?: string | null
          community?: string | null
          created_at?: string
          email: string
          id?: string
          is_organizer?: boolean | null
          name: string
          nickname?: string | null
          phone?: string | null
          provider?: string | null
          username_en?: string | null
        }
        Update: {
          avatar_url?: string | null
          community?: string | null
          created_at?: string
          email?: string
          id?: string
          is_organizer?: boolean | null
          name?: string
          nickname?: string | null
          phone?: string | null
          provider?: string | null
          username_en?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      order_status:
        | "completed"
        | "onprocess"
        | "failed"
        | "canceled"
        | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
