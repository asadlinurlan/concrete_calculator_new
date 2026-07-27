import React from 'react';
import { Phone } from 'lucide-react';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import { useT } from '../../i18n/i18n';
import './CtaBand.css';

const DEFAULT_TITLE = {
  az: 'Layihəniz üçün qiymət təklifi alın',
  en: 'Get a quote for your project',
  ru: 'Получите предложение для вашего проекта',
};

const DEFAULT_TEXT = {
  az: 'Pulsuz və öhdəliksiz — həcmi və ünvanı yazın, qalanını biz edək.',
  en: 'Free and non-binding — send the volume and address, we will do the rest.',
  ru: 'Бесплатно и без обязательств — напишите объём и адрес, остальное сделаем мы.',
};

const DEFAULT_WA_TEXT = {
  az: 'Salam! Qiymət təklifi almaq istəyirəm.',
  en: 'Hello! I would like to request a quote.',
  ru: 'Здравствуйте! Хочу получить предложение.',
};

const CALL_LABEL = { az: 'Zəng et', en: 'Call', ru: 'Позвонить' };

/**
 * Reusable bottom CTA band — same visual language as the CTA bands on
 * the materials and service-detail pages (dark gradient + unified
 * WhatsApp ghost button). Drop at the end of any page to close it
 * with a sales action.
 */
const CtaBand = ({
  title = DEFAULT_TITLE,
  text = DEFAULT_TEXT,
  whatsappText = DEFAULT_WA_TEXT,
}) => {
  const t = useT();
  return (
    <div className="cta-band">
      <div className="container cta-band-inner">
        <div>
          <h2>{t(title)}</h2>
          <p>{t(text)}</p>
        </div>
        <div className="cta-band-actions">
          <WhatsAppButton text={whatsappText} />
          <a href="tel:+994506209584" className="btn btn-ghost cta-band-ghost">
            <Phone size={18} aria-hidden="true" />
            {t(CALL_LABEL)}
          </a>
        </div>
      </div>
    </div>
  );
};

export default CtaBand;
