import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = ({ fullPage }) => {
  const services = [
    { 
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      title: 'Hazır Beton', 
      description: 'Tikinti sahənizə vaxtında çatdırılan yüksək keyfiyyətli hazır beton.' 
    },
    { 
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      title: 'Beton Nasoslaması', 
      description: 'Çətin əlçatan ərazilər və hündürmərtəbəli binalar üçün peşəkar nasos xidmətləri.' 
    },
    { 
      image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      title: 'Kommersiya Tikintisi', 
      description: 'Kommersiya və sənaye binaları üçün geniş miqyaslı beton həlləri.' 
    },
  ];

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
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card-img">
                <div className="service-image" style={{backgroundImage: `url(${service.image})`}}></div>
                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to="/contact" className="service-link-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
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