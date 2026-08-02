import React from 'react';
import { Calculator, ArrowRight, ShieldCheck, Truck, Award, Layers } from 'lucide-react';
import { useT, LocaleLink } from '../../../i18n/i18n';
import heroImage from '../img/concrete.jpeg';
import './HeroSection.css';

const HeroSection = () => {
  const t = useT();
  return (
    <section className="hero-section">
      {/* Real <img> (not CSS background): indexable by Google Images and
          prioritized as the LCP element for faster first paint. */}
      <img
        className="hero-bg-img"
        src={heroImage}
        alt={t({
          az: 'Bakıda tikinti sahəsində hazır betonun tökülməsi — Novxanı Beton',
          en: 'Ready-mix concrete being poured at a construction site in Baku — Novxani Beton',
          ru: 'Заливка товарного бетона на строительной площадке в Баку — Novxani Beton',
        })}
        width="1920"
        height="1280"
        fetchpriority="high"
      />
      <div className="hero-shade" aria-hidden="true"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="container">
          <h1 className="hero-title reveal">
            {t({
              az: 'Hazır Betonun',
              en: 'Your Trusted',
              ru: 'Надёжный поставщик',
            })}<br />
            <span className="hero-accent">{t({
              az: 'Etibarlı Ünvanı',
              en: 'Ready-Mix Supplier',
              ru: 'товарного бетона',
            })}</span>
          </h1>
          <span className="hero-eyebrow reveal">{t({
            az: '2018-ci ildən etibarlı tərəfdaş',
            en: 'Reliable partner since 2018',
            ru: 'Надежный партнер с 2018 года',
          })}</span>
          <p className="hero-desc reveal">
            {t({
              az: 'Keyfiyyətli hazır beton, qum, atsep və şeben satışı — fərdi və korporativ müştərilər üçün operativ çatdırılma və sərfəli təkliflər. Layihənizi peşəkar kalkulyatorumuzla dəqiq planlaşdırın.',
              en: 'Quality ready-mix concrete, sand, gravel mix and crushed stone — fast delivery and competitive offers for private and corporate customers. Plan your project precisely with our professional calculator.',
              ru: 'Качественный товарный бетон, песок, ПГС и щебень — оперативная доставка и выгодные предложения для частных и корпоративных клиентов. Точно спланируйте свой проект с помощью нашего профессионального калькулятора.',
            })}
          </p>
          <div className="hero-actions reveal">
            <LocaleLink to="/calculator" className="btn btn-accent btn-lg">
              <Calculator size={20} aria-hidden="true" />
              {t({
                az: 'Kalkulyatordan İstifadə Et',
                en: 'Use the Calculator',
                ru: 'Открыть калькулятор',
              })}
            </LocaleLink>
            <LocaleLink to="/tikinti-materiallari" className="btn btn-ghost btn-lg">
              {t({
                az: 'Qum, Atsep, Şeben Sifariş Et',
                en: 'Order Sand, Gravel Mix, Crushed Stone',
                ru: 'Заказать песок, ПГС, щебень',
              })}
              <ArrowRight size={20} aria-hidden="true" />
            </LocaleLink>
            <LocaleLink to="/contact" className="btn btn-ghost btn-lg">
              {t({
                az: 'Qiymət təklifi al',
                en: 'Request a Quote',
                ru: 'Получить предложение',
              })}
              <ArrowRight size={20} aria-hidden="true" />
            </LocaleLink>
          </div>

          <ul className="hero-badges reveal">
            <li><ShieldCheck size={20} aria-hidden="true" /> {t({
              az: 'Sertifikatlı keyfiyyət',
              en: 'Certified quality',
              ru: 'Сертифицированное качество',
            })}</li>
            <li><Layers size={20} aria-hidden="true" /> {t({
              az: 'Qum, atsep və şeben satışı',
              en: 'Sand, gravel mix and crushed stone',
              ru: 'Песок, ПГС и щебень',
            })}</li>
            <li><Truck size={20} aria-hidden="true" /> {t({
              az: 'Vaxtında çatdırılma',
              en: 'On-time delivery',
              ru: 'Доставка вовремя',
            })}</li>
            <li><Award size={20} aria-hidden="true" /> {t({
              az: '8+ il təcrübə',
              en: '8+ years of experience',
              ru: 'Более 8 лет опыта',
            })}</li>
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
