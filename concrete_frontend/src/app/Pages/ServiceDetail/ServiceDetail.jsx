import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, ArrowRight, CheckCircle2, MapPin, Mail, Clock, Calculator } from 'lucide-react';
import useScrollReveal from '../../../hooks/useScrollReveal';
import WhatsAppButton from '../../../Components/WhatsAppButton/WhatsAppButton';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import Seo from '../../../Components/Seo/Seo';
import { SITE_URL } from '../../../seo/seoConfig';
import { CONCRETE_GRADES } from '../../../data/concreteGrades';
import './ServiceDetail.css';

const WA_NUMBER = '994503260343';

/**
 * SEO landing page template for service pages (data-driven from
 * src/data/servicePages.js). Renders hero, intro, benefits, ordering
 * steps, FAQ (+FAQPage & Service JSON-LD), related links and CTAs.
 */
const ServiceDetail = ({ page }) => {
  useScrollReveal([page.slug]);

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(page.whatsappText)}`;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.crumb,
    description: page.seo.description,
    url: SITE_URL + page.slug,
    areaServed: ['Bakı', 'Abşeron', 'Novxanı'],
    provider: {
      '@type': 'LocalBusiness',
      name: 'Novxanı Beton',
      telephone: '+994506209584',
      url: SITE_URL + '/',
    },
  };

  return (
    <div className="sd-page">
      <Seo custom={{ path: page.slug, title: page.seo.title, description: page.seo.description, crumb: page.crumb, parentCrumb: page.parentCrumb }} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
      </Helmet>

      {/* Hero */}
      <div className="sd-hero">
        <img className="sd-hero-img" src={page.hero.image} alt={page.hero.alt} width="1600" height="900" fetchpriority="high" />
        <div className="sd-hero-shade" aria-hidden="true"></div>
        <div className="container sd-hero-content">
          <h1 className="sd-title">{page.h1}</h1>
          <p className="sd-tagline">{page.tagline}</p>
          <div className="sd-hero-actions">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
              Qiymət təklifi al
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="tel:+994506209584" className="btn btn-ghost sd-ghost">
              <Phone size={18} aria-hidden="true" />
              +994 50 620 95 84
            </a>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="sd-body">
        <div className="container">
          <Breadcrumbs current={page.crumb} parent={page.parentCrumb} />

          <div className="sd-grid">
            <main className="sd-main">
              {/* Intro */}
              <section className="sd-section reveal">
                {page.intro.map((p, i) => (
                  <p className="sd-text" key={i}>{p}</p>
                ))}
              </section>

              {/* Benefits */}
              <section className="sd-section reveal">
                <h2 className="sd-h2">{page.benefitsTitle}</h2>
                <div className="sd-benefits">
                  {page.benefits.map((b) => (
                    <div className="sd-benefit" key={b.title}>
                      <span className="sd-benefit-icon"><CheckCircle2 size={20} aria-hidden="true" /></span>
                      <div>
                        <h3>{b.title}</h3>
                        <p>{b.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Grade chips (only for pages that sell concrete directly) */}
              {page.showGrades && (
                <section className="sd-section reveal">
                  <h2 className="sd-h2">İstehsal etdiyimiz markalar</h2>
                  <div className="sd-grades">
                    {CONCRETE_GRADES.map((g) => (
                      <Link
                        to={`/${g.id.toLowerCase()}-beton`}
                        className={`sd-grade-chip ${page.currentGrade === g.id ? 'is-current' : ''}`}
                        key={g.id}
                        title={g.use}
                        aria-current={page.currentGrade === g.id ? 'page' : undefined}
                      >
                        <strong>{g.id}</strong>
                        <span>{g.name}</span>
                      </Link>
                    ))}
                  </div>
                  <p className="sd-grades-note">
                    Markalar GOST 26633 tələblərinə uyğun istehsal olunur.{' '}
                    <Link to="/products">Texniki detallara bax →</Link>
                  </p>
                </section>
              )}

              {/* Steps */}
              <section className="sd-section reveal">
                <h2 className="sd-h2">{page.stepsTitle}</h2>
                <ol className="sd-steps">
                  {page.steps.map((s, i) => (
                    <li className="sd-step" key={s.title}>
                      <span className="sd-step-num">{i + 1}</span>
                      <div>
                        <h3>{s.title}</h3>
                        <p>{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* FAQ */}
              <section className="sd-section reveal">
                <h2 className="sd-h2">Tez-tez verilən suallar</h2>
                <div className="sd-faq">
                  {page.faqs.map((f) => (
                    <details className="sd-faq-item" key={f.q}>
                      <summary>{f.q}</summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            </main>

            {/* Aside */}
            <aside className="sd-aside">
              <div className="sd-card sd-contact-card reveal">
                <h3>Sifariş və məsləhət</h3>
                <ul>
                  <li><Phone size={16} aria-hidden="true" /> <a href="tel:+994506209584">+994 50 620 95 84</a></li>
                  <li><Mail size={16} aria-hidden="true" /> <a href="mailto:info@novxanibeton.az">info@novxanibeton.az</a></li>
                  <li><MapPin size={16} aria-hidden="true" /> Novxanı, Bakı, Azərbaycan</li>
                  <li><Clock size={16} aria-hidden="true" /> 7/24 fəaliyyətdəyik</li>
                </ul>
                <WhatsAppButton text={page.whatsappText} label="WhatsApp ilə yaz" onLight block className="sd-wa-btn" />
              </div>

              <div className="sd-card reveal">
                <h3>Faydalı keçidlər</h3>
                <ul className="sd-links">
                  {page.related.map((r) => (
                    <li key={r.to + r.label}>
                      <Link to={r.to}>
                        <ArrowRight size={14} aria-hidden="true" />
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sd-card sd-calc-card reveal">
                <Calculator size={26} aria-hidden="true" />
                <h3>Nə qədər beton lazımdır?</h3>
                <p>Ölçüləri yazın — m³, material və mikser sayını dərhal görün.</p>
                <Link to="/calculator" className="btn btn-primary sd-calc-btn">
                  Beton kalkulyatoru
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Bottom CTA band */}
      <div className="sd-cta-band">
        <div className="container sd-cta-inner">
          <div>
            <h2>Layihəniz üçün qiymət təklifi alın</h2>
            <p>Pulsuz və öhdəliksiz — həcmi və ünvanı yazın, qalanını biz edək.</p>
          </div>
          <div className="sd-cta-actions">
            <WhatsAppButton text={page.whatsappText} />
            <a href="tel:+994506209584" className="btn btn-ghost sd-ghost">
              <Phone size={18} aria-hidden="true" />
              Zəng et
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
