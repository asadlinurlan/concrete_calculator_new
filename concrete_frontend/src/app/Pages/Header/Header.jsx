import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { useLocale, useT, localePath, splitPath, LocaleLink } from '../../../i18n/i18n';
import './Header.css';

const NAV_LINKS = [
  { to: '/', label: { az: 'Ana Səhifə', en: 'Home', ru: 'Главная' } },
  { to: '/products', label: { az: 'Məhsullar', en: 'Products', ru: 'Продукция' } },
  { to: '/services', label: { az: 'Xidmətlər', en: 'Services', ru: 'Услуги' } },
  { to: '/tikinti-materiallari', label: { az: 'Materiallar', en: 'Materials', ru: 'Материалы' } },
  { to: '/calculator', label: { az: 'Kalkulyator', en: 'Calculator', ru: 'Калькулятор' } },
  { to: '/about', label: { az: 'Haqqımızda', en: 'About Us', ru: 'О нас' } },
  { to: '/contact', label: { az: 'Əlaqə', en: 'Contact', ru: 'Контакты' } },
];

const TXT = {
  navAria: { az: 'Əsas naviqasiya', en: 'Main navigation', ru: 'Основная навигация' },
  logoAria: { az: 'Novxanı Beton ana səhifə', en: 'Novxani Beton home page', ru: 'Главная страница Novxani Beton' },
  phoneAria: { az: 'Zəng et: +994 50 620 95 84', en: 'Call: +994 50 620 95 84', ru: 'Позвонить: +994 50 620 95 84' },
  closeMenu: { az: 'Menyunu bağla', en: 'Close menu', ru: 'Закрыть меню' },
  openMenu: { az: 'Menyunu aç', en: 'Open menu', ru: 'Открыть меню' },
  langAria: { az: 'Sayt dili', en: 'Site language', ru: 'Язык сайта' },
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const locale = useLocale();
  const t = useT();

  const { base } = splitPath(location.pathname);
  // The Ads landing alias (/en/concrete, /ru/concrete) maps to the homepage
  // when switching languages; every other path keeps its own base.
  const switchBase = base === '/concrete' ? '/' : base;
  const langTarget = (loc) =>
    loc !== 'az' && base === '/concrete' ? localePath(loc, '/concrete') : localePath(loc, switchBase);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  // Lock page scroll while the full-screen mobile menu is open
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isMenuOpen]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="navbar" aria-label={t(TXT.navAria)}>
        <div className="navbar-container container">
          <LocaleLink to="/" className="logo" aria-label={t(TXT.logoAria)}>
            <img src="/NOVKHANI.svg" alt="Novxani Beton" className="logo-svg" />
            <span className="logo-wordmark" aria-hidden="true">NOVXANI</span>
          </LocaleLink>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {NAV_LINKS.map((link) => (
              <LocaleLink
                key={link.to}
                to={link.to}
                className={`nav-link ${base === link.to || (link.to === '/' && base === '/concrete') ? 'active' : ''}`}
              >
                {t(link.label)}
              </LocaleLink>
            ))}
            {/* Click-to-call: number on wide screens, icon-only on tighter
                desktops; hidden in the mobile menu (sticky bar covers it) */}
            <a href="tel:+994506209584" className="nav-phone" aria-label={t(TXT.phoneAria)}>
              <Phone size={15} aria-hidden="true" />
              <span className="nav-phone-num">+994 50 620 95 84</span>
            </a>
            <button
              className="menu-close-btn"
              onClick={() => setIsMenuOpen(false)}
              aria-label={t(TXT.closeMenu)}
            >
              <X size={18} aria-hidden="true" />
              {t(TXT.closeMenu)}
            </button>
          </div>

          {/* Language switcher — anchored OUTSIDE the nav flow so the varying
              link-text widths of each language can never push it around.
              Its neighbours (phone number, hamburger) have constant width. */}
          <div className="lang-switch" role="group" aria-label={t(TXT.langAria)}>
            {['az', 'en', 'ru'].map((loc) => (
              <Link
                key={loc}
                to={langTarget(loc)}
                state={{ keepScroll: true }}
                className={`lang-switch-link ${locale === loc ? 'active' : ''}`}
                aria-current={locale === loc ? 'page' : undefined}
              >
                {loc.toUpperCase()}
              </Link>
            ))}
          </div>

          <button
            className="hamburger"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? t(TXT.closeMenu) : t(TXT.openMenu)}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
