import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Phone,
  Menu,
  X,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Layers,
  Truck,
  Award,
  Factory,
  Gauge,
  Home,
  MapPin,
  Handshake,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { SITE_URL } from '../../../seo/seoConfig';
import { CONCRETE_GRADES } from '../../../data/concreteGrades';
import { waHref } from '../../../Components/WhatsAppButton/WhatsAppButton';
import { trackEvent } from '../../../lib/analytics';
import { LANDING_CONTENT } from './landingContent';
import heroImage from '../img/concrete.jpeg';
import deliveryImage from '../img/service-1.png';
import pumpingImage from '../img/service-2.webp';
import './LocalizedConcreteLanding.css';

// Web3Forms — same access key as the main contact form.
const WEB3FORMS_ACCESS_KEY = 'e1ffd016-dd39-419f-aa5c-382ee00c412d';

// Official contact split — call and WhatsApp are DIFFERENT numbers.
const CALL_TEL = 'tel:+994506209584';
const CALL_DISPLAY = '+994 50 620 95 84';
const WA_DISPLAY = '+994 50 326 03 43';
const MAPS_URL = 'https://maps.app.goo.gl/uKEuWDVuWqoAccEZA';

const BADGE_ICONS = { shield: ShieldCheck, layers: Layers, truck: Truck, award: Award };
const SERVICE_ICONS = { factory: Factory, truck: Truck, gauge: Gauge, home: Home, mappin: MapPin, handshake: Handshake };

const INITIAL_FORM = { fullName: '', phone: '', grade: '', volume: '', address: '', note: '' };

