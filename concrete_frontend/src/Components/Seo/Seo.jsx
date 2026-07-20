import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, PAGES } from '../../seo/seoConfig';

/**
 * Per-route SEO: unique title/description/canonical + Open Graph/Twitter,
 * plus BreadcrumbList structured data on sub-pages.
 * Overrides the static defaults in public/index.html when the app renders.
 */
const Seo = ({ page, custom }) => {
  const cfg = custom || PAGES[page] || PAGES.home;
  const url = SITE_URL + cfg.path;

  // Optional 3-level trail: cfg.parentCrumb = { to, label } inserts an
  // intermediate level (e.g. Ana Səhifə → Beton Markaları → M300 Beton).
  const crumbItems = cfg.crumb && [
    { '@type': 'ListItem', position: 1, name: 'Ana Səhifə', item: `${SITE_URL}/` },
    ...(cfg.parentCrumb
      ? [{ '@type': 'ListItem', position: 2, name: cfg.parentCrumb.label, item: SITE_URL + cfg.parentCrumb.to }]
      : []),
    { '@type': 'ListItem', position: cfg.parentCrumb ? 3 : 2, name: cfg.crumb, item: url },
  ];

  const breadcrumbLd = crumbItems && {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbItems,
  };

  return (
    <Helmet prioritizeSeoTags>
      <title>{cfg.title}</title>
      <meta name="description" content={cfg.description} />
      <link rel="canonical" href={url} />
      {cfg.noindex && <meta name="robots" content="noindex, follow" />}

      {/* Only route-varying tags here; invariant og:image/site_name/type live in index.html */}
      <meta property="og:title" content={cfg.title} />
      <meta property="og:description" content={cfg.description} />
      <meta property="og:url" content={url} />

      <meta name="twitter:title" content={cfg.title} />
      <meta name="twitter:description" content={cfg.description} />

      {breadcrumbLd && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      )}
    </Helmet>
  );
};

export default Seo;
