import { SITE_CONFIG } from '@/lib/constants';
import { locales } from '@/lib/i18n/config';

const staticPages = [
  '',
  '/services',
  '/services/private-tour',
  '/services/medical-tourism',
  '/services/guide-service',
  '/services/vehicle-rental',
  '/inquiry',
  '/about',
  '/faq',
  '/notices',
];

export async function GET() {
  const baseUrl = `https://${SITE_CONFIG.domain}`;

  const urls = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      loc: `${baseUrl}/${locale}${page}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: page === '' ? 'weekly' : 'monthly',
      priority: page === '' ? '1.0' : page.includes('services') ? '0.9' : '0.8',
    }))
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
