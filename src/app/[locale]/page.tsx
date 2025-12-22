import Link from 'next/link';
import { ArrowRight, Map, Heart, Users, Car, CheckCircle, Star } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SITE_CONFIG } from '@/lib/constants';

const icons = {
  Map,
  Heart,
  Users,
  Car,
};

const services = [
  { key: 'privateTour', icon: 'Map', color: 'from-blue-500 to-cyan-500' },
  { key: 'medical', icon: 'Heart', color: 'from-rose-500 to-pink-500' },
  { key: 'guide', icon: 'Users', color: 'from-amber-500 to-orange-500' },
  { key: 'vehicle', icon: 'Car', color: 'from-emerald-500 to-teal-500' },
];

const stats = [
  { value: '5+', key: 'years' },
  { value: '1000+', key: 'clients' },
  { value: '500+', key: 'tours' },
  { value: '98%', key: 'rating' },
];

const featureKeys = ['licensed', 'guides', 'hospitals', 'support', 'custom', 'vehicles'] as const;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/images/korea-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {dict.hero.title}
            </h1>
            <p className="mb-10 text-lg text-gray-300 sm:text-xl">
              {dict.hero.subtitle}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href={`/${locale}/inquiry`}>
                <Button size="lg" className="w-full sm:w-auto min-h-[48px]">
                  {dict.hero.cta}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <Link href={`/${locale}/services`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto min-h-[48px]"
                >
                  {dict.services.title}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-12 z-10" aria-label="Statistics">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900 sm:grid-cols-4 sm:p-8">
            {stats.map((stat) => (
              <div key={stat.key} className="text-center">
                <div className="text-3xl font-bold text-blue-600 sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {dict.about.stats[stat.key as keyof typeof dict.about.stats]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-28" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="services-heading" className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {dict.services.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {dict.services.subtitle}
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const IconComponent = icons[service.icon as keyof typeof icons];
              const serviceDict = dict.services[service.key as keyof typeof dict.services] as { title: string; description: string };

              return (
                <Card key={service.key} hover className="group">
                  <CardContent className="p-6">
                    <div
                      className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white shadow-lg transition-transform group-hover:scale-110`}
                      aria-hidden="true"
                    >
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                      {serviceDict.title}
                    </h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                      {serviceDict.description}
                    </p>
                    <Link
                      href={`/${locale}/services/${service.key === 'privateTour' ? 'private-tour' : service.key === 'medical' ? 'medical-tourism' : service.key === 'guide' ? 'guide-service' : 'vehicle-rental'}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    >
                      {dict.services.learnMore}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900/50 lg:py-28" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 id="features-heading" className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                {dict.home.whyChoose}
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                {dict.home.whyChooseDesc}
              </p>
              <ul className="mt-8 space-y-4" role="list">
                {featureKeys.map((featureKey) => (
                  <li key={featureKey} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {dict.home.features[featureKey]}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href={`/${locale}/about`}>
                  <Button variant="secondary" className="min-h-[48px]">
                    {dict.home.learnAbout}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Star className="mx-auto h-16 w-16 text-blue-500" aria-hidden="true" />
                    <p className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                      {dict.home.premiumService}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">{dict.home.since}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16 lg:py-20" aria-labelledby="cta-heading">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 id="cta-heading" className="text-3xl font-bold text-white sm:text-4xl">
            {dict.home.readyToExplore}
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            {dict.home.readyDesc}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href={`/${locale}/inquiry`}>
              <Button
                size="lg"
                className="w-full bg-white text-blue-600 hover:bg-gray-100 sm:w-auto min-h-[48px]"
              >
                {dict.hero.cta}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
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
                {dict.home.whatsappUs}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
