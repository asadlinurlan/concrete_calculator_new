// Single source of truth for per-route SEO metadata + breadcrumbs.
export const SITE_URL = 'https://novxanibeton.az';
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const PAGES = {
  home: {
    path: '/',
    title: 'NOVXANI BETON — Hazır Beton Satışı və Çatdırılması | Bakı, Abşeron',
    description:
      'Novxanı Beton: yüksək keyfiyyətli hazır beton, beton nasoslama, tərəzi və laboratoriya xidmətləri. Pulsuz beton kalkulyatoru ilə layihənizi planlaşdırın. Bakı və Abşeron üzrə çatdırılma.',
    crumb: null,
  },
  products: {
    path: '/products',
    title: 'Beton Markaları M100–M450 | NOVXANI BETON',
    description:
      'M100-dən M450-ə qədər bütün beton markaları — möhkəmlik sinfi, MPa göstəricisi və istifadə sahəsi. GOST 26633 üzrə istehsal olunur və 28 günlük möhkəmlik sınağından keçirilir.',
    crumb: 'Beton Markaları',
  },
  services: {
    path: '/services',
    title: 'Beton Çatdırılması, Nasoslama və Tərəzi Xidməti | NOVXANI BETON',
    description:
      'Hazır beton çatdırılması, beton nasoslama və avtomobil körpü tərəzisi xidmətləri. Bakı və Abşeron üzrə peşəkar, vaxtında beton həlləri.',
    crumb: 'Xidmətlər',
  },
  calculator: {
    path: '/calculator',
    title: 'Beton Kalkulyatoru — Kubmetr və Material Hesabla | NOVXANI BETON',
    description:
      'Pulsuz beton kalkulyatoru: layihəniz üçün lazımi beton həcmini (m³), sement, qum, çınqıl, armatur və mikser sayını dərhal hesablayın. Metrik sistem.',
    crumb: 'Kalkulyator',
  },
  gallery: {
    path: '/gallery',
    title: 'Qalereya — Beton Zavodu və Layihələr | NOVXANI BETON',
    description:
      'Novxanı Beton zavodu, mikser parkı və görülmüş layihələrdən şəkillər. İstehsal prosesimiz və iş nümunələrimiz.',
    crumb: 'Qalereya',
  },
  about: {
    path: '/about',
    title: 'Haqqımızda — 2018-ci ildən Etibarlı Tərəfdaş | NOVXANI BETON',
    description:
      'Novxanı Beton 2018-ci ildən Bakı və Abşeronda yüksək keyfiyyətli beton həlləri təqdim edir. Təcrübəli komanda, laboratoriya nəzarəti və vaxtında çatdırılma.',
    crumb: 'Haqqımızda',
  },
  contact: {
    path: '/contact',
    title: 'Əlaqə — Telefon, Ünvan və Sifariş | NOVXANI BETON',
    description:
      'Novxanı Beton ilə əlaqə: +994 50 620 95 84, info@novxanibeton.az. Qiymət sorğusu və beton sifarişi üçün bizə yazın. Novxanı, Bakı.',
    crumb: 'Əlaqə',
  },
  notFound: {
    path: '/404',
    title: 'Səhifə tapılmadı (404) | NOVXANI BETON',
    description: 'Axtardığınız səhifə mövcud deyil.',
    crumb: null,
    noindex: true,
  },
};
