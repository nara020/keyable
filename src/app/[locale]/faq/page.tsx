import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { FAQSchema } from '@/components/seo/FAQSchema';
import { Button } from '@/components/ui/button';

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
    { question: dict.faq.questions.q1, answer: dict.faq.questions.a1 },
    { question: dict.faq.questions.q2, answer: dict.faq.questions.a2 },
    { question: dict.faq.questions.q3, answer: dict.faq.questions.a3 },
    { question: dict.faq.questions.q4, answer: dict.faq.questions.a4 },
    { question: dict.faq.questions.q5, answer: dict.faq.questions.a5 },
    { question: dict.faq.questions.q6, answer: dict.faq.questions.a6 },
  ];

  return (
    <>
      <FAQSchema items={faqs} />

      <div className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {dict.faq.title}
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {dict.faq.subtitle}
            </p>
          </div>

          {/* FAQ List */}
          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900"
              >
                <summary className="flex cursor-pointer items-center justify-between p-6 text-left">
                  <h2 className="pr-4 text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </h2>
                  <ChevronDown className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-gray-100 px-6 pb-6 pt-4 dark:border-gray-800">
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 p-8 text-center dark:from-blue-900/20 dark:to-cyan-900/20">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Still have questions?
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Our team is happy to help. Reach out to us anytime.
            </p>
            <div className="mt-6">
              <Link href={`/${locale}/inquiry`}>
                <Button>
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
