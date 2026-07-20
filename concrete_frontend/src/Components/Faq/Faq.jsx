import React from 'react';
import { Helmet } from 'react-helmet-async';
import './Faq.css';

/**
 * Reusable FAQ section — same accordion UI as the materials and
 * service-detail pages, plus FAQPage JSON-LD for rich results.
 * items: [{ q, a }]
 */
// withLd=false lets a page render several grouped <Faq/> lists while
// emitting a single combined FAQPage JSON-LD itself (one per page).
const Faq = ({ items, subtitle = 'Suallarınız var?', title = 'Tez-tez verilən suallar', withLd = true }) => {
  if (!items || items.length === 0) return null;

  const faqLd = withLd && {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="faq-section reveal" aria-label={title}>
      {faqLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        </Helmet>
      )}
      <div className="section-head">
        <span className="section-subtitle">{subtitle}</span>
        <h2 className="faq-title">{title}</h2>
      </div>
      <div className="faq-list">
        {items.map((f) => (
          <details className="faq-item" key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default Faq;
