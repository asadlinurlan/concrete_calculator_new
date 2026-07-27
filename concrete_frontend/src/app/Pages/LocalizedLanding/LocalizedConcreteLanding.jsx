import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Phone,
  Menu,
  X,
  MessageCircle,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Truck,
  Award,
  Layers,
  BadgeCheck,
  BarChart3,
  Factory,
  MapPin,
  Mail,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { SITE_URL } from '../../../seo/seoConfig';
import { CONCRETE_GRADES } from '../../../data/concreteGrades';
import { waHref } from '../../../Components/WhatsAppButton/WhatsAppButton';
import { trackEvent } from '../../../lib/analytics';
import { LANDING_CONTENT } from './landingContent';
import heroImage from '../img/concrete.jpeg';
import aboutImage from '../img/workers-construction-site.jpg';
import serviceHazir from '../img/service-1.png';
import serviceNasos from '../img/service-2.webp';
import serviceTerezi from '../img/service-terezi-home.jpg';
import imgQum from '../img/material-qum.webp';
import imgAtsep from '../img/material-atsep.webp';
import imgSeben from '../img/material-seben.webp';
import './LocalizedConcreteLanding.css';

// Web3Forms — same access key as the main contact form.
const WEB3FORMS_ACCESS_KEY = 'e1ffd016-dd39-419f-aa5c-382ee00c412d';

// Official contact split — call and WhatsApp are DIFFERENT numbers.
const CALL_TEL = 'tel:+994506209584';
const CALL_DISPLAY = '+994 50 620 95 84';
const MAPS_URL = 'https://maps.app.goo.gl/uKEuWDVuWqoAccEZA';

const BADGE_ICONS = { shield: ShieldCheck, layers: Layers, truck: Truck, award: Award };
const FEATURE_ICONS = { layers: Layers, badge: BadgeCheck, chart: BarChart3, truck: Truck };
const SERVICE_IMAGES = { hazir: serviceHazir, nasos: serviceNasos, terezi: serviceTerezi };
const MATERIAL_IMAGES = { qum: imgQum, atsep: imgAtsep, seben: imgSeben };

const INITIAL_FORM = { fullName: '', phone: '', email: '', message: '' };

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// Footer inline SVG icons — copied from the site Footer for a 1:1 look.
const FOOTER_ICONS = {
  location: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
};

/**
 * Fully localized Google Ads landing page (locale = "en" | "ru").
 * An exact clone of the Azerbaijani homepage — same sections, layout,
 * icons and images — with every visible string translated 1:1 via
 * LANDING_CONTENT (single language per page).
 */
