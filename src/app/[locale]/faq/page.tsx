import Link from 'next/link';
import { ArrowRight, ChevronDown, HelpCircle, MessageCircle, Heart, Users, Car } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';

const faqCategories = [
  {
    key: 'general',
    icon: HelpCircle,
    color: 'from-blue-500 to-cyan-500',
    questions: ['q1', 'q4'],
  },
  {
    key: 'medical',
    icon: Heart,
    color: 'from-rose-500 to-pink-500',
    questions: ['q2'],
  },
  {
    key: 'services',
    icon: Users,
    color: 'from-amber-500 to-orange-500',
    questions: ['q3'],
  },
  {
    key: 'booking',
    icon: Car,
    color: 'from-emerald-500 to-teal-500',
    questions: ['q5', 'q6'],
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
    title: dict.faq.title,
    description: dict.faq.subtitle,
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const faqs = [
    { id: 'q1', question: dict.faq.questions.q1, answer: dict.faq.questions.a1 },
    { id: 'q2', question: dict.faq.questions.q2, answer: dict.faq.questions.a2 },
    { id: 'q3', question: dict.faq.questions.q3, answer: dict.faq.questions.a3 },
    { id: 'q4', question: dict.faq.questions.q4, answer: dict.faq.questions.a4 },
    { id: 'q5', question: dict.faq.questions.q5, answer: dict.faq.questions.a5 },
    { id: 'q6', question: dict.faq.questions.q6, answer: dict.faq.questions.a6 },
  ];

  return (
    <>
      <FAQSchema items={faqs.map(f => ({ question: f.question, answer: f.answer }))} />

      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-16 lg:py-24">
          <div className="absolute inset-0 bg-[url('/images/services/seoul.jpg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {dict.faq.title}
              </h1>
              <p className="mt-6 text-xl text-gray-300">
                {dict.faq.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Quick Category Navigation */}
        <section className="relative -mt-8 z-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 rounded-2xl bg-white p-4 shadow-xl dark:bg-gray-900 sm:grid-cols-4">
              {faqCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <a
                    key={category.key}
                    href={`#${category.key}`}
                    className="group flex flex-col items-center rounded-xl p-4 text-center transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${category.color} text-white transition-transform group-hover:scale-110`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {category.key === 'general' && (locale === 'id' ? 'Umum' : 'General')}
                      {category.key === 'medical' && (locale === 'id' ? 'Medis' : 'Medical')}
                      {category.key === 'services' && (locale === 'id' ? 'Layanan' : 'Services')}
                      {category.key === 'booking' && (locale === 'id' ? 'Pemesanan' : 'Booking')}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details
                  key={faq.id}
                  className="group rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-left">
                    <div className="flex items-center gap-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#040f77]/10 text-sm font-semibold text-[#040f77] dark:bg-[#040f77]/30 dark:text-[#fc645f]">
                        {index + 1}
                      </span>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                        {faq.question}
                      </h2>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors group-open:bg-[#040f77]/10 dark:bg-gray-800 dark:group-open:bg-[#040f77]/30">
                      <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-open:rotate-180 group-open:text-[#040f77] dark:group-open:text-[#fc645f]" />
                    </div>
                  </summary>
                  <div className="border-t border-gray-100 px-6 pb-6 pt-4 dark:border-gray-800">
                    <div className="ml-12">
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#040f77] to-[#fc645f] py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {dict.faqPage?.stillHaveQuestions}
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {dict.faqPage?.stillHaveQuestionsDesc}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href={`/${locale}/inquiry`}>
                <Button size="lg" className="w-full bg-white text-[#040f77] hover:bg-gray-100 sm:w-auto min-h-[48px]">
                  {dict.faqPage?.contactUs}
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
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
