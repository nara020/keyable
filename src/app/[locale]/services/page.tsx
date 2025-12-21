import Link from 'next/link';
import { ArrowRight, Map, Heart, Users, Car } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    features: [
      'Customized itineraries based on your interests',
      'Professional licensed English/Indonesian guides',
      'Luxury vehicle with private driver',
      'Skip-the-line access to popular attractions',
      'Flexible schedule and pace',
      '24/7 trip support',
    ],
  },
  {
    key: 'medical',
    slug: 'medical-tourism',
    icon: 'Heart',
    color: 'from-rose-500 to-pink-500',
    features: [
      'JCI-accredited hospital partnerships',
      'Health checkups and screenings',
      'Cosmetic surgery consultations',
      'Dental treatments',
      'Medical interpreter services',
      'Post-procedure recovery support',
    ],
  },
  {
    key: 'guide',
    slug: 'guide-service',
    icon: 'Users',
    color: 'from-amber-500 to-orange-500',
    features: [
      'Licensed multilingual guides',
      'Cultural experience specialists',
      'K-pop and K-drama tour experts',
      'Historical and temple tours',
      'Food and market tours',
      'Photography assistance',
    ],
  },
  {
    key: 'vehicle',
    slug: 'vehicle-rental',
    icon: 'Car',
    color: 'from-emerald-500 to-teal-500',
    features: [
      'Premium sedan and SUV options',
      'Professional licensed drivers',
      'Airport pickup and transfer',
      'Inter-city travel',
      'Full-day and half-day rentals',
      'Child seats available',
    ],
  },
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
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            {dict.services.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {dict.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 space-y-16">
          {services.map((service, index) => {
            const IconComponent = icons[service.icon as keyof typeof icons];
            const serviceDict = dict.services[service.key as keyof typeof dict.services] as { title: string; description: string };
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.slug}
                className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image/Icon Section */}
                <div className="flex-1">
                  <div
                    className={`aspect-video overflow-hidden rounded-2xl bg-gradient-to-br ${service.color} p-8 flex items-center justify-center`}
                  >
                    <IconComponent className="h-24 w-24 text-white/90" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white shadow-lg mb-4`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    {serviceDict.title}
                  </h2>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    {serviceDict.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href={`/${locale}/inquiry?service=${service.slug}`}>
                      <Button>
                        {dict.nav.inquiry}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-center lg:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="mt-4 text-blue-100">
            We create custom packages tailored to your needs. Contact us for a personalized quote.
          </p>
          <div className="mt-8">
            <Link href={`/${locale}/inquiry`}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Request Custom Quote
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
