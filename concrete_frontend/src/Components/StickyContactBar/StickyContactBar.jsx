import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import { waHref } from '../WhatsAppButton/WhatsAppButton';
import { LocaleLink, splitPath, useT } from '../../i18n/i18n';
import './StickyContactBar.css';

const WA_TEXT = {
  az: 'Salam! Qiymət təklifi almaq istəyirəm.',
  en: 'Hello! I would like to request a quote.',
  ru: 'Здравствуйте! Хочу получить предложение.',
};

const CALL_LABEL = { az: 'Zəng et', en: 'Call', ru: 'Позвонить' };
const QUOTE_LABEL = { az: 'Qiymət al', en: 'Get a quote', ru: 'Заявка' };
const NAV_LABEL = { az: 'Sürətli əlaqə', en: 'Quick contact', ru: 'Быстрая связь' };

/**
 * Site-wide mobile sticky contact bar: call / WhatsApp / quote.
 * Shown on phones only (CSS). Sets body.has-sticky-cta so the footer
 * and the scroll-top button keep clear of it (rules live in
 * Footer.css / ScrollTop.css). On the materials page the quote button
 * targets the on-page form instead of /contact.
 */
const StickyContactBar = () => {
  const { pathname } = useLocation();
  const t = useT();

  useEffect(() => {
    document.body.classList.add('has-sticky-cta');
    return () => document.body.classList.remove('has-sticky-cta');
  }, []);

  const quoteOnPage = splitPath(pathname).base === '/tikinti-materiallari';

  return (
    <div className="scb" role="navigation" aria-label={t(NAV_LABEL)}>
      <a href="tel:+994506209584" className="scb-btn">
        <Phone size={17} aria-hidden="true" />
        {t(CALL_LABEL)}
      </a>
      <a href={waHref(t(WA_TEXT))} target="_blank" rel="noopener noreferrer" className="scb-btn scb-wa">
        <MessageCircle size={17} aria-hidden="true" />
        WhatsApp
      </a>
      {quoteOnPage ? (
        <a href="#teklif" className="scb-btn scb-quote">{t(QUOTE_LABEL)}</a>
      ) : (
        <LocaleLink to="/contact" className="scb-btn scb-quote">{t(QUOTE_LABEL)}</LocaleLink>
      )}
    </div>
  );
};

export default StickyContactBar;
