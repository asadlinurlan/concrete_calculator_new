import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import './Header.css';

const NAV_LINKS = [
  { to: '/', label: 'Ana Səhifə' },
  { to: '/products', label: 'Məhsullar' },
  { to: '/services', label: 'Xidmətlər' },
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
            <Link to="/contact" className="nav-cta btn btn-accent">
              <Phone size={18} aria-hidden="true" />
              Qiymət Sorğusu
            </Link>
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
