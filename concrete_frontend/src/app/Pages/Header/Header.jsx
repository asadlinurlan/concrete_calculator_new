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
        <div className="navbar-container">
          <Link to="/" className="logo" aria-label="Novkhani Beton ana səhifə">
            <div className="logo-icon" aria-hidden="true">
              <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 5L45 15V35L25 45L5 35V15L25 5Z" stroke="var(--steel-500)" strokeWidth="2" fill="none" />
                <path d="M25 15L35 20V30L25 35L15 30V20L25 15Z" stroke="var(--amber-500)" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <span className="logo-text">NOVKHANI</span>
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
