import React from 'react';
import { MessageCircle } from 'lucide-react';
import { waHref } from '../WhatsAppButton/WhatsAppButton';
import { useT } from '../../i18n/i18n';
import './WhatsAppFab.css';

const WA_TEXT = {
  az: 'Salam! Qiymət təklifi almaq istəyirəm.',
  en: 'Hello! I would like to request a quote.',
  ru: 'Здравствуйте! Хочу получить предложение.',
};

const WA_LABEL = {
  az: 'WhatsApp ilə yazın',
  en: 'Message us on WhatsApp',
  ru: 'Напишите нам в WhatsApp',
};

/**
 * Site-wide floating WhatsApp button — bottom-left squircle in the
 * graphite→amber brand gradient. Desktop/tablet only: on phones the
 * sticky contact bar already provides WhatsApp, so the FAB hides.
 */
const WhatsAppFab = () => {
  const t = useT();
  return (
    <a
      href={waHref(t(WA_TEXT))}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-fab"
      aria-label={t(WA_LABEL)}
      title={t(WA_LABEL)}
    >
      <MessageCircle size={24} aria-hidden="true" />
    </a>
  );
};

export default WhatsAppFab;
