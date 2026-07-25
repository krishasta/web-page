import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";
const system_architecture = "/images/services/system architecture.jpg.webp";
const industrial_design = "/images/services/industrial design.jpg.webp";
const electronics_design = "/images/services/electronics design.jpg.webp";
const project_management = "/images/services/project mgmt.jpg.webp";
const manufacturing = "/images/services/manufacturing.jpg.webp";
const compliance_testing = "/images/services/compliance.jpg.webp";
const turnkey_solutions = "/images/services/turnkey.jpg.webp";
const software_development = "/images/services/software development.jpg.webp";
const sa = "/images/services/sa.webp";
const ed = "/images/services/ed.webp";
const sd = "/images/services/sd.webp";
const pm = "/images/services/pm.webp";
const mfg = "/images/services/mfg.webp";
const ct = "/images/services/ct.webp";
const ts = "/images/services/ts.webp";
const id = "/images/services/id.webp";
const Service = () => {
  const { dark } = useTheme();
  const [hover, setHover] = useState(null);
  const services = [
    {
      title: "System Architecture",
      points: [
        "System architecture definition and design",
        "Functional block diagram development",
        "Design validation and feasibility analysis",
      ],
      img: system_architecture,
      img2: sa,
    },

    {
      title: "Software Development",
      points: [
        "Embedded software for custom controllers",
        "Desktop applications, GUIs, and database systems",
        "Mobile and web application development",
      ],
      img: software_development,
      img2: sd,
    },
    {
      title: "Industrial Design",
      points: [
        "Mechanical design and component development",
        "Complete product industrial design",
      ],
      img: industrial_design,
      img2: id,
    },
    {
      title: "Electronics Design",
      points: [
        "Circuit design and schematic capture",
        "PCB design and layout",
        "PCB panelization and manufacturing optimization",
      ],
      img: electronics_design,
      img2: ed,
    },
    {
      title: "Project Management",
      points: [
        "Product specification development",
        "Technology and innovation consulting",
        "Component sourcing and vendor coordination",
        "IP and patent advisory support"
      ],
      img: project_management,
      img2: pm,
    },
    {
      title: "Manufacturing",
      points: [
        "Bill of Materials (BOM) development and sourcing",
        "Rapid prototyping",
        "Production of mechanical components and enclosures",
      ],
      img: manufacturing,
      img2: mfg,
    },
    {
      title: "Compliance Testing",
      points: [
        "EMC and safety compliance testing",
        "Development of detailed compliance plans",
        "Pre-compliance testing and coordination",
        "Compliance management with certified test laboratories",
        "Production yield testing"
      ],
      img: compliance_testing,
      img2: ct,
    },
    {
      title: "Turnkey Solutions",
      points: [
        "End-to-end product development from concept to production",
        "Fully integrated design, development, and manufacturing services",
      ],
      img: turnkey_solutions,
      img2: ts,
    },
  ];
  const colors = {
    sectionBg: "var(--bg-primary)",
    cardBg: "var(--surface)",
    cardBorder: "1px solid var(--border)",
    cardShadow: "var(--card-shadow)",
    headingText: "var(--primary)",
    bodyText: "var(--text-secondary)",
    subtitleText: "var(--primary)",
    accent: "var(--accent)",
  };

  return (
    <section
      className="min-h-screen py-24 px-4 transition-colors duration-400"
      style={{ background: colors.sectionBg }}
    >
      {/* ── Header ── */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl font-black tracking-tight mb-6 uppercase transition-colors" >
          <span className="animate-float-blue" style={{ color: "var(--primary)" }}>Our</span> Services
        </h1>
        <h3 className="text-xl font-semibold mb-4 transition-colors" style={{ color: "var(--primary)" }}>
          Need help creating a complete, assembled electronics product?
        </h3>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed font-medium opacity-80 transition-colors" style={{ color: "var(--text-secondary)" }}>
          We provide integrated design, engineering, compliance, testing and
          production services to help get you from concept to market.
        </p>
        {/* <div className="flex justify-center mt-5">
          <div className="h-[3px] w-20 rounded-full" style={{ background: "var(--primary)" }} />
        </div> */}
      </div>

      {/* ── Services Grid ── */}
      <div className="max-w-7xl mx-auto grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))] px-2 sm:px-4 lg:px-10">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(null)}
            className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 max-w-[420px] w-full mx-auto hover:shadow-xl backdrop-blur-md"
            style={{
              background: colors.cardBg,
              border: colors.cardBorder,
              boxShadow: colors.cardShadow,
            }}
          >
            <div className="flex flex-col flex-1 p-6">
              {/* Image with smooth CSS crossfade */}
              <div className="relative w-full h-56 rounded-xl overflow-hidden mb-5 flex items-center justify-center">
                {/* Primary Image - stays behind */}
                <img
                  src={service.img}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Secondary Image - fades in on hover */}
                <img
                  src={service.img2}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-contain opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold tracking-tight text-left mb-2 transition-colors uppercase " style={{ color: colors.headingText }}>
                {service.title}
              </h2>

              {/* Divider */}
              <div className="w-10 h-px mb-4" style={{ background: "var(--border)" }} />

              {/* Points */}
              <ul className="space-y-2 flex-1">
                {service.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm transition-colors font-medium" style={{ color: colors.bodyText }}>
                    <span className="mt-[5px] w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: "var(--primary)" }} />
                    {point}
                  </li>
                ))}
              </ul>
              {/* Sections badge — consistent with ProductMain & Teams */}
              {/* <div className="mt-5 flex justify-center">
                <span className="px-5 py-2 text-sm font-semibold rounded-md shadow-sm transition-colors border"
                  style={{
                    background: colors.cardBg,
                    color: colors.accent,
                    borderColor: colors.cardBorder,
                  }}>
                  Learn More
                </span>
              </div> */}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Service;
