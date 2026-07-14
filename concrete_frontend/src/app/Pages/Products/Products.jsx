import React from 'react';
import { Link } from 'react-router-dom';
import { Gauge, Layers, ArrowRight, Calculator } from 'lucide-react';
import useScrollReveal from '../../../hooks/useScrollReveal';
import { CONCRETE_GRADES, materialsPerM3, ratioLabel } from '../../../data/concreteGrades';
import './Products.css';

const Products = () => {
  useScrollReveal();

  return (
    <section className="products-section">
      <div className="page-hero-products">
        <div className="page-hero-overlay"></div>
        <div className="hero-content-center">
          <h1 className="page-title-center">Beton Markaları</h1>
          <p className="page-subtitle-center">Hər layihə üçün doğru möhkəmlik sinfi</p>
        </div>
      </div>

      <div className="products-content">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-subtitle">Məhsul kataloqu</span>
            <h2 className="section-title">Standart Beton Markalarımız</h2>
            <p className="products-trust">
              M100–M450 markaları GOST 26633 tələblərinə uyğun istehsal olunur və
              28 günlük möhkəmlik sınağından keçirilir.
            </p>
          </div>

          <div className="products-grid">
            {CONCRETE_GRADES.map((grade, index) => {
              const m = materialsPerM3(grade);
              return (
                <article
                  key={grade.id}
                  className="product-card reveal"
                  style={{ transitionDelay: `${(index % 4) * 0.07}s` }}
                >
                  <div className="product-card-head">
                    <div className="product-grade">
                      <span className="grade-id">{grade.id}</span>
                      <span className="grade-class">{grade.bClass}</span>
                    </div>
                    <div className="product-strength" title="Möhkəmlik">
                      <Gauge size={18} aria-hidden="true" />
                      {grade.strength} MPa
                    </div>
                  </div>

                  <h3 className="product-name">{grade.name}</h3>
                  <p className="product-use">{grade.use}</p>

                  <details className="product-tech">
                    <summary>
                      <Layers size={15} aria-hidden="true" />
                      Texniki məlumat
                    </summary>
                    <div className="product-tech-body">
                      <div className="product-mix">
                        <span className="mix-label">Qarışıq (S:Q:Ç)</span>
                        <span className="mix-value">{ratioLabel(grade)}</span>
                      </div>
                      <ul className="product-stats">
                        <li><span>Sement</span><strong>{Math.round(m.cementKg)} kq/m³</strong></li>
                        <li><span>Qum</span><strong>{m.sandVol.toFixed(2)} m³/m³</strong></li>
                        <li><span>Çınqıl</span><strong>{m.gravelVol.toFixed(2)} m³/m³</strong></li>
                        <li><span>Su</span><strong>{Math.round(m.waterL)} L/m³</strong></li>
                      </ul>
                      <p className="tech-disclaimer">
                        Nominal qarışıq əsasında təxmini planlaşdırma dəyərləri.
                        Yekun qarışıq dizaynı layihəyə uyğun laboratoriyada təyin olunur.
                      </p>
                    </div>
                  </details>

                  <Link to="/calculator" className="product-cta">
                    <Calculator size={16} aria-hidden="true" />
                    Bu marka ilə hesabla
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>

          <p className="products-note">
            * "Texniki məlumat" bölməsindəki miqdarlar nominal qarışıq əsasında təxmini
            planlaşdırma dəyərləridir — hər layihənin yekun qarışıq dizaynı (mix design)
            laboratoriya nəzarəti ilə hazırlanır. Qiymət təklifi üçün bizimlə əlaqə saxlayın.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Products;
