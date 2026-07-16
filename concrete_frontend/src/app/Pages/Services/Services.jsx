import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../../../Components/Seo/Seo';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import './Services.css';
import service1 from '../img/service-1.png';
import service2 from '../img/service-2.webp';
import service3 from '../img/service-3.jpg';
import tereziHome from '../img/service-terezi-home.jpg';

const hazirBeton = {
  image: service1,
  alt: 'Tikinti sahəsində hazır betonun tökülməsi — Novxanı Beton',
  title: 'Hazır Beton',
  description: 'Tikinti sahənizə vaxtında çatdırılan yüksək keyfiyyətli hazır beton.',
  to: '/hazir-beton-satisi',
};
const betonNasoslama = {
  image: service2,
  alt: 'Beton nasosu tikinti meydançasında beton vurur',
  title: 'Beton Nasoslaması',
  description: 'Çətin əlçatan ərazilər və hündürmərtəbəli binalar üçün peşəkar nasos xidmətləri.',
  to: '/beton-nasoslama',
};
const kommersiya = {
  image: service3,
  alt: 'Çoxmərtəbəli kommersiya binasının tikintisi',
  title: 'Kommersiya Tikintisi',
  description: 'Kommersiya və sənaye binaları üçün geniş miqyaslı beton həlləri.',
  to: '/contact',
};
const terezi = {
  alt: 'Mikser avtomobil körpü tərəzisində çəkilir',
  title: 'Tərəzi Xidməti',
  description: 'Avtomobil körpü tərəzisi ilə yüklərin dəqiq və sürətli çəki ölçümü xidməti.',
  to: '/terezi-xidmeti',
};

const Services = ({ fullPage }) => {
  // Ana səhifə: 3 kart (Kommersiya əvəzinə Tərəzi).
  // /services səhifəsi: 4 kart (hamısı).
  const tereziCard = { ...terezi, image: tereziHome };
  const services = fullPage
    ? [hazirBeton, betonNasoslama, kommersiya, tereziCard]
    : [hazirBeton, betonNasoslama, tereziCard];

  return (
    <section className={`services-section ${fullPage ? 'full-page' : ''}`}>
      {fullPage && <Seo page="services" />}
      {fullPage && (
        <div className="page-hero-services">
          <div className="page-hero-overlay"></div>
          <div className="hero-content-center">
            <h1 className="page-title-center">Xidmətlər</h1>
          </div>
        </div>
      )}
      <div className="services-content">
        <div className="container">
          {fullPage && <Breadcrumbs current="Xidmətlər" />}
          <div className="section-head reveal">
            <span className="section-subtitle">Nə təklif edirik</span>
            <h2 className="section-title">Peşəkar Beton Xidmətləri</h2>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="service-card-img reveal"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="service-image">
                  <img src={service.image} alt={service.alt} width="600" height="400" loading="lazy" />
                </div>
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to={service.to} className="service-link-arrow" aria-label={`${service.title} — ətraflı`}>
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
