import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useT } from '../../i18n/i18n';
import './ScrollTop.css';

const TOP_LABEL = {
  az: 'Yuxarı qayıt',
  en: 'Back to top',
  ru: 'Наверх',
};

/**
 * Floating "back to top" circle button.
 * Appears after the user scrolls down; smooth-scrolls to the top on tap.
 */
const ScrollTop = () => {
  const [visible, setVisible] = useState(false);
  const t = useT();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`scroll-top ${visible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t(TOP_LABEL)}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
};

export default ScrollTop;
