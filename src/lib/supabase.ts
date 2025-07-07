import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      thumbnails: {
        Row: {
          id: string;
          title: string;
          category: string;
          image_url: string;
          views: string;
          likes: string;
          game_overlay: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          category?: string;
          image_url: string;
          views?: string;
          likes?: string;
          game_overlay?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          category?: string;
          image_url?: string;
          views?: string;
          likes?: string;
          game_overlay?: string;
          updated_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          platform: string;
          channel_name: string;
          channel_url: string;
          subscribers: string;
          status: string;
          rating: number;
          notes: string;
          preferred_contact: string;
          total_orders: number;
          total_spent: number;
          last_contact: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string;
          platform?: string;
          channel_name?: string;
          channel_url?: string;
          subscribers?: string;
          status?: string;
          rating?: number;
          notes?: string;
          preferred_contact?: string;
          total_orders?: number;
          total_spent?: number;
          last_contact?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          platform?: string;
          channel_name?: string;
          channel_url?: string;
          subscribers?: string;
          status?: string;
          rating?: number;
          notes?: string;
          preferred_contact?: string;
          total_orders?: number;
          total_spent?: number;
          last_contact?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          client_id: string;
          package_type: string;
          title: string;
          description: string;
          price: number;
          status: string;
          thumbnails_count: number;
          revisions: number;
          max_revisions: number;
          files: any[];
          notes: string;
          deadline: string | null;
          delivery_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          package_type?: string;
          title: string;
          description?: string;
          price?: number;
          status?: string;
          thumbnails_count?: number;
          revisions?: number;
          max_revisions?: number;
          files?: any[];
          notes?: string;
          deadline?: string | null;
          delivery_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          package_type?: string;
          title?: string;
          description?: string;
          price?: number;
          status?: string;
          thumbnails_count?: number;
          revisions?: number;
          max_revisions?: number;
          files?: any[];
          notes?: string;
          deadline?: string | null;
          delivery_date?: string | null;
          updated_at?: string;
        };
      };
      communications: {
        Row: {
          id: string;
          client_id: string;
          type: string;
          subject: string;
          message: string;
          direction: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          type?: string;
          subject: string;
          message?: string;
          direction?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          type?: string;
          subject?: string;
          message?: string;
          direction?: string;
          status?: string;
          updated_at?: string;
        };
      };
    };
  };
}