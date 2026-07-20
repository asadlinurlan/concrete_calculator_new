import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, MessageCircle } from 'lucide-react';
import { waHref } from '../../../Components/WhatsAppButton/WhatsAppButton';
import './Header.css';

const NAV_LINKS = [
  { to: '/', label: 'Ana Səhifə' },
  { to: '/products', label: 'Məhsullar' },
  { to: '/services', label: 'Xidmətlər' },
  { to: '/tikinti-materiallari', label: 'Materiallar' },
  { to: '/calculator', label: 'Kalkulyator' },
  { to: '/gallery', label: 'Qalereya' },
  { to: '/about', label: 'Haqqımızda' },
  { to: '/contact', label: 'Əlaqə' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
      {/* Slim contact strip — instantly visible phone & WhatsApp at page top;
          collapses away on scroll to keep the header minimal. */}
      <div className="topbar" aria-hidden={isScrolled}>
        <div className="container topbar-inner">
          <a href="tel:+994506209584" className="topbar-item" tabIndex={isScrolled ? -1 : 0}>
            <Phone size={13} aria-hidden="true" />
            +994 50 620 95 84
          </a>
          <a
            href={waHref('Salam! Qiymət təklifi almaq istəyirəm.')}
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-item"
            tabIndex={isScrolled ? -1 : 0}
          >
            <MessageCircle size={13} aria-hidden="true" />
            WhatsApp
          </a>
        </div>
      </div>
      <nav className="navbar" aria-label="Əsas naviqasiya">
        <div className="navbar-container container">
          <Link to="/" className="logo" aria-label="Novxanı Beton ana səhifə">
            <img src="/NOVKHANI.svg" alt="Novxanı Beton" className="logo-svg" />
            <span className="logo-wordmark" aria-hidden="true">NOVXANI</span>
          </Link>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="nav-cta btn btn-accent">
              <Phone size={18} aria-hidden="true" />
              Qiymət Sorğusu
            </Link>
            <button
              className="menu-close-btn"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Menyunu bağla"
            >
              <X size={18} aria-hidden="true" />
              Menyunu bağla
            </button>
          </div>

          <button
            className="hamburger"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? 'Menyunu bağla' : 'Menyunu aç'}
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
