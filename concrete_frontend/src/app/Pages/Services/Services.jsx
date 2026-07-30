import React from 'react';
import { ArrowRight } from 'lucide-react';
import Seo from '../../../Components/Seo/Seo';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';
import { useT, LocaleLink } from '../../../i18n/i18n';
import './Services.css';
import service1 from '../img/service-1.png';
import service2 from '../img/service-2.webp';
import tereziHome from '../img/service-terezi-home.jpg';

const hazirBeton = {
  image: service1,
  alt: {
    az: 'Tikinti sahəsində hazır betonun tökülməsi — Novxanı Beton',
    en: 'Ready-mix concrete being poured at a construction site — Novxani Beton',
    ru: 'Заливка товарного бетона на строительной площадке — Novxani Beton',
  },
  title: {
    az: 'Hazır Beton',
    en: 'Ready-Mix Concrete',
    ru: 'Товарный бетон',
  },
  description: {
    az: 'Tikinti sahənizə vaxtında çatdırılan yüksək keyfiyyətli hazır beton.',
    en: 'High-quality ready-mix concrete delivered to your construction site on time.',
    ru: 'Высококачественный товарный бетон с доставкой на объект точно в срок.',
  },
  to: '/hazir-beton-satisi',
};
const betonNasoslama = {
  image: service2,
  alt: {
    az: 'Beton nasosu tikinti meydançasında beton vurur',
    en: 'A concrete pump placing concrete at a construction site',
    ru: 'Бетононасос подает бетон на строительной площадке',
  },
  title: {
    az: 'Beton Nasoslaması',
    en: 'Concrete Pumping',
    ru: 'Услуги бетононасоса',
  },
  description: {
    az: 'Çətin əlçatan ərazilər və hündürmərtəbəli binalar üçün peşəkar nasos xidmətləri.',
    en: 'Professional pumping services for hard-to-reach areas and high-rise buildings.',
    ru: 'Профессиональные услуги бетононасоса для труднодоступных участков и высотных зданий.',
  },
  to: '/beton-nasoslama',
};
const terezi = {
  alt: {
    az: 'Mikser avtomobil körpü tərəzisində çəkilir',
    en: 'A mixer truck being weighed on a truck weighbridge',
    ru: 'Автобетоносмеситель взвешивается на автомобильных весах',
  },
  title: {
    az: 'Tərəzi Xidməti',
    en: 'Weighbridge Service',
    ru: 'Автомобильные весы',
  },
  description: {
    az: 'Avtomobil körpü tərəzisi ilə yüklərin dəqiq və sürətli çəki ölçümü xidməti.',
    en: 'Fast and accurate weighing of loads on a truck weighbridge.',
    ru: 'Точное и быстрое взвешивание грузов на автомобильных весах.',
  },
  to: '/terezi-xidmeti',
};

const Services = ({ fullPage }) => {
  const t = useT();
  const tereziCard = { ...terezi, image: tereziHome };
  const services = [hazirBeton, betonNasoslama, tereziCard];

  return (
    <section className={`services-section ${fullPage ? 'full-page' : ''}`}>
      {fullPage && <Seo page="services" />}
      {fullPage && (
        <div className="page-hero-services">
          <div className="page-hero-overlay"></div>
          <div className="hero-content-center">
            <h1 className="page-title-center">{t({ az: 'Xidmətlər', en: 'Services', ru: 'Услуги' })}</h1>
          </div>
        </div>
      )}
      <div className="services-content">
        <div className="container">
          {fullPage && <Breadcrumbs current={t({ az: 'Xidmətlər', en: 'Services', ru: 'Услуги' })} />}
          <div className="section-head reveal">
            <span className="section-subtitle">{t({ az: 'Nə təklif edirik', en: 'What we offer', ru: 'Что мы предлагаем' })}</span>
            <h2 className="section-title">{t({
              az: 'Peşəkar Beton Xidmətləri',
              en: 'Professional Concrete Services',
              ru: 'Профессиональные бетонные услуги',
            })}</h2>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div
                key={service.title.az}
                className="service-card-img reveal"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="service-image">
                  <img src={service.image} alt={t(service.alt)} width="600" height="400" loading="lazy" />
                </div>
                <div className="service-info">
                  <h3>{t(service.title)}</h3>
                  <p>{t(service.description)}</p>
                  <LocaleLink
                    to={service.to}
                    className="service-link-arrow"
                    aria-label={`${t(service.title)} — ${t({ az: 'ətraflı', en: 'details', ru: 'подробнее' })}`}
                  >
                    <ArrowRight size={20} />
                  </LocaleLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Services;
