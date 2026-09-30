// Title/subtitle/buttons were reconciled into the "hero" message namespace (single source).
// Stat labels are resolved at render time via t(`hero.stats.${key}Label`).
export type HeroStatKey = 'projects' | 'revenue' | 'clients';

export const heroData = {
  stats: [
    { key: 'projects' as HeroStatKey, value: '50+' },
    { key: 'revenue' as HeroStatKey, value: '$10M+' },
    { key: 'clients' as HeroStatKey, value: '15+' }
  ],
  backgroundImages: [
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1920',
    'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920'
  ]
}
