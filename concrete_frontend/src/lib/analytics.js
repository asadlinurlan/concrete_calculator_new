/* ============================================================
   Analytics layer — Google Tag Manager (dataLayer) based.

   The GTM container itself is loaded by the env-gated snippet in
   public/index.html (REACT_APP_GTM_ID). This module only pushes
   semantic events to window.dataLayer, which GTM forwards to GA4 /
   Google Ads via tags configured in the GTM dashboard.

   Safe by design:
   - When REACT_APP_GTM_ID is missing, GTM never loads and these
     pushes simply sit in an unused array — a harmless no-op.
   - NO personally identifiable information (name, email, phone,
     message text) is ever sent. Only interaction type + context.
   ============================================================ */

/** Push a semantic event into GTM's dataLayer. */
export function trackEvent(event, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/** SPA page-view — fired on every client-side route change. */
export function trackPageView(path, title) {
  trackEvent('page_view', {
    page_path: path,
    page_title: title || (typeof document !== 'undefined' ? document.title : ''),
  });
}

/**
 * One delegated click listener covers every phone / WhatsApp / email /
 * directions link across the whole site — no per-component wiring, and it
 * keeps working for links added later. Records only the link type + page,
 * never PII. Attached once.
 */
export function attachAutoTracking() {
  if (typeof document === 'undefined' || window.__novxaniAutoTrack) return;
  window.__novxaniAutoTrack = true;

  document.addEventListener(
    'click',
    (e) => {
      const a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const page_path = window.location.pathname;

      if (href.startsWith('tel:')) {
        trackEvent('phone_click', { page_path, link_url: href });
      } else if (href.startsWith('mailto:')) {
        trackEvent('email_click', { page_path, link_url: href });
      } else if (/wa\.me|api\.whatsapp\.com|(?:^|\.)whatsapp\.com/i.test(href)) {
        // Drop the ?text= query so the (non-PII, but noisy) prefilled message
        // never reaches analytics.
        trackEvent('whatsapp_click', { page_path, link_url: href.split('?')[0] });
      } else if (/maps\.app\.goo\.gl|google\.[a-z.]+\/maps/i.test(href)) {
        trackEvent('directions_click', { page_path, link_url: href });
      }
    },
    true // capture phase — fire before the browser navigates away
  );
}
