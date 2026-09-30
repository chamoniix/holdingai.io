import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const BASE_URL = 'https://www.holdingai.io';

const PATHS = [
  '',
  '/about',
  '/work',
  '/contact',
  '/services/ai-agents',
  '/services/saas',
  '/services/automation',
  '/legal/privacy',
  '/legal/terms',
  '/legal/mentions-legales',
];

const LOCALES: string[] = [...routing.locales];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of PATHS) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])
          ),
        },
      });
    }
  }

  return entries;
}
