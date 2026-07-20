import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import { waHref } from '../WhatsAppButton/WhatsAppButton';
import './StickyContactBar.css';

const WA_TEXT = 'Salam! Qiymət təklifi almaq istəyirəm.';

/**
 * Site-wide mobile sticky contact bar: call / WhatsApp / quote.
 * Shown on phones only (CSS). Sets body.has-sticky-cta so the footer
 * and the scroll-top button keep clear of it (rules live in
 * Footer.css / ScrollTop.css). On the materials page the quote button
 * targets the on-page form instead of /contact.
 */
const StickyContactBar = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.classList.add('has-sticky-cta');
    return () => document.body.classList.remove('has-sticky-cta');
  }, []);

  const quoteOnPage = pathname === '/tikinti-materiallari';

  return (
    <div className="scb" role="navigation" aria-label="Sürətli əlaqə">
      <a href="tel:+994506209584" className="scb-btn">
        <Phone size={17} aria-hidden="true" />
        Zəng et
      </a>
      <a href={waHref(WA_TEXT)} target="_blank" rel="noopener noreferrer" className="scb-btn scb-wa">
        <MessageCircle size={17} aria-hidden="true" />
        WhatsApp
      </a>
      {quoteOnPage ? (
        <a href="#teklif" className="scb-btn scb-quote">Qiymət al</a>
      ) : (
        <Link to="/contact" className="scb-btn scb-quote">Qiymət al</Link>
      )}
    </div>
  );
};

export default StickyContactBar;
