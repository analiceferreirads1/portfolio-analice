import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Gera /robots.txt: robôs podem ler o site, menos as rotas de API.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
