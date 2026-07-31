/**
 * QR code generation for the corporate profile (website + WhatsApp).
 * Uses the pure-JS `qrcode` package (installed with `npm i --no-save qrcode`
 * so package.json stays untouched). Outputs crisp SVGs — vector, tiny, print-safe.
 */
const fs = require('fs');
const path = require('path');

async function makeQrSvgs(data, outDir) {
  let QRCode;
  try {
    QRCode = require('qrcode');
  } catch (e) {
    throw new Error(
      "The 'qrcode' package is missing. Install it without touching package.json:\n" +
        '  npm install --no-save qrcode'
    );
  }

  fs.mkdirSync(outDir, { recursive: true });

  const targets = [
    { name: 'qr-website.svg', value: data.qr.websiteUrl },
    { name: 'qr-whatsapp.svg', value: data.qr.whatsappUrl },
  ];

  const files = {};
  for (const t of targets) {
    const svg = await QRCode.toString(t.value, {
      type: 'svg',
      errorCorrectionLevel: 'M',
      margin: 0,
      color: { dark: data.qr.darkColor || '#1a1a1a', light: '#ffffff00' },
    });
    const file = path.join(outDir, t.name);
    fs.writeFileSync(file, svg, 'utf8');
    files[t.name] = { file, encodes: t.value };
  }
  return files;
}

module.exports = { makeQrSvgs };
