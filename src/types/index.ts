export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  guests: string;
  budget: string;
  service_type: string;
  details: string;
  created_at?: string;
  status?: 'pending' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
}

export interface Notice {
  id: string;
  title: string;
  title_id?: string;
  content: string;
  content_id?: string;
  created_at: string;
  updated_at?: string;
  is_published: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  question_id?: string;
  answer: string;
  answer_id?: string;
  order: number;
  is_published: boolean;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}
