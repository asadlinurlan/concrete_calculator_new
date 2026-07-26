/* Google Tag Manager bootstrap — served same-origin so the strict CSP in
   public/_headers needs no inline-script hash or 'unsafe-inline'.

   The container ID is NOT hardcoded here: index.html passes it via the
   data-gtm-id attribute, which Create React App fills from REACT_APP_GTM_ID
   at build time. When the variable is unset (or the %REACT_APP_GTM_ID%
   placeholder is left unreplaced in a dev build) this is a silent no-op:
   no GTM loads, no analytics fire. */
(function () {
  var el = document.currentScript;
  var id = (el && el.getAttribute('data-gtm-id')) || '';
  if (id.indexOf('GTM-') !== 0) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(id);
  el.parentNode.insertBefore(s, el);
})();
