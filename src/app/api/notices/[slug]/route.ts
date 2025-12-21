import { NextRequest, NextResponse } from 'next/server';
import { getNoticeBySlug } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const notice = await getNoticeBySlug(slug);

    if (!notice) {
      return NextResponse.json({ error: 'Notice not found' }, { status: 404 });
    }

    return NextResponse.json(notice);
  } catch (error) {
    console.error('Error fetching notice:', error);
    return NextResponse.json({ error: 'Failed to fetch notice' }, { status: 500 });
  }
}
