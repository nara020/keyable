import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getFAQs, createFAQ } from '@/lib/db';

function checkAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.ADMIN_API_KEY}`;
}

const createSchema = z.object({
  question_en: z.string().min(1),
  question_id: z.string().min(1),
  answer_en: z.string().min(1),
  answer_id: z.string().min(1),
  category: z.enum(['general', 'booking', 'payment', 'tour', 'medical', 'visa']).default('general'),
  order_index: z.number().int().min(0).default(0),
  is_published: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') as 'general' | 'booking' | 'payment' | 'tour' | 'medical' | 'visa' | null;
  const published = searchParams.get('published');

  try {
    const faqs = await getFAQs({
      category: category || undefined,
      published: published === 'true' ? true : published === 'false' ? false : undefined,
    });

    return NextResponse.json({ data: faqs, count: faqs.length });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
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

    const faq = await createFAQ(validatedData);

    if (!faq) {
      return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
    }

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.issues }, { status: 400 });
    }
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
