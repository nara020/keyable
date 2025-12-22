import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import type { Dictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href={`/${locale}`} className="inline-block mb-4">
              <Image
                src="/images/logo-black.png"
                alt="Keyable Korea"
                width={140}
                height={40}
                className="h-10 w-auto dark:hidden"
              />
              <Image
                src="/images/logo-white.png"
                alt="Keyable Korea"
                width={140}
                height={40}
                className="hidden h-10 w-auto dark:block"
              />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {dict.footer.tagline}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              {dict.footer.license}
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-labelledby="footer-quick-links">
            <h3 id="footer-quick-links" className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              {dict.footer.quickLinks}
            </h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  href={`/${locale}/services`}
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  {dict.nav.services}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/faq`}
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  {dict.nav.faq}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/inquiry`}
                  className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  {dict.nav.inquiry}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              {dict.footer.contact}
            </h3>
            <ul className="space-y-3" role="list">
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5" aria-hidden="true" />
                <span>{SITE_CONFIG.address}</span>
              </li>
            </ul>
          </address>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              {dict.footer.followUs}
            </h3>
            <div className="flex gap-3" role="list" aria-label="Social media links">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-green-100 hover:text-green-600 dark:bg-gray-800 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Contact us on WhatsApp"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-pink-100 hover:text-pink-600 dark:bg-gray-800 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-blue-100 hover:text-blue-600 dark:bg-gray-800 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-500">
            &copy; {currentYear} {dict.footer.company}. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
