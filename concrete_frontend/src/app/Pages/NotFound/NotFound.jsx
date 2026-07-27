import React from 'react';
import { Home, Calculator } from 'lucide-react';
import Seo from '../../../Components/Seo/Seo';
import { LocaleLink, useT } from '../../../i18n/i18n';
import './NotFound.css';

const NotFound = () => {
  const t = useT();
  return (
    <section className="notfound">
      <Seo page="notFound" />
      <div className="container notfound-inner">
        <span className="notfound-code">404</span>
        <h1 className="notfound-title">
          {t({ az: 'Səhifə tapılmadı', en: 'Page not found', ru: 'Страница не найдена' })}
        </h1>
        <p className="notfound-text">
          {t({
            az: 'Axtardığınız səhifə mövcud deyil və ya köçürülüb. Aşağıdakı keçidlərdən istifadə edin.',
            en: 'The page you are looking for does not exist or has been moved. Use the links below.',
            ru: 'Страница, которую вы ищете, не существует или была перемещена. Воспользуйтесь ссылками ниже.',
          })}
        </p>
        <div className="notfound-actions">
          <LocaleLink to="/" className="btn btn-accent">
            <Home size={18} aria-hidden="true" /> {t({ az: 'Ana səhifə', en: 'Home', ru: 'Главная' })}
          </LocaleLink>
          <LocaleLink to="/calculator" className="btn btn-ghost notfound-ghost">
            <Calculator size={18} aria-hidden="true" /> {t({ az: 'Kalkulyator', en: 'Calculator', ru: 'Калькулятор' })}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
