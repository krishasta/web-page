const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Check if sharp is installed, if not, install it.
try {
  require.resolve("sharp");
} catch (e) {
  console.log("Installing sharp...");
  execSync("npm install sharp", { stdio: "inherit" });
}

const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "public");
const PRODUCTS_DIR = path.join(PUBLIC_DIR, "images", "products");
const CSV_PATH = path.join(PUBLIC_DIR, "products.csv");

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

async function compressImages() {
  console.log("Scanning for images in", PRODUCTS_DIR);
  const files = await walkDir(PRODUCTS_DIR);
  
  const imageFiles = files.filter(f => f.match(/\.(png|jpe?g)$/i));
  console.log(`Found ${imageFiles.length} images to compress.`);

  let replacedCount = 0;

  for (const filePath of imageFiles) {
    const ext = path.extname(filePath);
    if (ext.toLowerCase() === '.webp') continue;

    const webpPath = filePath.replace(new RegExp(`${ext}$`, "i"), ".webp");
    
    console.log(`Compressing: ${path.basename(filePath)}...`);
    
    try {
      // Get metadata to check size
      const metadata = await sharp(filePath).metadata();
      
      let transform = sharp(filePath);
      
      // Resize if wider than 1920
      if (metadata.width > 1920) {
        transform = transform.resize({ width: 1920, withoutEnlargement: true });
      }
      
      await transform
        .webp({ quality: 80, effort: 6 })
        .toFile(webpPath);
        
      // Delete the original file to save space and ensure we only have webp
      fs.unlinkSync(filePath);
      replacedCount++;
      console.log(`✅ Converted to WebP: ${path.basename(webpPath)}`);
    } catch (err) {
      console.error(`❌ Error compressing ${filePath}:`, err);
    }
  }

  // Now update the CSV file
  if (fs.existsSync(CSV_PATH)) {
    console.log(`Updating ${CSV_PATH}...`);
    let csvContent = fs.readFileSync(CSV_PATH, "utf-8");
    
    // Replace .png, .jpg, .jpeg with .webp (case insensitive)
    csvContent = csvContent.replace(/\.png/gi, ".webp");
    csvContent = csvContent.replace(/\.jpg/gi, ".webp");
    csvContent = csvContent.replace(/\.jpeg/gi, ".webp");
    
    fs.writeFileSync(CSV_PATH, csvContent, "utf-8");
    console.log("✅ CSV updated successfully.");
  }

  console.log(`\n🎉 Finished processing! Converted ${replacedCount} images.`);
}

compressImages();
