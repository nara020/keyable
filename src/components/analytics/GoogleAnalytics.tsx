'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Helper function to track custom events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Common events for the travel website
export const AnalyticsEvents = {
  // Inquiry form events
  inquiryFormStart: () => trackEvent('form_start', 'inquiry'),
  inquiryFormSubmit: (serviceType: string) => trackEvent('form_submit', 'inquiry', serviceType),
  inquiryFormComplete: () => trackEvent('form_complete', 'inquiry'),

  // Service page views
  serviceView: (service: string) => trackEvent('view_item', 'service', service),

  // Contact actions
  whatsappClick: () => trackEvent('click', 'contact', 'whatsapp'),
  phoneClick: () => trackEvent('click', 'contact', 'phone'),
  emailClick: () => trackEvent('click', 'contact', 'email'),

  // Navigation
  languageChange: (locale: string) => trackEvent('language_change', 'navigation', locale),

  // Engagement
  faqExpand: (question: string) => trackEvent('faq_expand', 'engagement', question),
  noticeView: (noticeSlug: string) => trackEvent('notice_view', 'engagement', noticeSlug),
};
