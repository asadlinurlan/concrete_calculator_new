/**
 * NOVXANI BETON — corporate profile generator.
 *
 * Usage (from the concrete_frontend folder):
 *   node corporate-profile/generate.js            # full build → out/ PDF + HTML
 *   node corporate-profile/generate.js --html-only  # skip the PDF step (fast preview)
 *
 * Pipeline: data file → optimized images (sharp) → QR SVGs (qrcode)
 *           → HTML from template (template/render.js + template/profile.css)
 *           → A4 PDF via Puppeteer.
 *
 * All content lives in data/company.data.js — edit that file, re-run this script.
 * The design lives in template/ and normally never needs to change.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname; // corporate-profile/
const PROJECT_ROOT = path.resolve(ROOT, '..'); // concrete_frontend/

const data = require('./data/company.data.js');
const { prepareImages } = require('./tools/prepare-images.js');
const { makeQrSvgs } = require('./tools/make-qr.js');
const { renderHtml } = require('./template/render.js');
const { renderPdf } = require('./tools/render-pdf.js');

const OUT_DIR = path.join(ROOT, 'out');
const ASSETS_IMG = path.join(ROOT, 'assets', 'img');
const ASSETS_QR = path.join(ROOT, 'assets', 'qr');

async function main() {
  const htmlOnly = process.argv.includes('--html-only');

  console.log('1/4 Preparing images…');
  const imgReport = await prepareImages(data.images, PROJECT_ROOT, ASSETS_IMG);
  for (const r of imgReport) {
    console.log(`    ${r.output}: ${r.status}${r.kb ? ` (${r.kb} KB)` : ''}`);
    if (String(r.status).startsWith('MISSING')) process.exitCode = 1;
  }

  console.log('2/4 Generating QR codes…');
  const qrs = await makeQrSvgs(data, ASSETS_QR);
  for (const [name, info] of Object.entries(qrs)) {
    console.log(`    ${name} → ${info.encodes}`);
  }

  console.log('3/4 Rendering HTML…');
  const html = renderHtml(data, {
    cssFile: path.join(ROOT, 'template', 'profile.css'),
    assetsImg: ASSETS_IMG,
    assetsQr: ASSETS_QR,
    assetsFonts: path.join(ROOT, 'assets', 'fonts'),
  });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const htmlFile = path.join(OUT_DIR, 'profile.html');
  fs.writeFileSync(htmlFile, html, 'utf8');
  console.log('    ' + htmlFile);

  if (htmlOnly) {
    console.log('4/4 Skipped PDF (--html-only).');
    return;
  }

  console.log('4/4 Rendering PDF…');
  const pdfFile = path.join(OUT_DIR, data.output.pdfFileName);
  const result = await renderPdf(htmlFile, pdfFile);
  console.log(`    ${result.pdfFile} (${result.kb} KB)`);
  if (result.kb > 5 * 1024) {
    console.warn('    WARNING: PDF is above the ~5 MB target — lower image quality/width in data/company.data.js.');
  }

  const placeholders = collectPlaceholders(data);
  if (placeholders.length) {
    console.log('\nPlaceholders still present (fill these in data/company.data.js):');
    for (const p of placeholders) console.log('  - ' + p);
  }
}

/** Walks the data object and reports every value still marked as a placeholder. */
function collectPlaceholders(obj, trail = [], found = []) {
  if (typeof obj === 'string') {
    if (obj.includes('[[') && obj.includes(']]')) found.push(trail.join('.') + ' = ' + obj);
  } else if (Array.isArray(obj)) {
    obj.forEach((v, i) => collectPlaceholders(v, trail.concat(String(i)), found));
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) collectPlaceholders(v, trail.concat(k), found);
  }
  return found;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