const LocalizedConcreteLanding = ({ locale }) => {
  const c = LANDING_CONTENT[locale] || LANDING_CONTENT.en;
  const url = SITE_URL + c.path;

  /* ---------- Header state (same behaviour as the site Header) ---------- */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock page scroll while the full-screen mobile menu is open
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isMenuOpen]);

  // The mobile sticky contact bar is rendered by this page (the global one is
  // Azerbaijani) — keep the footer/scroll-top clearance class in sync.
  useEffect(() => {
    document.body.classList.add('has-sticky-cta');
    return () => document.body.classList.remove('has-sticky-cta');
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  /* ---------- Contact form (same fields as the homepage form) ---------- */
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [botField, setBotField] = useState(''); // honeypot — real users leave it empty
  const startedRef = useRef(false); // analytics: fire contact_form_start only once

  const handleChange = (e) => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent('contact_form_start', { page_path: c.path, form_name: c.formName });
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
    if (status === 'sent' || status === 'error') setStatus('idle');
  };

  // Essential fields are required: name, phone, email and message
  const validate = () => {
    const er = {};
    if (!formData.fullName.trim()) er.fullName = c.contact.errors.fullName;
    if (!formData.phone.trim()) {
      er.phone = c.contact.errors.phone;
    } else if (!/^[+()\d\s-]{9,20}$/.test(formData.phone.trim())) {
      er.phone = c.contact.errors.phoneInvalid;
    }
    if (!formData.email.trim()) {
      er.email = c.contact.errors.email;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      er.email = c.contact.errors.emailInvalid;
    }
    if (!formData.message.trim()) er.message = c.contact.errors.message;
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return; // guard against double submission
    if (botField) return; // spam bot filled the hidden field — silently drop
    const er = validate();
    if (Object.keys(er).length > 0) {
      setErrors(er);
      const el = document.getElementById(`lcl-${Object.keys(er)[0]}`);
      if (el) el.focus();
      return;
    }
    setStatus('sending');
    try {
      // FormData (not JSON) → a CORS "simple request", so no preflight — this
      // is Web3Forms' officially supported method, same as the main form.
      const fd = new FormData();
      fd.append('access_key', WEB3FORMS_ACCESS_KEY);
      fd.append('subject', c.web3forms.subject);
      fd.append('from_name', c.web3forms.fromName);
      fd.append('form_name', c.formName);
      fd.append('Language', c.web3forms.language);
      fd.append('name', formData.fullName);
      fd.append('email', formData.email);
      fd.append('phone', formData.phone);
      fd.append('message', formData.message);

      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setFormData(INITIAL_FORM);
        trackEvent('contact_form_submit', { page_path: c.path, form_name: c.formName });
      } else {
        setStatus('error'); // keep entered data so the user can retry
        trackEvent('contact_form_error', { page_path: c.path, form_name: c.formName });
      }
    } catch {
      setStatus('error');
      trackEvent('contact_form_error', { page_path: c.path, form_name: c.formName });
    }
  };

  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'NOVXANI BETON',
    description: c.structuredData.description,
    url,
    telephone: '+994506209584',
    email: 'info@novxanibeton.az',
    image: `${SITE_URL}/og-image.jpg`,
    logo: `${SITE_URL}/branding/novxani-beton-logo-512.png`,
    foundingDate: '2018',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: c.structuredData.addressLocality,
      addressRegion: c.structuredData.addressRegion,
      addressCountry: 'AZ',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 40.4858529, longitude: 49.8294278 },
    areaServed: c.structuredData.areaServed,
  };

  const contactItems = [
    { Icon: MapPin, title: c.contact.infoAddress, value: c.contact.infoAddressValue, href: MAPS_URL },
    { Icon: Phone, title: c.contact.infoPhone, value: CALL_DISPLAY, href: CALL_TEL },
    { Icon: Mail, title: c.contact.infoEmail, value: 'info@novxanibeton.az', href: 'mailto:info@novxanibeton.az' },
    { Icon: Clock, title: c.contact.infoHours, value: c.contact.infoHoursValue },
  ];

  return (
    <div className="lcl">
      <Helmet prioritizeSeoTags>
        <html lang={c.locale} />
        <title>{c.seo.title}</title>
        <meta name="description" content={c.seo.description} />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en/concrete`} />
        <link rel="alternate" hrefLang="ru" href={`${SITE_URL}/ru/concrete`} />
        <link rel="alternate" hrefLang="az" href={`${SITE_URL}/hazir-beton-satisi`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/hazir-beton-satisi`} />
        <meta property="og:title" content={c.seo.ogTitle} />
        <meta property="og:description" content={c.seo.ogDescription} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={c.seo.ogTitle} />
        <meta name="twitter:description" content={c.seo.ogDescription} />
        <script type="application/ld+json">{JSON.stringify(localBusinessLd)}</script>
      </Helmet>

      {/* ---------- Header — identical to the site header, localized ---------- */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="navbar" aria-label={c.header.navAriaLabel}>
          <div className="navbar-container container">
            <Link to={c.path} className="logo" aria-label={c.header.logoAriaLabel}>
              <img src="/NOVKHANI.svg" alt="Novxani Beton" className="logo-svg" />
              <span className="logo-wordmark" aria-hidden="true">NOVXANI</span>
            </Link>

            <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              {c.header.nav.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link ${link.to === c.path ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              <div className="lcl-lang" role="group" aria-label={c.header.langSwitchAriaLabel}>
                <Link
                  to="/en/concrete"
                  className={`lcl-lang-link ${locale === 'en' ? 'active' : ''}`}
                  aria-current={locale === 'en' ? 'page' : undefined}
                >
                  EN
                </Link>
                <Link
                  to="/ru/concrete"
                  className={`lcl-lang-link ${locale === 'ru' ? 'active' : ''}`}
                  aria-current={locale === 'ru' ? 'page' : undefined}
                >
                  RU
                </Link>
              </div>
              <a href={CALL_TEL} className="nav-phone" aria-label={c.header.phoneAriaLabel}>
                <Phone size={15} aria-hidden="true" />
                <span className="nav-phone-num">{CALL_DISPLAY}</span>
              </a>
              <button className="menu-close-btn" onClick={closeMenu} aria-label={c.header.closeMenu}>
                <X size={18} aria-hidden="true" />
                {c.header.closeMenu}
              </button>
            </div>

            <button
              className="hamburger"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label={isMenuOpen ? c.header.closeMenu : c.header.openMenu}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* ---------- Hero — same structure as the homepage hero ---------- */}
        <section className="hero-section">
          <img
            className="hero-bg-img"
            src={heroImage}
            alt={c.hero.imgAlt}
            width="1920"
            height="1280"
            fetchpriority="high"
          />
          <div className="hero-shade" aria-hidden="true"></div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="container">
              <h1 className="hero-title reveal">
                {c.hero.titleLine1}<br />
                <span className="hero-accent">{c.hero.titleAccent}</span>
              </h1>
              <span className="hero-eyebrow reveal">{c.hero.eyebrow}</span>
              <p className="hero-desc reveal">{c.hero.desc}</p>
              <div className="hero-actions reveal">
                <Link to="/calculator" className="btn btn-accent btn-lg">
                  <Calculator size={20} aria-hidden="true" />
                  {c.hero.ctaCalc}
                </Link>
                <Link to="/tikinti-materiallari" className="btn btn-ghost btn-lg">
                  {c.hero.ctaMaterials}
                  <ArrowRight size={20} aria-hidden="true" />
                </Link>
                <a href="#contact" className="btn btn-ghost btn-lg">
                  {c.hero.ctaQuote}
                  <ArrowRight size={20} aria-hidden="true" />
                </a>
              </div>

              <ul className="hero-badges reveal">
                {c.hero.badges.map(({ icon, label }) => {
                  const Icon = BADGE_ICONS[icon];
                  return (
                    <li key={label}><Icon size={20} aria-hidden="true" /> {label}</li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="hero-wave" aria-hidden="true">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z" fill="var(--bg-base)" />
            </svg>
          </div>
        </section>

        {/* ---------- Features — same 4 cards as the homepage ---------- */}
        <section className="features-section">
          <div className="container">
            <div className="features-grid">
              {c.features.map(({ icon, title, description }, index) => {
                const Icon = FEATURE_ICONS[icon];
                return (
                  <div
                    key={title}
                    className="feature-card reveal"
                    style={{ transitionDelay: `${index * 0.08}s` }}
                  >
                    <div className="feature-icon" aria-hidden="true">
                      <Icon size={28} strokeWidth={1.75} />
                    </div>
                    <h3 className="feature-title">{title}</h3>
                    <p className="feature-description">{description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- About — same as the homepage about block ---------- */}
        <section id="about" className="about-section">
          <div className="about-content">
            <div className="container">
              <div className="about-grid">
                <div className="about-image-container reveal">
                  <img
                    className="about-image main-image"
                    src={aboutImage}
                    alt={c.about.imgAlt}
                    width="800"
                    height="533"
                    loading="lazy"
                  />
                  <div className="experience-badge">
                    <span className="badge-number">{c.about.badgeNumber}</span>
                    <span className="badge-text">{c.about.badgeText}</span>
                  </div>
                </div>
                <div className="about-text reveal">
                  <span className="section-subtitle">{c.about.subtitle}</span>
                  <h2 className="section-title about-title">{c.about.title}</h2>
                  <p className="about-description">{c.about.p1}</p>
                  <p className="about-description">{c.about.p2}</p>
                  <div className="about-features">
                    {c.about.checks.map((check) => (
                      <div className="about-feature" key={check}>
                        <span className="check"><CheckIcon /></span> {check}
                      </div>
                    ))}
                  </div>
                  <a href="#contact" className="btn-explore">{c.about.cta}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Services — same 3 image cards as the homepage ---------- */}
        <section id="services" className="services-section">
          <div className="services-content">
            <div className="container">
              <div className="section-head reveal">
                <span className="section-subtitle">{c.services.subtitle}</span>
                <h2 className="section-title">{c.services.title}</h2>
              </div>
              <div className="services-grid">
                {c.services.cards.map((service, index) => (
                  <div
                    key={service.title}
                    className="service-card-img reveal"
                    style={{ transitionDelay: `${index * 0.08}s` }}
                  >
                    <div className="service-image">
                      <img src={SERVICE_IMAGES[service.img]} alt={service.alt} width="600" height="400" loading="lazy" />
                    </div>
                    <div className="service-info">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <Link
                        to={service.to}
                        className="service-link-arrow"
                        aria-label={`${service.title} — ${c.services.detailSuffix}`}
                      >
                        <ArrowRight size={20} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Materials — same section as the homepage ---------- */}
        <section id="materials" className="mh-section" aria-label={c.materials.ariaLabel}>
          <div className="container">
            <div className="section-head reveal">
              <span className="section-subtitle">{c.materials.subtitle}</span>
              <h2 className="section-title">{c.materials.title}</h2>
              <p className="mh-lead">{c.materials.lead}</p>
            </div>

            <div className="mh-grid">
              {c.materials.cards.map((m, index) => (
                <article
                  className="mh-card reveal"
                  key={m.id}
                  style={{ transitionDelay: `${index * 0.08}s` }}
                >
                  <div className="mh-card-media">
                    <img src={MATERIAL_IMAGES[m.id]} alt={m.alt} width="900" height="600" loading="lazy" />
                  </div>
                  <div className="mh-card-body">
                    <h3>{m.name}</h3>
                    <p>{m.short}</p>
                    <div className="mh-card-tags">
                      <span>{c.materials.tagWholesale}</span>
                      <span>{c.materials.tagRetail}</span>
                      <span><Truck size={13} aria-hidden="true" /> {c.materials.tagDelivery}</span>
                    </div>
                    <Link to={`/${m.id}-satisi`} className="btn btn-primary mh-card-btn">
                      {m.btn}
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mh-b2b reveal">
              <div className="mh-b2b-text">
                <span className="mh-b2b-icon" aria-hidden="true"><Factory size={22} /></span>
                <div>
                  <h3>{c.materials.b2bTitle}</h3>
                  <p>{c.materials.b2bText}</p>
                </div>
              </div>
              <Link to="/tikinti-materiallari#topdan-satis" className="btn btn-accent">
                {c.materials.b2bBtn}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ---------- Contact — same as the homepage contact block ---------- */}
        <section id="contact" className="contact-section">
          <div className="contact-content">
            <div className="container">
              <div className="contact-grid">
                <div className="contact-info-side reveal">
                  <h2 className="contact-main-title">{c.contact.title}</h2>
                  <p className="contact-description">{c.contact.desc}</p>

                  <div className="contact-info-list">
                    {contactItems.map(({ Icon, title, value, href }) => (
                      <div className="contact-info-item" key={title}>
                        <div className="info-icon" aria-hidden="true"><Icon size={22} /></div>
                        <div className="info-content">
                          <h4>{title}</h4>
                          {href ? (
                            <p>
                              <a
                                href={href}
                                className="info-link"
                                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              >
                                {value}
                              </a>
                            </p>
                          ) : (
                            <p>{value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="contact-map">
                    <iframe
                      title={c.contact.mapTitle}
                      src={`https://www.google.com/maps?q=40.4858529,49.8294278&z=16&hl=${c.contact.mapHl}&output=embed`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>

                <div id="quote" className="contact-form-container reveal">
                  <div className="contact-form-head">
                    <h3>{c.contact.formTitle}</h3>
                    <p>{c.contact.formNote}</p>
                  </div>
                  <form onSubmit={handleSubmit} className="contact-form" noValidate>
                    {/* Honeypot: hidden from users, bots tend to fill it */}
                    <input
                      type="text"
                      name="botcheck"
                      className="sr-only"
                      tabIndex={-1}
                      autoComplete="off"
                      value={botField}
                      onChange={(e) => setBotField(e.target.value)}
                      aria-hidden="true"
                    />
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="lcl-fullName">{c.contact.labels.fullName} *</label>
                        <input
                          type="text"
                          id="lcl-fullName"
                          name="fullName"
                          autoComplete="name"
                          placeholder={c.contact.placeholders.fullName}
                          value={formData.fullName}
                          onChange={handleChange}
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? 'lcl-fullName-err' : undefined}
                          required
                        />
                        {errors.fullName && <span className="form-err" id="lcl-fullName-err" role="alert">{errors.fullName}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="lcl-phone">{c.contact.labels.phone} *</label>
                        <input
                          type="tel"
                          id="lcl-phone"
                          name="phone"
                          autoComplete="tel"
                          placeholder={c.contact.placeholders.phone}
                          value={formData.phone}
                          onChange={handleChange}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? 'lcl-phone-err' : undefined}
                          required
                        />
                        {errors.phone && <span className="form-err" id="lcl-phone-err" role="alert">{errors.phone}</span>}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="lcl-email">{c.contact.labels.email} *</label>
                      <input
                        type="email"
                        id="lcl-email"
                        name="email"
                        autoComplete="email"
                        placeholder={c.contact.placeholders.email}
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'lcl-email-err' : undefined}
                        required
                      />
                      {errors.email && <span className="form-err" id="lcl-email-err" role="alert">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lcl-message">{c.contact.labels.message} *</label>
                      <textarea
                        id="lcl-message"
                        name="message"
                        placeholder={c.contact.placeholders.message}
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'lcl-message-err' : undefined}
                        required
                      ></textarea>
                      {errors.message && <span className="form-err" id="lcl-message-err" role="alert">{errors.message}</span>}
                    </div>
                    <button type="submit" className="btn-submit" disabled={status === 'sending'}>
                      {status === 'sending' ? c.contact.sending : c.contact.submit}
                    </button>
                    {status === 'sent' && (
                      <div className="form-success" role="status">
                        <CheckCircle2 size={22} aria-hidden="true" />
                        <div className="form-success-body">
                          <strong>{c.contact.successTitle}</strong>
                          <span>{c.contact.successText}</span>
                          <div className="form-success-actions">
                            <a
                              href={waHref(c.whatsappText)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="fs-wa"
                            >
                              <MessageCircle size={15} aria-hidden="true" />
                              WhatsApp
                            </a>
                            <a href={CALL_TEL} className="fs-call">{c.contact.successCall}</a>
                          </div>
                        </div>
                      </div>
                    )}
                    {status === 'error' && (
                      <div className="form-error" role="alert">{c.contact.error}</div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer — same as the site footer, localized ---------- */}
      <footer className="footer">
        <div className="footer-main">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-about">
                <Link to={c.path} className="footer-logo">
                  <img src="/NOVKHANI.svg" alt="Novxani Beton" className="footer-logo-svg" />
                </Link>
                <p className="footer-description">{c.footer.about}</p>
                <div className="footer-social">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">{FOOTER_ICONS.facebook}</a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">{FOOTER_ICONS.instagram}</a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">{FOOTER_ICONS.linkedin}</a>
                </div>
              </div>
              <div className="footer-links">
                <h3>{c.footer.linksTitle}</h3>
                <ul>
                  {c.footer.links.map((link) => (
                    <li key={link.to + link.label}><Link to={link.to}>{link.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="footer-links">
                <h3>{c.footer.servicesTitle}</h3>
                <ul>
                  {c.footer.services.map((link) => (
                    <li key={link.to + link.label}><Link to={link.to}>{link.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="footer-links">
                <h3>{c.footer.gradesTitle}</h3>
                <ul>
                  {CONCRETE_GRADES.map((g) => (
                    <li key={g.id}>
                      <Link to={`/${g.id.toLowerCase()}-beton`}>{c.footer.gradeLabel(g.id)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-contact">
                <h3>{c.footer.contactTitle}</h3>
                <ul>
                  <li>
                    <span className="contact-icon">{FOOTER_ICONS.location}</span>
                    <span>{c.footer.addressValue}</span>
                  </li>
                  <li>
                    <span className="contact-icon">{FOOTER_ICONS.phone}</span>
                    <span>{CALL_DISPLAY}</span>
                  </li>
                  <li>
                    <span className="contact-icon">{FOOTER_ICONS.email}</span>
                    <span>info@novxanibeton.az</span>
                  </li>
                  <li>
                    <span className="contact-icon">{FOOTER_ICONS.clock}</span>
                    <span>{c.footer.hoursValue}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <p>{c.footer.copyright}</p>
          </div>
        </div>
      </footer>

      {/* ---------- Floating WhatsApp + mobile sticky bar (localized) ---------- */}
      <a
        href={waHref(c.whatsappText)}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-fab"
        aria-label={c.whatsappAriaLabel}
        title={c.whatsappAriaLabel}
      >
        <MessageCircle size={24} aria-hidden="true" />
      </a>
      <div className="scb" role="navigation" aria-label={c.sticky.ariaLabel}>
        <a href={CALL_TEL} className="scb-btn">
          <Phone size={17} aria-hidden="true" />
          {c.sticky.call}
        </a>
        <a href={waHref(c.whatsappText)} target="_blank" rel="noopener noreferrer" className="scb-btn scb-wa">
          <MessageCircle size={17} aria-hidden="true" />
          WhatsApp
        </a>
        <a href="#quote" className="scb-btn scb-quote">{c.sticky.quote}</a>
      </div>
    </div>
  );
};

export default LocalizedConcreteLanding;
