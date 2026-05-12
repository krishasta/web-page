import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

const Portfolio = () => {
  const { dark } = useTheme();

  const colors = dark
    ? {
      sectionBg: "linear-gradient(160deg, #020c1b 0%, #051628 50%, #0a1f3c 100%)",
      cardBg: "rgba(13, 46, 90, 0.4)",
      cardBorder: "1.5px solid rgba(56, 189, 248, 0.3)",
      cardShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      headingText: "#7dd3fc",
      bodyText: "#e0f2fe",
      subtitleText: "#38bdf8",
      accent: "#38bdf8",
    }
    : {
      sectionBg: "linear-gradient(160deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 249, 255, 0.98) 50%, rgba(224, 242, 254, 0.98) 100%)",
      cardBg: "rgba(255, 255, 255, 0.6)",
      cardBorder: "1.5px solid rgba(186, 230, 253, 0.8)",
      cardShadow: "0 12px 40px rgba(14, 165, 233, 0.1)",
      headingText: "#0284c7",
      bodyText: "#0c4a6e",
      subtitleText: "#0ea5e9",
      accent: "#0284c7",
    };
  const images = [
    {
      title: "STM32F207 Development PCB",
      item: "https://solve.net.in/wp-content/uploads/2024/09/Picture8.jpg",
    },
    {
      title: "Solenoid Controller",
      item: "https://solve.net.in/wp-content/uploads/2024/09/Picture4-600x440.png",
    },
    {
      title: "Signal Converter",
      item: "https://solve.net.in/wp-content/uploads/2024/09/Picture2.png",
    },
    {
      title: "Nozzle Controller",
      item: "https://solve.net.in/product/nozzle-controller/",
    },
    {
      title: "Motor Protection Relay",
      item: "https://solve.net.in/product/nozzle-controller/",
    },
    {
      title: "Modbus to BACnet Converter",
      item: "https://solve.net.in/wp-content/uploads/2024/09/Picture6-600x319.png",
    },
    {
      title: "Inrush Limiter Relay",
      item: "https://solve.net.in/wp-content/uploads/2024/09/Picture5-600x361.png",
    },
    {
      title: "Analog Motor Controller",
      item: "https://solve.net.in/wp-content/uploads/2024/09/Picture1-600x288.png",
    },
    {
      title: "AC to DC Rectifier",
      item: "https://solve.net.in/wp-content/uploads/2024/09/Picture7.png",
    },
    {
      title: "5-Channel Opto Isolator",
      item: "https://solve.net.in/wp-content/uploads/2024/09/Picture9-600x321.jpg",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="min-h-screen pt-20 transition-colors duration-400" style={{ background: colors.sectionBg, color: colors.bodyText }}>
      {/* Section Heading */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-3xl font-extrabold tracking-wide transition-colors" style={{ color: colors.headingText }}>
          Portfolio
        </h1>
        <p className="mt-2 text-sm opacity-80">
          Our latest PCB designs & controllers
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-20">
        {images.map((i, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative rounded-2xl overflow-hidden 
                       transition-all duration-300 transform backdrop-blur-md"
            style={{
              background: colors.cardBg,
              border: colors.cardBorder,
              boxShadow: hoveredIndex === index ? colors.cardShadow : "none",
            }}
          >
            {/* Image */}
            <img
              src={i.item}
              alt={i.title}
              className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-2xl transform transition duration-500 hover:scale-105"
            />

            {/* Overlay Button */}
            <div
              className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500 ${hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
            >
              <button
                className="px-5 py-2 rounded-lg font-semibold shadow hover:bg-opacity-80 transition-colors"
                style={{
                  background: dark ? "rgba(56, 189, 248, 0.9)" : "rgba(14, 165, 233, 0.9)",
                  color: dark ? "#020c1b" : "#ffffff"
                }}
              >
                Read More
              </button>
            </div>

            {/* Title */}
            <h1 className="text-center py-4 font-semibold text-sm transition-colors" style={{ color: colors.headingText }}>
              {i.title}
            </h1>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
