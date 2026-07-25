import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, 'public');
const MAIN_IMAGE_DIR = path.join(PUBLIC_DIR, 'images', 'Main image');
const MAIN_IMAGE_NEW = path.join(PUBLIC_DIR, 'images', 'main-image');

// 1. Rename "Main image" folder to "main-image" and simplify file names
if (fs.existsSync(MAIN_IMAGE_DIR)) {
  if (fs.existsSync(MAIN_IMAGE_NEW)) {
    fs.rmSync(MAIN_IMAGE_NEW, { recursive: true, force: true });
  }
  fs.renameSync(MAIN_IMAGE_DIR, MAIN_IMAGE_NEW);
}

if (fs.existsSync(MAIN_IMAGE_NEW)) {
  const files = fs.readdirSync(MAIN_IMAGE_NEW);
  for (const f of files) {
    const oldPath = path.join(MAIN_IMAGE_NEW, f);
    let newName = f.replace('.jpg.jpeg', '').replace('.jpg.webp', '.webp').replace('.jpeg', '');
    const newPath = path.join(MAIN_IMAGE_NEW, newName);
    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed: ${f} -> ${newName}`);
    }
  }
}

// 2. Clean up "services" directory filenames (remove spaces and double extensions)
const SERVICES_DIR = path.join(PUBLIC_DIR, 'images', 'services');
if (fs.existsSync(SERVICES_DIR)) {
  const files = fs.readdirSync(SERVICES_DIR);
  for (const f of files) {
    const oldPath = path.join(SERVICES_DIR, f);
    let newName = f.replace(/\.jpg\.jpeg$/i, '.jpeg')
                   .replace(/\.jpg\.webp$/i, '.webp')
                   .replace(/\s+/g, '-');
    const newPath = path.join(SERVICES_DIR, newName);
    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed service image: ${f} -> ${newName}`);
    }
  }
}

console.log('Finished renaming image assets cleanly.');
