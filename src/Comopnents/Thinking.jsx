import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { useTheme } from './ThemeContext';
import BlogNavigation from './BlogNavigation';

// ──────────────────────────────────────────────────────────────────────────────
// 🔧 ONLY CHANGE THIS ONE LINE:
// Paste your Google Sheets published CSV URL here.
//
// HOW TO GET IT:
//   1. Open your Google Sheet
//   2. File → Share → Publish to web
//   3. Select "Sheet1" and "Comma-separated values (.csv)"
//   4. Click Publish → Copy the URL → paste it below
// ──────────────────────────────────────────────────────────────────────────────
const SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQRHG7txcM4lqZPX9_XWjcdGPCg6qgXWtqLAnSp82pSYqJkM59D4rWAygLIFmUyJJYGPn3TWy2-hAD1/pub?gid=0&single=true&output=csv';

// Converts Google Drive share link → direct download URL
function getDownloadUrl(driveLink) {
  if (!driveLink) return null;
  const match = driveLink.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (!match) return driveLink;
  return `https://drive.google.com/uc?export=download&id=${match[1]}`;
}

const Thinking = () => {
  const { dark } = useTheme();
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!SHEETS_CSV_URL || SHEETS_CSV_URL === 'PASTE_YOUR_CSV_URL_HERE') {
      setError('Paste your Google Sheets CSV URL into Thinking.jsx (SHEETS_CSV_URL on line 16)');
      setLoading(false);
      return;
    }

    Papa.parse(SHEETS_CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setPapers(result.data);
        setLoading(false);
      },
      error: (err) => {
        setError('Failed to load white papers. Check your Sheets URL.');
        setLoading(false);
      },
    });
  }, []);

  const colors = {
    sectionBg: 'var(--bg-primary)',
    cardBg: 'var(--surface)',
    cardBorder: 'var(--border)',
    headingText: 'var(--text-primary)',
    bodyText: 'var(--text-secondary)',
    accent: 'var(--primary)',
    btnBg: 'var(--surface)',
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-2xl"
        style={{ background: colors.sectionBg, color: colors.bodyText }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 rounded-full animate-spin"
            style={{ borderColor: 'var(--primary)', borderTopColor: 'transparent' }} />
          Loading White Papers...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-10"
        style={{ background: colors.sectionBg, color: colors.bodyText }}>
        <div className="text-5xl">⚙️</div>
        <p className="font-bold text-xl text-center" style={{ color: 'var(--text-primary)' }}>Setup Required</p>
        <p className="text-sm opacity-70 text-center max-w-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5 pt-32 transition-colors duration-400"
      style={{ background: colors.sectionBg, color: colors.bodyText }}>

      <BlogNavigation />

      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-black tracking-tight mb-6 uppercase transition-colors"
          style={{ color: 'var(--text-primary)' }}>
          <span className="animate-float-blue">White</span> Papers
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed font-medium opacity-80 mb-10"
          style={{ color: 'var(--text-secondary)' }}>
          Explore our thought leadership, technical documents, and in-depth research papers available for download.
        </p>

        {papers.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 opacity-60">
            <div className="text-6xl">📭</div>
            <p className="font-bold text-xl">No whitepapers yet</p>
            <p className="text-sm">Add rows to your Google Sheet — they appear here instantly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {papers.map((paper, index) => {
              const hasLink = Boolean(paper.driveLink);
              const downloadUrl = getDownloadUrl(paper.driveLink);

              return (
                <div key={index}
                  className="p-8 rounded-3xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 flex flex-col border"
                  style={{ background: colors.cardBg, borderColor: colors.accent, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>

                  <div className="text-5xl mb-6">{hasLink ? '📄' : '🔒'}</div>

                  <h2 className="text-2xl font-black mb-3 uppercase tracking-tight"
                    style={{ color: colors.headingText }}>
                    {paper.title}
                  </h2>

                  <p className="opacity-80 mb-8 text-sm leading-relaxed flex-1"
                    style={{ color: colors.bodyText }}>
                    {paper.desc}
                  </p>

                  {hasLink ? (
                    <div className="flex flex-col gap-3 mt-auto">
                      <a href={downloadUrl} target="_blank" rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl font-bold transition-all duration-300 w-full text-center tracking-wide uppercase text-sm border hover:scale-105 flex items-center justify-center gap-2"
                        style={{ background: colors.btnBg, color: colors.accent, borderColor: colors.accent }}>
                        ⬇ Download PDF
                      </a>
                      <a href={paper.driveLink} target="_blank" rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl font-bold transition-all duration-300 w-full text-center tracking-wide uppercase text-sm border hover:scale-105 flex items-center justify-center gap-2 opacity-70 hover:opacity-100"
                        style={{ borderColor: colors.cardBorder, color: colors.bodyText }}>
                        👁 Preview
                      </a>
                    </div>
                  ) : (
                    <div className="mt-auto px-6 py-3 rounded-xl font-bold w-full text-center uppercase text-sm border opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
                      style={{ borderColor: colors.cardBorder, color: colors.bodyText }}>
                      🔒 Coming Soon
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Thinking;
