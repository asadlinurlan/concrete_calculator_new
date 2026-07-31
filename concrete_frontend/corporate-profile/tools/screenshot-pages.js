/**
 * Dev helper: screenshots each .page of out/profile.html as PNG for visual QA.
 * Usage: node corporate-profile/tools/screenshot-pages.js <outputDir>
 */
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const outDir = process.argv[2] || path.join(__dirname, '..', 'out', 'shots');
  fs.mkdirSync(outDir, { recursive: true });
  const htmlFile = path.join(__dirname, '..', 'out', 'profile.html');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 1200, deviceScaleFactor: 1.4 });
  await page.goto('file:///' + htmlFile.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  const pages = await page.$$('.page');
  for (let i = 0; i < pages.length; i++) {
    const file = path.join(outDir, `page-${i + 1}.png`);
    await pages[i].screenshot({ path: file });
    console.log(file);
  }
  await browser.close();
})();
