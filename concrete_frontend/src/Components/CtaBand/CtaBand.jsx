import React from 'react';
import { Phone } from 'lucide-react';
import './CtaBand.css';

const WA_NUMBER = '994503260343';

/**
 * Reusable bottom CTA band — same visual language as the CTA bands on
 * the materials and service-detail pages (dark gradient + amber CTA).
 * Drop at the end of any page to close it with a sales action.
 */
const CtaBand = ({
  title = 'Layihəniz üçün qiymət təklifi alın',
  text = 'Pulsuz və öhdəliksiz — həcmi və ünvanı yazın, qalanını biz edək.',
  whatsappText = 'Salam! Qiymət təklifi almaq istəyirəm.',
}) => {
  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(whatsappText)}`;
  return (
    <div className="cta-band">
      <div className="container cta-band-inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band-actions">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-accent">
            WhatsApp ilə qiymət al
          </a>
          <a href="tel:+994506209584" className="btn btn-ghost cta-band-ghost">
            <Phone size={18} aria-hidden="true" />
            Zəng et
          </a>
        </div>
      </div>
    </div>
  );
};

export default CtaBand;
