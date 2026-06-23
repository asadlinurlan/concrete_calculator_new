import { useEffect } from 'react';

/**
 * useScrollReveal
 * Adds `.is-visible` to every `.reveal` element when it scrolls into view.
 * Lightweight: a single shared IntersectionObserver, no re-renders.
 * Respects prefers-reduced-motion (handled in CSS).
 */
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
