import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, ShieldCheck, Truck, Award } from 'lucide-react';
import heroImage from '../img/concrete.jpeg';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Real <img> (not CSS background): indexable by Google Images and
          prioritized as the LCP element for faster first paint. */}
      <img
        className="hero-bg-img"
        src={heroImage}
        alt="Bakıda tikinti sahəsində hazır betonun tökülməsi — Novxanı Beton"
        width="1920"
        height="1280"
        fetchpriority="high"
      />
      <div className="hero-shade" aria-hidden="true"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="container">
          <h1 className="hero-title reveal">
            Möhkəm Təməllər,<br />
            <span className="hero-accent">Premium Beton</span> Həlləri
          </h1>
          <span className="hero-eyebrow reveal">2018-ci ildən etibarlı tərəfdaş</span>
          <p className="hero-desc reveal">
            Novxanı Beton — Bakı və Abşeron üzrə yüksək keyfiyyətli hazır beton,
            nasoslama və laboratoriya xidmətləri. Layihənizi peşəkar kalkulyatorumuzla
            dəqiq planlaşdırın.
          </p>
          <div className="hero-actions reveal">
            <Link to="/calculator" className="btn btn-accent btn-lg">
              <Calculator size={20} aria-hidden="true" />
              Kalkulyatordan İstifadə Et
            </Link>
            <Link to="/contact" className="btn btn-ghost btn-lg">
              Qiymət Sorğusu
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </div>

          <ul className="hero-badges reveal">
            <li><ShieldCheck size={20} aria-hidden="true" /> Sertifikatlı keyfiyyət</li>
            <li><Truck size={20} aria-hidden="true" /> Vaxtında çatdırılma</li>
            <li><Award size={20} aria-hidden="true" /> 8+ il təcrübə</li>
          </ul>
        </div>
      </div>
      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z" fill="var(--bg-base)" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
