import { SITE_CONFIG } from '@/lib/constants';

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `https://${SITE_CONFIG.domain}/#organization`,
    name: SITE_CONFIG.name,
    url: `https://${SITE_CONFIG.domain}`,
    logo: {
      '@type': 'ImageObject',
      url: `https://${SITE_CONFIG.domain}/images/logo.png`,
      width: 512,
      height: 512,
    },
    image: `https://${SITE_CONFIG.domain}/images/og-image.png`,
    description: 'Premium Korea inbound travel agency specializing in private tours, medical tourism, and personalized travel experiences for international visitors.',
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seoul',
      addressRegion: 'Seoul',
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.5665,
      longitude: 126.978,
    },
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: SITE_CONFIG.phone,
        contactType: 'customer service',
        availableLanguage: ['English', 'Indonesian', 'Korean'],
        areaServed: ['ID', 'SG', 'MY', 'US', 'AU', 'GB'],
      },
      {
        '@type': 'ContactPoint',
        telephone: `+${SITE_CONFIG.whatsapp}`,
        contactType: 'sales',
        contactOption: 'TollFree',
        availableLanguage: ['English', 'Indonesian', 'Korean'],
      },
    ],
    foundingDate: '2019',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 5,
      maxValue: 10,
    },
    slogan: 'Your Trusted Partner for Korea Travel & Medical Services',
    knowsAbout: [
      'Korea Travel',
      'Medical Tourism',
      'Private Tours',
      'Korean Healthcare',
      'Seoul Tourism',
      'Jeju Island Tours',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'South Korea',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
