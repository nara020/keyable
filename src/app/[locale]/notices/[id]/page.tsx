import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { formatDate } from '@/lib/utils';

// Sample notices - in production, fetch from database
const notices: Record<string, {
  title: string;
  title_id: string;
  content: string;
  content_id: string;
  created_at: string;
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
  },
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

  return (
    <div className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href={`/${locale}/notices`}
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.notices.backToList}
        </Link>

        {/* Article */}
        <article className="mt-8">
          <header>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {locale === 'id' ? notice.title_id : notice.title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {formatDate(notice.created_at, locale)}
            </div>
          </header>

          <div
            className="prose prose-gray mt-8 max-w-none dark:prose-invert prose-headings:font-semibold prose-h3:text-xl prose-a:text-blue-600 prose-li:marker:text-blue-500"
            dangerouslySetInnerHTML={{
              __html: locale === 'id' ? notice.content_id : notice.content,
            }}
          />
        </article>
      </div>
    </div>
  );
}
