import Link from 'next/link';
import { ArrowRight, Shield, Star, Heart, MapPin } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SITE_CONFIG } from '@/lib/constants';

const values = [
  { key: 'trust', icon: Shield, color: 'bg-blue-100 text-blue-600' },
  { key: 'quality', icon: Star, color: 'bg-amber-100 text-amber-600' },
  { key: 'personal', icon: Heart, color: 'bg-rose-100 text-rose-600' },
  { key: 'local', icon: MapPin, color: 'bg-emerald-100 text-emerald-600' },
];

const stats = [
  { value: '5+', key: 'years' },
  { value: '1000+', key: 'clients' },
  { value: '500+', key: 'tours' },
  { value: '98%', key: 'rating' },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.about.title,
    description: dict.about.subtitle,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            {dict.about.title}
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            {dict.about.subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 text-center dark:from-blue-900/20 dark:to-cyan-900/20"
            >
              <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {dict.about.stats[stat.key as keyof typeof dict.about.stats]}
              </div>
            </div>
          ))}
        </div>

        {/* Story & Mission */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dict.about.story.title}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {dict.about.story.content}
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              With deep local knowledge and a passion for hospitality, we have helped
              thousands of travelers from Indonesia and around the world discover the
              beauty of Korea. From bustling Seoul to serene Jeju, from world-class
              medical facilities to hidden cultural gems, we make every journey memorable.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dict.about.mission.title}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              {dict.about.mission.content}
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              We believe that travel should be stress-free and enriching. That's why we
              handle every detail—from transportation and accommodation to medical
              appointments and cultural experiences—so you can focus on creating
              lasting memories.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            {dict.about.values.title}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <Card key={value.key} className="text-center">
                  <CardContent className="p-6">
                    <div
                      className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${value.color}`}
                    >
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {dict.about.values[value.key as keyof typeof dict.about.values]}
                    </h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team/Company Info */}
        <div className="mt-20 rounded-2xl bg-gray-50 p-8 dark:bg-gray-900 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Why {SITE_CONFIG.name}?
              </h2>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Licensed Agency:</strong> Officially registered Korean travel agency
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Local Expertise:</strong> Based in Seoul with deep local knowledge
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Multilingual Team:</strong> English, Indonesian, and Korean speakers
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Medical Partners:</strong> JCI-accredited hospital network
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>24/7 Support:</strong> Always available for our clients
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <div className="rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 p-8 text-center text-white">
                <h3 className="text-xl font-semibold">Ready to explore Korea?</h3>
                <p className="mt-2 text-blue-100">
                  Let us help you plan your perfect Korean experience.
                </p>
                <div className="mt-6">
                  <Link href={`/${locale}/inquiry`}>
                    <Button className="bg-white text-blue-600 hover:bg-gray-100">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
