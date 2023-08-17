export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean
        }
        Relationships: []
      }
      countries: {
        Row: {
          continent: Database["public"]["Enums"]["continents"] | null
          id: number
          iso2: string
          iso3: string | null
          local_name: string | null
          name: string | null
        }
        Insert: {
          continent?: Database["public"]["Enums"]["continents"] | null
          id?: number
          iso2: string
          iso3?: string | null
          local_name?: string | null
          name?: string | null
        }
        Update: {
          continent?: Database["public"]["Enums"]["continents"] | null
          id?: number
          iso2?: string
          iso3?: string | null
          local_name?: string | null
          name?: string | null
        }
        Relationships: []
      }
      orders: {
        Row: {
          address: string | null
          id: string
          price: number | null
          user_id: string | null
          view: number | null
        }
        Insert: {
          address?: string | null
          id: string
          price?: number | null
          user_id?: string | null
          view?: number | null
        }
        Update: {
          address?: string | null
          id?: string
          price?: number | null
          user_id?: string | null
          view?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          id: string
        }
        Insert: {
          email?: string | null
          id: string
        }
        Update: {
          email?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment: {
        Args: {
          row_id: string
        }
        Returns: undefined
      }
      test_authorization_header: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
    }
    Enums: {
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
