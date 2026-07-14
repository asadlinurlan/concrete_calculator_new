import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import aboutImage from '../img/workers-construction-site.jpg';

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
            <h1 className="page-title-center">Haqqımızda</h1>
          </div>
        </div>
      )}
      <div className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-container reveal">
              <div
                className="about-image main-image"
                style={{ backgroundImage: `url(${aboutImage})` }}
              ></div>
              <div className="experience-badge">
                <span className="badge-number">8+</span>
                <span className="badge-text">İllik Təcrübə</span>
              </div>
            </div>
            <div className="about-text reveal">
              <span className="section-subtitle">Haqqımızda</span>
              <h2 className="section-title about-title">Hər Layihə üçün Premium Beton Həlləri</h2>
              <p className="about-description">
                Novxani Beton olaraq 8 ildən çox təcrübəmizlə yüksək keyfiyyətli beton 
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