import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../../Components/Seo/Seo';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import CtaBand from '../../../Components/CtaBand/CtaBand';
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
      {fullPage && <Seo page="about" />}
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
          {fullPage && <Breadcrumbs current="Haqqımızda" />}
          <div className="about-grid">
            <div className="about-image-container reveal">
              <img
                className="about-image main-image"
                src={aboutImage}
                alt="Novxanı Beton işçisi tikinti sahəsində beton səthini hamarlayır"
                width="800"
                height="533"
                loading="lazy"
              />
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
              <Link to="/contact" className="btn-explore">Layihəniz üçün bizimlə əlaqə saxlayın</Link>
            </div>
          </div>
        </div>
      </div>

      {fullPage && (
        <CtaBand
          title="2018-ci ildən etibarlı tərəfdaşınız"
          text="Beton və tikinti materialları bir ünvandan — layihəniz üçün fərdi qiymət təklifi alın."
          whatsappText="Salam! Layihəm üçün qiymət təklifi almaq istəyirəm."
        />
      )}
    </section>
  );
};

export default About;