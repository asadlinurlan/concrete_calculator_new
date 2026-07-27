import React from 'react';
import { ChevronRight } from 'lucide-react';
import { LocaleLink, useT } from '../../i18n/i18n';
import './Breadcrumbs.css';

const HOME_LABEL = { az: 'Ana Səhifə', en: 'Home', ru: 'Главная' };
const NAV_LABEL = { az: 'Naviqasiya yolu', en: 'Breadcrumb', ru: 'Навигация' };

// Visible breadcrumb trail for sub-pages (pairs with BreadcrumbList JSON-LD in Seo).
// parent: optional intermediate level, e.g. { to: '/products', label: 'Beton Markaları' }.
const Breadcrumbs = ({ current, parent }) => {
  const t = useT();
  return (
    <nav className="breadcrumbs" aria-label={t(NAV_LABEL)}>
      <LocaleLink to="/">{t(HOME_LABEL)}</LocaleLink>
      <ChevronRight size={14} aria-hidden="true" className="bc-sep" />
      {parent && (
        <>
          <LocaleLink to={parent.to}>{t(parent.label)}</LocaleLink>
          <ChevronRight size={14} aria-hidden="true" className="bc-sep" />
        </>
      )}
      <span aria-current="page">{t(current)}</span>
    </nav>
  );
};

export default Breadcrumbs;
