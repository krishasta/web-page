import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../Comopnents/ThemeContext';

/**
 * BLog_main.jsx  — Blog Detail / Full Article Page
 * Receives blog data via react-router location.state (passed from Blog.jsx NavLink)
 *
 * Expected state shape:
 *   { id, title, author, date, preview, content: string[] }
 */
const BLog_main = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { dark } = useTheme();

    const blog = location.state;

    const colors = dark
        ? {
            sectionBg: 'radial-gradient(circle at center, #0a192f 0%, #020617 100%)',
            cardBg: 'rgba(13, 46, 90, 0.45)',
            cardBorder: '1px solid rgba(56, 189, 248, 0.3)',
            headingText: '#7dd3fc',
            bodyText: '#bae6fd',
            accent: '#38bdf8',
            metaText: 'rgba(186, 230, 253, 0.65)',
            btnBg: 'rgba(13, 46, 90, 0.6)',
            btnHover: 'rgba(56, 189, 248, 0.2)',
            divider: 'rgba(56, 189, 248, 0.2)',
        }
        : {
            sectionBg: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            cardBg: 'rgba(255, 255, 255, 0.7)',
            cardBorder: '1px solid rgba(186, 230, 253, 0.8)',
            headingText: '#0284c7',
            bodyText: '#0f172a',
            accent: '#0ea5e9',
            metaText: 'rgba(15, 23, 42, 0.55)',
            btnBg: 'rgba(255, 255, 255, 0.8)',
            btnHover: 'rgba(14, 165, 233, 0.15)',
            divider: 'rgba(186, 230, 253, 0.8)',
        };

    // If navigated directly without state, show a friendly fallback
    if (!blog) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center gap-6 p-10 pt-32"
                style={{ background: colors.sectionBg, color: colors.bodyText }}
            >
                <div className="text-6xl">📄</div>
                <h1 className="text-2xl font-black" style={{ color: colors.headingText }}>
                    Article Not Found
                </h1>
                <p className="opacity-70 text-center max-w-md">
                    This article could not be loaded. Please go back to the blog list and select an article.
                </p>
                <button
                    onClick={() => navigate('/blog')}
                    className="px-6 py-2 rounded-xl font-semibold transition-all duration-300"
                    style={{ background: colors.btnBg, border: colors.cardBorder, color: colors.accent }}
                    onMouseEnter={(e) => (e.target.style.background = colors.btnHover)}
                    onMouseLeave={(e) => (e.target.style.background = colors.btnBg)}
                >
                    ← Back to Blog
                </button>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen p-5 pt-32 pb-20 transition-colors duration-400"
            style={{ background: colors.sectionBg, color: colors.bodyText }}
        >
            {/* Back button */}
            <div className="max-w-4xl mx-auto mb-8">
                <button
                    onClick={() => navigate('/blog')}
                    className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300"
                    style={{ background: colors.btnBg, border: colors.cardBorder, color: colors.accent }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = colors.btnHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = colors.btnBg)}
                >
                    ← Back to Blog
                </button>
            </div>

            {/* Article card */}
            <article
                className="max-w-4xl mx-auto rounded-[2rem] backdrop-blur-md p-10 md:p-14"
                style={{ background: colors.cardBg, border: colors.cardBorder }}
            >
                {/* Title */}
                <h1
                    className="text-2xl font-black leading-snug mb-6"
                    style={{ color: colors.headingText }}
                >
                    {blog.title}
                </h1>

                {/* Divider */}
                <div
                    className="w-24 h-1 rounded-full mb-6"
                    style={{ background: colors.accent }}
                />

                {/* Meta: author & date */}
                <div className="flex flex-wrap gap-4 mb-8 text-sm font-medium" style={{ color: colors.metaText }}>
                    <span>✍️ {blog.author}</span>
                    <span>📅 {blog.date}</span>
                </div>

                {/* Divider */}
                <hr style={{ borderColor: colors.divider, marginBottom: '2rem' }} />

                {/* Preview / intro */}
                {blog.preview && (
                    <p
                        className="text-lg leading-8 font-medium mb-8 italic opacity-90"
                        style={{ color: colors.bodyText }}
                    >
                        {blog.preview}
                    </p>
                )}

                {/* Full content paragraphs + images */}
                {Array.isArray(blog.content) && blog.content.length > 0 && (
                    <div className="space-y-5">
                        {blog.content.map((item, i) => {
                            // ✅ Image block from Google Docs
                            if (item && item.type === 'image') {
                                return (
                                    <div key={i} className="flex justify-center my-6">
                                        <img
                                            src={item.src}
                                            alt={`Blog image ${i + 1}`}
                                            className="rounded-xl max-w-full"
                                            style={{
                                                maxHeight: '480px',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </div>
                                );
                            }
                            // ✅ Text paragraph
                            const text = item && item.type === 'text' ? item.value : item;
                            return (
                                <p key={i} className="leading-8" style={{ color: colors.bodyText }}>
                                    {text}
                                </p>
                            );
                        })}
                    </div>
                )}
            </article>
        </div>
    );
};

export default BLog_main;
