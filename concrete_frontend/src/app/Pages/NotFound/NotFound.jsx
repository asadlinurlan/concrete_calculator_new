import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Calculator } from 'lucide-react';
import Seo from '../../../Components/Seo/Seo';
import './NotFound.css';

const NotFound = () => (
  <section className="notfound">
    <Seo page="notFound" />
    <div className="container notfound-inner">
      <span className="notfound-code">404</span>
      <h1 className="notfound-title">Səhifə tapılmadı</h1>
      <p className="notfound-text">
        Axtardığınız səhifə mövcud deyil və ya köçürülüb. Aşağıdakı keçidlərdən istifadə edin.
      </p>
      <div className="notfound-actions">
        <Link to="/" className="btn btn-accent">
          <Home size={18} aria-hidden="true" /> Ana səhifə
        </Link>
        <Link to="/calculator" className="btn btn-ghost notfound-ghost">
          <Calculator size={18} aria-hidden="true" /> Kalkulyator
        </Link>
      </div>
    </div>
  </section>
);

export default NotFound;
