import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const BlogNavigation = () => {
  const { dark } = useTheme();

  const colors = dark
    ? {
      cardBg: "rgba(13, 46, 90, 0.4)",
      cardBorder: "1px solid rgba(56, 189, 248, 0.3)",
      headingText: "#7dd3fc",
    }
    : {
      cardBg: "rgba(255, 255, 255, 0.6)",
      cardBorder: "1px solid rgba(186, 230, 253, 0.8)",
      headingText: "#0284c7",
    };

  return (
    <div className="max-w-5xl mx-auto mb-20 grid grid-cols-1 md:grid-cols-2 gap-10">
      <NavLink to="/blog" end className={({ isActive }) => `p-12 rounded-[2rem] border backdrop-blur-md text-center transition-all duration-300 ${isActive ? 'scale-105 shadow-[0_20px_40px_rgba(0,0,0,0.15)] ring-2 ring-[var(--primary)]' : 'hover:scale-105 opacity-80 hover:opacity-100'}`}
        style={{ background: colors.cardBg, borderColor: colors.cardBorder }}>
        <div className="text-5xl mb-6">📝</div>
        <h2 className="text-4xl font-black mb-4 uppercase tracking-tight" style={{ color: colors.headingText }}>Blog</h2>
        <p className="opacity-80 font-medium px-4">Stay updated with our latest articles, insights, and engineering updates.</p>
      </NavLink>

      <NavLink to="/thinking" className={({ isActive }) => `p-12 rounded-[2rem] border backdrop-blur-md text-center transition-all duration-300 ${isActive ? 'scale-105 shadow-[0_20px_40px_rgba(0,0,0,0.15)] ring-2 ring-[var(--primary)]' : 'hover:scale-105 opacity-80 hover:opacity-100'}`}
        style={{ background: colors.cardBg, borderColor: colors.cardBorder }}>
        <div className="text-5xl mb-6">💡</div>
        <h2 className="text-4xl font-black mb-4 uppercase tracking-tight" style={{ color: colors.headingText }}>WHITE PAPERS</h2>
        <p className="opacity-80 font-medium px-4">Deep dive into our engineering research, whitepapers, and guides.</p>
      </NavLink>
    </div>
  );
};

export default BlogNavigation;
