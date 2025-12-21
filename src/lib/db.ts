import { createClient } from '@supabase/supabase-js';
import type {
  Inquiry,
  InquiryInsert,
  InquiryUpdate,
  Notice,
  NoticeInsert,
  NoticeUpdate,
  FAQ,
  FAQInsert,
  FAQUpdate,
} from './types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase instance (limited permissions)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase instance (full permissions, bypasses RLS)
export const getServerSupabase = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, supabaseServiceKey);
};

// =============================================
// INQUIRY OPERATIONS
// =============================================

export async function createInquiry(data: InquiryInsert): Promise<Inquiry | null> {
  const db = getServerSupabase();
  const { data: inquiry, error } = await db
    .from('inquiries')
    .insert(data as Record<string, unknown>)
    .select()
    .single();

  if (error) {
    console.error('Error creating inquiry:', error);
    return null;
  }

  return inquiry as Inquiry;
}

export async function getInquiries(options?: {
  status?: Inquiry['status'];
  limit?: number;
  offset?: number;
}): Promise<{ data: Inquiry[]; count: number }> {
  const db = getServerSupabase();
  let query = db
    .from('inquiries')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error('Error fetching inquiries:', error);
    return { data: [], count: 0 };
  }

  return { data: (data || []) as Inquiry[], count: count || 0 };
}

export async function getInquiryById(id: string): Promise<Inquiry | null> {
  const db = getServerSupabase();
  const { data, error } = await db
    .from('inquiries')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching inquiry:', error);
    return null;
  }

  return data as Inquiry;
}

export async function updateInquiry(id: string, data: InquiryUpdate): Promise<Inquiry | null> {
  const db = getServerSupabase();
  const { data: inquiry, error } = await db
    .from('inquiries')
    .update(data as Record<string, unknown>)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating inquiry:', error);
    return null;
  }

  return inquiry as Inquiry;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const db = getServerSupabase();
  const { error } = await db.from('inquiries').delete().eq('id', id);

  if (error) {
    console.error('Error deleting inquiry:', error);
    return false;
  }

  return true;
}

// =============================================
// NOTICE OPERATIONS
// =============================================

export async function createNotice(data: NoticeInsert): Promise<Notice | null> {
  const db = getServerSupabase();
  const { data: notice, error } = await db
    .from('notices')
    .insert({ ...data, views: 0 } as Record<string, unknown>)
    .select()
    .single();

  if (error) {
    console.error('Error creating notice:', error);
    return null;
  }

  return notice as Notice;
}

export async function getNotices(options?: {
  published?: boolean;
  category?: Notice['category'];
  limit?: number;
  offset?: number;
}): Promise<{ data: Notice[]; count: number }> {
  const db = options?.published ? supabase : getServerSupabase();
  let query = db
    .from('notices')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false, nullsFirst: false });

  if (options?.published !== undefined) {
    query = query.eq('is_published', options.published);
  }

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error('Error fetching notices:', error);
    return { data: [], count: 0 };
  }

  return { data: (data || []) as Notice[], count: count || 0 };
}

export async function getNoticeBySlug(slug: string): Promise<Notice | null> {
  const { data, error } = await supabase
    .from('notices')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching notice:', error);
    return null;
  }

  const notice = data as Notice;

  // Increment view count
  await supabase
    .from('notices')
    .update({ views: (notice.views || 0) + 1 })
    .eq('id', notice.id);

  return notice;
}

export async function getNoticeById(id: string): Promise<Notice | null> {
  const db = getServerSupabase();
  const { data, error } = await db
    .from('notices')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching notice:', error);
    return null;
  }

  return data as Notice;
}

export async function updateNotice(id: string, data: NoticeUpdate): Promise<Notice | null> {
  const db = getServerSupabase();
  const { data: notice, error } = await db
    .from('notices')
    .update(data as Record<string, unknown>)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating notice:', error);
    return null;
  }

  return notice as Notice;
}

export async function deleteNotice(id: string): Promise<boolean> {
  const db = getServerSupabase();
  const { error } = await db.from('notices').delete().eq('id', id);

  if (error) {
    console.error('Error deleting notice:', error);
    return false;
  }

  return true;
}

// =============================================
// FAQ OPERATIONS
// =============================================

export async function createFAQ(data: FAQInsert): Promise<FAQ | null> {
  const db = getServerSupabase();
  const { data: faq, error } = await db
    .from('faq')
    .insert(data as Record<string, unknown>)
    .select()
    .single();

  if (error) {
    console.error('Error creating FAQ:', error);
    return null;
  }

  return faq as FAQ;
}

export async function getFAQs(options?: {
  published?: boolean;
  category?: FAQ['category'];
}): Promise<FAQ[]> {
  const db = options?.published ? supabase : getServerSupabase();
  let query = db.from('faq').select('*').order('order_index', { ascending: true });

  if (options?.published !== undefined) {
    query = query.eq('is_published', options.published);
  }

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }

  return (data || []) as FAQ[];
}

export async function getFAQById(id: string): Promise<FAQ | null> {
  const db = getServerSupabase();
  const { data, error } = await db.from('faq').select('*').eq('id', id).single();

  if (error) {
    console.error('Error fetching FAQ:', error);
    return null;
  }

  return data as FAQ;
}

export async function updateFAQ(id: string, data: FAQUpdate): Promise<FAQ | null> {
  const db = getServerSupabase();
  const { data: faq, error } = await db
    .from('faq')
    .update(data as Record<string, unknown>)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating FAQ:', error);
    return null;
  }

  return faq as FAQ;
}

export async function deleteFAQ(id: string): Promise<boolean> {
  const db = getServerSupabase();
  const { error } = await db.from('faq').delete().eq('id', id);

  if (error) {
    console.error('Error deleting FAQ:', error);
    return false;
  }

  return true;
}

// =============================================
// DASHBOARD STATS
// =============================================

export async function getDashboardStats(): Promise<{
  inquiries: { total: number; new: number; inProgress: number };
  notices: { total: number; published: number };
  faq: { total: number; published: number };
}> {
  const db = getServerSupabase();

  const [
    { count: totalInquiries },
    { count: newInquiries },
    { count: inProgressInquiries },
    { count: totalNotices },
    { count: publishedNotices },
    { count: totalFaq },
    { count: publishedFaq },
  ] = await Promise.all([
    db.from('inquiries').select('*', { count: 'exact', head: true }),
    db.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    db.from('inquiries').select('*', { count: 'exact', head: true }).eq('status', 'in_progress'),
    db.from('notices').select('*', { count: 'exact', head: true }),
    db.from('notices').select('*', { count: 'exact', head: true }).eq('is_published', true),
    db.from('faq').select('*', { count: 'exact', head: true }),
    db.from('faq').select('*', { count: 'exact', head: true }).eq('is_published', true),
  ]);

  return {
    inquiries: {
      total: totalInquiries || 0,
      new: newInquiries || 0,
      inProgress: inProgressInquiries || 0,
    },
    notices: {
      total: totalNotices || 0,
      published: publishedNotices || 0,
    },
    faq: {
      total: totalFaq || 0,
      published: publishedFaq || 0,
    },
  };
}
