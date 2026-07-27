import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useT } from '../../i18n/i18n';

export const WA_NUMBER = '994503260343';
export const waHref = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const DEFAULT_LABEL = {
  az: 'WhatsApp ilə qiymət al',
  en: 'Get a quote on WhatsApp',
  ru: 'Узнать цену в WhatsApp',
};

/**
 * The ONE WhatsApp button used site-wide: transparent ("ghost") style
 * with the MessageCircle icon — same background, icon and behaviour
 * everywhere. Styles live in App.css (.btn-wa / .btn-wa--light).
 *
 * Props:
 *  - text:    prefilled WhatsApp message (string or {az,en,ru})
 *  - label:   button caption (string or {az,en,ru}; default "WhatsApp ilə qiymət al")
 *  - onLight: variant for white/light surfaces (dark border & text)
 *  - block:   full-width
 */
const WhatsAppButton = ({ text, label = DEFAULT_LABEL, onLight = false, block = false, className = '' }) => {
  const t = useT();
  return (
    <a
      href={waHref(t(text))}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-wa ${onLight ? 'btn-wa--light' : ''} ${block ? 'btn-wa--block' : ''} ${className}`.trim()}
    >
      <MessageCircle size={18} aria-hidden="true" />
      {t(label)}
    </a>
  );
};

export default WhatsAppButton;
