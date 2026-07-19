import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Factory } from 'lucide-react';
import { MATERIALS } from '../../../data/materials';
import './MaterialsHome.css';

/**
 * Home-page "Tikinti materialları" section: three sales-focused product
 * cards (qum / atsep / şeben) + a B2B supply strip for concrete plants.
 * Links into the full /tikinti-materiallari landing page.
 */
const MaterialsHome = () => {
  return (
    <section className="mh-section" aria-label="Tikinti materialları">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-subtitle">Tikinti materialları</span>
          <h2 className="section-title">Qum, Atsep və Şeben Satışı</h2>
          <p className="mh-lead">
            Artıq beton və tikinti materialları bir ünvandan: öz istehsalımızda istifadə etdiyimiz
            materialları topdan və pərakəndə qaydada, çatdırılma ilə təqdim edirik.
          </p>
        </div>

        <div className="mh-grid">
          {MATERIALS.map((m, index) => (
            <article
              className="mh-card reveal"
              key={m.id}
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <div className="mh-card-media">
                <img src={m.image} alt={m.alt} width="900" height="600" loading="lazy" />
              </div>
              <div className="mh-card-body">
                <h3>{m.name}</h3>
                <p>{m.short}</p>
                <div className="mh-card-tags">
                  <span>Topdan</span>
                  <span>Pərakəndə</span>
                  <span><Truck size={13} aria-hidden="true" /> Çatdırılma</span>
                </div>
                <Link to={`/tikinti-materiallari#${m.id}`} className="btn btn-primary mh-card-btn">
                  {m.cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mh-b2b reveal">
          <div className="mh-b2b-text">
            <span className="mh-b2b-icon" aria-hidden="true"><Factory size={22} /></span>
            <div>
              <h3>Beton zavodları və tikinti şirkətləri üçün</h3>
              <p>Davamlı, böyük həcmli material təchizatı və həcmə uyğun fərdi qiymət təklifi.</p>
            </div>
          </div>
          <Link to="/tikinti-materiallari#topdan-satis" className="btn btn-accent">
            Topdan satış təklifi al
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MaterialsHome;
