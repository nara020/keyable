import { Suspense } from 'react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { Card } from '@/components/ui/card';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.inquiry.title,
    description: dict.inquiry.subtitle,
  };
}

function InquiryPageContent({
  locale,
  dict,
  searchParams,
}: {
  locale: string;
  dict: Awaited<ReturnType<typeof getDictionary>>;
  searchParams: { service?: string };
}) {
  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {dict.inquiry.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {dict.inquiry.subtitle}
            </p>

            <Card className="mt-8 p-6 sm:p-8">
              <InquiryForm
                locale={locale}
                dict={dict}
                defaultService={searchParams.service}
              />
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Direct Contact
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Prefer to reach us directly? We're here to help.
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      WhatsApp
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Chat with us instantly
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Phone
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {SITE_CONFIG.phone}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Email
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {SITE_CONFIG.email}
                    </div>
                  </div>
                </a>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 dark:from-blue-900/20 dark:to-cyan-900/20">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Response Time
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                We typically respond within <strong>24 hours</strong>. For urgent
                inquiries, please use WhatsApp for faster response.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function InquiryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const dict = await getDictionary(locale as Locale);

  return (
    <Suspense fallback={<div className="py-24 text-center">Loading...</div>}>
      <InquiryPageContent
        locale={locale}
        dict={dict}
        searchParams={resolvedSearchParams}
      />
    </Suspense>
  );
}
