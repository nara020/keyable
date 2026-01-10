import Link from 'next/link';
import { ArrowRight, Shield, Star, Heart, MapPin, MessageCircle, UserCheck } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  { key: 'trust', icon: Shield, color: 'bg-[#040f77]/10 text-[#040f77] dark:bg-[#040f77]/30 dark:text-[#fc645f]' },
  { key: 'quality', icon: Star, color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
  { key: 'personal', icon: Heart, color: 'bg-[#fc645f]/10 text-[#fc645f] dark:bg-[#fc645f]/30 dark:text-[#fc645f]' },
  { key: 'local', icon: MapPin, color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
];

const trustSignalIcons = {
  licensed: Shield,
  seoulBased: MapPin,
  multilingual: MessageCircle,
  personalized: UserCheck,
};

const trustSignalKeys = ['licensed', 'seoulBased', 'multilingual', 'personalized'] as const;

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

        {/* Trust Signals - Replaced fake stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {trustSignalKeys.map((key) => {
            const IconComponent = trustSignalIcons[key];
            const signal = dict.trustSignals[key];
            return (
              <div
                key={key}
                className="rounded-2xl bg-gradient-to-br from-[#040f77]/5 to-[#fc645f]/5 p-6 text-center dark:from-[#040f77]/20 dark:to-[#fc645f]/20"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#040f77]/10 dark:bg-[#040f77]/50">
                  <IconComponent className="h-6 w-6 text-[#040f77] dark:text-[#fc645f]" aria-hidden="true" />
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {signal.title}
                </div>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {signal.description}
                </div>
              </div>
            );
          })}
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
              {dict.aboutPage?.storyExtended}
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
              {dict.aboutPage?.missionExtended}
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
                      aria-hidden="true"
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
        <section className="mt-20 rounded-2xl bg-gray-50 p-8 dark:bg-gray-900 lg:p-12" aria-labelledby="why-us-heading">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 id="why-us-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
                {dict.aboutPage?.whyUs?.title}
              </h2>
              <ul className="mt-6 space-y-4" role="list">
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#fc645f]" aria-hidden="true" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>{dict.aboutPage?.whyUs?.licensedAgency}:</strong> {dict.aboutPage?.whyUs?.licensedAgencyDesc}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#fc645f]" aria-hidden="true" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>{dict.aboutPage?.whyUs?.localExpertise}:</strong> {dict.aboutPage?.whyUs?.localExpertiseDesc}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#fc645f]" aria-hidden="true" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>{dict.aboutPage?.whyUs?.multilingualTeam}:</strong> {dict.aboutPage?.whyUs?.multilingualTeamDesc}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#fc645f]" aria-hidden="true" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>{dict.aboutPage?.whyUs?.medicalPartners}:</strong> {dict.aboutPage?.whyUs?.medicalPartnersDesc}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#fc645f]" aria-hidden="true" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>{dict.aboutPage?.whyUs?.support247}:</strong> {dict.aboutPage?.whyUs?.support247Desc}
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center">
              <div className="rounded-xl bg-gradient-to-br from-[#040f77] to-[#fc645f] p-8 text-center text-white">
                <h3 className="text-xl font-semibold">{dict.aboutPage?.readyToExplore}</h3>
                <p className="mt-2 text-white/80">
                  {dict.aboutPage?.readyToExploreDesc}
                </p>
                <div className="mt-6">
                  <Link href={`/${locale}/inquiry`}>
                    <Button className="bg-white text-[#040f77] hover:bg-gray-100 min-h-[48px]">
                      {dict.aboutPage?.getStarted}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
