import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Calendar, Share2, Tag, MessageCircle } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

// Sample notices - in production, fetch from database
const notices: Record<string, {
  title: string;
  title_id: string;
  content: string;
  content_id: string;
  created_at: string;
  category: string;
  image: string;
}> = {
  '1': {
    title: 'Holiday Season Special: Book Early for Best Rates',
    title_id: 'Spesial Musim Liburan: Pesan Lebih Awal untuk Tarif Terbaik',
    content: `
      <p>The holiday season is approaching, and Korea transforms into a winter wonderland! Whether you're dreaming of experiencing your first Korean winter, celebrating New Year in Seoul, or planning a ski trip to the beautiful mountains, now is the perfect time to book.</p>

      <h3>Early Bird Discounts</h3>
      <p>Book your winter tour package before December 31st and receive:</p>
      <ul>
        <li>10% off all private tour packages</li>
        <li>Complimentary airport transfer</li>
        <li>Free winter experience add-on (ice fishing or ski lesson)</li>
      </ul>

      <h3>Popular Winter Experiences</h3>
      <ul>
        <li>Seoul Christmas Markets and Illuminations</li>
        <li>Ski resorts in Gangwon Province</li>
        <li>Traditional Korean sauna (jjimjilbang) experience</li>
        <li>Winter festivals and ice fishing</li>
      </ul>

      <p>Contact us today to start planning your winter Korean adventure!</p>
    `,
    content_id: `
      <p>Musim liburan semakin dekat, dan Korea berubah menjadi negeri musim dingin yang indah! Apakah Anda bermimpi mengalami musim dingin Korea pertama Anda, merayakan Tahun Baru di Seoul, atau merencanakan perjalanan ski ke pegunungan yang indah, sekarang adalah waktu yang tepat untuk memesan.</p>

      <h3>Diskon Early Bird</h3>
      <p>Pesan paket tur musim dingin Anda sebelum 31 Desember dan dapatkan:</p>
      <ul>
        <li>Diskon 10% untuk semua paket tur privat</li>
        <li>Transfer bandara gratis</li>
        <li>Pengalaman musim dingin gratis (memancing es atau pelajaran ski)</li>
      </ul>

      <h3>Pengalaman Musim Dingin Populer</h3>
      <ul>
        <li>Pasar Natal Seoul dan Iluminasi</li>
        <li>Resor ski di Provinsi Gangwon</li>
        <li>Pengalaman sauna tradisional Korea (jjimjilbang)</li>
        <li>Festival musim dingin dan memancing es</li>
      </ul>

      <p>Hubungi kami hari ini untuk mulai merencanakan petualangan musim dingin Korea Anda!</p>
    `,
    created_at: '2024-12-15',
    category: 'promotion',
    image: '/images/services/seoul.jpg',
  },
  '2': {
    title: 'New Medical Tourism Packages Available',
    title_id: 'Paket Wisata Medis Baru Tersedia',
    content: `
      <p>We are excited to announce expanded medical tourism offerings through new partnerships with leading Korean hospitals and clinics.</p>

      <h3>New Partner Hospitals</h3>
      <p>Our network now includes additional JCI-accredited facilities specializing in:</p>
      <ul>
        <li>Comprehensive health checkups and cancer screenings</li>
        <li>Orthopedic surgery and rehabilitation</li>
        <li>Fertility treatments</li>
        <li>Advanced cosmetic procedures</li>
      </ul>

      <h3>Enhanced Services</h3>
      <ul>
        <li>Dedicated medical coordinator for each patient</li>
        <li>24/7 interpretation services</li>
        <li>Comfortable recovery accommodations</li>
        <li>Post-treatment follow-up support</li>
      </ul>

      <p>All packages include consultation, treatment, accommodation, and full support throughout your medical journey in Korea.</p>
    `,
    content_id: `
      <p>Kami dengan senang hati mengumumkan perluasan penawaran wisata medis melalui kemitraan baru dengan rumah sakit dan klinik terkemuka di Korea.</p>

      <h3>Rumah Sakit Mitra Baru</h3>
      <p>Jaringan kami sekarang mencakup fasilitas terakreditasi JCI tambahan yang mengkhususkan diri dalam:</p>
      <ul>
        <li>Pemeriksaan kesehatan komprehensif dan skrining kanker</li>
        <li>Operasi ortopedi dan rehabilitasi</li>
        <li>Perawatan kesuburan</li>
        <li>Prosedur kosmetik canggih</li>
      </ul>

      <h3>Layanan yang Ditingkatkan</h3>
      <ul>
        <li>Koordinator medis khusus untuk setiap pasien</li>
        <li>Layanan interpretasi 24/7</li>
        <li>Akomodasi pemulihan yang nyaman</li>
        <li>Dukungan tindak lanjut pasca-perawatan</li>
      </ul>

      <p>Semua paket termasuk konsultasi, perawatan, akomodasi, dan dukungan penuh selama perjalanan medis Anda di Korea.</p>
    `,
    created_at: '2024-12-01',
    category: 'service',
    image: '/images/services/medical-tourism.jpg',
  },
  '3': {
    title: 'Updated Visa Information for Indonesian Travelers',
    title_id: 'Informasi Visa Terbaru untuk Wisatawan Indonesia',
    content: `
      <p>Important updates regarding entry requirements for Indonesian passport holders visiting South Korea.</p>

      <h3>K-ETA Requirements</h3>
      <p>Indonesian citizens currently require a K-ETA (Korea Electronic Travel Authorization) for visa-free entry to South Korea. Key points:</p>
      <ul>
        <li>Apply online at least 72 hours before departure</li>
        <li>Valid for 2 years or until passport expiration</li>
        <li>Allows stays up to 90 days for tourism</li>
        <li>Fee: approximately $10 USD</li>
      </ul>

      <h3>Medical Tourism Visa</h3>
      <p>For medical tourism purposes, additional documentation may be required:</p>
      <ul>
        <li>Medical appointment confirmation</li>
        <li>Hospital invitation letter (we can arrange this)</li>
        <li>Proof of financial means</li>
      </ul>

      <p>Our team can assist with visa guidance and provide all necessary documentation for your trip. Contact us for personalized assistance.</p>
    `,
    content_id: `
      <p>Pembaruan penting mengenai persyaratan masuk untuk pemegang paspor Indonesia yang mengunjungi Korea Selatan.</p>

      <h3>Persyaratan K-ETA</h3>
      <p>Warga negara Indonesia saat ini memerlukan K-ETA (Korea Electronic Travel Authorization) untuk masuk bebas visa ke Korea Selatan. Poin-poin penting:</p>
      <ul>
        <li>Ajukan online minimal 72 jam sebelum keberangkatan</li>
        <li>Berlaku selama 2 tahun atau sampai masa berlaku paspor</li>
        <li>Memungkinkan tinggal hingga 90 hari untuk pariwisata</li>
        <li>Biaya: sekitar $10 USD</li>
      </ul>

      <h3>Visa Wisata Medis</h3>
      <p>Untuk tujuan wisata medis, dokumentasi tambahan mungkin diperlukan:</p>
      <ul>
        <li>Konfirmasi janji medis</li>
        <li>Surat undangan rumah sakit (kami dapat mengaturnya)</li>
        <li>Bukti kemampuan finansial</li>
      </ul>

      <p>Tim kami dapat membantu dengan panduan visa dan menyediakan semua dokumentasi yang diperlukan untuk perjalanan Anda. Hubungi kami untuk bantuan personal.</p>
    `,
    created_at: '2024-11-20',
    category: 'info',
    image: '/images/services/guide-service.jpg',
  },
};

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

