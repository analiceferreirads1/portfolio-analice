import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Gera /sitemap.xml: o site tem uma página só, com as seções por âncora.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, changeFrequency: 'monthly', priority: 1 }];
}
