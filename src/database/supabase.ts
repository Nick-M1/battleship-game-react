export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  battleships: {
    Tables: {
      boat_locations: {
        Row: {
          boat_type_id: number
          is_vertical_orientation: boolean
          player_id: string
          session_id: string
          x_coordinate: number
          y_coordinate: number
        }
        Insert: {
          boat_type_id: number
          is_vertical_orientation?: boolean
          player_id: string
          session_id: string
          x_coordinate: number
          y_coordinate: number
        }
        Update: {
          boat_type_id?: number
          is_vertical_orientation?: boolean
          player_id?: string
          session_id?: string
          x_coordinate?: number
          y_coordinate?: number
        }
        Relationships: [
          {
            foreignKeyName: "boat_locations_boat_type_id_fkey"
            columns: ["boat_type_id"]
            isOneToOne: false
            referencedRelation: "boat_types"
            referencedColumns: ["boat_type_id"]
          },
          {
            foreignKeyName: "boat_locations_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "boat_locations_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["session_id"]
          }
        ]
      }
      boat_types: {
        Row: {
          boat_type_id: number
          color: string
          size: number
        }
        Insert: {
          boat_type_id?: number
          color: string
          size: number
        }
        Update: {
          boat_type_id?: number
          color?: string
          size?: number
        }
        Relationships: []
      }
      game_sessions: {
        Row: {
          completed_at: string | null
          created_at: string
          current_turn: number
          current_turn_started_at: string
          game_status: Database["battleships"]["Enums"]["game_status"]
          modified_at: string
          player_1_id: string
          player_2_id: string | null
          session_id: string
          time_per_move: unknown | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_turn?: number
          current_turn_started_at?: string
          game_status?: Database["battleships"]["Enums"]["game_status"]
          modified_at?: string
          player_1_id: string
          player_2_id?: string | null
          session_id?: string
          time_per_move?: unknown | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_turn?: number
          current_turn_started_at?: string
          game_status?: Database["battleships"]["Enums"]["game_status"]
          modified_at?: string
          player_1_id?: string
          player_2_id?: string | null
          session_id?: string
          time_per_move?: unknown | null
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_player_1_id_fkey"
            columns: ["player_1_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "game_sessions_player_2_id_fkey"
            columns: ["player_2_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["player_id"]
          }
        ]
      }
      moves: {
        Row: {
          created_at: string
          move_type: Database["battleships"]["Enums"]["move_type"]
          player_id: string
          result: Database["battleships"]["Enums"]["move_result"]
          session_id: string
          x_coordinate: number
          y_coordinate: number
        }
        Insert: {
          created_at?: string
          move_type?: Database["battleships"]["Enums"]["move_type"]
          player_id: string
          result?: Database["battleships"]["Enums"]["move_result"]
          session_id: string
          x_coordinate: number
          y_coordinate: number
        }
        Update: {
          created_at?: string
          move_type?: Database["battleships"]["Enums"]["move_type"]
          player_id?: string
          result?: Database["battleships"]["Enums"]["move_result"]
          session_id?: string
          x_coordinate?: number
          y_coordinate?: number
        }
        Relationships: [
          {
            foreignKeyName: "moves_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "moves_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["session_id"]
          }
        ]
      }
      moves_available: {
        Row: {
          nuke_move_amount: number
          player_id: string
          quad_move_amount: number
          scatter_move_amount: number
          session_id: string
          single_move_amount: number
        }
        Insert: {
          nuke_move_amount?: number
          player_id: string
          quad_move_amount?: number
          scatter_move_amount?: number
          session_id: string
          single_move_amount?: number
        }
        Update: {
          nuke_move_amount?: number
          player_id?: string
          quad_move_amount?: number
          scatter_move_amount?: number
          session_id?: string
          single_move_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "moves_available_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["player_id"]
          },
          {
            foreignKeyName: "moves_available_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["session_id"]
          }
        ]
      }
      players: {
        Row: {
          created_at: string
          image_index: number
          modified_at: string
          password: string
          player_id: string
          username: string
        }
        Insert: {
          created_at?: string
          image_index?: number
          modified_at?: string
          password: string
          player_id?: string
          username: string
        }
        Update: {
          created_at?: string
          image_index?: number
          modified_at?: string
          password?: string
          player_id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_future_occupied_coords: {
        Args: {
          p_boat_type_id: number
          p_x_coordinate: number
          p_y_coordinate: number
          p_is_vertical_orientation: boolean
        }
        Returns: {
          x_coordinate: number
          y_coordinate: number
        }[]
      }
      get_occupied_coords: {
        Args: {
          p_session_id: string
          p_player_id: string
        }
        Returns: {
          boat_type_id: number
          color: string
          size: number
          x_coordinate: number
          y_coordinate: number
          is_vertical_orientation: boolean
        }[]
      }
      is_placement_valid: {
        Args: {
          p_session_id: string
          p_player_id: string
          p_boat_type_id: number
          p_x_coordinate: number
          p_y_coordinate: number
          p_is_vertical_orientation: boolean
        }
        Returns: boolean
      }
      populate_player_grid: {
        Args: {
          p_player_id: string
          p_session_id: string
        }
        Returns: undefined
      }
      random_boolean: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      randomize_coordinates: {
        Args: {
          board_width: number
          board_height: number
        }
        Returns: Record<string, unknown>
      }
      skip_move_if_overruns_time: {
        Args: {
          p_session_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      game_status: "joining" | "ongoing" | "finished"
      move_result: "miss" | "hit" | "sunk"
      move_type: "single" | "quad" | "scatter" | "nuke"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
