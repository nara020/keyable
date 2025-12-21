import { NextRequest, NextResponse } from 'next/server';
import { getNotices } from '@/lib/db';

export const revalidate = 3600; // Revalidate every hour

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as 'announcement' | 'update' | 'promotion' | 'travel_info' | null;
  const limit = parseInt(searchParams.get('limit') || '10');
  const page = parseInt(searchParams.get('page') || '1');
  const offset = (page - 1) * limit;

  try {
    const result = await getNotices({
      published: true,
      category: category || undefined,
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
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}
