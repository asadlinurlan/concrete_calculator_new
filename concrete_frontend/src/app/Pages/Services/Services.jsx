import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Services.css';
import service1 from '../img/service-1.png';
import service2 from '../img/service-2.webp';
import service3 from '../img/service-3.jpg';
import tereziHome from '../img/service-terezi-home.jpg';

const hazirBeton = {
  image: service1,
  title: 'Hazır Beton',
  description: 'Tikinti sahənizə vaxtında çatdırılan yüksək keyfiyyətli hazır beton.',
};
const betonNasoslama = {
  image: service2,
  title: 'Beton Nasoslaması',
  description: 'Çətin əlçatan ərazilər və hündürmərtəbəli binalar üçün peşəkar nasos xidmətləri.',
};
const kommersiya = {
  image: service3,
  title: 'Kommersiya Tikintisi',
  description: 'Kommersiya və sənaye binaları üçün geniş miqyaslı beton həlləri.',
};
const terezi = {
  title: 'Tərəzi Xidməti',
  description: 'Avtomobil körpü tərəzisi ilə yüklərin dəqiq və sürətli çəki ölçümü xidməti.',
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
                <div
                  className="service-image"
                  style={{ backgroundImage: `url(${service.image})` }}
                  role="img"
                  aria-label={service.title}
                ></div>
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to="/contact" className="service-link-arrow" aria-label={`${service.title} — ətraflı`}>
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
