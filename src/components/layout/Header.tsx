'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Dictionary } from '@/lib/i18n/getDictionary';
import type { Locale } from '@/lib/i18n/config';
import { localeNames } from '@/lib/i18n/config';

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navItems = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/faq`, label: dict.nav.faq },
    { href: `/${locale}/notices`, label: dict.nav.notices },
  ];

  const otherLocale = locale === 'en' ? 'id' : 'en';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center" aria-label="Keyable Tour - Home">
            <Image
              src="/images/logo-black.png"
              alt="Keyable Tour Logo"
              width={140}
              height={40}
              className="h-9 w-auto dark:hidden"
              priority
            />
            <Image
              src="/images/logo-white.png"
              alt="Keyable Tour Logo"
              width={140}
              height={40}
              className="hidden h-9 w-auto dark:block"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded={isLangOpen}
                aria-haspopup="true"
                aria-label={`Change language. Current: ${localeNames[locale]}`}
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{localeNames[locale]}</span>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-100 bg-white py-2 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                  <Link
                    href={`/${otherLocale}`}
                    onClick={() => setIsLangOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    {localeNames[otherLocale]}
                  </Link>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href={`/${locale}/inquiry`}
              className="hidden rounded-lg bg-gradient-to-r from-[#040f77] to-[#fc645f] px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] sm:inline-flex min-h-[44px] items-center focus:outline-none focus:ring-2 focus:ring-[#040f77] focus:ring-offset-2"
            >
              {dict.nav.inquiry}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-800 min-h-[44px] min-w-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={cn(
            'md:hidden',
            isMenuOpen ? 'block pb-4' : 'hidden'
          )}
        >
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/inquiry`}
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-lg bg-gradient-to-r from-[#040f77] to-[#fc645f] px-4 py-3 text-center text-sm font-medium text-white min-h-[48px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#040f77] focus:ring-offset-2"
            >
              {dict.nav.inquiry}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
