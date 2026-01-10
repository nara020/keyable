'use client';

import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

interface WhatsAppButtonProps {
  message?: string;
  locale?: string;
}

export function WhatsAppButton({ message, locale = 'en' }: WhatsAppButtonProps) {
  const defaultMessage = locale === 'id'
    ? 'Halo, saya ingin bertanya tentang layanan Keyable Tour.'
    : 'Hello, I would like to inquire about Keyable Tour services.';

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(message || defaultMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 active:scale-95 md:h-16 md:w-16"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />

      {/* Pulse animation */}
      <span className="absolute -z-10 h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
    </a>
  );
}
