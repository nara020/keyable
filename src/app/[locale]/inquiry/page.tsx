import { Suspense } from 'react';
import Image from 'next/image';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { Card } from '@/components/ui/card';
import { Phone, Mail, MessageCircle, Clock, Shield, Globe, Map, Heart, Users, Car } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const serviceHighlights = [
  { key: 'private-tour', icon: Map, color: 'from-blue-500 to-cyan-500' },
  { key: 'medical-tourism', icon: Heart, color: 'from-rose-500 to-pink-500' },
  { key: 'guide-service', icon: Users, color: 'from-amber-500 to-orange-500' },
  { key: 'vehicle-rental', icon: Car, color: 'from-emerald-500 to-teal-500' },
];

const trustPoints = [
  { icon: Shield, key: 'licensed' },
  { icon: Globe, key: 'multilingual' },
  { icon: Clock, key: 'support' },
];

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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('/images/services/seoul.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {dict.inquiry.title}
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              {dict.inquiry.subtitle}
            </p>

            {/* Trust Points */}
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {trustPoints.map((point) => {
                const IconComponent = point.icon;
                return (
                  <div key={point.key} className="flex items-center gap-2 text-white/80">
                    <IconComponent className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {dict.servicesPage?.trustPoints?.[point.key as keyof typeof dict.servicesPage.trustPoints]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Service Quick Select - Floating Cards */}
      <section className="relative -mt-12 z-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-900 sm:grid-cols-4">
            {serviceHighlights.map((service) => {
              const IconComponent = service.icon;
              const isSelected = searchParams.service === service.key;
              const serviceDict = dict.services[service.key.replace('-', '') === 'privatetour' ? 'privateTour' : service.key.replace('-', '') === 'medicaltourism' ? 'medical' : service.key.replace('-', '') === 'guideservice' ? 'guide' : 'vehicle'] as { title: string };

              return (
                <a
                  key={service.key}
                  href={`?service=${service.key}`}
                  className={`group flex flex-col items-center rounded-xl p-4 text-center transition-all ${
                    isSelected
                      ? 'bg-gradient-to-br ' + service.color + ' text-white shadow-lg'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div
                    className={`mb-2 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${
                      isSelected
                        ? 'bg-white/20'
                        : 'bg-gradient-to-br ' + service.color + ' text-white'
                    }`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                    {serviceDict.title}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-0 shadow-xl">
                <div className="bg-gradient-to-r from-[#040f77] to-[#fc645f] px-6 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    {locale === 'id' ? 'Isi Formulir Permintaan' : 'Fill Out Your Request'}
                  </h2>
                </div>
                <div className="p-6 sm:p-8">
                  <InquiryForm
                    locale={locale}
                    dict={dict}
                    defaultService={searchParams.service}
                  />
                </div>
              </Card>
            </div>

            {/* Contact Info Sidebar */}
            <aside className="space-y-6" aria-label="Contact options">
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
                  <h2 className="text-lg font-semibold text-white">
                    {dict.inquiryPage?.directContact}
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {dict.inquiryPage?.directContactDesc}
                  </p>

                  <div className="mt-6 space-y-4">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl border-2 border-green-100 bg-green-50 p-4 transition-all hover:border-green-300 hover:shadow-md dark:border-green-900 dark:bg-green-900/20 dark:hover:border-green-700 min-h-[64px]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-white transition-transform group-hover:scale-110">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {dict.inquiryPage?.whatsapp}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {dict.inquiryPage?.whatsappDesc}
                        </div>
                      </div>
                    </a>

                    <a
                      href={`tel:${SITE_CONFIG.phone}`}
                      className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-blue-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700 min-h-[64px]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#040f77]/10 text-[#040f77] transition-transform group-hover:scale-110 dark:bg-[#040f77]/30 dark:text-[#fc645f]">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {dict.inquiryPage?.phone}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {SITE_CONFIG.phone}
                        </div>
                      </div>
                    </a>

                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-purple-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-purple-700 min-h-[64px]"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600 transition-transform group-hover:scale-110 dark:bg-purple-900/30 dark:text-purple-400">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {dict.inquiryPage?.email}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {SITE_CONFIG.email}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="overflow-hidden border-0 bg-gradient-to-br from-[#040f77] to-[#fc645f] shadow-lg">
                <div className="p-6 text-white">
                  <div className="flex items-center gap-3">
                    <Clock className="h-8 w-8" />
                    <h3 className="text-lg font-semibold">
                      {dict.inquiryPage?.responseTime}
                    </h3>
                  </div>
                  <p
                    className="mt-3 text-blue-100"
                    dangerouslySetInnerHTML={{ __html: dict.inquiryPage?.responseTimeDesc || '' }}
                  />
                </div>
              </Card>

              {/* Destination Preview */}
              <Card className="overflow-hidden border-0 shadow-lg">
                <div className="relative h-40">
                  <Image
                    src="/images/services/seoul.jpg"
                    alt="Seoul"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-sm text-white/80">
                      {locale === 'id' ? 'Destinasi Populer' : 'Popular Destination'}
                    </p>
                    <p className="text-xl font-bold text-white">Seoul, Korea</p>
                  </div>
                </div>
              </Card>
            </aside>
          </div>
        </div>
      </section>
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
