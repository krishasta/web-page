/**
 * generate_blogs_docx.mjs
 * Run with: node scripts/generate_blogs_docx.mjs
 *
 * This script reads the blog data and generates a structured blogs.docx
 * in the /public folder. Each blog entry uses Word heading styles so
 * mammoth.js can parse them cleanly in the browser.
 *
 * WORD DOCUMENT STRUCTURE (per blog post):
 *   Heading 1  → Blog Title
 *   Heading 2  → Author
 *   Heading 3  → Date
 *   Normal     → Preview paragraph text
 *   Normal     → (More full content paragraphs...)
 *   ─────────  → Horizontal rule (separator between posts)
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  BorderStyle,
} from "docx";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Blog Data ────────────────────────────────────────────────────────────────
// This mirrors the blog.csv content. Edit this array to add/remove/update blogs.
// When you add a new blog, just add a new object here and re-run the script.
const blogs = [
  {
    id: "1",
    title: "Circuit Probe #1: Analysis of a cascaded voltage divider",
    author: "Authors: S.Ashok, Ambarish Narendran, Keethana Sai Gazula",
    date: "October 12, 2024",
    preview:
      "A 10VAC power supply with a frequency of 50 Hz is used. The resistors are arranged in a combination of series and parallel or Cascaded Voltage Divider. Our objective is to determine the output voltage VOUT of the circuit. We can solve the circuit using various methods.",
    content: [
      "A 10VAC power supply with a frequency of 50 Hz is used. The resistors are arranged in a combination of series and parallel or Cascaded Voltage Divider.",
      "Our objective is to determine the output voltage VOUT of the circuit. We can solve the circuit using various methods including mesh analysis, nodal analysis, and Thevenin's theorem.",
      "The cascaded voltage divider is a fundamental building block in analog circuit design, commonly used in sensor conditioning, bias networks, and signal attenuation.",
    ],
  },
  {
    id: "2",
    title: "Half-Wave Rectification of 50 Hz Sine Wave: An Electrical Analysis",
    author: "Authors: S.Ashok, Ambarish Narendran",
    date: "September 27, 2024",
    preview:
      "In this work, a half-wave rectified sinusoidal waveform with a frequency of 50 Hz is analyzed in the time domain. The circuit in question carries out half-wave rectification, which transmits just the sinusoidal input's positive half-cycles.",
    content: [
      "In this work, a half-wave rectified sinusoidal waveform with a frequency of 50 Hz is analyzed in the time domain.",
      "The circuit in question carries out half-wave rectification, which transmits just the sinusoidal input's positive half-cycles. By computing the integral of a half-wave rectified sinusoidal function modulated by an exponential decay factor, we derive the key performance metrics.",
      "Half-wave rectification is the simplest form of rectification, converting AC to pulsating DC using a single diode. While inefficient compared to full-wave rectification, it remains widely used in low-cost, low-power applications.",
    ],
  },
  {
    id: "3",
    title: "What are signals, systems and transformations",
    author: "Author: S.Ashok",
    date: "August 15, 2024",
    preview:
      "In the modern world, the concepts of signals and systems play a fundamental role in shaping the technologies we use daily, from communication networks to control systems in cars and industrial machines.",
    content: [
      "In the modern world, the concepts of signals and systems play a fundamental role in shaping the technologies we use daily, from communication networks to control systems in cars and industrial machines.",
      "This blog aims to provide a straightforward explanation of signals, systems, and transformations, helping you grasp their importance in engineering and everyday technology.",
      "A signal is a function that conveys information about a phenomenon. In engineering, signals are typically mathematical functions of one or more independent variables. Systems process these signals to produce outputs, and transformations like the Fourier Transform allow us to analyze signals in different domains.",
    ],
  },
  {
    id: "4",
    title: "What is Bare-Metal Programming",
    author: "Author: S.Ashok",
    date: "March 2, 2024",
    preview:
      "In the world of embedded systems, bare-metal programming is a foundational skill that allows developers to write highly optimized code tailored to specific hardware without the use of an operating system.",
    content: [
      "In the world of embedded systems, bare-metal programming is a foundational skill that allows developers to write highly optimized code tailored to specific hardware.",
      "This approach focuses on programming directly on the hardware without the use of an operating system (OS). In this post, we'll explore the fundamentals of bare-metal programming, its advantages, and where it's commonly used.",
      "Bare-metal programming gives you direct access to hardware registers, interrupts, and peripherals. This results in minimal overhead, deterministic timing, and maximum performance — critical for real-time control systems, safety-critical applications, and resource-constrained devices.",
    ],
  },
  {
    id: "5",
    title: "What is Circuit?",
    author: "Author: S.Ashok",
    date: "December 5, 2023",
    preview:
      "Wherever two charges are connected by a conductor, a pathway for current flow exists; and if the charges are unequal, current flows from the negative to the positive charge.",
    content: [
      "Wherever two charges are connected by a conductor, a pathway for current flow exists; and if the charges are unequal, current flows from the negative to the positive charge.",
      "The amount of current flow depends on the voltage difference of the charges and the resistance of the conductor. If two charged plates are connected by a conductor, there will be a constant flow of current as long as the charges are maintained.",
      "An electric circuit is a closed loop through which electric current can flow. It consists of a source of EMF, conductors, and a load. Understanding circuits is the foundation of all electrical and electronics engineering.",
    ],
  },
  {
    id: "6",
    title: "What is Resistance?",
    author: "Author: S.Ashok",
    date: "March 10, 2023",
    preview:
      "The opposition to current flow is not the same for all materials. Current flow itself is the movement of free electrons through a material and the number of free electrons determines its opposition to current flow.",
    content: [
      "The opposition to current flow is not the same for all materials. Current flow itself is the movement of free electrons through a material and the number of free electrons in a material determines its opposition to current flow.",
      "Atoms of some materials give up their outer electrons easily and such materials offer very little resistance to current flow. Copper, for example, is an excellent conductor because it has many free electrons.",
      "Resistance is measured in Ohms (Ω). Ohm's Law states that V = IR, where V is voltage, I is current, and R is resistance. This fundamental relationship governs how all resistive components behave in a circuit.",
    ],
  },
  {
    id: "7",
    title: "What is Current?",
    author: "Author: S.Ashok",
    date: "September 10, 2022",
    preview:
      "Electrons in the outer orbits of an atom are attracted to the nucleus by less force than electrons whose orbits are near the nucleus. These outer electrons may be easily forced from their orbits.",
    content: [
      "Electrons in the outer orbits of an atom are attracted to the nucleus by less force than electrons whose orbits are near the nucleus. These outer electrons may be easily forced from their orbits while electrons in the inner orbits are called bound electrons since they cannot be forced out of their orbits.",
      "Electric current is the flow of electric charge through a conductor. It is measured in Amperes (A). Conventional current flows from positive to negative, while electron flow is actually from negative to positive.",
      "There are two types of current: Direct Current (DC) where electrons flow in one direction, and Alternating Current (AC) where the direction reverses periodically. Both have important applications in modern electrical systems.",
    ],
  },
  {
    id: "8",
    title: "What is Electricity?",
    author: "Author: S.Ashok",
    date: "May 18, 2022",
    preview:
      "Electrons travel around the nucleus of an atom and are held in their orbits by the attraction of the positive charge in the nucleus. If somehow we force an electron out of its orbit, the electron's action becomes what is known as electricity.",
    content: [
      "Electrons travel around the nucleus of an atom and are held in their orbits by the attraction of the positive charge in the nucleus. If somehow force an electron out of its orbit, then the electron's action would become what is known as electricity.",
      "Six sources of electricity: To produce electricity some form of energy must be used to force electrons out of their orbits. The six sources include friction, pressure, heat, light, magnetism, and chemical action.",
      "Electricity powers virtually every aspect of modern civilization, from lighting and heating to computing and communication. Understanding its fundamental nature — the movement of electrons — is the first step to mastering electrical engineering.",
    ],
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

blogs.forEach((blog, index) => {
  // Title → Heading 1
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      children: [new TextRun({ text: blog.title, bold: true })],
    })
  );

  // Author → Heading 2
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      children: [new TextRun({ text: blog.author, italics: true })],
    })
  );

  // Date → Heading 3
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      children: [new TextRun({ text: blog.date })],
    })
  );

  // Preview → first Normal paragraph (marked with PREVIEW: prefix internally)
  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: "PREVIEW: ", bold: true }),
        new TextRun({ text: blog.preview }),
      ],
    })
  );

  // Full content paragraphs
  blog.content.forEach((para) => {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: para })],
        spacing: { before: 120, after: 120 },
      })
    );
  });

  // Separator between blogs (except after the last one)
  if (index < blogs.length - 1) {
    children.push(buildSeparator());
  }
});

const doc = new Document({
  sections: [
    {
      properties: {},
      children,
    },
  ],
});

// ─── Write File ───────────────────────────────────────────────────────────────
const outputPath = resolve(__dirname, "../public/blogs.docx");

Packer.toBuffer(doc).then((buffer) => {
  writeFileSync(outputPath, buffer);

});
