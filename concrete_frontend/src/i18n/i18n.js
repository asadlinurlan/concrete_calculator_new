/* ============================================================
   Minimal locale layer — no external i18n library.

   Locale comes from the URL prefix: /en/... , /ru/... , otherwise az.
   Translatable values are plain objects { az, en, ru }; `t()` picks
   the current locale and falls back to az, and passes plain strings
   through untouched — so untranslated spots keep working.
   ============================================================ */
import React, { createContext, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';

export const LOCALES = ['az', 'en', 'ru'];

const LocaleContext = createContext('az');
export const LocaleProvider = LocaleContext.Provider;
export const useLocale = () => useContext(LocaleContext);

/** Pick the locale variant from an {az,en,ru} object; pass strings through. */
export function pick(value, locale) {
  if (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    value.az !== undefined
  ) {
    return value[locale] !== undefined ? value[locale] : value.az;
  }
  return value;
}

/** t() bound to the current locale. */
export function useT() {
  const locale = useLocale();
  return useCallback((v) => pick(v, locale), [locale]);
}

/** Prefix an az-relative path for the given locale: ('/products','en') → '/en/products'. */
export const localePath = (locale, path) =>
  locale === 'az' ? path : `/${locale}${path === '/' ? '' : path}`;

/** Extract { locale, base } from a pathname: '/en/products' → { 'en', '/products' }. */
export function splitPath(pathname) {
  const m = /^\/(en|ru)(\/.*)?$/.exec(pathname);
  if (!m) return { locale: 'az', base: pathname };
  return { locale: m[1], base: m[2] || '/' };
}

/** Drop-in replacement for <Link>: `to` is the az-relative path, the
    current locale prefix is added automatically. */
export const LocaleLink = React.forwardRef(function LocaleLink({ to, ...rest }, ref) {
  const locale = useLocale();
  return <Link ref={ref} to={localePath(locale, to)} {...rest} />;
});
