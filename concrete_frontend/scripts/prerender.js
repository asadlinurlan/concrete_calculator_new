/* ============================================================
   Build-time prerender: renders every route of the SPA to static
   HTML inside build/, so crawlers and social bots receive full
   content + per-route meta without executing JavaScript.

   Runs as `postbuild`. Designed to be CI-safe: any failure exits
   non-zero and the npm script falls back to the plain SPA build
   (deploy still succeeds, just without prerendered HTML).
   ============================================================ */
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const BUILD = path.resolve(__dirname, '..', 'build');
const PORT = Number(process.env.PRERENDER_PORT) || 4173;

const ROUTES = [
  '/',
  '/products',
  '/services',
  '/calculator',
  '/gallery',
  '/about',
  '/contact',
  '/tikinti-materiallari',
  '/qum-satisi',
  '/atsep-satisi',
  '/seben-satisi',
  '/hazir-beton-satisi',
  '/beton-catdirilmasi',
  '/beton-nasoslama',
  '/terezi-xidmeti',
  '/beton-qiymetleri',
  '/beton-laboratoriyasi',
  '/betonun-istifade-saheleri',
  '/topdan-beton-satisi',
  '/faq',
  '/m100-beton',
  '/m150-beton',
  '/m200-beton',
  '/m250-beton',
  '/m300-beton',
  '/m350-beton',
  '/m400-beton',
  '/m450-beton',
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.map': 'application/json',
  '.woff2': 'font/woff2',
};

// Minimal static file server with SPA fallback (no extra deps).
function createServer() {
  return http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    let filePath = path.join(BUILD, urlPath);
    if (!filePath.startsWith(BUILD)) { res.writeHead(403); res.end(); return; }
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(BUILD, 'index.html');
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
}

(async () => {
  const server = createServer();
  await new Promise((resolve) => server.listen(PORT, resolve));

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  // Render everything into memory first, write to disk at the end —
  // otherwise overwriting index.html mid-run would poison SPA fallback.
  async function renderRoute(route, { blockExternal = false } = {}) {
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1366, height: 900 });
      if (blockExternal) {
        // Retry mode: skip external resources (fonts/analytics/maps) that can
        // hang networkidle0 on a flaky network. They are purely visual — the
        // rendered DOM and meta tags are identical without them.
        await page.setRequestInterception(true);
        page.on('request', (req) => {
          if (new URL(req.url()).hostname === 'localhost') req.continue();
          else req.abort();
        });
      }
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 60000 });
      await new Promise((r) => setTimeout(r, 400)); // let helmet/observers settle
      // Static paint must be fully visible: force all scroll-reveal elements
      // shown, otherwise below-the-fold content is opacity:0 until JS loads.
      await page.evaluate(() => {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
      });
      return await page.content();
    } finally {
      await page.close();
    }
  }

  const results = [];
  for (const route of ROUTES) {
    let html;
    try {
      html = await renderRoute(route);
    } catch (e) {
      // Slow external resources (fonts/CDN) occasionally trip networkidle0 —
      // retry with external requests blocked; local-only render can't hang.
      console.log(`  ⟳ retrying ${route} without external resources (${e.message})`);
      html = await renderRoute(route, { blockExternal: true });
    }
    if (!html.includes('id="root"')) throw new Error(`Empty render for ${route}`);
    results.push({ route, html });
    console.log(`  ✓ prerendered ${route} (${(html.length / 1024).toFixed(0)} KB)`);
  }

  await browser.close();
  server.close();

  for (const { route, html } of results) {
    // Flat files ("products.html", not "products/index.html"): static hosts
    // (Cloudflare Pages / Netlify) then serve /products directly with 200 —
    // no 308 trailing-slash redirect, so URLs match the canonical exactly.
    const outFile = route === '/'
      ? path.join(BUILD, 'index.html')
      : path.join(BUILD, `${route.slice(1)}.html`);
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, html);
  }

  console.log(`Prerender complete: ${results.length} routes → static HTML.`);
  process.exit(0);
})().catch((e) => {
  console.error('Prerender failed:', e.message);
  process.exit(1);
});
