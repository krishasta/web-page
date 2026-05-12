import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../Comopnents/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Topbar = () => {
  const { dark, setDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative border-b  ">

      <div
        className="px-6 md:px-16 py-2.5 md:py-3.5 fixed top-0 right-0 left-0 z-50 font-medium transition-all duration-500 backdrop-blur-xl shadow-lg"
        style={{
          backgroundColor: "var(--bg-primary)",
          backgroundImage: scrolled
            ? dark
              ? "linear-gradient(120deg, transparent 45%, rgba(75, 192, 247, 0.3) 100%)"
              : "linear-gradient(120deg, transparent 45%, rgba(178, 233, 255, 0.3) 100%)"
            : "none",
          opacity: 0.98,
          borderBottom: "1px solid var(--border)",
          color: "var(--text-primary)",
          boxShadow: scrolled
            ? "0 4px 24px rgba(56,189,248,0.20)"
            : "0 2px 12px rgba(56,189,248,0.08)",
        }}
      >
        <div className="max-w-[1800px] mx-auto relative flex items-center justify-between h-full">

          {/* Left: Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="cursor-pointer group flex items-center">
              <span className="solve-logo-text text-4xl uppercase transition-transform duration-300 group-hover:scale-105">SOLVE</span>
              {/* <span className="text-[10px] md:text-[12px] uppercase tracking-[0.2em] font-medium text-[var(--text-secondary)] -mt-1 opacity-80 group-hover:text-[var(--primary)] transition-colors">
              solutions simplified
            </span> */}
            </NavLink>
          </div>

          {/* Nav Links - Aligned to the Right */}
          <div className="hidden md:flex flex-1 justify-end pr-8">
            <ul className="flex gap-4 lg:gap-8 xl:gap-12 text-base tracking-wide items-center">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `transition-all duration-300 hover:text-[var(--primary)] whitespace-nowrap relative py-1 ${isActive ? "text-[var(--primary)] font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[var(--primary)]" : "text-[var(--text-secondary)]"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/product"
                  className={({ isActive }) =>
                    `transition-all duration-300 hover:text-[var(--primary)] whitespace-nowrap relative py-1 ${isActive ? "text-[var(--primary)] font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[var(--primary)]" : "text-[var(--text-secondary)]"
                    }`
                  }
                >
                  Portfolio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/service"
                  className={({ isActive }) =>
                    `transition-all duration-300 hover:text-[var(--primary)] whitespace-nowrap relative py-1 ${isActive ? "text-[var(--primary)] font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[var(--primary)]" : "text-[var(--text-secondary)]"
                    }`
                  }
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/blog"
                  className={({ isActive }) =>
                    `transition-all duration-300 hover:text-[var(--primary)] whitespace-nowrap relative py-1 ${isActive ? "text-[var(--primary)] font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[var(--primary)]" : "text-[var(--text-secondary)]"
                    }`
                  }
                >
                  Thinking
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/team"
                  className={({ isActive }) =>
                    `transition-all duration-300 hover:text-[var(--primary)] whitespace-nowrap relative py-1 ${isActive ? "text-[var(--primary)] font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[var(--primary)]" : "text-[var(--text-secondary)]"
                    }`
                  }
                >
                  Our Team
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `transition-all duration-300 hover:text-[var(--primary)] whitespace-nowrap relative py-1 ${isActive ? "text-[var(--primary)] font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[var(--primary)]" : "text-[var(--text-secondary)]"
                    }`
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right: Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDark(!dark)}
              className="hidden md:flex p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300 text-xl leading-none items-center justify-center border border-[var(--border)] hover:border-[var(--primary)] shadow-sm hover:shadow-md"
              aria-label="Toggle Theme"
            >
              {dark ? "☀️" : "🌙"}
            </button>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none text-2xl p-2 transition-transform duration-300"
                style={{ color: "var(--primary)", transform: isOpen ? "rotate(90deg)" : "rotate(0)" }}
              >
                {isOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute top-full left-0 right-0 -z-10 shadow-xl border-t"
              style={{
                background: "var(--bg-primary)",
                borderBottom: "1px solid var(--border)",
                borderColor: "var(--border)",
              }}
            >
              <ul className="flex flex-col p-6 gap-4 font-semibold text-sm">
                <li>
                  <NavLink
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block transition-all duration-300 ${isActive ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/service"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block transition-all duration-300 ${isActive ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
                      }`
                    }
                  >
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/product"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block transition-all duration-300 ${isActive ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
                      }`
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/blog"
                    className={({ isActive }) =>
                      `transition-all duration-300 hover:text-[var(--primary)] whitespace-nowrap relative py-1 ${isActive ? "text-[var(--primary)] font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[var(--primary)]" : "text-[var(--text-secondary)]"
                      }`
                    }
                  >
                    Thinking
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/team"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block transition-all duration-300 ${isActive ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
                      }`
                    }
                  >
                    Team
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block transition-all duration-300 ${isActive ? "text-[var(--primary)]" : "text-[var(--text-secondary)]"
                      }`
                    }
                  >
                    Contact Us
                  </NavLink>
                </li>
                <li className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="text-sm opacity-70">Switch Theme</span>
                  <button
                    onClick={() => setDark(!dark)}
                    className="p-3 rounded-xl bg-[var(--surface)] shadow-sm text-xl flex items-center justify-center border border-[var(--border)]"
                  >
                    {dark ? "☀️" : "🌙"}
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Topbar;
