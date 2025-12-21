import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Map, Heart, Users, Car, CheckCircle } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';

const icons = {
  'private-tour': Map,
  'medical-tourism': Heart,
  'guide-service': Users,
  'vehicle-rental': Car,
};

const serviceData: Record<string, {
  key: string;
  color: string;
  features: string[];
  details: string[];
  process: { step: string; title: string; description: string }[];
}> = {
  'private-tour': {
    key: 'privateTour',
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Fully customized itineraries',
      'Professional licensed guides',
      'Luxury private vehicles',
      'Skip-the-line access',
      'Flexible scheduling',
      '24/7 support',
    ],
    details: [
      'Explore Seoul, Busan, Jeju, and beyond with our expert local guides',
      'Experience authentic Korean culture, cuisine, and hidden gems',
      'Perfect for families, couples, solo travelers, and groups',
      'All tours include transportation, entrance fees, and guide services',
    ],
    process: [
      { step: '01', title: 'Consultation', description: 'Share your interests and preferences' },
      { step: '02', title: 'Planning', description: 'We create your custom itinerary' },
      { step: '03', title: 'Confirmation', description: 'Review and finalize your tour' },
      { step: '04', title: 'Experience', description: 'Enjoy your Korean adventure' },
    ],
  },
  'medical-tourism': {
    key: 'medical',
    color: 'from-rose-500 to-pink-500',
    features: [
      'JCI-accredited hospitals',
      'Medical interpretation',
      'Appointment scheduling',
      'Treatment coordination',
      'Recovery support',
      'Travel arrangements',
    ],
    details: [
      'Access world-class medical facilities at competitive prices',
      'Comprehensive health checkups and screenings',
      'Cosmetic surgery, dental care, and specialized treatments',
      'Full support from consultation to recovery',
    ],
    process: [
      { step: '01', title: 'Inquiry', description: 'Tell us about your medical needs' },
      { step: '02', title: 'Consultation', description: 'Connect with medical professionals' },
      { step: '03', title: 'Arrangement', description: 'We handle all logistics' },
      { step: '04', title: 'Treatment', description: 'Receive care with full support' },
    ],
  },
  'guide-service': {
    key: 'guide',
    color: 'from-amber-500 to-orange-500',
    features: [
      'Licensed professional guides',
      'Multiple language options',
      'Cultural expertise',
      'Flexible hours',
      'Photography assistance',
      'Local insights',
    ],
    details: [
      'Experienced guides fluent in English, Indonesian, and more',
      'Specialized tours: K-pop, K-drama, history, food, and culture',
      'Perfect for first-time visitors and repeat travelers alike',
      'Guides handle all communication and navigation',
    ],
    process: [
      { step: '01', title: 'Select', description: 'Choose your tour type and duration' },
      { step: '02', title: 'Match', description: 'We assign the perfect guide' },
      { step: '03', title: 'Meet', description: 'Your guide greets you at the location' },
      { step: '04', title: 'Explore', description: 'Discover Korea with local expertise' },
    ],
  },
  'vehicle-rental': {
    key: 'vehicle',
    color: 'from-emerald-500 to-teal-500',
    features: [
      'Premium vehicle fleet',
      'Professional drivers',
      'Airport transfers',
      'Inter-city travel',
      'Flexible duration',
      'Child seats available',
    ],
    details: [
      'Comfortable sedans, spacious SUVs, and luxury vans',
      'All drivers are licensed and experienced with tourists',
      'Available for airport pickup, city tours, and long-distance travel',
      'Vehicles are clean, well-maintained, and fully insured',
    ],
    process: [
      { step: '01', title: 'Book', description: 'Select vehicle type and schedule' },
      { step: '02', title: 'Confirm', description: 'Receive driver and vehicle details' },
      { step: '03', title: 'Pickup', description: 'Driver meets you on time' },
      { step: '04', title: 'Travel', description: 'Relax and enjoy the journey' },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const service = serviceData[slug];

  if (!service) return { title: 'Not Found' };

  const serviceDict = dict.services[service.key as keyof typeof dict.services] as { title: string; description: string };

  return {
    title: serviceDict.title,
    description: serviceDict.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const service = serviceData[slug];

  if (!service) {
    notFound();
  }

  const IconComponent = icons[slug as keyof typeof icons];
  const serviceDict = dict.services[service.key as keyof typeof dict.services] as { title: string; description: string };

  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href={`/${locale}/services`}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Link>

        {/* Hero */}
        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div
              className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg mb-6`}
            >
              <IconComponent className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
              {serviceDict.title}
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              {serviceDict.description}
            </p>
            <ul className="mt-8 space-y-4">
              {service.details.map((detail) => (
                <li key={detail} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-500 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{detail}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href={`/${locale}/inquiry?service=${slug}`}>
                <Button size="lg">
                  {dict.nav.inquiry}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
          <div
            className={`aspect-square rounded-3xl bg-gradient-to-br ${service.color} p-12 flex items-center justify-center`}
          >
            <IconComponent className="h-32 w-32 text-white/80" />
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            What&apos;s Included
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${service.color}`} />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step) => (
              <div key={step.step} className="relative">
                <div
                  className={`text-6xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                >
                  {step.step}
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-20 rounded-2xl bg-gradient-to-r ${service.color} p-8 text-center lg:p-12`}>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-white/80">
            Contact us today for a free consultation and personalized quote.
          </p>
          <div className="mt-8">
            <Link href={`/${locale}/inquiry?service=${slug}`}>
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                {dict.nav.inquiry}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
