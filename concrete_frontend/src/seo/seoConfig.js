// Single source of truth for per-route SEO metadata + breadcrumbs.
// Titles/descriptions/crumbs are trilingual { az, en, ru } — the Seo
// component picks the active locale and prefixes canonical/hreflang URLs.
export const SITE_URL = 'https://novxanibeton.az';
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const PAGES = {
  home: {
    path: '/',
    localBusiness: true,
    title: {
      az: 'NOVXANI BETON — Hazır Beton Satışı və Çatdırılması | Bakı, Abşeron',
      en: 'NOVXANI BETON — Ready-Mix Concrete Sales & Delivery | Baku, Absheron',
      ru: 'NOVXANI BETON — Продажа и доставка товарного бетона | Баку, Абшерон',
    },
    description: {
      az: 'Novxanı Beton: yüksək keyfiyyətli hazır beton, beton nasoslama, tərəzi və laboratoriya xidmətləri. Pulsuz beton kalkulyatoru ilə layihənizi planlaşdırın. Bakı və Abşeron üzrə çatdırılma.',
      en: 'Novxani Beton: high-quality ready-mix concrete, concrete pumping, weighbridge and laboratory services. Plan your project with our free concrete calculator. Delivery across Baku and Absheron.',
      ru: 'Novxani Beton: качественный товарный бетон, услуги бетононасоса, автомобильные весы и лаборатория. Планируйте проект с бесплатным калькулятором бетона. Доставка по Баку и Абшерону.',
    },
    crumb: null,
  },
  // Google Ads landing alias — the localized homepage served at a stable
  // URL (/en/concrete, /ru/concrete). Only rendered for en/ru locales.
  concreteLanding: {
    path: '/concrete',
    localBusiness: true,
    hreflangs: {
      az: `${SITE_URL}/`,
      en: `${SITE_URL}/en/concrete`,
      ru: `${SITE_URL}/ru/concrete`,
      'x-default': `${SITE_URL}/`,
    },
    title: {
      az: 'NOVXANI BETON — Hazır Beton Satışı və Çatdırılması | Bakı, Abşeron',
      en: 'Ready Mix Concrete in Baku | NOVXANI BETON',
      ru: 'Товарный бетон в Баку | NOVXANI BETON',
    },
    description: {
      az: 'Novxanı Beton: yüksək keyfiyyətli hazır beton, beton nasoslama, tərəzi və laboratoriya xidmətləri. Bakı və Abşeron üzrə çatdırılma.',
      en: 'Ready-mix concrete delivery in Baku and Absheron. M300, M350 and M400 concrete, pumping service and professional support.',
      ru: 'Производство и доставка товарного бетона по Баку и Абшерону. Бетон М300, М350 и М400, услуги бетононасоса и профессиональная поддержка.',
    },
    crumb: null,
  },
  products: {
    path: '/products',
    title: {
      az: 'Beton Markaları M100–M450 | NOVXANI BETON',
      en: 'Concrete Grades M100–M450 | NOVXANI BETON',
      ru: 'Марки бетона M100–M450 | NOVXANI BETON',
    },
    description: {
      az: 'M100-dən M450-ə qədər bütün beton markaları — möhkəmlik sinfi, MPa göstəricisi və istifadə sahəsi. GOST 26633 üzrə istehsal olunur və 28 günlük möhkəmlik sınağından keçirilir.',
      en: 'All concrete grades from M100 to M450 — strength class, MPa rating and applications. Produced to GOST 26633 and verified with 28-day strength testing.',
      ru: 'Все марки бетона от M100 до M450 — класс прочности, показатель МПа и области применения. Производится по ГОСТ 26633 и проходит 28-дневные испытания на прочность.',
    },
    crumb: { az: 'Beton Markaları', en: 'Concrete Grades', ru: 'Марки бетона' },
  },
  services: {
    path: '/services',
    title: {
      az: 'Beton Çatdırılması, Nasoslama və Tərəzi Xidməti | NOVXANI BETON',
      en: 'Concrete Delivery, Pumping & Weighbridge Service | NOVXANI BETON',
      ru: 'Доставка бетона, бетононасос и автовесы | NOVXANI BETON',
    },
    description: {
      az: 'Hazır beton çatdırılması, beton nasoslama və avtomobil körpü tərəzisi xidmətləri. Bakı və Abşeron üzrə peşəkar, vaxtında beton həlləri.',
      en: 'Ready-mix concrete delivery, concrete pumping and truck weighbridge services. Professional, on-time concrete solutions across Baku and Absheron.',
      ru: 'Доставка товарного бетона, услуги бетононасоса и автомобильных весов. Профессиональные бетонные решения точно в срок по Баку и Абшерону.',
    },
    crumb: { az: 'Xidmətlər', en: 'Services', ru: 'Услуги' },
  },
  materials: {
    path: '/tikinti-materiallari',
    title: {
      az: 'Qum, Atsep və Şeben Satışı | NOVXANI BETON',
      en: 'Sand, Gravel Mix & Crushed Stone | NOVXANI BETON',
      ru: 'Продажа песка, ПГС и щебня | NOVXANI BETON',
    },
    description: {
      az: 'NOVXANI BETON fərdi şəxslər, tikinti şirkətləri və beton zavodları üçün qum, atsep və şeben satışı, topdan sifariş və operativ çatdırılma xidməti təklif edir.',
      en: 'NOVXANI BETON sells sand, gravel mix and crushed stone to individuals, construction companies and concrete plants — wholesale orders and fast delivery.',
      ru: 'NOVXANI BETON продает песок, ПГС и щебень частным лицам, строительным компаниям и бетонным заводам — оптовые заказы и оперативная доставка.',
    },
    crumb: { az: 'Tikinti Materialları', en: 'Building Materials', ru: 'Стройматериалы' },
  },
  calculator: {
    path: '/calculator',
    title: {
      az: 'Beton Kalkulyatoru — Kubmetr və Material Hesabla | NOVXANI BETON',
      en: 'Concrete Calculator — Volume & Materials | NOVXANI BETON',
      ru: 'Калькулятор бетона — объем и материалы | NOVXANI BETON',
    },
    description: {
      az: 'Pulsuz beton kalkulyatoru: layihəniz üçün lazımi beton həcmini (m³), sement, qum, çınqıl, armatur və mikser sayını dərhal hesablayın. Metrik sistem.',
      en: 'Free concrete calculator: instantly work out the concrete volume (m³), cement, sand, gravel, rebar and the number of mixer trucks for your project. Metric units.',
      ru: 'Бесплатный калькулятор бетона: мгновенно рассчитайте объем бетона (м³), цемент, песок, щебень, арматуру и количество миксеров для вашего проекта. Метрическая система.',
    },
    crumb: { az: 'Kalkulyator', en: 'Calculator', ru: 'Калькулятор' },
  },
  about: {
    path: '/about',
    title: {
      az: 'Haqqımızda və Qalereya — 2018-ci ildən Etibarlı Tərəfdaş | NOVXANI BETON',
      en: 'About Us & Gallery — A Reliable Partner Since 2018 | NOVXANI BETON',
      ru: 'О нас и галерея — надежный партнер с 2018 года | NOVXANI BETON',
    },
    description: {
      az: 'Novxanı Beton 2018-ci ildən Bakı və Abşeronda yüksək keyfiyyətli beton həlləri təqdim edir. Şirkət haqqında məlumat və layihələrimizdən şəkillər.',
      en: 'Since 2018 Novxani Beton has been delivering high-quality concrete solutions across Baku and Absheron. About the company and photos of our projects.',
      ru: 'С 2018 года Novxani Beton поставляет качественные бетонные решения по Баку и Абшерону. О компании и фотографии наших проектов.',
    },
    crumb: { az: 'Haqqımızda', en: 'About Us', ru: 'О нас' },
  },
  contact: {
    path: '/contact',
    title: {
      az: 'Əlaqə — Telefon, Ünvan və Sifariş | NOVXANI BETON',
      en: 'Contact — Phone, Address & Orders | NOVXANI BETON',
      ru: 'Контакты — телефон, адрес и заказ | NOVXANI BETON',
    },
    description: {
      az: 'Novxanı Beton ilə əlaqə: +994 50 620 95 84, info@novxanibeton.az. Qiymət sorğusu və beton sifarişi üçün bizə yazın. Novxanı, Bakı.',
      en: 'Contact Novxani Beton: +994 50 620 95 84, info@novxanibeton.az. Write to us for a quote or a concrete order. Novkhani, Baku.',
      ru: 'Связаться с Novxani Beton: +994 50 620 95 84, info@novxanibeton.az. Напишите нам для расчета стоимости или заказа бетона. Новханы, Баку.',
    },
    crumb: { az: 'Əlaqə', en: 'Contact', ru: 'Контакты' },
  },
  notFound: {
    path: '/404',
    title: {
      az: 'Səhifə tapılmadı (404) | NOVXANI BETON',
      en: 'Page not found (404) | NOVXANI BETON',
      ru: 'Страница не найдена (404) | NOVXANI BETON',
    },
    description: {
      az: 'Axtardığınız səhifə mövcud deyil.',
      en: 'The page you are looking for does not exist.',
      ru: 'Запрашиваемая страница не существует.',
    },
    crumb: null,
    noindex: true,
  },
};
