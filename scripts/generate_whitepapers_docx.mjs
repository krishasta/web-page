/**
 * generate_whitepapers_docx.mjs
 * Run with: node scripts/generate_whitepapers_docx.mjs
 *
 * Generates /public/whitepapers.docx
 * Place your actual PDF files in /public/whitepapers/ folder.
 *
 * WORD DOCUMENT STRUCTURE (per whitepaper):
 *   Heading 1  → Title
 *   Heading 2  → Short description
 *   Heading 3  → PDF filename  (e.g. system-architecture.pdf)
 *                The file must exist at /public/whitepapers/<filename>
 *   ─────────  → Separator between entries
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  BorderStyle,
} from "docx";
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Whitepaper Data ──────────────────────────────────────────────────────────
// Edit this array to add / remove / update whitepapers.
// 'pdf' = filename inside /public/whitepapers/ folder.
// If no PDF is ready yet, set pdf to "" or "coming-soon".
const whitepapers = [
  {
    title: "System Architecture Guide",
    desc: "Detailed guidelines and standards for resilient, scalable embedded system architecture used in industrial control applications.",
    pdf: "system-architecture.pdf",
  },
  {
    title: "Sustainable Electronics",
    desc: "Research paper on eco-friendly PCB manufacturing processes, material selection, and lifecycle impact assessment.",
    pdf: "sustainable-electronics.pdf",
  },
  {
    title: "Compliance Handbook",
    desc: "A whitepaper detailing EMC and safety compliance best practices for CE, FCC, and RoHS certified product development.",
    pdf: "https://drive.google.com/file/d/1-W1AQcrtWsg2YLMsvNr4YKm2913zeuht/view?usp=drive_link",
  },
];

// ─── Build Word Document ──────────────────────────────────────────────────────
function buildSeparator() {
  return new Paragraph({
    border: {
      bottom: {
        color: "4A90D9",
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
    spacing: { before: 300, after: 300 },
    children: [],
  });
}

const children = [];

whitepapers.forEach((wp, index) => {
  // Title → Heading 1
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({ text: wp.title, bold: true })],
    })
  );

  // Description → Heading 2
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: wp.desc })],
    })
  );

  // PDF filename → Heading 3
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      children: [new TextRun({ text: wp.pdf || "coming-soon" })],
    })
  );

  // Separator (except after last)
  if (index < whitepapers.length - 1) {
    children.push(buildSeparator());
  }
});

const doc = new Document({
  sections: [{ properties: {}, children }],
});

// ─── Ensure /public/whitepapers/ directory exists ─────────────────────────────
const wpDir = resolve(__dirname, "../public/whitepapers");
mkdirSync(wpDir, { recursive: true });


// ─── Write the .docx file ─────────────────────────────────────────────────────
const outputPath = resolve(__dirname, "../public/whitepapers.docx");

Packer.toBuffer(doc).then((buffer) => {
  writeFileSync(outputPath, buffer);
});
