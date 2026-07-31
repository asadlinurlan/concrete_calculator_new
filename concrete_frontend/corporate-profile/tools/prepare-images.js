/**
 * Image preparation for the corporate profile.
 * Reads the image manifest from the data file, resizes/compresses source photos
 * with sharp (already a devDependency of the website), and writes optimized
 * JPEGs into corporate-profile/assets/img/. Keeps the final PDF small.
 *
 * Source photos in src/ are never modified — only read.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function prepareImages(images, projectRoot, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const report = [];

  for (const img of images) {
    const src = path.resolve(projectRoot, img.source);
    const out = path.join(outDir, img.output);
    if (!fs.existsSync(src)) {
      report.push({ output: img.output, status: 'MISSING SOURCE: ' + img.source });
      continue;
    }

    const srcStat = fs.statSync(src);
    if (fs.existsSync(out)) {
      const outStat = fs.statSync(out);
      if (outStat.mtimeMs >= srcStat.mtimeMs) {
        report.push({ output: img.output, status: 'cached', kb: Math.round(outStat.size / 1024) });
        continue;
      }
    }

    let pipeline = sharp(src).rotate(); // .rotate() honours EXIF orientation (phone photos)

    // Optional crop, as fractions of the source image (0..1): { left, top, width, height }
    if (img.crop) {
      const meta = await sharp(src).rotate().metadata();
      const c = img.crop;
      pipeline = pipeline.extract({
        left: Math.round(c.left * meta.width),
        top: Math.round(c.top * meta.height),
        width: Math.round(c.width * meta.width),
        height: Math.round(c.height * meta.height),
      });
    }

    pipeline = pipeline.resize({
      width: img.width || 1400,
      height: img.height || undefined,
      fit: img.height ? 'cover' : 'inside',
      position: img.position || 'centre',
      withoutEnlargement: true,
    });
    pipeline = pipeline.flatten({ background: '#ffffff' }).jpeg({
      quality: img.quality || 78,
      mozjpeg: true,
    });

    await pipeline.toFile(out);
    const kb = Math.round(fs.statSync(out).size / 1024);
    report.push({ output: img.output, status: 'generated', kb });
  }
  return report;
}

module.exports = { prepareImages };
