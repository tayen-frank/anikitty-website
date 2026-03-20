import fs from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";

const catalogPath = path.join(
  "D:",
  "Cloud Storage",
  "OneDrive",
  "\u5927\u539f\u5171\u7528\u8cc7\u6599\u593e",
  "\u5546\u54c1",
  "\u76ee\u9304",
  "2024",
  "Anikitty Catalogue 2024_EN.pdf",
);

const outputDir = path.join(process.cwd(), "catalog-pages");

await fs.mkdir(outputDir, { recursive: true });

const buffer = await fs.readFile(catalogPath);
const parser = new PDFParse({ data: buffer });
const result = await parser.getScreenshot({ imageDataUrl: false, imageBuffer: true, desiredWidth: 1600 });

for (const page of result.pages) {
  const filename = path.join(outputDir, `page-${String(page.pageNumber).padStart(2, "0")}.png`);
  await fs.writeFile(filename, Buffer.from(page.data));
  console.log(`Saved ${filename}`);
}

await parser.destroy();
