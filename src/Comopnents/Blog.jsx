import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTheme } from "./ThemeContext";
import BlogNavigation from "./BlogNavigation";

const DOCS_PUB_URL = 'https://docs.google.com/document/d/e/2PACX-1vQWze0-QgbUTuMExio6eHNRHalNF8nFw8bRtgOTXOfCNMCgVf7LRZ6bNLxKy2OZ3HpBf-DnkxjuSbWO/pub';

function driveToDirectUrl(url) {
  // Try /file/d/FILE_ID/ format
  const fileMatch = url.match(/\/file\/d\/([^/]+)/);
  if (fileMatch) {
    return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w1200`;
  }
  // Try ?id=FILE_ID format
  const idMatch = url.match(/[?&]id=([^&]+)/);
  if (idMatch) {
    return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1200`;
  }
  return url;
}
function parseDocsHtml(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const elements = Array.from(doc.querySelectorAll('h1, h2, h3, p, hr, img'));
  const blogs = [];
  let current = null;
  elements.forEach((el) => {
    const tag = el.tagName.toLowerCase();
    const text = el.textContent.trim();

    if (tag === 'hr') {
      // Horizontal line = separator between blog posts
      if (current) blogs.push(current);
      current = null;
      return;
    }

    // Handle images inserted in Google Docs
    if (tag === 'img' && current) {
      const src = el.getAttribute('src');
      if (src) {
        current.content.push({ type: 'image', src });
      }
      return;
    }

    if (!text) return;

    if (tag === 'h1') {
      if (current) blogs.push(current);
      current = { title: text, author: '', date: '', preview: '', content: [] };
    } else if (tag === 'h2' && current) {
      current.author = text;
    } else if (tag === 'h3' && current) {
      current.date = text;
    } else if (tag === 'p' && current) {
      if (/^IMAGE:\s*/i.test(text)) {
        const rawUrl = text.replace(/^IMAGE:\s*/i, '').trim();
        const src = rawUrl.includes('drive.google.com')
          ? driveToDirectUrl(rawUrl)
          : rawUrl;
        current.content.push({ type: 'image', src });
        return;
      }
      //  Raw Google Drive URL pasted directly
      if (text.includes('drive.google.com')) {
        current.content.push({ type: 'image', src: driveToDirectUrl(text) });
        return;
      }
      //  General Image URL (WordPress, direct links, etc.)
      if (/\.(png|jpg|jpeg|gif|webp)(\?.*)?$/i.test(text)) {
        current.content.push({ type: 'image', src: text });
        return;
      }
      const clean = text.replace(/^PREVIEW:\s*/i, '');
      if (!current.preview) {
        current.preview = clean;
      } else {
        current.content.push({ type: 'text', value: clean });
      }
    }
  });

  if (current) blogs.push(current);
  return blogs.map((b, i) => ({ ...b, id: String(i + 1) }));
}
const Blog = () => {
  const { dark } = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Google Docs published /pub URLs support direct fetch (no proxy needed)
    fetch(DOCS_PUB_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch blog doc (${res.status})`);
        return res.text();
      })
      .then((html) => {
        const parsed = parseDocsHtml(html);
        setBlogs(parsed);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[Blog]', err);
        setError('Failed to load blogs. Make sure your Google Doc is published to web (File → Share → Publish to web).');
        setLoading(false);
      });
  }, []);
  const colors = dark
    ? {
      sectionBg: "radial-gradient(circle at center, #0a192f 0%, #020617 100%)",
      cardBg: "rgba(13, 46, 90, 0.4)",
      cardBorder: "1px solid rgba(56, 189, 248, 0.3)",
      headingText: "#7dd3fc",
      bodyText: "#bae6fd",
      accent: "#38bdf8",
      btnBg: "rgba(13, 46, 90, 0.6)",
      btnHover: "rgba(56, 189, 248, 0.2)",
    }
    : {
      sectionBg: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      cardBg: "rgba(255, 255, 255, 0.6)",
      cardBorder: "1px solid rgba(186, 230, 253, 0.8)",
      headingText: "#0284c7",
      bodyText: "#0f172a",
      accent: "#0ea5e9",
      btnBg: "rgba(255, 255, 255, 0.8)",
      btnHover: "rgba(14, 165, 233, 0.15)",
    };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-2xl"
        style={{ background: colors.sectionBg, color: colors.bodyText }}>
        Loading Analysis Reports...
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: colors.sectionBg, color: colors.bodyText }}>
        <div className="text-4xl">⚙️</div>
        <p className="font-bold text-xl">Setup Required</p>
        <p className="text-sm opacity-70 text-center max-w-md">{error}</p>
      </div>
    );
  };
  return (
    <div className='min-h-screen p-5 pt-32 transition-colors duration-400'
      style={{ background: colors.sectionBg, color: colors.bodyText }}>
      <BlogNavigation />
      <div className="flex justify-center mb-10 text-3xl font-black uppercase text-center"
        style={{ color: colors.headingText }}>
        <h1 className="text-4xl font-black tracking-tight mb-6 uppercase transition-colors"
          style={{ color: 'var(--text-primary)' }}>
          <span className="animate-float-blue">Latest</span> Articles
        </h1>
      </div>
      <div className="flex flex-wrap m-auto max-w-7xl">
        {blogs.map((item, index) => (
          <div key={item.id || index}
            className='mb-10 text-center p-5 flex-row rounded-xl backdrop-blur-md transition-all duration-300'
            style={{ background: colors.cardBg, border: colors.cardBorder }}>
            <h1 className='font-bold text-xl  transition-colors'
              style={{ color: colors.headingText }}>
              {item.title}
            </h1>
            <p className='mt-2 text-sm opacity-80'>{item.date}</p>
            <p className='leading-8 mt-3 mb-5'>{item.preview}</p>
            <NavLink
              to={`/blog_main/${item.id}`}
              state={item}
              className="p-2 px-4 rounded-lg mx-10 font-medium transition-all duration-300"
              style={{ background: colors.btnBg, border: colors.cardBorder, color: colors.accent }}
              onMouseEnter={(e) => e.target.style.background = colors.btnHover}
              onMouseLeave={(e) => e.target.style.background = colors.btnBg}
            >
              Read more
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Blog;