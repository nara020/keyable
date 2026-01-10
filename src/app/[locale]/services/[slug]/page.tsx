import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, Map, Heart, Users, Car, CheckCircle, Clock, MapPin, Phone, Star, Shield, Calendar, Plane, Hospital, Stethoscope, Camera, Utensils, Music } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SITE_CONFIG } from '@/lib/constants';

const icons = {
  'private-tour': Map,
  'medical-tourism': Heart,
  'guide-service': Users,
  'vehicle-rental': Car,
};

const serviceData: Record<string, {
  key: string;
  color: string;
  heroImage: string;
  features: { icon: typeof Map; title: string; description: string }[];
  highlights: string[];
  process: { step: string; title: string; description: string }[];
  gallery?: { image: string; title: string }[];
  pricing?: { type: string; description: string; note: string }[];
  faq?: { question: string; answer: string }[];
}> = {
  'private-tour': {
    key: 'privateTour',
    color: 'from-blue-500 to-cyan-500',
    heroImage: '/images/services/private-tour.jpg',
    features: [
      { icon: Calendar, title: 'Customized Itinerary', description: 'Tours designed around your interests, schedule, and pace' },
      { icon: Users, title: 'Professional Guide', description: 'Licensed English/Indonesian speaking guides with local expertise' },
      { icon: Car, title: 'Private Vehicle', description: 'Comfortable sedan or SUV with professional driver included' },
      { icon: Star, title: 'VIP Access', description: 'Skip-the-line privileges at major attractions when available' },
      { icon: Clock, title: 'Flexible Schedule', description: 'Start times and duration adjusted to your preferences' },
      { icon: Phone, title: '24/7 Support', description: 'Our team is available around the clock during your trip' },
    ],
    highlights: [
      'Seoul: Gyeongbokgung Palace, Bukchon Hanok Village, Myeongdong, N Seoul Tower',
      'Busan: Gamcheon Culture Village, Haeundae Beach, Jagalchi Market',
      'Jeju: Hallasan, Seongsan Sunrise Peak, Manjanggul Cave',
      'DMZ: Joint Security Area, Dora Observatory, Third Tunnel',
      'K-Pop Tours: Entertainment districts, fan cafes, concert venues',
      'Food Tours: Traditional markets, Michelin restaurants, street food',
    ],
    process: [
      { step: '01', title: 'Free Consultation', description: 'Share your travel dates, interests, and group size via WhatsApp or email' },
      { step: '02', title: 'Custom Proposal', description: 'Receive a detailed itinerary and quote within 24 hours' },
      { step: '03', title: 'Confirm Booking', description: 'Secure your tour with a 30% deposit' },
      { step: '04', title: 'Enjoy Korea', description: 'Meet your guide and start your adventure' },
    ],
    gallery: [
      { image: '/images/services/seoul.jpg', title: 'Seoul' },
      { image: '/images/services/busan.jpg', title: 'Busan' },
      { image: '/images/services/jeju.jpg', title: 'Jeju Island' },
    ],
    pricing: [
      { type: 'Half-Day Tour', description: '4-5 hours with guide and vehicle', note: 'Perfect for focused experiences' },
      { type: 'Full-Day Tour', description: '8-10 hours with guide and vehicle', note: 'Most popular option' },
      { type: 'Multi-Day Package', description: 'Custom duration with accommodation', note: 'Complete Korea experience' },
    ],
  },
  'medical-tourism': {
    key: 'medical',
    color: 'from-rose-500 to-pink-500',
    heroImage: '/images/services/medical-tourism.jpg',
    features: [
      { icon: Hospital, title: 'JCI-Accredited Hospitals', description: 'Partner with top-rated medical facilities meeting international standards' },
      { icon: Users, title: 'Medical Interpreter', description: 'Professional interpreters accompany all appointments' },
      { icon: Calendar, title: 'Appointment Scheduling', description: 'We coordinate all consultations and procedures' },
      { icon: Plane, title: 'Travel Arrangements', description: 'Visa assistance, airport pickup, accommodation' },
      { icon: Stethoscope, title: 'Treatment Coordination', description: 'Seamless communication between you and medical staff' },
      { icon: Heart, title: 'Recovery Support', description: 'Post-procedure care and follow-up coordination' },
    ],
    highlights: [
      'Comprehensive Health Checkups: Full-body screening, cancer screening, cardiac assessment',
      'Cosmetic Surgery: Rhinoplasty, blepharoplasty, facial contouring, liposuction',
      'Dermatology: Laser treatments, skin rejuvenation, anti-aging therapies',
      'Dental Care: Implants, veneers, orthodontics, whitening',
      'Orthopedic: Joint replacement, spine surgery, sports medicine',
      'Fertility: IVF, egg freezing, fertility assessment',
    ],
    process: [
      { step: '01', title: 'Medical Inquiry', description: 'Share your medical needs and receive hospital recommendations' },
      { step: '02', title: 'Consultation', description: 'Remote consultation with Korean medical professionals' },
      { step: '03', title: 'Arrangement', description: 'We handle visa, travel, accommodation, and appointments' },
      { step: '04', title: 'Treatment & Recovery', description: 'Receive care with full support throughout your stay' },
    ],
    pricing: [
      { type: 'Health Checkup', description: 'Comprehensive screening packages', note: 'Results within 1-2 days' },
      { type: 'Cosmetic Consultation', description: 'Initial assessment and treatment plan', note: 'Free consultation available' },
      { type: 'Treatment Package', description: 'All-inclusive medical tourism package', note: 'Customized to your needs' },
    ],
    faq: [
      { question: 'Are Korean hospitals safe for foreigners?', answer: 'Yes. Our partner hospitals are JCI-accredited and have dedicated international patient centers with multilingual staff.' },
      { question: 'How long should I stay for recovery?', answer: 'Recovery time varies by procedure. We will advise on the recommended stay duration during consultation.' },
      { question: 'Will insurance cover treatment in Korea?', answer: 'Coverage depends on your insurance policy. We provide detailed cost estimates for insurance claims.' },
    ],
  },
  'guide-service': {
    key: 'guide',
    color: 'from-amber-500 to-orange-500',
    heroImage: '/images/services/guide-service.jpg',
    features: [
      { icon: Shield, title: 'Licensed Guides', description: 'All guides are certified by the Korean government' },
      { icon: Users, title: 'Multilingual', description: 'Fluent in English, Indonesian, Korean, and more' },
      { icon: MapPin, title: 'Local Expertise', description: 'Born and raised in Korea with deep cultural knowledge' },
      { icon: Camera, title: 'Photography Help', description: 'Guides help capture your best moments' },
      { icon: Utensils, title: 'Food Knowledge', description: 'Navigate Korean cuisine and dietary requirements' },
      { icon: Music, title: 'K-Culture Expert', description: 'Up-to-date on K-pop, K-drama, and trends' },
    ],
    highlights: [
      'Cultural Tours: Palaces, temples, traditional villages, museums',
      'K-Pop Tours: Gangnam, entertainment companies, idol hotspots',
      'K-Drama Tours: Famous filming locations across Korea',
      'Food Tours: Markets, street food, cooking classes',
      'History Tours: Gyeongju, DMZ, war memorials',
      'Nature Tours: National parks, hiking, scenic spots',
    ],
    process: [
      { step: '01', title: 'Choose Your Tour', description: 'Tell us what you want to experience in Korea' },
      { step: '02', title: 'Guide Matching', description: 'We assign the perfect guide for your interests' },
      { step: '03', title: 'Meet & Greet', description: 'Your guide meets you at the designated location' },
      { step: '04', title: 'Explore Together', description: 'Discover Korea with a knowledgeable local friend' },
    ],
    pricing: [
      { type: 'Half-Day Guide', description: '4-5 hours of guided exploration', note: 'Guide service only, no vehicle' },
      { type: 'Full-Day Guide', description: '8-10 hours with your personal guide', note: 'Most comprehensive experience' },
      { type: 'Multi-Day Guide', description: 'Same guide throughout your trip', note: 'Best for longer stays' },
    ],
  },
  'vehicle-rental': {
    key: 'vehicle',
    color: 'from-emerald-500 to-teal-500',
    heroImage: '/images/services/vehicle-rental.jpg',
    features: [
      { icon: Car, title: 'Premium Fleet', description: 'Latest model sedans, SUVs, and vans' },
      { icon: Users, title: 'Professional Driver', description: 'Licensed drivers with tourism experience' },
      { icon: Plane, title: 'Airport Service', description: 'Meet & greet at Incheon or Gimpo airports' },
      { icon: MapPin, title: 'Nationwide Coverage', description: 'Travel anywhere in South Korea' },
      { icon: Clock, title: 'Flexible Hours', description: 'Half-day, full-day, and multi-day options' },
      { icon: Shield, title: 'Fully Insured', description: 'Comprehensive vehicle insurance included' },
    ],
    highlights: [
      'Premium Sedan: Genesis G80, Hyundai Grandeur (up to 3 passengers)',
      'Premium SUV: Hyundai Palisade, Kia Carnival (up to 6 passengers)',
      'Luxury Van: Mercedes Sprinter, Hyundai Solati (up to 11 passengers)',
      'Airport Transfer: Incheon ↔ Seoul, Gimpo ↔ Seoul',
      'Inter-City: Seoul ↔ Busan, Seoul ↔ Gangneung, etc.',
      'Full-Day Charter: 8-10 hours of travel with driver',
    ],
    process: [
      { step: '01', title: 'Request Quote', description: 'Tell us your dates, destinations, and group size' },
      { step: '02', title: 'Confirm Booking', description: 'Receive driver details and vehicle information' },
      { step: '03', title: 'Meet Your Driver', description: 'Driver greets you with a name sign' },
      { step: '04', title: 'Travel in Comfort', description: 'Relax while your driver handles everything' },
    ],
    gallery: [
      { image: '/images/vehicles/sedan.jpg', title: 'Premium Sedan' },
      { image: '/images/vehicles/suv.jpg', title: 'Premium SUV' },
      { image: '/images/vehicles/van.jpg', title: 'Luxury Van' },
    ],
    pricing: [
      { type: 'Airport Transfer', description: 'One-way Incheon/Gimpo to Seoul', note: 'Fixed rate, no hidden fees' },
      { type: 'Half-Day Charter', description: '4-5 hours with driver', note: 'Great for focused itineraries' },
      { type: 'Full-Day Charter', description: '8-10 hours with driver', note: 'All fuel, tolls, parking included' },
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
    <div className="flex flex-col">
      {/* Hero Section with Image */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={service.heroImage}
          alt={serviceDict.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl w-full px-4 pb-12 sm:px-6 lg:px-8">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              {dict.common.back}
            </Link>
            <div className="flex items-center gap-4">
              <div
                className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg`}
              >
                <IconComponent className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white sm:text-5xl">
                  {serviceDict.title}
                </h1>
                <p className="mt-2 text-xl text-white/80">
                  {serviceDict.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {dict.serviceDetail?.whatsIncluded || "What's Included"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <Card key={feature.title} className="border-gray-100 dark:border-gray-800">
                  <CardContent className="p-6">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white mb-4`}>
                      <FeatureIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900/50 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {dict.serviceDetail?.popularOptions || 'Popular Options'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800"
              >
                <CheckCircle className="mt-0.5 h-5 w-5 text-green-500 shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery (if available) */}
      {service.gallery && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {slug === 'vehicle-rental'
                ? (dict.serviceDetail?.ourFleet || 'Our Fleet')
                : (dict.serviceDetail?.destinations || 'Popular Destinations')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {service.gallery.map((item) => (
                <div key={item.title} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-lg font-semibold text-white">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="bg-gray-900 py-16 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">
            {dict.serviceDetail?.howItWorks || 'How It Works'}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <div key={step.step} className="relative">
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-700" />
                )}
                <div
                  className={`text-5xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                >
                  {step.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Options */}
      {service.pricing && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {dict.serviceDetail?.pricingOptions || 'Pricing Options'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {dict.serviceDetail?.pricingNote || 'Contact us for a personalized quote based on your specific requirements.'}
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {service.pricing.map((option) => (
                <Card key={option.type} className="border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {option.type}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {option.description}
                    </p>
                    <p className={`mt-4 text-sm font-medium bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                      {option.note}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ (if available) */}
      {service.faq && (
        <section className="bg-gray-50 py-16 dark:bg-gray-900/50 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {dict.serviceDetail?.faq || 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-4">
              {service.faq.map((item) => (
                <div
                  key={item.question}
                  className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={`bg-gradient-to-r ${service.color} py-16 lg:py-20`}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            {dict.serviceDetail?.readyToBook || 'Ready to Book?'}
          </h2>
          <p className="mt-4 text-lg text-white/80">
            {dict.serviceDetail?.ctaDescription || 'Get a free consultation and personalized quote within 24 hours.'}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href={`/${locale}/inquiry?service=${slug}`}>
              <Button size="lg" className="w-full bg-white text-gray-900 hover:bg-gray-100 sm:w-auto min-h-[48px]">
                {dict.hero.cta}
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
