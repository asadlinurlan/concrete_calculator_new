import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gauge, Layers, ArrowRight, Calculator } from 'lucide-react';
import useScrollReveal from '../../../hooks/useScrollReveal';
import { CONCRETE_GRADES, materialsPerM3, ratioLabel } from '../../../data/concreteGrades';
import Seo from '../../../Components/Seo/Seo';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import Faq from '../../../Components/Faq/Faq';
import CtaBand from '../../../Components/CtaBand/CtaBand';
import './Products.css';

// "Nə tökürsünüz?" → tövsiyə olunan marka. Hər iş növü bir markaya bağlanır.
const USE_CASES = [
  { label: 'Hamarlama / altlıq', grade: 'M100' },
  { label: 'Səki / bordür', grade: 'M150' },
  { label: 'Döşəmə / ümumi tikinti', grade: 'M200' },
  { label: 'Zolaq təməl / divar', grade: 'M250' },
  { label: 'Monolit təməl / plitə / sütun', grade: 'M300' },
  { label: 'Çoxmərtəbəli karkas', grade: 'M350' },
  { label: 'Körpü / yüksək yük', grade: 'M400' },
  { label: 'Xüsusi konstruksiya', grade: 'M450' },
];

const PRODUCT_FAQS = [
  {
    q: 'M və B hərfləri nə deməkdir?',
    a: 'M — betonun möhkəmlik markasıdır (kqq/sm² ilə), B — möhkəmlik sinfidir (MPa ilə). Məsələn, M300 markası B22.5 sinfinə uyğundur və 22.5 MPa möhkəmlik göstəricisinə malikdir. Hər kartda hər iki göstərici qeyd olunub.',
  },
  {
    q: 'Layihəm üçün hansı markanı seçməliyəm?',
    a: 'Marka konstruksiyanın yükündən asılıdır: hamarlama və altlıq üçün M100–M150, döşəmə və ümumi işlər üçün M200, zolaq təməl və daşıyıcı divar üçün M250, monolit təməl, plitə və sütunlar üçün M300, çoxmərtəbəli karkas üçün M350 və yuxarı. Əmin deyilsinizsə, mütəxəssislərimiz pulsuz məsləhət verir.',
  },
  {
    q: 'Betonun keyfiyyətinə necə zəmanət verilir?',
    a: 'Bütün markalar GOST 26633 tələblərinə uyğun, laboratoriya nəzarəti altında istehsal olunur və 28 günlük möhkəmlik sınağından keçirilir.',
  },
  {
    q: 'Texniki məlumatdakı miqdarlar nə dərəcədə dəqiqdir?',
    a: 'Kartlardakı sement, qum, çınqıl və su miqdarları nominal qarışıq əsasında təxmini planlaşdırma dəyərləridir. Hər layihənin yekun qarışıq dizaynı laboratoriyada, layihə tələblərinə uyğun təyin olunur.',
  },
];

const Products = () => {
  useScrollReveal();
  // Exclusive accordion: at most one card's "Texniki məlumat" is open —
  // opening a grade closes the previously open one.
  const [openTech, setOpenTech] = useState(null);
  // "Nə tökürsünüz?" helper: highlighted/recommended grade card.
  const [recommended, setRecommended] = useState(null);

  const recommend = (grade) => {
    setRecommended(grade);
    // Scroll the recommended card into view (respect reduced motion).
    const el = document.getElementById(`grade-${grade}`);
    if (el) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    }
  };

  const recommendedGrade = CONCRETE_GRADES.find((g) => g.id === recommended);

  return (
    <section className="products-section">
      <Seo page="products" />
      <div className="page-hero-products">
        <div className="page-hero-overlay"></div>
        <div className="hero-content-center">
          <h1 className="page-title-center">Beton Markaları</h1>
          <p className="page-subtitle-center">Hər layihə üçün doğru möhkəmlik sinfi</p>
        </div>
      </div>

      <div className="products-content">
        <div className="container">
          <Breadcrumbs current="Beton Markaları" />
          <div className="section-head reveal">
            <span className="section-subtitle">Məhsul kataloqu</span>
            <h2 className="section-title">Standart Beton Markalarımız</h2>
            <p className="products-trust">
              M100–M450 markaları GOST 26633 tələblərinə uyğun istehsal olunur və
              28 günlük möhkəmlik sınağından keçirilir.
            </p>
          </div>

          {/* Use-case → grade helper for non-expert customers */}
          <div className="grade-helper reveal">
            <span className="grade-helper-q">Nə tökürsünüz?</span>
            <div className="grade-helper-chips" role="group" aria-label="İş növünə görə marka seçimi">
              {USE_CASES.map((u) => (
                <button
                  key={u.label}
                  type="button"
                  className={`grade-chip ${recommended === u.grade ? 'active' : ''}`}
                  onClick={() => recommend(u.grade)}
                >
                  {u.label}
                </button>
              ))}
            </div>
            {recommendedGrade && (
              <p className="grade-helper-result" role="status">
                Sizə uyğun marka: <strong>{recommendedGrade.id}</strong> ({recommendedGrade.bClass}) — {recommendedGrade.use}.{' '}
                <Link to={`/calculator?grade=${recommendedGrade.id}`}>Bu marka ilə hesabla →</Link>
              </p>
            )}
          </div>

          <div className="products-grid">
            {CONCRETE_GRADES.map((grade, index) => {
              const m = materialsPerM3(grade);
              return (
                <article
                  key={grade.id}
                  id={`grade-${grade.id}`}
                  className={`product-card reveal ${recommended === grade.id ? 'is-recommended' : ''}`}
                  style={{ transitionDelay: `${(index % 4) * 0.07}s` }}
                >
                  {recommended === grade.id && <span className="recommended-badge">Tövsiyə olunur</span>}
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

                  <details className="product-tech" open={openTech === grade.id}>
                    <summary
                      onClick={(e) => {
                        // Native <details> toggling is suppressed — React state is
                        // the single source of truth, so only one stays open.
                        e.preventDefault();
                        setOpenTech((cur) => (cur === grade.id ? null : grade.id));
                      }}
                    >
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

                  <Link to={`/calculator?grade=${grade.id}`} className="product-cta">
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

          <Faq items={PRODUCT_FAQS} subtitle="Marka seçimi" />
        </div>
      </div>

      <CtaBand
        title="Doğru markanı birlikdə seçək"
        text="Layihənizi yazın — marka seçimində pulsuz məsləhət və fərdi qiymət təklifi alın."
        whatsappText="Salam! Beton markası seçimi və qiymət təklifi üçün məlumat almaq istəyirəm."
      />
    </section>
  );
};

export default Products;