export async function generateStaticParams() {
  return Object.keys(notices).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const notice = notices[id];

  if (!notice) return { title: 'Not Found' };

  return {
    title: locale === 'id' ? notice.title_id : notice.title,
  };
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const dict = await getDictionary(locale as Locale);
  const notice = notices[id];

  if (!notice) {
    notFound();
  }

  // Get related notices (excluding current)
  const relatedNotices = Object.entries(notices)
    .filter(([noticeId]) => noticeId !== id)
    .slice(0, 2)
    .map(([noticeId, data]) => ({ id: noticeId, ...data }));

  const title = locale === 'id' ? notice.title_id : notice.title;
  const content = locale === 'id' ? notice.content_id : notice.content;

  return (
    <div className="flex flex-col">
      {/* Hero Section with Image */}
      <section className="relative h-64 sm:h-80 lg:h-96">
        <Image
          src={notice.image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8">
          <Link
            href={`/${locale}/notices`}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            {dict.notices.backToList}
          </Link>
        </div>

        {/* Title on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${categoryColors[notice.category as keyof typeof categoryColors]}`}>
                <Tag className="h-3 w-3" />
                {categoryLabels[notice.category as keyof typeof categoryLabels][locale as 'en' | 'id']}
              </span>
              <span className="flex items-center gap-1 text-sm text-white/80">
                <Calendar className="h-4 w-4" />
                {formatDate(notice.created_at, locale)}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              {title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Share Buttons */}
          <div className="flex items-center justify-end gap-2 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
            <span className="text-sm text-gray-500 mr-2">
              <Share2 className="h-4 w-4 inline mr-1" />
              {locale === 'id' ? 'Bagikan:' : 'Share:'}
            </span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600 transition-colors hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>

          {/* Article Content */}
          <article
            className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-semibold prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-ul:my-4 prose-li:my-1 prose-a:text-blue-600 prose-li:marker:text-blue-500"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* CTA Box */}
          <Card className="mt-12 overflow-hidden border-0 bg-gradient-to-r from-blue-600 to-cyan-600 shadow-xl">
            <CardContent className="p-6 sm:p-8 text-center text-white">
              <h3 className="text-xl font-semibold">
                {locale === 'id' ? 'Tertarik dengan penawaran ini?' : 'Interested in this offer?'}
              </h3>
              <p className="mt-2 text-blue-100">
                {locale === 'id'
                  ? 'Hubungi kami untuk informasi lebih lanjut dan penawaran khusus.'
                  : 'Contact us for more information and a personalized quote.'}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href={`/${locale}/inquiry`}>
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 sm:w-auto min-h-[48px]">
                    {locale === 'id' ? 'Minta Penawaran' : 'Get a Quote'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 sm:w-auto min-h-[48px]">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Notices */}
      {relatedNotices.length > 0 && (
        <section className="bg-gray-50 py-12 lg:py-16 dark:bg-gray-900/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {locale === 'id' ? 'Pengumuman Lainnya' : 'Other Announcements'}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedNotices.map((relatedNotice) => (
                <Link key={relatedNotice.id} href={`/${locale}/notices/${relatedNotice.id}`}>
                  <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
                    <CardContent className="p-0">
                      <div className="relative h-40">
                        <Image
                          src={relatedNotice.image}
                          alt={locale === 'id' ? relatedNotice.title_id : relatedNotice.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4" />
                          {formatDate(relatedNotice.created_at, locale)}
                        </div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {locale === 'id' ? relatedNotice.title_id : relatedNotice.title}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
