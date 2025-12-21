import { NextResponse } from 'next/server';
import { getFAQs } from '@/lib/db';

export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const faqs = await getFAQs({ published: true });

    return NextResponse.json({
      data: faqs,
      count: faqs.length,
    });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}
