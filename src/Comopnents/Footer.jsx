import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { useTheme } from "./ThemeContext";

const pages = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Services", to: "/service" },
  { label: "Thinking", to: "/thinking" },
  { label: "Product", to: "/product" },
  { label: "Our Team", to: "/team" },
  { label: "Contact Us", to: "/contact" },
];

const socials = [
  // { icon: <FaInstagram size={17} />, href: "#", label: "Instagram" },
  // { icon: <FaTwitter size={17} />, href: "", label: "Twitter" },
  { icon: <FaLinkedinIn size={17} />, href: "https://www.linkedin.com/in/solve-office-66a92540a", label: "LinkedIn" },
  { icon: <SiGmail size={17} />, href: "mailto:solveoffice19@gmail.com", label: "Gmail" },
];

const Footer = () => {
  const { dark } = useTheme();

  return (
    <footer
      className="py-10 px-6 transition-colors duration-300"
      style={{
        background: "var(--bg-primary)",
        borderTop: "1px solid var(--border)",
        color: "var(--text-secondary)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-black tracking-tighter animate-float-blue">SOLVE</h2>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Solutions Simplified</p>
        </div>

        {/* Page Links */}
        <div className="text-center md:text-left">
          {/* <h3
            className="font-bold mb-3 uppercase text-xs tracking-widest"
            style={{ color: "var(--text-primary)" }}
          >
            Pages
          </h3> */}
          {/* <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
            {pages.map(({ label, to }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm font-medium transition-colors hover:text-[var(--primary)]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul> */}
          <p className="text-xs mt-1 opacity-60">© {new Date().getFullYear()} Solve. All rights reserved.</p>

        </div>

        {/* Social Icons */}
        <div className="text-center md:text-left">
          <h3
            className="font-bold mb-3 uppercase text-xs tracking-widest"
            style={{ color: "var(--text-primary)" }}
          >
            Follow Us
          </h3>
          <div className="flex justify-center md:justify-start gap-3">
            {socials.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-all hover:scale-110"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--primary)",
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
