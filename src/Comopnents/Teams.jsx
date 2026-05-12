import React, { useState, useEffect } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import Papa from "papaparse";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

const Teams = () => {
  const { dark } = useTheme();
  const [teamMembers, setTeamMembers] = useState([]);
  useEffect(() => {
    Papa.parse("/teams.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setTeamMembers(result.data);
      },
    });
  }, []);

  const socialIcons = [FaLinkedinIn];

  const colors = {
    sectionBg: "var(--bg-primary)",
    cardBg: "var(--surface)",
    cardBorder: "1px solid var(--border)",
    cardShadow: "var(--card-shadow)",
    headingText: "var(--text-primary)",
    bodyText: "var(--text-secondary)",
    subtitleText: "var(--primary)",
    accent: "var(--primary)",
    socialBg: "var(--surface)",
  };

  return (
    <div className="min-h-screen py-24 px-4 transition-colors duration-400" style={{ background: colors.sectionBg }}>

      {/* ── Header ── */}
      <div className="text-center mb-16">
        {/* <p className="text-xs font-bold tracking-[0.35em] uppercase mb-3 transition-colors" style={{ color: colors.subtitleText }}>
          The People Behind the Work
        </p> */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 uppercase transition-colors" style={{ color: "var(--text-primary)" }}>
          <span className="animate-float-blue">Our</span> Team
        </h1>
        {/* <div className="flex justify-center mt-5">
          <div className="h-[3px] w-20 rounded-full" style={{ background: dark ? "linear-gradient(to right, #38bdf8, #0ea5e9)" : "linear-gradient(to right, #7dd3fc, #2563eb)" }} />
        </div> */}
      </div>

      {/* ── Grid ── */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group flex flex-col rounded-[2.5rem] p-5 transition-all duration-500 hover:shadow-2xl"
              style={{
                background: colors.cardBg,
                border: colors.cardBorder,
                boxShadow: colors.cardShadow,
              }}
            >
              {/* Image Container - Clear by default, reveals details on hover */}
              <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden mb-6 bg-slate-100 dark:bg-slate-800">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-10 group-hover:blur-sm"
                />

                {/* "Come Top" Detail Reveal */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <p className="text-sm leading-relaxed font-medium mb-6 text-center line-clamp-6" style={{ color: colors.headingText }}>
                    {member.desc}
                  </p>

                  {/* Social icons */}
                  <div className="flex justify-center gap-3">
                    {socialIcons.map((Icon, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.2, color: "var(--primary)" }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 border shadow-sm"
                        style={{ borderColor: "var(--border)", background: "var(--surface)", color: colors.bodyText }}
                      >
                        <a href={`https://${member.linkedIn}`} target="_blank" rel="noopener noreferrer">
                          <Icon size={14} />
                        </a>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Identity Content - Fixed below image */}
              <div className="flex flex-col items-center text-center px-2">
                <h2 className="text-3xl font-black tracking-tight transition-colors mb-2" style={{ color: colors.headingText }}>
                  {member.name}
                </h2>
                <span className="text-base font-bold uppercase tracking-wider" style={{ color: colors.accent }}>
                  {member.role}
                </span>
                <div className="w-10 h-1 rounded-full mt-4 transition-all duration-500 group-hover:w-24" style={{ background: colors.accent }} />
              </div>
              {/* Bottom shimmer bar on hover */}
              <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 transition-all duration-500 ease-out z-20" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {teamMembers.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24 gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-t-[transparent] animate-spin" style={{ borderColor: dark ? "rgba(56, 189, 248, 0.3)" : "rgba(186, 230, 253, 0.8)", borderTopColor: colors.accent }} />
          <p className="font-medium tracking-wide transition-colors" style={{ color: colors.accent }}>Loading team members…</p>
        </div>
      )}
    </div>
  );
};

export default Teams;
