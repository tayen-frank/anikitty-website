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

const outputPath = path.join(process.cwd(), "catalog-extract.txt");

const buffer = await fs.readFile(catalogPath);
const parser = new PDFParse({ data: buffer });
const result = await parser.getText();

await fs.writeFile(outputPath, result.text, "utf8");
await parser.destroy();

console.log(`Pages: ${result.total}`);
console.log(`Words: ${result.text.split(/\s+/).filter(Boolean).length}`);
console.log(`Saved: ${outputPath}`);
