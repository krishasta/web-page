const fs = require('fs');
const path = require('path');

const dir = 'e:/krish-backup/Solve-webpage-main/Solve-webpage-main/solve/src/Portfilo_pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

const colorsSnippet = `
  const { dark } = useTheme();
  const colors = dark
    ? {
      sectionBg: "linear-gradient(160deg, #020c1b 0%, #051628 50%, #0a1f3c 100%)",
      cardBg: "rgba(13, 46, 90, 0.4)",
      cardBorder: "1.5px solid rgba(56, 189, 248, 0.3)",
      headingText: "#7dd3fc",
      bodyText: "#e0f2fe",
    }
    : {
      sectionBg: "linear-gradient(160deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 249, 255, 0.98) 50%, rgba(224, 242, 254, 0.98) 100%)",
      cardBg: "rgba(255, 255, 255, 0.6)",
      cardBorder: "1.5px solid rgba(186, 230, 253, 0.8)",
      headingText: "#0284c7",
      bodyText: "#0c4a6e",
    };
`;

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Add import if not present
    if (!content.includes('useTheme')) {
        content = content.replace("import React from 'react'", "import React from 'react';\\nimport { useTheme } from '../Comopnents/ThemeContext';");
    }

    // Add colors snippet
    if (!content.includes('useTheme()')) {
        content = content.replace(/const \w+ = \(\) => {\n/, \`$&\${colorsSnippet}\\n\`);
  }

  // Replace wrapper div
  content = content.replace(/<div className="bg-cyan-900 min-h-screen text-white py-10 px-4">/g, 
    '<div className="min-h-screen py-10 px-4 transition-colors duration-400" style={{ background: colors.sectionBg, color: colors.bodyText }}>');

  // Replace card div
  content = content.replace(/<div className="max-w-3xl mx-auto bg-cyan-800 p-6 rounded-lg shadow-lg">/g,
    '<div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-lg backdrop-blur-md transition-all duration-300" style={{ background: colors.cardBg, border: colors.cardBorder }}>');

  // Replace h1
  content = content.replace(/<h1 className="text-2xl font-bold mb-4 text-center">/g,
    '<h1 className="text-2xl font-bold mb-4 text-center transition-colors" style={{ color: colors.headingText }}>');

  // Replace image background
  content = content.replace(/className="w-full max-w-sm mx-auto block rounded-md mb-6 bg-white"/g,
    'className="w-full max-w-sm mx-auto block rounded-lg mb-6 shadow-md"');

  fs.writeFileSync(filePath, content);
});

console.log('Successfully updated', files.length, 'portfolio files.');
