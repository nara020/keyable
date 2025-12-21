import { SITE_CONFIG } from '@/lib/constants';

export async function GET() {
  const content = `# robots.txt for ${SITE_CONFIG.name}

User-agent: *
Allow: /

# Sitemaps
Sitemap: https://${SITE_CONFIG.domain}/sitemap.xml

# LLM-specific
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: PerplexityBot
Allow: /

# Block admin pages
User-agent: *
Disallow: /admin/

# Allow llms.txt
Allow: /llms.txt
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
