import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WA_NUMBER = '994503260343';
export const waHref = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

/**
 * The ONE WhatsApp button used site-wide: transparent ("ghost") style
 * with the MessageCircle icon — same background, icon and behaviour
 * everywhere. Styles live in App.css (.btn-wa / .btn-wa--light).
 *
 * Props:
 *  - text:    prefilled WhatsApp message
 *  - label:   button caption (default "WhatsApp ilə qiymət al")
 *  - onLight: variant for white/light surfaces (dark border & text)
 *  - block:   full-width
 */
const WhatsAppButton = ({ text, label = 'WhatsApp ilə qiymət al', onLight = false, block = false, className = '' }) => (
  <a
    href={waHref(text)}
    target="_blank"
    rel="noopener noreferrer"
    className={`btn btn-wa ${onLight ? 'btn-wa--light' : ''} ${block ? 'btn-wa--block' : ''} ${className}`.trim()}
  >
    <MessageCircle size={18} aria-hidden="true" />
    {label}
  </a>
);

export default WhatsAppButton;
