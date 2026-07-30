import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, ArrowRight, CheckCircle2, MapPin, Mail, Clock, Calculator } from 'lucide-react';
import useScrollReveal from '../../../hooks/useScrollReveal';
import WhatsAppButton from '../../../Components/WhatsAppButton/WhatsAppButton';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import Seo from '../../../Components/Seo/Seo';
import { SITE_URL } from '../../../seo/seoConfig';
import { CONCRETE_GRADES } from '../../../data/concreteGrades';
import { LocaleLink, useT } from '../../../i18n/i18n';
import './ServiceDetail.css';

const WA_NUMBER = '994503260343';

/**
 * SEO landing page template for service pages (data-driven from
 * src/data/servicePages.js). Renders hero, intro, benefits and
 * FAQ (+FAQPage & Service JSON-LD).
 */
const ServiceDetail = ({ page }) => {
  useScrollReveal([page.slug]);
  const t = useT();

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t(page.whatsappText))}`;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map((f) => ({
      '@type': 'Question',
      name: t(f.q),
      acceptedAnswer: { '@type': 'Answer', text: t(f.a) },
    })),
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t(page.crumb),
    description: t(page.seo.description),
    url: SITE_URL + page.slug,
    areaServed: ['Bakı', 'Abşeron', 'Novxanı'],
    provider: {
      '@type': 'LocalBusiness',
      name: t({ az: 'Novxanı Beton', en: 'Novxani Beton', ru: 'Novxani Beton' }),
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
        <img className="sd-hero-img" src={page.hero.image} alt={t(page.hero.alt)} width="1600" height="900" fetchpriority="high" />
        <div className="sd-hero-shade" aria-hidden="true"></div>
        <div className="container sd-hero-content">
          <h1 className="sd-title">{t(page.h1)}</h1>
          <p className="sd-tagline">{t(page.tagline)}</p>
          <div className="sd-hero-actions">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
              {t({ az: 'Qiymət təklifi al', en: 'Get a quote', ru: 'Получить предложение' })}
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
                  <p className="sd-text" key={i}>{t(p)}</p>
                ))}
              </section>

              {/* Benefits (optional — some pages skip this section) */}
              {page.benefits && page.benefits.length > 0 && (
                <section className="sd-section reveal">
                  <h2 className="sd-h2">{t(page.benefitsTitle)}</h2>
                  <div className="sd-benefits">
                    {page.benefits.map((b) => (
                      <div className="sd-benefit" key={t(b.title)}>
                        <span className="sd-benefit-icon"><CheckCircle2 size={20} aria-hidden="true" /></span>
                        <div>
                          <h3>{t(b.title)}</h3>
                          <p>{t(b.text)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Grade chips (only for pages that sell concrete directly) */}
              {page.showGrades && (
                <section className="sd-section reveal">
                  <h2 className="sd-h2">{t({ az: 'İstehsal etdiyimiz markalar', en: 'Concrete grades we produce', ru: 'Марки, которые мы производим' })}</h2>
                  <div className="sd-grades">
                    {CONCRETE_GRADES.map((g) => (
                      <LocaleLink
                        to={`/${g.id.toLowerCase()}-beton`}
                        className={`sd-grade-chip ${page.currentGrade === g.id ? 'is-current' : ''}`}
                        key={g.id}
                        title={t(g.use)}
                        aria-current={page.currentGrade === g.id ? 'page' : undefined}
                      >
                        <strong>{g.id}</strong>
                        <span>{t(g.name)}</span>
                      </LocaleLink>
                    ))}
                  </div>
                  <p className="sd-grades-note">
                    {t({
                      az: 'Markalar GOST 26633 tələblərinə uyğun istehsal olunur.',
                      en: 'All grades are produced to GOST 26633 requirements.',
                      ru: 'Марки производятся в соответствии с требованиями ГОСТ 26633.',
                    })}{' '}
                    <LocaleLink to="/products">{t({ az: 'Texniki detallara bax →', en: 'See technical details →', ru: 'Смотреть технические детали →' })}</LocaleLink>
                  </p>
                </section>
              )}

              {/* FAQ */}
              <section className="sd-section reveal">
                <h2 className="sd-h2">{t({ az: 'Tez-tez verilən suallar', en: 'Frequently Asked Questions', ru: 'Часто задаваемые вопросы' })}</h2>
                <div className="sd-faq">
                  {page.faqs.map((f) => (
                    <details className="sd-faq-item" key={t(f.q)}>
                      <summary>{t(f.q)}</summary>
                      <p>{t(f.a)}</p>
                    </details>
                  ))}
                </div>
              </section>
            </main>

            {/* Aside */}
            <aside className="sd-aside">
              <div className="sd-card sd-contact-card reveal">
                <h3>{t({ az: 'Sifariş və məsləhət', en: 'Orders and advice', ru: 'Заказ и консультация' })}</h3>
                <ul>
                  <li><Phone size={16} aria-hidden="true" /> <a href="tel:+994506209584">+994 50 620 95 84</a></li>
                  <li><Mail size={16} aria-hidden="true" /> <a href="mailto:info@novxanibeton.az">info@novxanibeton.az</a></li>
                  <li><MapPin size={16} aria-hidden="true" /> {t({ az: 'Novxanı, Bakı, Azərbaycan', en: 'Novkhani, Baku, Azerbaijan', ru: 'Новханы, Баку, Азербайджан' })}</li>
                  <li><Clock size={16} aria-hidden="true" /> {t({ az: '7/24 fəaliyyətdəyik', en: 'Open 24/7', ru: 'Работаем 24/7' })}</li>
                </ul>
                <WhatsAppButton text={page.whatsappText} label={{ az: 'WhatsApp ilə yaz', en: 'Message on WhatsApp', ru: 'Написать в WhatsApp' }} onLight block className="sd-wa-btn" />
              </div>

              <div className="sd-card sd-calc-card reveal">
                <Calculator size={26} aria-hidden="true" />
                <h3>{t({ az: 'Nə qədər beton lazımdır?', en: 'How much concrete do you need?', ru: 'Сколько бетона вам нужно?' })}</h3>
                <p>{t({
                  az: 'Ölçüləri yazın — m³, material və mikser sayını dərhal görün.',
                  en: 'Enter the dimensions — instantly see the m³, materials and number of mixer trucks.',
                  ru: 'Введите размеры — сразу увидите м³, материалы и число миксеров.',
                })}</p>
                <LocaleLink to="/calculator" className="btn btn-primary sd-calc-btn">
                  {t({ az: 'Beton kalkulyatoru', en: 'Concrete calculator', ru: 'Калькулятор бетона' })}
                </LocaleLink>
              </div>
            </aside>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ServiceDetail;
