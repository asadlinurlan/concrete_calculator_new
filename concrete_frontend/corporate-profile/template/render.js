/**
 * NOVXANI BETON korporativ profil — HTML renderer.
 * Design layer: this file (structure) + profile.css (visual design).
 * Content comes exclusively from data/company.data.js — do not hardcode facts here.
 */
const fs = require('fs');
const path = require('path');

/* ---------------------------------------------------------------- helpers */

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Placeholders like [[...]] render as clearly marked dashed chips. */
function rich(s) {
  return esc(s).replace(
    /\[\[(.+?)\]\]/g,
    '<span class="placeholder">$1</span>'
  );
}

/**
 * Brand mark: the site's NOVKHANI.svg skyline, inlined so we can recolor it
 * with CSS `fill`. The built-in wordmark at the bottom of the artwork is
 * cropped away via viewBox (we typeset "NOVXANI BETON" ourselves).
 */
function loadLogoMark(projectRoot) {
  const raw = fs.readFileSync(path.join(projectRoot, 'public', 'NOVKHANI.svg'), 'utf8');
  return raw
    .replace(/fill="#000000"/g, '')
    .replace(/width="500"/, '')
    .replace(/height="500"/, '')
    .replace(/zoomAndPan="magnify"/, '')
    .replace(/viewBox="0 0 375 374\.999991"/, 'viewBox="0 0 375 311"')
    .replace(/<svg /, '<svg class="logo-mark-svg" ');
}

/** Minimal line-icon set (stroke = currentColor), drawn for this profile. */
const ICONS = {
  plant:
    '<path d="M3 20V9l5 3V9l5 3V9l5 3v8"/><path d="M3 20h18"/><path d="M17 9V4h3v5"/>',
  truck:
    '<path d="M1.5 16V8.5h11V16"/><path d="M12.5 10.5h4l3.5 3V16h-2"/><circle cx="5.5" cy="17" r="1.7"/><circle cx="15.5" cy="17" r="1.7"/><path d="M7.3 17h6.4"/><path d="M4 11h6.5"/><path d="M4 13.2h6.5"/>',
  pump: '<path d="M3 20h18"/><path d="M7 20v-9"/><path d="M7 11h6.5l5.5-4.5"/><path d="M19 6.5V12"/><path d="M19 12c0 2.2-1.6 2.6-1.6 4.4"/>',
  schedule:
    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9.5h18"/><path d="M8 3v4M16 3v4"/><path d="m9.5 14.5 2 2 3.5-3.5"/>',
  night: '<path d="M20 13.5A8 8 0 0 1 10.5 4 8 8 0 1 0 20 13.5Z"/>',
  scale:
    '<path d="M4 20h16"/><rect x="4" y="16" width="16" height="2.5" rx="1"/><path d="M7 16V9h10v7"/><path d="M9.5 9V6.5h5V9"/>',
  advice:
    '<path d="M21 11a8 8 0 0 1-11.6 7.2L4 20l1.8-5.4A8 8 0 1 1 21 11Z"/><path d="M8.5 10.5h7M8.5 13.5h4.5"/>',
  phone:
    '<path d="M5 3h4l1.8 4.5L8.5 9.5a12 12 0 0 0 6 6l2-2.3L21 15v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18Z"/>',
  whatsapp:
    '<path d="M12 3.5a8.4 8.4 0 0 0-7.2 12.7L3.6 20l3.9-1.1A8.4 8.4 0 1 0 12 3.5Z"/><path d="M9 8.5c-.4 2.2 2.3 5.7 5.5 6.5l1-1.6-2-1.2-.9.8a5.6 5.6 0 0 1-1.9-2l.8-1-1.2-2Z"/>',
  pin: '<path d="M12 21s-7-5.8-7-11a7 7 0 0 1 14 0c0 5.2-7 11-7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  doc: '<path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v4h4"/><path d="M9 12h6M9 15.5h6"/>',
};

function icon(name, cls = '') {
  return (
    `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" ` +
    `stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">` +
    ICONS[name] +
    `</svg>`
  );
}

/* ---------------------------------------------------------------- blocks */

function logoLockup(logoMark, name, variant) {
  return `
    <div class="logo-lockup logo-lockup--${variant}">
      <span class="logo-mark">${logoMark}</span>
      <span class="logo-word">${esc(name)}</span>
    </div>`;
}

function pageHeader(eyebrow, title) {
  return `
    <header class="page-header">
      <div class="eyebrow">${esc(eyebrow)}</div>
      <h2 class="page-title">${esc(title)}</h2>
    </header>`;
}

