import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
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
            {/* Click-to-call: number on wide screens, icon-only on tighter
                desktops; hidden in the mobile menu (sticky bar covers it) */}
            <a href="tel:+994506209584" className="nav-phone" aria-label="Zəng et: +994 50 620 95 84">
              <Phone size={15} aria-hidden="true" />
              <span className="nav-phone-num">+994 50 620 95 84</span>
            </a>
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
