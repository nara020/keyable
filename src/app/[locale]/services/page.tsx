import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Map, Heart, Users, Car, CheckCircle, Shield, Clock, Globe } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';

const icons = {
  Map,
  Heart,
  Users,
  Car,
};

const services = [
  {
    key: 'privateTour',
    slug: 'private-tour',
    icon: 'Map',
    color: 'from-blue-500 to-cyan-500',
    image: '/images/services/private-tour.jpg',
    highlights: ['Custom itineraries', 'Licensed guides', 'Luxury vehicles'],
  },
  {
    key: 'medical',
    slug: 'medical-tourism',
    icon: 'Heart',
    color: 'from-rose-500 to-pink-500',
    image: '/images/services/medical-tourism.jpg',
    highlights: ['JCI hospitals', 'Medical interpreter', 'Full support'],
  },
  {
    key: 'guide',
    slug: 'guide-service',
    icon: 'Users',
    color: 'from-amber-500 to-orange-500',
    image: '/images/services/guide-service.jpg',
    highlights: ['Licensed guides', 'Multilingual', 'K-culture experts'],
  },
  {
    key: 'vehicle',
    slug: 'vehicle-rental',
    icon: 'Car',
    color: 'from-emerald-500 to-teal-500',
    image: '/images/services/vehicle-rental.jpg',
    highlights: ['Premium fleet', 'Pro drivers', 'All-inclusive'],
  },
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
    title: dict.services.title,
    description: dict.services.subtitle,
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('/images/services/seoul.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {dict.services.title}
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              {dict.services.subtitle}
            </p>

            {/* Trust Points */}
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {trustPoints.map((point) => {
                const IconComponent = point.icon;
                return (
                  <div key={point.key} className="flex items-center gap-2 text-white/80">
                    <IconComponent className="h-5 w-5" />
                    <span className="text-sm font-medium">
                      {dict.servicesPage?.trustPoints?.[point.key as keyof typeof dict.servicesPage.trustPoints] ||
                       dict.home.features[point.key as keyof typeof dict.home.features]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid - Card Style */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => {
              const IconComponent = icons[service.icon as keyof typeof icons];
              const serviceDict = dict.services[service.key as keyof typeof dict.services] as { title: string; description: string };

              return (
                <Card key={service.slug} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={serviceDict.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white shadow-lg`}
                          >
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <h2 className="text-2xl font-bold text-white">
                            {serviceDict.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-400">
                        {serviceDict.description}
                      </p>

                      {/* Quick Highlights */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${service.color} px-3 py-1 text-xs font-medium text-white`}
                          >
                            <CheckCircle className="h-3 w-3" />
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* Features List */}
                      <ul className="mt-6 space-y-2" role="list">
                        {(dict.servicesPage?.features?.[service.key as keyof typeof dict.servicesPage.features] || [])
                          .slice(0, 4)
                          .map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="mt-0.5 h-4 w-4 text-green-500 shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">
                                {feature}
                              </span>
                            </li>
                          ))}
                      </ul>

                      {/* Actions */}
                      <div className="mt-6 flex gap-3">
                        <Link href={`/${locale}/services/${service.slug}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            {dict.services.learnMore}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/${locale}/inquiry?service=${service.slug}`}>
                          <Button className={`bg-gradient-to-r ${service.color} border-0`}>
                            {dict.nav.inquiry}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900/50 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {dict.servicesPage?.processTitle || 'Simple Booking Process'}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {dict.servicesPage?.processSubtitle || 'From inquiry to experience in 4 easy steps'}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: '01', title: dict.servicesPage?.process?.step1Title || 'Inquiry', desc: dict.servicesPage?.process?.step1Desc || 'Tell us about your travel plans' },
              { step: '02', title: dict.servicesPage?.process?.step2Title || 'Proposal', desc: dict.servicesPage?.process?.step2Desc || 'Receive a custom quote within 24h' },
              { step: '03', title: dict.servicesPage?.process?.step3Title || 'Confirm', desc: dict.servicesPage?.process?.step3Desc || 'Secure your booking with deposit' },
              { step: '04', title: dict.servicesPage?.process?.step4Title || 'Enjoy', desc: dict.servicesPage?.process?.step4Desc || 'Experience Korea with full support' },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center">
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-blue-200 dark:bg-blue-800" />
                )}
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {dict.servicesPage?.destinationsTitle || 'Popular Destinations'}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {dict.servicesPage?.destinationsSubtitle || 'Explore the best of South Korea'}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { image: '/images/services/seoul.jpg', name: 'Seoul' },
              { image: '/images/services/busan.jpg', name: 'Busan' },
              { image: '/images/services/jeju.jpg', name: 'Jeju Island' },
            ].map((dest) => (
              <div key={dest.name} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#040f77] to-[#fc645f] py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {dict.servicesPage?.customCta?.title}
          </h2>
          <p className="mt-4 text-lg text-white/80">
            {dict.servicesPage?.customCta?.description}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href={`/${locale}/inquiry`}>
              <Button size="lg" className="w-full bg-white text-[#040f77] hover:bg-gray-100 sm:w-auto min-h-[48px]">
                {dict.servicesPage?.customCta?.button}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto min-h-[48px]"
              >
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
