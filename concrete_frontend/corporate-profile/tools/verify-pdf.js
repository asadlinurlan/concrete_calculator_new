/**
 * Sanity checks on the generated PDF:
 *  - page count and A4 media box
 *  - link annotations present (tel:, mailto:, https:, wa.me)
 *  - fonts embedded with ToUnicode maps (=> selectable/copyable text)
 *  - Azerbaijani code points present in the ToUnicode CMaps (ə, ş, ğ, İ …)
 *  - file size vs the ~5 MB target
 * Chrome's PDF writer (Skia) emits classic uncompressed object dicts with
 * flate-compressed streams, so scanning + inflating is reliable here.
 * Usage: node corporate-profile/tools/verify-pdf.js
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const data = require('../data/company.data.js');
const pdfFile = path.join(__dirname, '..', 'out', data.output.pdfFileName);
const buf = fs.readFileSync(pdfFile);
const raw = buf.toString('latin1');

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok, detail });
}

// --- size
const mb = buf.length / (1024 * 1024);
check('Size under ~5 MB', mb < 5, mb.toFixed(2) + ' MB');

// --- page count + media box
const pageCount = (raw.match(/\/Type\s*\/Page[^s]/g) || []).length;
check('8 pages', pageCount === 8, String(pageCount));
const a4 = /\/MediaBox\s*\[\s*0\s+0\s+59[45](\.\d+)?\s+84[12](\.\d+)?\s*\]/.test(raw);
check('A4 media box (595x842pt)', a4, a4 ? 'found' : 'NOT found');

// --- link annotations
const uris = [...raw.matchAll(/\/URI\s*\(([^)]+)\)/g)].map((m) => m[1]);
const uniq = [...new Set(uris)];
const want = [
  data.contacts.phoneHref,
  data.contacts.emailHref,
  data.contacts.websiteUrl,
  data.contacts.whatsappUrl,
];
for (const w of want) {
  check('Link: ' + w, uniq.some((u) => u.startsWith(w)), '');
}
check('Total link annotations', uris.length > 0, uris.length + ' (' + uniq.length + ' unique)');

// --- fonts + ToUnicode => selectable text
const toUniCount = (raw.match(/\/ToUnicode/g) || []).length;
check('Fonts have ToUnicode maps', toUniCount > 0, String(toUniCount));

// Inflate all streams and look for Azerbaijani code points in the CMaps.
let inflated = '';
const streamRe = /stream\r?\n/g;
let m;
while ((m = streamRe.exec(raw)) !== null) {
  const start = m.index + m[0].length;
  const end = raw.indexOf('endstream', start);
  if (end < 0) continue;
  const chunk = buf.subarray(start, end);
  try {
    inflated += zlib.inflateSync(chunk).toString('latin1');
  } catch (e) {
    /* not flate or not compressed — skip */
  }
}
// ToUnicode CMaps carry UTF-16BE hex of the real characters.
const azCodes = { 'ə (0259)': '0259', 'Ə (018F)': '018F', 'ş (015F)': '015F', 'ğ (011F)': '011F', 'ı (0131)': '0131', 'İ (0130)': '0130', 'ö (00F6)': '00F6', 'ü (00FC)': '00FC', 'ç (00E7)': '00E7' };
for (const [label, code] of Object.entries(azCodes)) {
  const found = inflated.includes(code) || inflated.includes(code.toLowerCase());
  check('AZ glyph mapped: ' + label, found, '');
}

// --- report
let fail = 0;
for (const r of results) {
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? '  — ' + r.detail : ''}`);
  if (!r.ok) fail++;
}
console.log(fail === 0 ? '\nAll checks passed.' : `\n${fail} check(s) FAILED.`);
process.exit(fail === 0 ? 0 : 1);
