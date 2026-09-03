import sharp from "sharp";
import { readdirSync, mkdirSync, existsSync } from "fs";
import { join, extname, basename } from "path";

const INPUT_DIR = "./src/assets/images-source";
const OUTPUT_DIR = "./src/assets/images";
const QUALITY = 80;

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const files = readdirSync(INPUT_DIR).filter((file) =>
  [".png", ".jpg", ".jpeg"].includes(extname(file).toLowerCase())
);

async function convertAll() {
  if (files.length === 0) {
    console.log("Aucune image trouvée dans images-source/");
    return;
  }
  for (const file of files) {
    const inputPath = join(INPUT_DIR, file);
    const outputPath = join(OUTPUT_DIR, `${basename(file, extname(file))}.webp`);
    await sharp(inputPath).webp({ quality: QUALITY }).toFile(outputPath);
    console.log(`✓ ${file} → ${basename(outputPath)}`);
  }
  console.log(`\n${files.length} image(s) converties.`);
}

convertAll().catch((err) => {
  console.error("Erreur de conversion :", err);
  process.exit(1);
});