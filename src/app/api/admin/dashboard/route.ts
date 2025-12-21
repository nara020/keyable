import { NextRequest, NextResponse } from 'next/server';
import { getDashboardStats, getInquiries, getNotices } from '@/lib/db';

function checkAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.ADMIN_API_KEY}`;
}

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [stats, recentInquiries, recentNotices] = await Promise.all([
      getDashboardStats(),
      getInquiries({ limit: 5 }),
      getNotices({ limit: 5 }),
    ]);

    return NextResponse.json({
      stats,
      recentInquiries: recentInquiries.data,
      recentNotices: recentNotices.data,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
