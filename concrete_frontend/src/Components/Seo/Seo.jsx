import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, OG_IMAGE, PAGES } from '../../seo/seoConfig';
import { useLocale, useT, localePath } from '../../i18n/i18n';

/**
 * Per-route SEO: unique localized title/description/canonical + Open Graph/
 * Twitter, hreflang alternates for az/en/ru, plus BreadcrumbList structured
 * data on sub-pages. Overrides the static defaults in public/index.html.
 */

const HOME_CRUMB = { az: 'Ana Səhifə', en: 'Home', ru: 'Главная' };

// Localized LocalBusiness record for the en/ru home pages (the Azerbaijani
// one is baked statically into index.html and removed from localized routes
// at prerender time).
const LB = {
  description: {
    az: 'Bakı və Abşeronda yüksək keyfiyyətli hazır beton, beton nasoslama, tərəzi və laboratoriya xidmətləri.',
    en: 'High-quality ready-mix concrete, concrete pumping, weighbridge and laboratory services across Baku and Absheron.',
    ru: 'Качественный товарный бетон, услуги бетононасоса, автомобильных весов и лаборатории по Баку и Абшерону.',
  },
  locality: { az: 'Novxanı', en: 'Novkhani', ru: 'Новханы' },
  region: { az: 'Bakı', en: 'Baku', ru: 'Баку' },
  areaServed: {
    az: ['Bakı', 'Abşeron', 'Novxanı'],
    en: ['Baku', 'Absheron', 'Novkhani'],
    ru: ['Баку', 'Абшерон', 'Новханы'],
  },
};

const Seo = ({ page, custom }) => {
  const locale = useLocale();
  const t = useT();
  const cfg = custom || PAGES[page] || PAGES.home;
  const url = SITE_URL + localePath(locale, cfg.path);
  const title = t(cfg.title);
  const description = t(cfg.description);

  const hreflangs = cfg.hreflangs || {
    az: SITE_URL + cfg.path,
    en: SITE_URL + localePath('en', cfg.path),
    ru: SITE_URL + localePath('ru', cfg.path),
    'x-default': SITE_URL + cfg.path,
  };

  // Optional 3-level trail: cfg.parentCrumb = { to, label } inserts an
  // intermediate level (e.g. Ana Səhifə → Beton Markaları → M300 Beton).
  const homeUrl = locale === 'az' ? `${SITE_URL}/` : SITE_URL + localePath(locale, '/');
  const crumbItems = cfg.crumb && [
    { '@type': 'ListItem', position: 1, name: t(HOME_CRUMB), item: homeUrl },
    ...(cfg.parentCrumb
      ? [{
          '@type': 'ListItem',
          position: 2,
          name: t(cfg.parentCrumb.label),
          item: SITE_URL + localePath(locale, cfg.parentCrumb.to),
        }]
      : []),
    { '@type': 'ListItem', position: cfg.parentCrumb ? 3 : 2, name: t(cfg.crumb), item: url },
  ];

  const breadcrumbLd = crumbItems && {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbItems,
  };

  const localBusinessLd =
    locale !== 'az' && cfg.localBusiness
      ? {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'NOVXANI BETON',
          description: t(LB.description),
          url,
          telephone: '+994506209584',
          email: 'info@novxanibeton.az',
          image: OG_IMAGE,
          logo: `${SITE_URL}/branding/novxani-beton-logo-512.png`,
          foundingDate: '2018',
          priceRange: '$$',
          address: {
            '@type': 'PostalAddress',
            addressLocality: t(LB.locality),
            addressRegion: t(LB.region),
            addressCountry: 'AZ',
          },
          geo: { '@type': 'GeoCoordinates', latitude: 40.4858529, longitude: 49.8294278 },
          areaServed: t(LB.areaServed),
          sameAs: [
            'https://www.instagram.com/novxanibeton/',
            'https://www.tiktok.com/@novxanibeton',
          ],
        }
      : null;

  return (
    <Helmet prioritizeSeoTags>
      <html lang={locale} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="az" href={hreflangs.az} />
      <link rel="alternate" hrefLang="en" href={hreflangs.en} />
      <link rel="alternate" hrefLang="ru" href={hreflangs.ru} />
      <link rel="alternate" hrefLang="x-default" href={hreflangs['x-default']} />
      {cfg.noindex && <meta name="robots" content="noindex, follow" />}

      {/* Only route-varying tags here; invariant og:image/site_name/type live in index.html */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {breadcrumbLd && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      )}
      {localBusinessLd && (
        <script type="application/ld+json">{JSON.stringify(localBusinessLd)}</script>
      )}
    </Helmet>
  );
};

export default Seo;
