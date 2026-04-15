import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = ({ fullPage }) => {
  const CheckIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );

  return (
    <section className={`about-section ${fullPage ? 'full-page' : ''}`}>
      {fullPage && (
        <div className="page-hero-about">
          <div className="page-hero-overlay"></div>
          <div className="hero-content-center">
            <h1 className="page-title-center">About Us</h1>
          </div>
        </div>
      )}
      <div className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-container">
              <div className="about-image main-image"></div>
              <div className="experience-badge">
                <span className="badge-number">25+</span>
                <span className="badge-text">Years Experience</span>
              </div>
            </div>
            <div className="about-text">
              <span className="section-subtitle">ABOUT US</span>
              <h2 className="section-title about-title">Premier Concrete Solutions for Every Project</h2>
              <p className="about-description">
                Novkhani Beton olaraq 25 ildən çox təcrübəmizlə yüksək keyfiyyətli beton 
                məhsulları və müstəsna müştəri xidməti göstərməklə tanınırıq.
              </p>
              <p className="about-description">
                Yaşayış binalarından kommersiya tikililərə qədər hər növ layihələr üçün 
                hərtərəfli beton həlləri təqdim edirik.
              </p>
              <div className="about-features">
                <div className="about-feature"><span className="check"><CheckIcon /></span> Premium Keyfiyyətli Materiallar</div>
                <div className="about-feature"><span className="check"><CheckIcon /></span> Vaxtında Çatdırılma</div>
                <div className="about-feature"><span className="check"><CheckIcon /></span> Ekspert Məsləhəti</div>
                <div className="about-feature"><span className="check"><CheckIcon /></span> Rəqabətqabiliyyətli Qiymətlər</div>
              </div>
              <Link to="/contact" className="btn-explore">Daha Ətraflı</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;