function pageFooter(data, num) {
  return `
    <footer class="page-footer">
      <span class="pf-brand">${esc(data.company.name)}<span class="pf-dot">•</span>Korporativ profil</span>
      <span class="pf-right"><a href="${esc(data.contacts.websiteUrl)}">${esc(
        data.contacts.websiteDisplay
      )}</a><span class="pf-num">${String(num).padStart(2, '0')}</span></span>
    </footer>`;
}

/* ---------------------------------------------------------------- pages */

/** Splits the tagline so its final part gets the amber accent line. */
function coverTitleHtml(company) {
  const t = company.tagline;
  const acc = company.taglineAccent;
  if (acc && t.endsWith(acc)) {
    return (
      esc(t.slice(0, t.length - acc.length).trim()) +
      `<span class="cover-accent">${esc(acc)}</span>`
    );
  }
  return esc(t);
}

function coverPage(data, ctx) {
  const c = data.contacts;
  return `
  <section class="page page--cover">
    <img class="cover-photo" src="${ctx.img('cover.jpg')}" alt="">
    <div class="cover-overlay"></div>
    <div class="cover-content">
      <div class="cover-top">
        ${logoLockup(ctx.logoMark, data.company.name, 'cover')}
        <span class="cover-eyebrow">${esc(data.pages.cover.eyebrow)}</span>
      </div>
      <div class="cover-middle">
        <h1 class="cover-title">${coverTitleHtml(data.company)}</h1>
        <div class="cover-rule"></div>
        <p class="cover-subtitle">${esc(data.company.coverSubtitle)}</p>
      </div>
      <div class="cover-bottom">
        <div class="cover-contactbar">
          <a class="cc-item" href="${esc(c.phoneHref)}">${icon('phone')}<span>${esc(
            c.phoneDisplay
          )}</span></a>
          <a class="cc-item" href="${esc(c.emailHref)}">${icon('mail')}<span>${esc(
            c.email
          )}</span></a>
          <a class="cc-item" href="${esc(c.websiteUrl)}">${icon('globe')}<span>${esc(
            c.websiteDisplay
          )}</span></a>
        </div>
        <div class="cover-caption">${esc(data.pages.cover.photoCaption)}</div>
      </div>
    </div>
  </section>`;
}

function aboutPage(data, ctx) {
  const p = data.pages.about;
  return `
  <section class="page page--light">
    ${pageHeader(p.eyebrow, p.title)}
    <div class="about-intro">
      ${p.paragraphs.map((t) => `<p>${esc(t)}</p>`).join('')}
    </div>
    <div class="fact-row">
      ${p.facts
        .map(
          (f) => `
        <div class="fact-chip">
          <div class="fact-value">${esc(f.value)}</div>
          <div class="fact-label">${esc(f.label)}</div>
        </div>`
        )
        .join('')}
    </div>
    <figure class="photo-banner">
      <img src="${ctx.img('plant-wide.jpg')}" alt="${esc(data.pages.cover.photoCaption)}">
      <figcaption>${esc(data.pages.cover.photoCaption)}</figcaption>
    </figure>
    <div class="about-cols">
      <div class="about-col">
        <h3 class="minor-title">${esc(p.segmentsTitle)}</h3>
        ${p.segments
          .map(
            (s) => `
          <div class="segment">
            <div class="segment-name">${esc(s.name)}</div>
            <div class="segment-text">${esc(s.text)}</div>
          </div>`
          )
          .join('')}
      </div>
      <div class="about-col">
        <div class="dark-card">
          <h3 class="dark-card-title">${icon('pin')} ${esc(p.serviceAreaTitle)}</h3>
          <p>${esc(p.serviceAreaText)}</p>
        </div>
      </div>
    </div>
    ${pageFooter(data, 2)}
  </section>`;
}

function productsPage(data, ctx) {
  const p = data.pages.products;
  return `
  <section class="page page--light">
    ${pageHeader(p.eyebrow, p.title)}
    <p class="page-intro">${esc(p.intro)}</p>
    <div class="grade-grid">
      ${p.grades
        .map(
          (g) => `
        <div class="grade-card">
          <div class="grade-head">
            <span class="grade-badge">${esc(g.grade)}</span>
            <span class="grade-class">${esc(g.cls)}</span>
          </div>
          <div class="grade-use">${esc(g.use)}</div>
        </div>`
        )
        .join('')}
    </div>
    <div class="info-strip">${icon('advice')}<span>${esc(p.footnote)}</span></div>
    ${pageFooter(data, 3)}
  </section>`;
}

