import React from 'react';
import Seo from '../../../Components/Seo/Seo';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import Gallery from '../Gallery/Gallery';
import { useT, LocaleLink } from '../../../i18n/i18n';
import './About.css';
import aboutImage from '../img/workers-construction-site.jpg';

const About = ({ fullPage }) => {
  const t = useT();
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
            <h1 className="page-title-center">{t({ az: 'Haqqımızda', en: 'About Us', ru: 'О нас' })}</h1>
          </div>
        </div>
      )}
      <div className="about-content">
        <div className="container">
          {fullPage && <Breadcrumbs current={t({ az: 'Haqqımızda', en: 'About Us', ru: 'О нас' })} />}
          <div className="about-grid">
            <div className="about-image-container reveal">
              <img
                className="about-image main-image"
                src={aboutImage}
                alt={t({
                  az: 'Novxanı Beton işçisi tikinti sahəsində beton səthini hamarlayır',
                  en: 'A Novxani Beton worker smoothing a concrete surface at a construction site',
                  ru: 'Работник Novxani Beton выравнивает бетонную поверхность на строительной площадке',
                })}
                width="800"
                height="533"
                loading="lazy"
              />
              <div className="experience-badge">
                <span className="badge-number">8+</span>
                <span className="badge-text">{t({ az: 'İllik Təcrübə', en: 'Years of Experience', ru: 'Лет опыта' })}</span>
              </div>
            </div>
            <div className="about-text reveal">
              <span className="section-subtitle">{t({ az: 'Haqqımızda', en: 'About Us', ru: 'О нас' })}</span>
              <h2 className="section-title about-title">{t({
                az: 'Hər Layihə üçün Premium Beton Həlləri',
                en: 'Premium Concrete Solutions for Every Project',
                ru: 'Премиальные бетонные решения для любого проекта',
              })}</h2>
              <p className="about-description">
                {t({
                  az: 'Novxani Beton olaraq 8 ildən çox təcrübəmizlə yüksək keyfiyyətli beton məhsulları və müstəsna müştəri xidməti göstərməklə tanınırıq.',
                  en: 'With more than 8 years of experience, Novxani Beton is known for high-quality concrete products and exceptional customer service.',
                  ru: 'Компания Novxani Beton с более чем 8-летним опытом известна высококачественной бетонной продукцией и безупречным сервисом для клиентов.',
                })}
              </p>
              <p className="about-description">
                {t({
                  az: 'Yaşayış binalarından kommersiya tikililərə qədər hər növ layihələr üçün hərtərəfli beton həlləri təqdim edirik.',
                  en: 'We provide comprehensive concrete solutions for every type of project, from residential buildings to commercial developments.',
                  ru: 'Мы предлагаем комплексные бетонные решения для любых проектов — от жилых зданий до коммерческих объектов.',
                })}
              </p>
              <div className="about-features">
                <div className="about-feature"><span className="check"><CheckIcon /></span> {t({ az: 'Premium Keyfiyyətli Materiallar', en: 'Premium Quality Materials', ru: 'Материалы премиального качества' })}</div>
                <div className="about-feature"><span className="check"><CheckIcon /></span> {t({ az: 'Vaxtında Çatdırılma', en: 'On-Time Delivery', ru: 'Доставка вовремя' })}</div>
                <div className="about-feature"><span className="check"><CheckIcon /></span> {t({ az: 'Ekspert Məsləhəti', en: 'Expert Advice', ru: 'Экспертная консультация' })}</div>
                <div className="about-feature"><span className="check"><CheckIcon /></span> {t({ az: 'Rəqabətqabiliyyətli Qiymətlər', en: 'Competitive Prices', ru: 'Конкурентные цены' })}</div>
              </div>
              <LocaleLink to="/contact" className="btn-explore">{t({
                az: 'Layihəniz üçün bizimlə əlaqə saxlayın',
                en: 'Contact us about your project',
                ru: 'Свяжитесь с нами по вашему проекту',
              })}</LocaleLink>
            </div>
          </div>
        </div>
      </div>

      {/* Combined page: the old /gallery content lives here now */}
      {fullPage && <Gallery />}
    </section>
  );
};

export default About;
