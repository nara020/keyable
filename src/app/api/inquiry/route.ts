import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import { SITE_CONFIG } from '@/lib/constants';
import { createInquiry, getInquiries } from '@/lib/db';
import type { InquiryInsert } from '@/lib/types/database';

const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email').max(255),
  phone: z.string().min(1, 'Phone is required').max(50),
  service_type: z.enum(['private_tour', 'medical_tourism', 'guide_service', 'vehicle_rental', 'other']),
  travel_date: z.string().optional().nullable(),
  group_size: z.number().int().positive().optional().nullable(),
  message: z.string().min(10, 'Please provide more details').max(5000),
  locale: z.string().default('en'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = inquirySchema.parse(body);

    // Prepare data for Supabase
    const inquiryData: InquiryInsert = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      service_type: validatedData.service_type,
      travel_date: validatedData.travel_date || null,
      group_size: validatedData.group_size || null,
      message: validatedData.message,
      status: 'new',
      admin_notes: null,
      locale: validatedData.locale,
    };

    // Save to Supabase
    const inquiry = await createInquiry(inquiryData);

    if (!inquiry) {
      return NextResponse.json(
        { success: false, error: 'Failed to save inquiry' },
        { status: 500 }
      );
    }

    // Send email notification (async, don't block response)
    sendEmailNotification(inquiry).catch((err) => {
      console.error('Email notification failed:', err);
    });

    return NextResponse.json(
      { success: true, id: inquiry.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }
    console.error('Inquiry submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Admin auth check
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') as 'new' | 'in_progress' | 'completed' | 'cancelled' | null;
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  const result = await getInquiries({
    status: status || undefined,
    limit,
    offset,
  });

  return NextResponse.json(result);
}

async function sendEmailNotification(inquiry: {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string;
  travel_date?: string | null;
  group_size?: number | null;
  created_at: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP credentials not configured, skipping email notification');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const serviceTypeLabels: Record<string, string> = {
    private_tour: 'Private Tour',
    medical_tourism: 'Medical Tourism',
    guide_service: 'Guide Service',
    vehicle_rental: 'Vehicle Rental',
    other: 'Other',
  };

  const mailOptions = {
    from: `"${SITE_CONFIG.name}" <${process.env.SMTP_USER}>`,
    to: SITE_CONFIG.email,
    subject: `[New Inquiry] ${inquiry.name} - ${serviceTypeLabels[inquiry.service_type] || inquiry.service_type}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
          New Inquiry Received
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; background: #f3f4f6; font-weight: bold; width: 150px;">ID</td>
            <td style="padding: 8px;">${inquiry.id}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Received</td>
            <td style="padding: 8px;">${new Date(inquiry.created_at).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
          </tr>
        </table>

        <h3 style="color: #374151; margin-top: 20px;">Customer Information</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; background: #f3f4f6; font-weight: bold; width: 150px;">Name</td>
            <td style="padding: 8px;">${inquiry.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Email</td>
            <td style="padding: 8px;"><a href="mailto:${inquiry.email}">${inquiry.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Phone</td>
            <td style="padding: 8px;"><a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}">${inquiry.phone}</a></td>
          </tr>
        </table>

        <h3 style="color: #374151; margin-top: 20px;">Trip Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; background: #f3f4f6; font-weight: bold; width: 150px;">Service Type</td>
            <td style="padding: 8px;">${serviceTypeLabels[inquiry.service_type] || inquiry.service_type}</td>
          </tr>
          ${inquiry.travel_date ? `
          <tr>
            <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Travel Date</td>
            <td style="padding: 8px;">${inquiry.travel_date}</td>
          </tr>
          ` : ''}
          ${inquiry.group_size ? `
          <tr>
            <td style="padding: 8px; background: #f3f4f6; font-weight: bold;">Group Size</td>
            <td style="padding: 8px;">${inquiry.group_size} person(s)</td>
          </tr>
          ` : ''}
        </table>

        <h3 style="color: #374151; margin-top: 20px;">Message</h3>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; white-space: pre-wrap;">
          ${inquiry.message}
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="margin: 5px 0;">
            <strong>Reply via Email:</strong>
            <a href="mailto:${inquiry.email}" style="color: #0ea5e9;">${inquiry.email}</a>
          </p>
          <p style="margin: 5px 0;">
            <strong>Reply via WhatsApp:</strong>
            <a href="https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}" style="color: #25D366;">
              Click to open WhatsApp
            </a>
          </p>
        </div>

        <p style="font-size: 12px; color: #6b7280; margin-top: 20px;">
          This email was sent automatically from ${SITE_CONFIG.name} website.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
