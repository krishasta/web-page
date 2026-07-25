import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, 'public');

async function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(await walkDir(filePath));
    } else {
      results.push(filePath);
    }
  }
  return results;
}

async function compressAll() {
  console.log('Scanning for heavy images in', PUBLIC_DIR);
  const allFiles = await walkDir(PUBLIC_DIR);
  const imageFiles = allFiles.filter(f => f.match(/\.(png|jpe?g)$/i));

  console.log(`Found ${imageFiles.length} image files to process.`);
  let totalSavedBytes = 0;
  let processedCount = 0;

  for (const filePath of imageFiles) {
    const stat = fs.statSync(filePath);
    const ext = path.extname(filePath);
    const webpPath = filePath.replace(new RegExp(`${ext}$`, 'i'), '.webp');

    try {
      const metadata = await sharp(filePath).metadata();
      let transform = sharp(filePath);

      // Max width 1200px for web display
      if (metadata.width && metadata.width > 1200) {
        transform = transform.resize({ width: 1200, withoutEnlargement: true });
      }

      // Convert to WebP
      await transform.webp({ quality: 80, effort: 4 }).toFile(webpPath);
      const newStat = fs.statSync(webpPath);
      const saved = stat.size - newStat.size;
      totalSavedBytes += Math.max(0, saved);
      processedCount++;

      console.log(`✅ ${path.relative(PUBLIC_DIR, filePath)} (${(stat.size / 1024 / 1024).toFixed(2)} MB) -> WebP (${(newStat.size / 1024).toFixed(1)} KB)`);

      // If original PNG/JPG is > 500KB, remove or replace it to save bandwidth/disk space
      if (stat.size > 500 * 1024 && filePath !== webpPath) {
        fs.unlinkSync(filePath);
      }
    } catch (err) {
      console.error(`❌ Error compressing ${filePath}:`, err.message);
    }
  }

  // Update CSV files in public to point to .webp extensions
  const csvFiles = allFiles.filter(f => f.endsWith('.csv'));
  for (const csvPath of csvFiles) {
    let content = fs.readFileSync(csvPath, 'utf-8');
    content = content.replace(/\.png/gi, '.webp').replace(/\.jpg/gi, '.webp').replace(/\.jpeg/gi, '.webp');
    fs.writeFileSync(csvPath, content, 'utf-8');
    console.log(`Updated CSV image extensions in ${path.relative(PUBLIC_DIR, csvPath)}`);
  }

  console.log(`\n🎉 Optimization Complete! Processed ${processedCount} images. Total Saved: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB.`);
}

compressAll();