function servicesPage(data, ctx) {
  const p = data.pages.services;
  return `
  <section class="page page--light">
    ${pageHeader(p.eyebrow, p.title)}
    <p class="page-intro">${esc(p.intro)}</p>
    <div class="service-list">
      ${p.items
        .map(
          (s) => `
        <div class="service-row">
          <div class="service-icon">${icon(s.icon)}</div>
          <div class="service-body">
            <div class="service-name">${esc(s.name)}</div>
            <div class="service-text">${esc(s.text)}</div>
          </div>
        </div>`
        )
        .join('')}
    </div>
    <div class="tech-notes">
      <div class="tech-notes-title">${esc(p.techNotes.title)}</div>
      <div class="tech-notes-row">
        ${p.techNotes.items.map((t) => `<div class="tech-note">${esc(t)}</div>`).join('')}
      </div>
    </div>
    ${pageFooter(data, 4)}
  </section>`;
}

function materialsPage(data, ctx) {
  const p = data.pages.materials;
  return `
  <section class="page page--light">
    ${pageHeader(p.eyebrow, p.title)}
    <p class="page-intro">${esc(p.intro)}</p>
    <figure class="photo-banner photo-banner--materials">
      <img src="${ctx.img('materials-bins.jpg')}" alt="${esc(p.photoCaption)}">
      <figcaption>${esc(p.photoCaption)}</figcaption>
    </figure>
    <div class="material-grid">
      ${p.items
        .map(
          (m) => `
        <div class="material-card">
          <div class="material-name">${esc(m.name)}</div>
          <div class="material-text">${esc(m.text)}</div>
          <div class="material-spec">${rich(m.spec)}</div>
        </div>`
        )
        .join('')}
    </div>
    <div class="supply-box">
      <h3 class="minor-title">${esc(p.supplyTitle)}</h3>
      <ul class="check-list">
        ${p.supplyPoints.map((s) => `<li>${icon('check')}<span>${esc(s)}</span></li>`).join('')}
      </ul>
    </div>
    <div class="info-strip info-strip--materials">${icon('truck')}<span>${esc(
      p.note
    )}</span></div>
    ${pageFooter(data, 5)}
  </section>`;
}

function qualityPage(data, ctx) {
  const p = data.pages.quality;
  return `
  <section class="page page--light">
    ${pageHeader(p.eyebrow, p.title)}
    <p class="page-intro">${esc(p.intro)}</p>
    <div class="quality-cols">
      <div class="timeline">
        ${p.steps
          .map(
            (s, i) => `
          <div class="tl-step">
            <div class="tl-marker"><span>${i + 1}</span></div>
            <div class="tl-body">
              <div class="tl-name">${esc(s.name)}</div>
              <div class="tl-text">${esc(s.text)}</div>
            </div>
          </div>`
          )
          .join('')}
      </div>
      <div class="quality-side">
        <div class="quality-points">
          <h3 class="minor-title">Sənədləşmə və standartlar</h3>
          <ul class="check-list">
            ${p.points.map((s) => `<li>${icon('check')}<span>${esc(s)}</span></li>`).join('')}
          </ul>
        </div>
        <div class="cert-box">
          ${icon('doc')}
          <div class="cert-note">${rich(p.note)}</div>
        </div>
      </div>
    </div>
    <div class="info-strip info-strip--quality">${icon('doc')}<span>${esc(
      p.docsNote
    )}</span></div>
    ${pageFooter(data, 6)}
  </section>`;
}

function b2bPage(data, ctx) {
  const p = data.pages.b2b;
  return `
  <section class="page page--light">
    ${pageHeader(p.eyebrow, p.title)}
    <p class="page-intro">${esc(p.intro)}</p>
    <div class="b2b-grid">
      ${p.points
        .map(
          (b) => `
        <div class="b2b-card">
          <div class="b2b-name">${esc(b.name)}</div>
          <div class="b2b-text">${esc(b.text)}</div>
        </div>`
        )
        .join('')}
      <figure class="b2b-photo">
        <img src="${ctx.img('silos.jpg')}" alt="">
      </figure>
    </div>
    <div class="process">
      <h3 class="minor-title">${esc(p.processTitle)}</h3>
      <div class="process-row">
        ${p.process
          .map(
            (s, i) => `
          <div class="process-step">
            <div class="ps-num">${String(i + 1).padStart(2, '0')}</div>
            <div class="ps-name">${esc(s.name)}</div>
            <div class="ps-text">${esc(s.text)}</div>
          </div>`
          )
          .join('<div class="process-arrow">→</div>')}
      </div>
    </div>
    ${pageFooter(data, 7)}
  </section>`;
}

