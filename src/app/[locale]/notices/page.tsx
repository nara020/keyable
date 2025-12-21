import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

// Sample notices - in production, fetch from database
const notices = [
  {
    id: '1',
    title: 'Holiday Season Special: Book Early for Best Rates',
    title_id: 'Spesial Musim Liburan: Pesan Lebih Awal untuk Tarif Terbaik',
    excerpt: 'Plan your winter Korea trip now and enjoy exclusive early bird discounts on all tour packages.',
    excerpt_id: 'Rencanakan perjalanan Korea musim dingin Anda sekarang dan nikmati diskon early bird eksklusif.',
    created_at: '2024-12-15',
  },
  {
    id: '2',
    title: 'New Medical Tourism Packages Available',
    title_id: 'Paket Wisata Medis Baru Tersedia',
    excerpt: 'We have expanded our medical tourism offerings with new partner hospitals and treatment options.',
    excerpt_id: 'Kami telah memperluas penawaran wisata medis dengan rumah sakit mitra dan pilihan perawatan baru.',
    created_at: '2024-12-01',
  },
  {
    id: '3',
    title: 'Updated Visa Information for Indonesian Travelers',
    title_id: 'Informasi Visa Terbaru untuk Wisatawan Indonesia',
    excerpt: 'Important updates regarding K-ETA and visa requirements for Indonesian passport holders visiting Korea.',
    excerpt_id: 'Pembaruan penting mengenai K-ETA dan persyaratan visa untuk pemegang paspor Indonesia yang mengunjungi Korea.',
    created_at: '2024-11-20',
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
    title: dict.notices.title,
    description: dict.notices.subtitle,
  };
}

export default async function NoticesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            {dict.notices.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {dict.notices.subtitle}
          </p>
        </div>

        {/* Notices List */}
        <div className="mt-12 space-y-6">
          {notices.map((notice) => (
            <Link key={notice.id} href={`/${locale}/notices/${notice.id}`}>
              <Card hover className="group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {locale === 'id' ? notice.title_id : notice.title}
                      </h2>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">
                        {locale === 'id' ? notice.excerpt_id : notice.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {formatDate(notice.created_at, locale)}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {notices.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No notices at this time. Check back later!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
