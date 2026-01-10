import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Bell, Megaphone, Tag } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    category: 'promotion',
    featured: true,
    image: '/images/services/seoul.jpg',
  },
  {
    id: '2',
    title: 'New Medical Tourism Packages Available',
    title_id: 'Paket Wisata Medis Baru Tersedia',
    excerpt: 'We have expanded our medical tourism offerings with new partner hospitals and treatment options.',
    excerpt_id: 'Kami telah memperluas penawaran wisata medis dengan rumah sakit mitra dan pilihan perawatan baru.',
    created_at: '2024-12-01',
    category: 'service',
    featured: false,
    image: '/images/services/medical-tourism.jpg',
  },
  {
    id: '3',
    title: 'Updated Visa Information for Indonesian Travelers',
    title_id: 'Informasi Visa Terbaru untuk Wisatawan Indonesia',
    excerpt: 'Important updates regarding K-ETA and visa requirements for Indonesian passport holders visiting Korea.',
    excerpt_id: 'Pembaruan penting mengenai K-ETA dan persyaratan visa untuk pemegang paspor Indonesia yang mengunjungi Korea.',
    created_at: '2024-11-20',
    category: 'info',
    featured: false,
    image: '/images/services/guide-service.jpg',
  },
];

const categoryColors = {
  promotion: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  service: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  info: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

const categoryLabels = {
  promotion: { en: 'Promotion', id: 'Promosi' },
  service: { en: 'Service Update', id: 'Pembaruan Layanan' },
  info: { en: 'Information', id: 'Informasi' },
};

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

  const featuredNotice = notices.find((n) => n.featured);
  const regularNotices = notices.filter((n) => !n.featured);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('/images/services/seoul.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur">
              <Megaphone className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {dict.notices.title}
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              {dict.notices.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Notice */}
      {featuredNotice && (
        <section className="relative -mt-12 z-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link href={`/${locale}/notices/${featuredNotice.id}`}>
              <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={featuredNotice.image}
                        alt={locale === 'id' ? featuredNotice.title_id : featuredNotice.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 md:bg-gradient-to-l" />
                    </div>
                    <div className="flex flex-col justify-center p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${categoryColors[featuredNotice.category as keyof typeof categoryColors]}`}>
                          <Tag className="h-3 w-3" />
                          {categoryLabels[featuredNotice.category as keyof typeof categoryLabels][locale as 'en' | 'id']}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#040f77] to-[#fc645f] px-3 py-1 text-xs font-medium text-white">
                          <Bell className="h-3 w-3" />
                          {locale === 'id' ? 'Terbaru' : 'Featured'}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-[#040f77] dark:text-white dark:group-hover:text-[#fc645f] transition-colors">
                        {locale === 'id' ? featuredNotice.title_id : featuredNotice.title}
                      </h2>
                      <p className="mt-3 text-gray-600 dark:text-gray-400">
                        {locale === 'id' ? featuredNotice.excerpt_id : featuredNotice.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {formatDate(featuredNotice.created_at, locale)}
                      </div>
                      <div className="mt-6">
                        <Button className="min-h-[48px]">
                          {dict.notices.readMore}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Regular Notices */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {regularNotices.map((notice) => (
              <Link key={notice.id} href={`/${locale}/notices/${notice.id}`}>
                <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image
                        src={notice.image}
                        alt={locale === 'id' ? notice.title_id : notice.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${categoryColors[notice.category as keyof typeof categoryColors]}`}>
                          <Tag className="h-3 w-3" />
                          {categoryLabels[notice.category as keyof typeof categoryLabels][locale as 'en' | 'id']}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-sm text-white/80">
                          <Calendar className="h-4 w-4" />
                          {formatDate(notice.created_at, locale)}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#040f77] dark:text-white dark:group-hover:text-[#fc645f] transition-colors line-clamp-2">
                        {locale === 'id' ? notice.title_id : notice.title}
                      </h2>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {locale === 'id' ? notice.excerpt_id : notice.excerpt}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-medium text-[#040f77] dark:text-[#fc645f]">
                        {dict.notices.readMore}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {notices.length === 0 && (
            <div className="text-center py-12">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {locale === 'id' ? 'Belum ada pengumuman saat ini.' : 'No notices at this time.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900/50">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {locale === 'id' ? 'Tertarik dengan layanan kami?' : 'Interested in our services?'}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {locale === 'id'
              ? 'Hubungi kami untuk konsultasi gratis dan penawaran yang disesuaikan.'
              : 'Contact us for a free consultation and personalized quote.'}
          </p>
          <div className="mt-8">
            <Link href={`/${locale}/inquiry`}>
              <Button size="lg" className="min-h-[48px]">
                {locale === 'id' ? 'Minta Penawaran' : 'Get a Quote'}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
