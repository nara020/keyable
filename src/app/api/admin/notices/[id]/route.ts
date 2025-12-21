import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getNoticeById, updateNotice, deleteNotice } from '@/lib/db';

function checkAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.ADMIN_API_KEY}`;
}

const updateSchema = z.object({
  title_en: z.string().min(1).max(255).optional(),
  title_id: z.string().min(1).max(255).optional(),
  content_en: z.string().min(1).optional(),
  content_id: z.string().min(1).optional(),
  category: z.enum(['announcement', 'update', 'promotion', 'travel_info']).optional(),
  slug: z.string().min(1).max(255).optional(),
  is_published: z.boolean().optional(),
  published_at: z.string().optional().nullable(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const notice = await getNoticeById(id);
    if (!notice) {
      return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
    }
    return NextResponse.json(notice);
  } catch (error) {
    console.error('Error fetching notice:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const validatedData = updateSchema.parse(body);

    // If publishing for the first time, set published_at
    if (validatedData.is_published && !validatedData.published_at) {
      const existing = await getNoticeById(id);
      if (existing && !existing.is_published) {
        validatedData.published_at = new Date().toISOString();
      }
    }

    const notice = await updateNotice(id, validatedData);
    if (!notice) {
      return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
    }

    return NextResponse.json(notice);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.issues }, { status: 400 });
    }
    console.error('Error updating notice:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const success = await deleteNotice(id);
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete notice' }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting notice:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
