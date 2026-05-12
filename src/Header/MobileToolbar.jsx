import { NavLink } from "react-router-dom";
import { FaHome, FaServicestack, FaBoxOpen, FaUsers, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const MobileToolbar = () => {
  const navItems = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "/service", icon: <FaServicestack />, label: "Services" },
    { to: "/product", icon: <FaBoxOpen />, label: "Products" },
    { to: "/team", icon: <FaUsers />, label: "Team" },
    { to: "/contact", icon: <FaEnvelope />, label: "Contact" },
  ];

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-sm"
    >
      {/* <div
        className="flex items-center justify-around p-2 rounded-2xl backdrop-blur-xl border shadow-2xl transition-colors duration-300"
        style={{
          background: "var(--bg-primary)",
          opacity: 0.95,
          borderColor: "var(--border)",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.3)"
        }}
      > */}
      {/* {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${
                isActive 
                ? "text-[var(--primary)] scale-110 bg-[var(--primary)]/10" 
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`
            }
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </NavLink>
        ))} */}
      {/* </div> */}
    </motion.div>
  );
};

export default MobileToolbar;
