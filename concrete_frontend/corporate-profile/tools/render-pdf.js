/**
 * Renders the built HTML to a print-ready A4 PDF with Puppeteer.
 * Text stays selectable, links stay clickable (tel:, mailto:, https:, wa.me).
 */
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

async function renderPdf(htmlFile, pdfFile) {
  const browser = await puppeteer.launch({
    args: ['--font-render-hinting=none'],
  });
  try {
    const page = await browser.newPage();
    await page.goto('file:///' + htmlFile.replace(/\\/g, '/'), {
      waitUntil: 'networkidle0',
    });
    await page.evaluateHandle('document.fonts.ready');

    fs.mkdirSync(path.dirname(pdfFile), { recursive: true });
    await page.pdf({
      path: pdfFile,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });
  } finally {
    await browser.close();
  }
  const kb = Math.round(fs.statSync(pdfFile).size / 1024);
  return { pdfFile, kb };
}

module.exports = { renderPdf };
