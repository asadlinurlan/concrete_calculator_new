import React from 'react';
import { MessageCircle } from 'lucide-react';
import { waHref } from '../WhatsAppButton/WhatsAppButton';
import './WhatsAppFab.css';

/**
 * Site-wide floating WhatsApp button — bottom-left squircle in the
 * graphite→amber brand gradient. Desktop/tablet only: on phones the
 * sticky contact bar already provides WhatsApp, so the FAB hides.
 */
const WhatsAppFab = () => (
  <a
    href={waHref('Salam! Qiymət təklifi almaq istəyirəm.')}
    target="_blank"
    rel="noopener noreferrer"
    className="wa-fab"
    aria-label="WhatsApp ilə yazın"
    title="WhatsApp ilə yazın"
  >
    <MessageCircle size={24} aria-hidden="true" />
  </a>
);

export default WhatsAppFab;
