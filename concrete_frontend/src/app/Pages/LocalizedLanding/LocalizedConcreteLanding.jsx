import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Phone,
  MessageCircle,
  Factory,
  Truck,
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
import './LocalizedConcreteLanding.css';

// Web3Forms — same access key as the main contact form.
const WEB3FORMS_ACCESS_KEY = 'e1ffd016-dd39-419f-aa5c-382ee00c412d';

// Official contact split — call and WhatsApp are DIFFERENT numbers.
const CALL_TEL = 'tel:+994506209584';
const CALL_DISPLAY = '+994 50 620 95 84';
const WA_DISPLAY = '+994 50 326 03 43';

const ICONS = { factory: Factory, truck: Truck, gauge: Gauge, home: Home, mappin: MapPin, handshake: Handshake };

const INITIAL_FORM = { fullName: '', phone: '', grade: '', volume: '', address: '', note: '' };

/**
 * Fully localized Google Ads landing page (locale = "en" | "ru"), self-contained:
 * its own compact header/footer so no Azerbaijani chrome leaks in. All strings
 * come from LANDING_CONTENT — visible text must stay single-language per page.
 */
const LocalizedConcreteLanding = ({ locale }) => {
  const c = LANDING_CONTENT[locale] || LANDING_CONTENT.en;
  const url = SITE_URL + c.path;

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

      <header className="lcl-header">
        <div className="lcl-header-inner container">
          <Link to={c.path} className="lcl-logo" aria-label={c.header.logoAriaLabel}>
            <img src="/NOVKHANI.svg" alt="NOVXANI BETON" className="lcl-logo-img" />
            <span className="lcl-logo-word" aria-hidden="true">NOVXANI</span>
          </Link>
          <nav className="lcl-nav" aria-label={c.header.navAriaLabel}>
            {c.header.nav.map((n) => (
              <a key={n.href} className="lcl-nav-link" href={n.href}>{n.label}</a>
            ))}
          </nav>
          <div className="lcl-tools">
            <nav className="lcl-lang" aria-label={c.header.langSwitchAriaLabel}>
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
            </nav>
            <a href={CALL_TEL} className="lcl-header-phone" aria-label={c.header.phoneAriaLabel}>
              <Phone size={15} aria-hidden="true" />
              <span className="lcl-header-phone-num">{CALL_DISPLAY}</span>
            </a>
          </div>
        </div>
      </header>

      <main className="lcl-main">
        <section className="lcl-hero">
          <div className="lcl-hero-overlay" aria-hidden="true"></div>
          <div className="container lcl-hero-inner">
            <h1 className="lcl-h1">{c.hero.h1}</h1>
            <p className="lcl-hero-text">{c.hero.text}</p>
            <div className="lcl-hero-ctas">
              <a href="#quote" className="btn btn-accent btn-lg">{c.hero.ctaQuote}</a>
              <a href={CALL_TEL} className="btn lcl-btn-outline">
                <Phone size={18} aria-hidden="true" />
                {c.hero.ctaCall}
              </a>
              <a
                href={waHref(c.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn lcl-btn-outline"
                aria-label={c.whatsappAriaLabel}
              >
                <MessageCircle size={18} aria-hidden="true" />
                {c.hero.ctaWhatsApp}
              </a>
            </div>
          </div>
        </section>

        <section id="services" className="lcl-section">
          <div className="container">
            <h2 className="lcl-h2">{c.services.title}</h2>
            <div className="lcl-services-grid">
              {c.services.items.map(({ icon, title, text }) => {
                const Icon = ICONS[icon];
                return (
                  <div className="lcl-card" key={title}>
                    <div className="lcl-card-icon" aria-hidden="true"><Icon size={24} /></div>
                    <h3 className="lcl-h3">{title}</h3>
                    <p className="lcl-card-text">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="grades" className="lcl-section lcl-section-alt">
          <div className="container">
            <h2 className="lcl-h2">{c.grades.title}</h2>
            <p className="lcl-lead">{c.grades.text}</p>
            <ul className="lcl-grades" aria-label={c.grades.listAriaLabel}>
              {CONCRETE_GRADES.map((g) => (
                <li className="lcl-grade" key={g.id}>
                  <strong>{g.id}</strong>
                  <span>{g.bClass} · {g.strength} {c.grades.unit}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="lcl-section container lcl-duo">
          <section id="delivery" className="lcl-card lcl-duo-card">
            <div className="lcl-card-icon" aria-hidden="true"><Truck size={24} /></div>
            <h2 className="lcl-h2 lcl-h2-sm">{c.delivery.title}</h2>
            <p className="lcl-card-text">{c.delivery.text}</p>
          </section>
          <section id="pumping" className="lcl-card lcl-duo-card">
            <div className="lcl-card-icon" aria-hidden="true"><Gauge size={24} /></div>
            <h2 className="lcl-h2 lcl-h2-sm">{c.pumping.title}</h2>
            <p className="lcl-card-text">{c.pumping.text}</p>
          </section>
        </div>

        <section id="quote" className="lcl-section lcl-section-alt">
          <div className="container lcl-quote-inner">
            <h2 className="lcl-h2">{c.quote.title}</h2>
            <p className="lcl-lead">{c.quote.intro}</p>
            <form className="lcl-form" onSubmit={handleSubmit} noValidate>
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
              <div className="lcl-form-row">
                <div className="lcl-form-group">
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
                    <span className="lcl-err" id="lcl-fullName-err" role="alert">{errors.fullName}</span>
                  )}
                </div>
                <div className="lcl-form-group">
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
                    <span className="lcl-err" id="lcl-phone-err" role="alert">{errors.phone}</span>
                  )}
                </div>
              </div>
              <div className="lcl-form-row">
                <div className="lcl-form-group">
                  <label htmlFor="lcl-grade">{c.quote.labels.grade}</label>
                  <select id="lcl-grade" name="grade" value={form.grade} onChange={setField}>
                    <option value="">{c.quote.gradePlaceholder}</option>
                    {CONCRETE_GRADES.map((g) => (
                      <option key={g.id} value={g.id}>{g.id} ({g.bClass})</option>
                    ))}
                  </select>
                </div>
                <div className="lcl-form-group">
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
              <div className="lcl-form-group">
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
              <div className="lcl-form-group">
                <label htmlFor="lcl-note">{c.quote.labels.note}</label>
                <textarea
                  id="lcl-note"
                  name="note"
                  rows="4"
                  placeholder={c.quote.placeholders.note}
                  value={form.note}
                  onChange={setField}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-accent btn-lg lcl-submit" disabled={status === 'sending'}>
                {status === 'sending' ? c.quote.submitting : c.quote.submit}
              </button>
              {showRequired && (
                <div className="lcl-form-error" role="alert">{c.quote.requiredFields}</div>
              )}
              {status === 'sent' && (
                <div className="lcl-form-success" role="status">
                  <CheckCircle2 size={22} aria-hidden="true" />
                  <span>{c.quote.success}</span>
                </div>
              )}
              {status === 'error' && (
                <div className="lcl-form-error" role="alert">{c.quote.error}</div>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer id="contact" className="lcl-footer">
        <div className="container">
          <div className="lcl-footer-grid">
            <div className="lcl-footer-item">
              <span className="lcl-footer-label">{c.footer.labels.call}</span>
              <a href={CALL_TEL} className="lcl-footer-link">
                <Phone size={16} aria-hidden="true" />
                {CALL_DISPLAY}
              </a>
            </div>
            <div className="lcl-footer-item">
              <span className="lcl-footer-label">{c.footer.labels.whatsapp}</span>
              <a
                href={waHref(c.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="lcl-footer-link"
                aria-label={c.whatsappAriaLabel}
              >
                <MessageCircle size={16} aria-hidden="true" />
                {WA_DISPLAY}
              </a>
            </div>
            <div className="lcl-footer-item">
              <span className="lcl-footer-label">{c.footer.labels.email}</span>
              <a href="mailto:info@novxanibeton.az" className="lcl-footer-link">
                <Mail size={16} aria-hidden="true" />
                info@novxanibeton.az
              </a>
            </div>
            <div className="lcl-footer-item">
              <span className="lcl-footer-label">{c.footer.labels.address}</span>
              <span className="lcl-footer-value">
                <MapPin size={16} aria-hidden="true" />
                {c.footer.addressValue}
              </span>
            </div>
          </div>
          <p className="lcl-footer-copy">{c.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
};

export default LocalizedConcreteLanding;
