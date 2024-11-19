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
      attendees: {
        Row: {
          attendee_city: string | null
          attendee_email: string | null
          attendee_name: string | null
          attendee_name_en: string | null
          attendee_phone: string | null
          created_at: string
          id: number
          order_item_id: string | null
          status: Database["public"]["Enums"]["attendee_status"] | null
          user_id: string | null
        }
        Insert: {
          attendee_city?: string | null
          attendee_email?: string | null
          attendee_name?: string | null
          attendee_name_en?: string | null
          attendee_phone?: string | null
          created_at?: string
          id?: number
          order_item_id?: string | null
          status?: Database["public"]["Enums"]["attendee_status"] | null
          user_id?: string | null
        }
        Update: {
          attendee_city?: string | null
          attendee_email?: string | null
          attendee_name?: string | null
          attendee_name_en?: string | null
          attendee_phone?: string | null
          created_at?: string
          id?: number
          order_item_id?: string | null
          status?: Database["public"]["Enums"]["attendee_status"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendees_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          allow_multiple: boolean | null
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
          allow_multiple?: boolean | null
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
          allow_multiple?: boolean | null
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
          created_at: string
          description: string | null
          end_datetime: string
          id: string
          image_url: string | null
          link_facebook: string | null
          link_instagram: string | null
          link_youtube: string | null
          max_capacity: number | null
          organizer_id: string | null
          start_datetime: string
          status: Database["public"]["Enums"]["event_status"] | null
          title: string
          type: Database["public"]["Enums"]["event_type"] | null
          venue: string
          venue_address: string | null
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_datetime: string
          id?: string
          image_url?: string | null
          link_facebook?: string | null
          link_instagram?: string | null
          link_youtube?: string | null
          max_capacity?: number | null
          organizer_id?: string | null
          start_datetime: string
          status?: Database["public"]["Enums"]["event_status"] | null
          title: string
          type?: Database["public"]["Enums"]["event_type"] | null
          venue: string
          venue_address?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          end_datetime?: string
          id?: string
          image_url?: string | null
          link_facebook?: string | null
          link_instagram?: string | null
          link_youtube?: string | null
          max_capacity?: number | null
          organizer_id?: string | null
          start_datetime?: string
          status?: Database["public"]["Enums"]["event_status"] | null
          title?: string
          type?: Database["public"]["Enums"]["event_type"] | null
          venue?: string
          venue_address?: string | null
          website?: string | null
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
      notifications: {
        Row: {
          created_at: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          event_id: string | null
          id: string
          order_id: string | null
          price: number | null
          product_id: string | null
          quantity: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          id?: string
          order_id?: string | null
          price?: number | null
          product_id?: string | null
          quantity?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_id?: string | null
          id?: string
          order_id?: string | null
          price?: number | null
          product_id?: string | null
          quantity?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
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
      order_payments: {
        Row: {
          amount: number | null
          cancel_amount: number | null
          cancel_reason: string | null
          card_name: string | null
          card_number: string | null
          card_type: string | null
          created_at: string
          event_id: string | null
          id: string
          method: string | null
          order_id: string | null
          payment_id: string | null
          provider: string | null
          response: Json | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          cancel_amount?: number | null
          cancel_reason?: string | null
          card_name?: string | null
          card_number?: string | null
          card_type?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          method?: string | null
          order_id?: string | null
          payment_id?: string | null
          provider?: string | null
          response?: Json | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          cancel_amount?: number | null
          cancel_reason?: string | null
          card_name?: string | null
          card_number?: string | null
          card_type?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          method?: string | null
          order_id?: string | null
          payment_id?: string | null
          provider?: string | null
          response?: Json | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_payments_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          cancelled_at: string | null
          card_name: string | null
          card_number: string | null
          card_type: string | null
          created_at: string
          event_id: string | null
          id: string
          status: Database["public"]["Enums"]["order_status"]
          total: number | null
          user_id: string | null
        }
        Insert: {
          cancelled_at?: string | null
          card_name?: string | null
          card_number?: string | null
          card_type?: string | null
          created_at?: string
          event_id?: string | null
          id: string
          status?: Database["public"]["Enums"]["order_status"]
          total?: number | null
          user_id?: string | null
        }
        Update: {
          cancelled_at?: string | null
          card_name?: string | null
          card_number?: string | null
          card_type?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          status?: Database["public"]["Enums"]["order_status"]
          total?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
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
          website: string | null
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
          website?: string | null
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
          website?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          activate_from: string
          category_id: number | null
          created_at: string
          description: string | null
          event_id: string
          id: string
          image_url: string | null
          max_quantity: number
          price: number
          status: Database["public"]["Enums"]["product_status"] | null
          sub_category_id: number | null
          title: string
          title_en: string | null
        }
        Insert: {
          activate_from?: string
          category_id?: number | null
          created_at?: string
          description?: string | null
          event_id: string
          id?: string
          image_url?: string | null
          max_quantity: number
          price: number
          status?: Database["public"]["Enums"]["product_status"] | null
          sub_category_id?: number | null
          title: string
          title_en?: string | null
        }
        Update: {
          activate_from?: string
          category_id?: number | null
          created_at?: string
          description?: string | null
          event_id?: string
          id?: string
          image_url?: string | null
          max_quantity?: number
          price?: number
          status?: Database["public"]["Enums"]["product_status"] | null
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
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          role_name: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          role_name?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          role_name?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
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
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
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
      begin_tx: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      cancel_order: {
        Args: {
          p_order_id: string
          p_reason?: string
          p_response?: string
        }
        Returns: undefined
      }
      commit_tx: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      confirm_order: {
        Args: {
          p_order_id: string
          p_event_id: string
          p_user_id: string
          p_method: string
          p_payment_id: string
          p_amount: number
          p_card_type: string
          p_card_name: string
          p_card_number: string
          p_attendee_infos: Json[]
          p_response: Json
        }
        Returns: undefined
      }
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      has_any_role: {
        Args: {
          p_user_id: string
        }
        Returns: boolean
      }
      is_organizer: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      process_order: {
        Args: {
          p_cart_items: Json[]
          p_event_id: string
          p_user_id: string
          p_total: number
        }
        Returns: string
      }
      rollback_tx: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      attendee_status: "not_checked" | "checked_in" | "no_show"
      event_status: "draft" | "published" | "cancelled"
      event_type: "festival" | "workshop" | "party"
      order_status: "pending" | "confirmed" | "cancelled"
      product_status: "draft" | "active" | "inactive" | "end"
      user_role: "admin" | "organizer"
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
