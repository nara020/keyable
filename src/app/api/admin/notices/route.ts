import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getNotices, createNotice } from '@/lib/db';

function checkAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.ADMIN_API_KEY}`;
}

const createSchema = z.object({
  title_en: z.string().min(1).max(255),
  title_id: z.string().min(1).max(255),
  content_en: z.string().min(1),
  content_id: z.string().min(1),
  category: z.enum(['announcement', 'update', 'promotion', 'travel_info']).default('announcement'),
  slug: z.string().min(1).max(255),
  is_published: z.boolean().default(false),
  published_at: z.string().optional().nullable(),
});

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as 'announcement' | 'update' | 'promotion' | 'travel_info' | null;
  const published = searchParams.get('published');
  const limit = parseInt(searchParams.get('limit') || '20');
  const page = parseInt(searchParams.get('page') || '1');
  const offset = (page - 1) * limit;

  try {
    const result = await getNotices({
      category: category || undefined,
      published: published === 'true' ? true : published === 'false' ? false : undefined,
      limit,
      offset,
    });

    return NextResponse.json({
      ...result,
      page,
      limit,
      totalPages: Math.ceil(result.count / limit),
    });
  } catch (error) {
    console.error('Error fetching notices:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = createSchema.parse(body);

    const notice = await createNotice({
      ...validatedData,
      published_at: validatedData.is_published ? new Date().toISOString() : null,
    });

    if (!notice) {
      return NextResponse.json({ error: 'Failed to create notice' }, { status: 500 });
    }

    return NextResponse.json(notice, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.issues }, { status: 400 });
    }
    console.error('Error creating notice:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
