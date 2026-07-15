import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import './ScrollTop.css';

/**
 * Floating "back to top" circle button.
 * Appears after the user scrolls down; smooth-scrolls to the top on tap.
 */
const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

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
      aria-label="Yuxarı qayıt"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
};

export default ScrollTop;
