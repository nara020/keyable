// Database Types for Supabase

export interface Inquiry {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phone: string;
  service_type: 'private_tour' | 'medical_tourism' | 'guide_service' | 'vehicle_rental' | 'other';
  travel_date: string | null;
  group_size: number | null;
  message: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  admin_notes: string | null;
  locale: string;
}

export interface Notice {
  id: string;
  created_at: string;
  updated_at: string;
  title_en: string;
  title_id: string;
  content_en: string;
  content_id: string;
  category: 'announcement' | 'update' | 'promotion' | 'travel_info';
  is_published: boolean;
  published_at: string | null;
  views: number;
  slug: string;
}

export interface FAQ {
  id: string;
  created_at: string;
  updated_at: string;
  question_en: string;
  question_id: string;
  answer_en: string;
  answer_id: string;
  category: 'general' | 'booking' | 'payment' | 'tour' | 'medical' | 'visa';
  order_index: number;
  is_published: boolean;
}

export interface AdminUser {
  id: string;
  created_at: string;
  email: string;
  role: 'admin' | 'editor';
  last_login: string | null;
}

// Insert types (without auto-generated fields)
export type InquiryInsert = Omit<Inquiry, 'id' | 'created_at' | 'updated_at'>;
export type NoticeInsert = Omit<Notice, 'id' | 'created_at' | 'updated_at' | 'views'>;
export type FAQInsert = Omit<FAQ, 'id' | 'created_at' | 'updated_at'>;

// Update types (all fields optional except id)
export type InquiryUpdate = Partial<Omit<Inquiry, 'id' | 'created_at'>>;
export type NoticeUpdate = Partial<Omit<Notice, 'id' | 'created_at'>>;
export type FAQUpdate = Partial<Omit<FAQ, 'id' | 'created_at'>>;

// Supabase Database schema type
export type Database = {
  public: {
    Tables: {
      inquiries: {
        Row: Inquiry;
        Insert: InquiryInsert;
        Update: InquiryUpdate;
      };
      notices: {
        Row: Notice;
        Insert: NoticeInsert & { views?: number };
        Update: NoticeUpdate;
      };
      faq: {
        Row: FAQ;
        Insert: FAQInsert;
        Update: FAQUpdate;
      };
      admin_users: {
        Row: AdminUser;
        Insert: Omit<AdminUser, 'id' | 'created_at'>;
        Update: Partial<Omit<AdminUser, 'id' | 'created_at'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
