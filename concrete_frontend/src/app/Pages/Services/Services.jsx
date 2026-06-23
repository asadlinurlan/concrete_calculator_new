import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Services.css';

const services = [
  {
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Hazır Beton',
    description: 'Tikinti sahənizə vaxtında çatdırılan yüksək keyfiyyətli hazır beton.',
  },
  {
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Beton Nasoslaması',
    description: 'Çətin əlçatan ərazilər və hündürmərtəbəli binalar üçün peşəkar nasos xidmətləri.',
  },
  {
    image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    title: 'Kommersiya Tikintisi',
    description: 'Kommersiya və sənaye binaları üçün geniş miqyaslı beton həlləri.',
  },
];

const Services = ({ fullPage }) => {
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
