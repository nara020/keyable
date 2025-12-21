import Link from 'next/link';
import { CheckCircle, MessageCircle, Mail, Home } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.inquiry.complete.title,
  };
}

export default async function InquiryCompletePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-16 lg:py-24">
      <div className="mx-auto max-w-lg px-4 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {dict.inquiry.complete.title}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {dict.inquiry.complete.message}
        </p>

        <div className="mt-8 rounded-xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {dict.inquiry.complete.contact}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
            >
              <MessageCircle className="h-4 w-4" />
              {dict.inquiry.complete.whatsapp}
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Mail className="h-4 w-4" />
              {dict.inquiry.complete.email}
            </a>
          </div>
        </div>

        <div className="mt-8">
          <Link href={`/${locale}`}>
            <Button variant="outline">
              <Home className="h-4 w-4" />
              {dict.inquiry.complete.backHome}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
