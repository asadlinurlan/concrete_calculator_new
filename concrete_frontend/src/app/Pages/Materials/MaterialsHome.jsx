import React from 'react';
import { ArrowRight, Truck, Factory } from 'lucide-react';
import { MATERIALS } from '../../../data/materials';
import { useT, LocaleLink } from '../../../i18n/i18n';
import './MaterialsHome.css';

// Per-material sale-button captions (az is derived from the material name
// so it stays byte-identical with the data file).
const SALE_BTN = {
  qum: { en: 'Sand sales', ru: 'Продажа песка' },
  atsep: { en: 'Gravel mix sales', ru: 'Продажа ПГС' },
  seben: { en: 'Crushed stone sales', ru: 'Продажа щебня' },
};

/**
 * Home-page "Tikinti materialları" section: three sales-focused product
 * cards (qum / atsep / şeben) + a B2B supply strip for concrete plants.
 * Links into the full /tikinti-materiallari landing page.
 */
const MaterialsHome = () => {
  const t = useT();
  return (
    <section className="mh-section" aria-label={t({ az: 'Tikinti materialları', en: 'Building materials', ru: 'Строительные материалы' })}>
      <div className="container">
        <div className="section-head reveal">
          <span className="section-subtitle">{t({ az: 'Tikinti materialları', en: 'Building materials', ru: 'Строительные материалы' })}</span>
          <h2 className="section-title">{t({
            az: 'Qum, Atsep və Şeben Satışı',
            en: 'Sand, Gravel Mix and Crushed Stone',
            ru: 'Продажа песка, ПГС и щебня',
          })}</h2>
        </div>

        <div className="mh-grid">
          {MATERIALS.map((m, index) => (
            <article
              className="mh-card reveal"
              key={m.id}
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <div className="mh-card-media">
                <img src={m.image} alt={t(m.alt)} width="900" height="600" loading="lazy" />
              </div>
              <div className="mh-card-body">
                <h3>{t(m.name)}</h3>
                <p>{t(m.short)}</p>
                <div className="mh-card-tags">
                  <span>{t({ az: 'Topdan', en: 'Wholesale', ru: 'Опт' })}</span>
                  <span>{t({ az: 'Pərakəndə', en: 'Retail', ru: 'Розница' })}</span>
                  <span><Truck size={13} aria-hidden="true" /> {t({ az: 'Çatdırılma', en: 'Delivery', ru: 'Доставка' })}</span>
                </div>
                <LocaleLink to={`/${m.id}-satisi`} className="btn btn-primary mh-card-btn">
                  {t({
                    az: `${typeof m.name === 'object' ? m.name.az : m.name} satışı`,
                    ...SALE_BTN[m.id],
                  })}
                  <ArrowRight size={16} aria-hidden="true" />
                </LocaleLink>
              </div>
            </article>
          ))}
        </div>

        <div className="mh-b2b reveal">
          <div className="mh-b2b-text">
            <span className="mh-b2b-icon" aria-hidden="true"><Factory size={22} /></span>
            <div>
              <h3>{t({
                az: 'Beton zavodları və tikinti şirkətləri üçün',
                en: 'For concrete plants and construction companies',
                ru: 'Для бетонных заводов и строительных компаний',
              })}</h3>
              <p>{t({
                az: 'Davamlı, böyük həcmli material təchizatı və həcmə uyğun fərdi qiymət təklifi.',
                en: 'Continuous, large-volume material supply with individual volume-based pricing.',
                ru: 'Стабильные крупнообъемные поставки материалов и индивидуальные цены в зависимости от объема.',
              })}</p>
            </div>
          </div>
          <LocaleLink to="/tikinti-materiallari#topdan-satis" className="btn btn-accent">
            {t({
              az: 'Topdan satış təklifi al',
              en: 'Get a wholesale offer',
              ru: 'Получить оптовое предложение',
            })}
            <ArrowRight size={16} aria-hidden="true" />
          </LocaleLink>
        </div>
      </div>
    </section>
  );
};

export default MaterialsHome;
