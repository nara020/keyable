import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/getDictionary';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { SITE_CONFIG } from '@/lib/constants';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      template: `%s | ${SITE_CONFIG.name}`,
      default: `Korea Travel & Medical Tourism | ${SITE_CONFIG.name}`,
    },
    description:
      'Premium Korea inbound travel, private tours, and medical tourism services for international visitors from Indonesia and worldwide.',
    keywords: [
      'Korea travel',
      'Korea tour',
      'medical tourism Korea',
      'private tour Korea',
      'Korea travel agency',
      'Seoul tour',
      'Jeju tour',
      'Korea hospital',
      'wisata Korea',
      'tur Korea',
    ],
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(`https://${SITE_CONFIG.domain}`),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        id: '/id',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'id' ? 'id_ID' : 'en_US',
      url: `https://${SITE_CONFIG.domain}/${locale}`,
      siteName: SITE_CONFIG.name,
      title: `Korea Travel & Medical Tourism | ${SITE_CONFIG.name}`,
      description:
        'Premium Korea inbound travel, private tours, and medical tourism services.',
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Korea Travel & Medical Tourism | ${SITE_CONFIG.name}`,
      description:
        'Premium Korea inbound travel, private tours, and medical tourism services.',
      images: ['/images/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <LocalBusinessSchema />
        <GoogleAnalytics />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white font-sans antialiased dark:bg-gray-950`}
      >
        <Header locale={locale as Locale} dict={dict} />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
        <WhatsAppButton locale={locale} />
      </body>
    </html>
  );
}
