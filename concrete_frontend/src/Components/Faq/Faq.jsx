import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useT } from '../../i18n/i18n';
import './Faq.css';

/**
 * Reusable FAQ section — same accordion UI as the materials and
 * service-detail pages, plus FAQPage JSON-LD for rich results.
 * items: [{ q, a }] — q/a are strings or { az, en, ru } objects.
 */
// withLd=false lets a page render several grouped <Faq/> lists while
// emitting a single combined FAQPage JSON-LD itself (one per page).
const Faq = ({
  items,
  subtitle = { az: 'Suallarınız var?', en: 'Have questions?', ru: 'Есть вопросы?' },
  title = { az: 'Tez-tez verilən suallar', en: 'Frequently asked questions', ru: 'Часто задаваемые вопросы' },
  withLd = true,
}) => {
  const t = useT();
  if (!items || items.length === 0) return null;

  const faqLd = withLd && {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: t(f.q),
      acceptedAnswer: { '@type': 'Answer', text: t(f.a) },
    })),
  };

  return (
    <section className="faq-section reveal" aria-label={t(title)}>
      {faqLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>
      )}
      <div className="section-head">
        <span className="section-subtitle">{t(subtitle)}</span>
        <h2 className="faq-title">{t(title)}</h2>
      </div>
      <div className="faq-list">
        {items.map((f) => (
          <details className="faq-item" key={t(f.q)}>
            <summary>{t(f.q)}</summary>
            <p>{t(f.a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default Faq;
