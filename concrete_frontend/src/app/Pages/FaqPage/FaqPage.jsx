import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight } from 'lucide-react';
import useScrollReveal from '../../../hooks/useScrollReveal';
import Seo from '../../../Components/Seo/Seo';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import Faq from '../../../Components/Faq/Faq';
import CtaBand from '../../../Components/CtaBand/CtaBand';
import { FAQ_GROUPS, ALL_FAQ_ITEMS } from '../../../data/faqPage';
import './FaqPage.css';

/**
 * Central FAQ page targeting question-form searches. Renders topic
 * groups with the shared <Faq/> accordion; emits ONE combined
 * FAQPage JSON-LD for all groups (individual groups have LD off).
 */
const FaqPage = () => {
  useScrollReveal();

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ALL_FAQ_ITEMS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="faqpage-section">
      <Seo
        custom={{
          path: '/faq',
          title: 'Tez-tez Verilən Suallar — Beton, Qiymət, Çatdırılma | NOVXANI BETON',
          description:
            'Beton haqqında ən çox verilən suallar: kub necə hesablanır, hansı marka lazımdır, beton neçə günə bərkiyir, atsep nədir? Sifariş, çatdırılma və keyfiyyət üzrə cavablar.',
          crumb: 'Suallar',
        }}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <div className="container faqpage-content">
        <Breadcrumbs current="Tez-tez verilən suallar" />

        <header className="section-head reveal">
          <span className="section-subtitle">Sual-cavab</span>
          <h1 className="section-title">Tez-tez Verilən Suallar</h1>
          <p className="faqpage-lead">
            Beton sifarişi, marka seçimi, hesablama, keyfiyyət və tikinti materialları üzrə ən çox
            soruşulan sualların cavabları. Sualınızın cavabını tapmadınızsa, bizə yazın — pulsuz
            məsləhət veririk.
          </p>
        </header>

        {FAQ_GROUPS.map((group) => (
          <Faq
            key={group.title}
            items={group.items}
            subtitle="Mövzu"
            title={group.title}
            withLd={false}
          />
        ))}

        <div className="faqpage-calc reveal">
          <Calculator size={26} aria-hidden="true" />
          <div>
            <h2>Həcmi özünüz hesablayın</h2>
            <p>Ölçüləri yazın — lazımi m³, material və mikser sayını dərhal görün.</p>
          </div>
          <Link to="/calculator" className="btn btn-primary">
            Beton kalkulyatoru
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <CtaBand
        title="Sualınız cavabsız qaldı?"
        text="Layihənizi yazın — mütəxəssislərimiz pulsuz məsləhət və fərdi qiymət təklifi versin."
        whatsappText="Salam! Beton sifarişi ilə bağlı sualım var."
      />
    </section>
  );
};

export default FaqPage;