/**
 * Fully localized Google Ads landing page (locale = "en" | "ru").
 * Mirrors the original site's UI exactly — same header, hero, cards, form and
 * footer components/classes as the Azerbaijani homepage — with every visible
 * string coming from LANDING_CONTENT (single language per page).
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

  /* ---------- Quote form ---------- */
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [showRequired, setShowRequired] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [botField, setBotField] = useState(''); // honeypot — real users leave it empty
  const startedRef = useRef(false); // analytics: fire contact_form_start only once

  const setField = (e) => {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent('contact_form_start', { page_path: c.path, form_name: c.formName });
    }
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
    setShowRequired(false);
    if (status === 'sent' || status === 'error') setStatus('idle');
  };

  const validate = () => {
    const er = {};
    if (!form.fullName.trim()) er.fullName = c.quote.fieldErrors.fullName;
    if (!form.phone.trim()) {
      er.phone = c.quote.fieldErrors.phone;
    } else if (!/^[+()\d\s-]{9,20}$/.test(form.phone.trim())) {
      er.phone = c.quote.fieldErrors.phoneInvalid;
    }
    return er;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return; // guard against double submission
    if (botField) return; // spam bot filled the hidden field — silently drop
    const er = validate();
    if (Object.keys(er).length > 0) {
      setErrors(er);
      setShowRequired(true);
      const el = document.getElementById(`lcl-${Object.keys(er)[0]}`);
      if (el) el.focus();
      return;
    }
    setStatus('sending');
    try {
      // FormData (not JSON) → CORS "simple request", no preflight — same
      // officially supported Web3Forms method as the existing forms.
      const fd = new FormData();
      fd.append('access_key', WEB3FORMS_ACCESS_KEY);
      fd.append('subject', c.web3forms.subject);
      fd.append('from_name', c.web3forms.fromName);
      fd.append('form_name', c.formName);
      fd.append('Language', c.web3forms.language);
      fd.append('name', form.fullName);
      fd.append('phone', form.phone);
      fd.append('Concrete grade', form.grade || '—');
      fd.append('Required volume', form.volume ? `${form.volume} m³` : '—');
      fd.append('Delivery address', form.address || '—');
      fd.append('Additional information', form.note || '—');

      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setForm(INITIAL_FORM);
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
    { Icon: MapPin, title: c.footer.labels.address, value: c.footer.addressValue, href: MAPS_URL },
    { Icon: Phone, title: c.footer.labels.call, value: CALL_DISPLAY, href: CALL_TEL },
    { Icon: MessageCircle, title: c.footer.labels.whatsapp, value: WA_DISPLAY, href: waHref(c.whatsappText) },
    { Icon: Mail, title: c.footer.labels.email, value: 'info@novxanibeton.az', href: 'mailto:info@novxanibeton.az' },
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
              <img src="/NOVKHANI.svg" alt="NOVXANI BETON" className="logo-svg" />
              <span className="logo-wordmark" aria-hidden="true">NOVXANI</span>
            </Link>

            <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              {c.header.nav.map((n) => (
                <a key={n.href} href={n.href} className="nav-link" onClick={closeMenu}>
                  {n.label}
                </a>
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
        {/* ---------- Hero — same structure as the site hero ---------- */}
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
                {c.hero.h1Line1}<br />
                <span className="hero-accent">{c.hero.h1Accent}</span>
              </h1>
              <span className="hero-eyebrow reveal">{c.hero.eyebrow}</span>
              <p className="hero-desc reveal">{c.hero.text}</p>
              <div className="hero-actions reveal">
                <a href="#quote" className="btn btn-accent btn-lg">
                  {c.hero.ctaQuote}
                  <ArrowRight size={20} aria-hidden="true" />
                </a>
                <a href={CALL_TEL} className="btn btn-ghost btn-lg">
                  <Phone size={20} aria-hidden="true" />
                  {c.hero.ctaCall}
                </a>
                <a
                  href={waHref(c.whatsappText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-lg"
                  aria-label={c.whatsappAriaLabel}
                >
                  <MessageCircle size={20} aria-hidden="true" />
                  {c.hero.ctaWhatsApp}
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

        {/* ---------- Services — feature-card grid like the homepage ---------- */}
        <section id="services" className="features-section lcl-anchor">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-subtitle">{c.services.subtitle}</span>
              <h2 className="section-title">{c.services.title}</h2>
            </div>
            <div className="features-grid lcl-feat6">
              {c.services.items.map(({ icon, title, text }, index) => {
                const Icon = SERVICE_ICONS[icon];
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
                    <p className="feature-description">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------- Concrete grades ---------- */}
        <section id="grades" className="lcl-grades-section lcl-anchor">
          <div className="container">
            <div className="section-head reveal">
              <span className="section-subtitle">{c.grades.subtitle}</span>
              <h2 className="section-title">{c.grades.title}</h2>
              <p className="lcl-grades-lead">{c.grades.text}</p>
            </div>
            <ul className="lcl-grades reveal" aria-label={c.grades.listAriaLabel}>
              {CONCRETE_GRADES.map((g) => (
                <li className="lcl-grade" key={g.id}>
                  <strong>{g.id}</strong>
                  <span>{g.bClass} · {g.strength} {c.grades.unit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Delivery & pumping — image cards like the homepage ---------- */}
        <section className="services-section">
          <div className="container">
            <div className="services-grid lcl-duo">
              <div id="delivery" className="service-card-img reveal lcl-anchor">
                <div className="service-image">
                  <img src={deliveryImage} alt={c.delivery.imgAlt} width="600" height="400" loading="lazy" />
                </div>
                <div className="service-info">
                  <h2 className="lcl-service-h2">{c.delivery.title}</h2>
                  <p>{c.delivery.text}</p>
                  <a href="#quote" className="service-link-arrow" aria-label={c.delivery.linkAriaLabel}>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
              <div id="pumping" className="service-card-img reveal lcl-anchor" style={{ transitionDelay: '0.08s' }}>
                <div className="service-image">
                  <img src={pumpingImage} alt={c.pumping.imgAlt} width="600" height="400" loading="lazy" />
                </div>
                <div className="service-info">
                  <h2 className="lcl-service-h2">{c.pumping.title}</h2>
                  <p>{c.pumping.text}</p>
                  <a href="#quote" className="service-link-arrow" aria-label={c.pumping.linkAriaLabel}>
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Quote — same layout as the site contact block ---------- */}
        <section id="quote" className="contact-section lcl-anchor">
          <div className="contact-content">
            <div className="container">
              <div className="contact-grid">
                <div className="contact-info-side reveal">
                  <h2 className="contact-main-title">{c.quote.title}</h2>
                  <p className="contact-description">{c.quote.intro}</p>

                  <div className="contact-info-list">
                    {contactItems.map(({ Icon, title, value, href }) => (
                      <div className="contact-info-item" key={title}>
                        <div className="info-icon" aria-hidden="true"><Icon size={22} /></div>
                        <div className="info-content">
                          <h4>{title}</h4>
                          <p>
                            <a
                              href={href}
                              className="info-link"
                              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            >
                              {value}
                            </a>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="contact-map">
                    <iframe
                      title={c.quote.mapTitle}
                      src={`https://www.google.com/maps?q=40.4858529,49.8294278&z=16&hl=${c.quote.mapHl}&output=embed`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>

                <div className="contact-form-container reveal">
                  <div className="contact-form-head">
                    <h3>{c.quote.formTitle}</h3>
                    <p>{c.quote.formNote}</p>
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
                        <label htmlFor="lcl-fullName">{c.quote.labels.fullName} *</label>
                        <input
                          type="text"
                          id="lcl-fullName"
                          name="fullName"
                          autoComplete="name"
                          placeholder={c.quote.placeholders.fullName}
                          value={form.fullName}
                          onChange={setField}
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? 'lcl-fullName-err' : undefined}
                          required
                        />
                        {errors.fullName && (
                          <span className="form-err" id="lcl-fullName-err" role="alert">{errors.fullName}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="lcl-phone">{c.quote.labels.phone} *</label>
                        <input
                          type="tel"
                          id="lcl-phone"
                          name="phone"
                          autoComplete="tel"
                          placeholder={c.quote.placeholders.phone}
                          value={form.phone}
                          onChange={setField}
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? 'lcl-phone-err' : undefined}
                          required
                        />
                        {errors.phone && (
                          <span className="form-err" id="lcl-phone-err" role="alert">{errors.phone}</span>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="lcl-grade">{c.quote.labels.grade}</label>
                        <select id="lcl-grade" name="grade" value={form.grade} onChange={setField}>
                          <option value="">{c.quote.gradePlaceholder}</option>
                          {CONCRETE_GRADES.map((g) => (
                            <option key={g.id} value={g.id}>{g.id} ({g.bClass})</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="lcl-volume">{c.quote.labels.volume}</label>
                        <input
                          type="text"
                          id="lcl-volume"
                          name="volume"
                          inputMode="decimal"
                          placeholder={c.quote.placeholders.volume}
                          value={form.volume}
                          onChange={setField}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="lcl-address">{c.quote.labels.address}</label>
                      <input
                        type="text"
                        id="lcl-address"
                        name="address"
                        autoComplete="street-address"
                        placeholder={c.quote.placeholders.address}
                        value={form.address}
                        onChange={setField}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lcl-note">{c.quote.labels.note}</label>
                      <textarea
                        id="lcl-note"
                        name="note"
                        placeholder={c.quote.placeholders.note}
                        rows="4"
                        value={form.note}
                        onChange={setField}
                      ></textarea>
                    </div>
                    <button type="submit" className="btn-submit" disabled={status === 'sending'}>
                      {status === 'sending' ? c.quote.submitting : c.quote.submit}
                    </button>
                    {showRequired && (
                      <div className="form-error" role="alert">{c.quote.requiredFields}</div>
                    )}
                    {status === 'sent' && (
                      <div className="form-success" role="status">
                        <CheckCircle2 size={22} aria-hidden="true" />
                        <div className="form-success-body">
                          <strong>{c.quote.success}</strong>
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
                            <a href={CALL_TEL} className="fs-call">{c.hero.ctaCall}</a>
                          </div>
                        </div>
                      </div>
                    )}
                    {status === 'error' && (
                      <div className="form-error" role="alert">{c.quote.error}</div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- Footer — same look as the site footer, localized ---------- */}
      <footer id="contact" className="footer lcl-anchor">
        <div className="footer-main">
          <div className="container">
            <div className="footer-grid lcl-footer-grid">
              <div className="footer-about">
                <Link to={c.path} className="footer-logo" aria-label={c.header.logoAriaLabel}>
                  <img src="/NOVKHANI.svg" alt="NOVXANI BETON" className="footer-logo-svg" />
                </Link>
                <p className="footer-description">{c.footer.description}</p>
                <div className="footer-social">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div className="footer-links">
                <h3>{c.footer.quickTitle}</h3>
                <ul>
                  {c.header.nav.map((n) => (
                    <li key={n.href}><a href={n.href}>{n.label}</a></li>
                  ))}
                </ul>
              </div>
              <div className="footer-contact">
                <h3>{c.footer.contactTitle}</h3>
                <ul>
                  <li>
                    <span className="contact-icon"><Phone size={16} aria-hidden="true" /></span>
                    <a href={CALL_TEL} className="lcl-footer-link">{c.footer.labels.call}: {CALL_DISPLAY}</a>
                  </li>
                  <li>
                    <span className="contact-icon"><MessageCircle size={16} aria-hidden="true" /></span>
                    <a
                      href={waHref(c.whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lcl-footer-link"
                    >
                      {c.footer.labels.whatsapp}: {WA_DISPLAY}
                    </a>
                  </li>
                  <li>
                    <span className="contact-icon"><Mail size={16} aria-hidden="true" /></span>
                    <a href="mailto:info@novxanibeton.az" className="lcl-footer-link">
                      {c.footer.labels.email}: info@novxanibeton.az
                    </a>
                  </li>
                  <li>
                    <span className="contact-icon"><MapPin size={16} aria-hidden="true" /></span>
                    <span>{c.footer.labels.address}: {c.footer.addressValue}</span>
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
