import { SITE_CONFIG } from '@/lib/constants';

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `https://${SITE_CONFIG.domain}/#website`,
    url: `https://${SITE_CONFIG.domain}`,
    name: SITE_CONFIG.name,
    description: 'Premium Korea inbound travel, private tours, and medical tourism services for international visitors.',
    publisher: {
      '@id': `https://${SITE_CONFIG.domain}/#organization`,
    },
    inLanguage: ['en', 'id'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://${SITE_CONFIG.domain}/en?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
