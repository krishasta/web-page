#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const repoRoot = path.join(__dirname, '..');
const srcDir = path.join(repoRoot, 'public', 'images', 'originals');
const outDir = path.join(repoRoot, 'public', 'images', 'prod');
const widths = [400, 800, 1200];

if (!fs.existsSync(srcDir)) {
  console.error('Source directory not found:', srcDir);
  console.error('Place original images into public/images/originals and re-run this script.');
  process.exit(1);
}
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function processFile(file) {
  const input = path.join(srcDir, file);
  const name = path.parse(file).name.replace(/\s+/g, '-').toLowerCase();
  try {
    await Promise.all(widths.map(async (w) => {
      const webpOut = path.join(outDir, `${name}-${w}.webp`);
      const jpgOut = path.join(outDir, `${name}-${w}.jpg`);
      await sharp(input).resize(w).webp({ quality: 80 }).toFile(webpOut);
      await sharp(input).resize(w).jpeg({ mozjpeg: true, quality: 80 }).toFile(jpgOut);
      console.log('Wrote', webpOut, jpgOut);
    }));
  } catch (err) {
    console.error('Error processing', file, err);
  }
}

async function main(){
  const files = fs.readdirSync(srcDir).filter(f => /\.(jpe?g|png)$/i.test(f));
  if (files.length === 0) {
    console.error('No image files found in', srcDir);
    process.exit(1);
  }
  for (const f of files) await processFile(f);
  console.log('Done optimizing images to', outDir);
}

main();