function contactPage(data, ctx) {
  const p = data.pages.contact;
  const c = data.contacts;
  return `
  <section class="page page--dark">
    <div class="dark-glow dark-glow--steel"></div>
    <div class="dark-glow dark-glow--amber"></div>
    <div class="contact-content">
      <div class="contact-top">
        ${logoLockup(ctx.logoMark, data.company.name, 'dark')}
        <div class="eyebrow eyebrow--dark">${esc(p.eyebrow)}</div>
        <h2 class="contact-title">${esc(p.ctaTitle)}</h2>
        <p class="contact-sub">${esc(p.ctaText)}</p>
      </div>
      <div class="contact-grid">
        <a class="contact-item" href="${esc(c.phoneHref)}">
          ${icon('phone')}<div><span class="ci-label">Telefon</span><span class="ci-value">${esc(
            c.phoneDisplay
          )}</span></div>
        </a>
        <a class="contact-item" href="${esc(c.whatsappUrl)}">
          ${icon('whatsapp')}<div><span class="ci-label">WhatsApp</span><span class="ci-value">${esc(
            c.whatsappDisplay
          )}</span></div>
        </a>
        <a class="contact-item" href="${esc(c.emailHref)}">
          ${icon('mail')}<div><span class="ci-label">E-poçt</span><span class="ci-value">${esc(
            c.email
          )}</span></div>
        </a>
        <a class="contact-item" href="${esc(c.websiteUrl)}">
          ${icon('globe')}<div><span class="ci-label">Veb-sayt</span><span class="ci-value">${esc(
            c.websiteDisplay
          )}</span></div>
        </a>
        <a class="contact-item contact-item--wide" href="${esc(c.mapUrl)}">
          ${icon('pin')}<div><span class="ci-label">Ünvan</span><span class="ci-value">${esc(
            c.addressLine
          )} <span class="ci-extra">${rich(c.addressExtra)}</span></span></div>
        </a>
        <div class="contact-item contact-item--wide contact-item--static">
          ${icon('clock')}<div><span class="ci-label">İş rejimi</span><span class="ci-value">${esc(
            p.workingHours
          )}</span></div>
        </div>
      </div>
      <div class="qr-row">
        <a class="qr-card" href="${esc(data.qr.websiteUrl)}">
          <span class="qr-box">${ctx.qr('qr-website.svg')}</span>
          <span class="qr-label">${esc(p.qrWebsiteLabel)}</span>
          <span class="qr-hint">${esc(p.qrWebsiteHint)}</span>
        </a>
        <a class="qr-card" href="${esc(data.qr.whatsappUrl)}">
          <span class="qr-box">${ctx.qr('qr-whatsapp.svg')}</span>
          <span class="qr-label">${esc(p.qrWhatsappLabel)}</span>
          <span class="qr-hint">${esc(p.qrWhatsappHint)}</span>
        </a>
      </div>
      <footer class="page-footer page-footer--dark">
        <span class="pf-brand">© ${esc(data.company.name)}<span class="pf-dot">•</span>${esc(
          c.addressLine
        )}</span>
        <span class="pf-right"><a href="${esc(c.websiteUrl)}">${esc(
          c.websiteDisplay
        )}</a><span class="pf-num">08</span></span>
      </footer>
    </div>
  </section>`;
}

/* ---------------------------------------------------------------- entry */

function renderHtml(data, opts) {
  const projectRoot = path.resolve(__dirname, '..', '..');
  const css = fs.readFileSync(opts.cssFile, 'utf8');
  const fontsCss = fs
    .readFileSync(path.join(opts.assetsFonts, 'fonts.css'), 'utf8')
    .replace(/url\('([^']+\.woff2)'\)/g, "url('../assets/fonts/$1')");
  const logoMark = loadLogoMark(projectRoot);

  const ctx = {
    logoMark,
    img: (name) => '../assets/img/' + name,
    qr: (name) =>
      fs
        .readFileSync(path.join(opts.assetsQr, name), 'utf8')
        .replace(/<svg /, '<svg class="qr-svg" '),
  };

  return `<!DOCTYPE html>
<html lang="${esc(data.meta.docLang)}">
<head>
<meta charset="utf-8">
<title>${esc(data.meta.docTitle)}</title>
<style>
${fontsCss}
${css}
</style>
</head>
<body>
${coverPage(data, ctx)}
${aboutPage(data, ctx)}
${productsPage(data, ctx)}
${servicesPage(data, ctx)}
${materialsPage(data, ctx)}
${qualityPage(data, ctx)}
${b2bPage(data, ctx)}
${contactPage(data, ctx)}
</body>
</html>`;
}

module.exports = { renderHtml };
