import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Main from "./Main";
import { useTheme } from "./ThemeContext";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

import image from "../../public/images/Main image/mission.jpg.jpeg"
import image2 from "../../public/images/Main image/vision.jpg.jpeg"
import image3 from "../../public/images/Main image/passion.jpg.jpeg"
import valuesImage from "../../public/images/Main image/values.jpg.jpeg"
const Home = () => {
  const { dark } = useTheme();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.01 };

  // Vision Transforms (Directly mapped to scroll for responsiveness)
  const visionOpacity = useTransform(scrollYProgress, [0, 0.05, 0.30, 0.40], [1, 1, 1, 0]);
  const visionScale = useTransform(scrollYProgress, [0, 0.05, 0.30, 0.40], [1, 1, 1, 0.95]);
  const visionY = useTransform(scrollYProgress, [0, 0.40], [0, -50]);

  // Mission Transforms
  const missionOpacity = useTransform(scrollYProgress, [0.30, 0.40, 0.63, 0.73], [0, 1, 1, 0]);
  const missionScale = useTransform(scrollYProgress, [0.30, 0.40, 0.63, 0.73], [0.95, 1, 1, 0.95]);
  const missionY = useTransform(scrollYProgress, [0.30, 0.73], [50, -50]);

  // Passion Transforms
  const passionOpacity = useTransform(scrollYProgress, [0.63, 0.73, 0.95, 1], [0, 1, 1, 1]);
  const passionScale = useTransform(scrollYProgress, [0.63, 0.73, 0.95, 1], [0.95, 1, 1, 1]);
  const passionY = useTransform(scrollYProgress, [0.63, 1], [50, 0]);

  // Oscilloscope wave scroll movement (Physics-based smoothing)
  const scrollSpring = useSpring(scrollYProgress, springConfig);
  const waveX1 = useTransform(scrollSpring, [0, 1], ["0%", "-50%"]);
  const waveX2 = useTransform(scrollSpring, [0, 1], ["-10%", "-40%"]);
  const waveX3 = useTransform(scrollSpring, [0, 1], ["-20%", "-60%"]);
  const waveX4 = useTransform(scrollSpring, [0, 1], ["-5%", "-45%"]);

  const values = [
    { title: "Curiosity & Continuous Learning", desc: "We view learning as a lifelong journey. Our team continuously evolves, driven by curiosity and a commitment to mastering emerging technologies and methodologies." },
    { title: "Trust & Integrity", desc: "Trust is fundamental to everything we do. We build lasting relationships through transparency, honesty, and a consistent commitment to delivering on our promises." },
    { title: "Logical Precision", desc: "We approach every challenge with clarity and structured thinking. By applying strong logical principles, we develop solutions that are reliable, efficient, and well-engineered." },
    { title: "Eco-Friendliness", desc: "We are committed to designing solutions that minimize environmental impact. Sustainability is considered at every stage, ensuring our technology aligns with responsible and conscious engineering practices." },
    { title: "Simplicity in Design", desc: "We believe simplicity is the essence of effective engineering. Our designs focus on clarity, efficiency, and usability—delivering solutions that are both elegant and practical." },
    { title: "Holistic Approach", desc: "We consider technical, creative, and ethical perspectives in every project. This integrated approach enables us to deliver well-rounded solutions that create meaningful value." },
  ];

  const client_img = [
    { img: '/brand/logo.jpg', name: "Vaarii" },
    { img: '/brand/GEN-NXT.png', name: "GEN-NXT" },
    { img: '/brand/KIDDE.webp', name: "KIDDE" },
    { img: '/brand/ved1.png', name: "VED" },
    { img: '/brand/Nova.png', name: "Nova" },

  ];

  const colors = {
    sectionBg: "var(--bg-primary)",
    cardBg: "var(--surface)",
    cardBorder: "1px solid var(--border)",
    cardShadow: "var(--card-shadow)",
    cardText: "var(--text-secondary)",
    headingText: "var(--text-primary)",
    accentText: "var(--primary)",
    accent2Text: "var(--accent)",
    bodyText: "var(--text-secondary)",
    titleUnder: "var(--primary)",
    clientCardBg: "var(--surface)",
    imgShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  };

  const cardStyle = {
    background: colors.cardBg,
    border: colors.cardBorder,
    boxShadow: colors.cardShadow,
    color: colors.cardText,
    transition: "background 0.4s, border 0.4s, box-shadow 0.4s",
    backdropFilter: "blur(12px) saturate(180%)",
    WebkitBackdropFilter: "blur(12px) saturate(180%)",
  };

  // Oscilloscope sine wave path generator
  // amplitude: px, cycles: number of full waves, width: viewBox width, cy: center Y, vbH: viewBox height
  const sineWavePath = (cycles, amplitude, cy, vbW, vbH) => {
    const points = [];
    const steps = vbW * 2;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * vbW;
      const y = cy - amplitude * Math.sin((i / steps) * cycles * 2 * Math.PI);
      points.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return points.join(' ');
  };

  // Precompute wave paths (4 cycles across the wide SVG)
  const wave1Path = sineWavePath(8, 90, 300, 2400, 600);
  const wave2Path = sineWavePath(8, 60, 300, 2400, 600);
  const wave3Path = sineWavePath(16, 40, 300, 2400, 600);
  const wave4Path = sineWavePath(4, 200, 300, 2400, 600);
  const wave5Path = sineWavePath(12, 50, 300, 2400, 600);
  const wave6Path = sineWavePath(10, 45, 300, 2400, 600);

  // SVG filter id for glow effect
  const glowFilterId = "oscilloscope-glow";

  return (
    <>
      {/* ─── Hero Section ─── */}
      <div className="h-screen font-medium">
        <div className="relative h-full w-full overflow-hidden border-none">
          <Main />
        </div>
      </div>

      {/* ─── Scrolling Content Wrapper ─── */}
      <div className="min-h-screen pb-10">
        <div className="relative">

          {/* ── Center-Locked Reveal Section (Immersive Slides) ── */}
          {/* Desktop Version: Sticky Scroll (Visible on Extra Large Screens) */}
          <div className="hidden xl:block">
            <div ref={containerRef} className="relative h-[300vh] md:h-[400vh]">
              <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* ── Oscilloscope Background Panel ── */}
                <div className="relative w-[92%] lg:w-[85%] h-[85vh] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] bg-[var(--bg-secondary)]">

                  {/* Decorative blobs for Light Mode */}
                  {!dark && (
                    <>
                      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px]" />
                      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-400/10 rounded-full blur-[120px]" />
                      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-cyan-400/10 rounded-full blur-[100px]" />
                    </>
                  )}

                  {/* ── SVG Defs: Glow Filters ── */}
                  <svg width="0" height="0" style={{ position: 'absolute' }}>
                    <defs>
                      <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="8" result="blur1" />
                        <feGaussianBlur stdDeviation="16" result="blur2" />
                        <feMerge>
                          <feMergeNode in="blur2" />
                          <feMergeNode in="blur1" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <filter id="glow-tight" x="-10%" y="-10%" width="120%" height="120%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                  </svg>

                  {/* ── Oscilloscope Grid Overlay ── */}
                  {/* <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-0"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  style={{ opacity: dark ? 0.12 : 0.07 }}
                >
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#3b82f6" strokeWidth="0.6" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="#3b82f6" strokeWidth="0.6" />
                  {Array.from({ length: 11 }, (_, i) => (
                    <line key={`v${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="#3b82f6" strokeWidth="0.3" />
                  ))}
                  {Array.from({ length: 11 }, (_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="#3b82f6" strokeWidth="0.3" />
                  ))}
                </svg> */}

                  {/* ── Scroll-Animated Oscilloscope Waves ── */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

                    {/* Wave 1 — Primary large sine, bright blue glow */}
                    <motion.div
                      className="absolute top-[5%] h-[55%] w-[200%]"
                      style={{ x: waveX1 }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 2400 600" preserveAspectRatio="none">
                        {/* Outer halo */}
                        <path d={wave1Path} stroke="#1d4ed8" strokeWidth="20" fill="none" opacity="0.15"
                          style={{ filter: "blur(18px)" }} />
                        {/* Mid glow */}
                        <path d={wave1Path} stroke="#2563eb" strokeWidth="8" fill="none" opacity="0.35"
                          filter={`url(#${glowFilterId})`} />
                        {/* Sharp bright core */}
                        <path d={wave1Path} stroke="#93c5fd" strokeWidth="2.5" fill="none" opacity="1"
                          filter="url(#glow-tight)" />
                        {/* Ultra-thin white hotline */}
                        <path d={wave1Path} stroke="#dbeafe" strokeWidth="1" fill="none" opacity="0.9" />
                      </svg>
                    </motion.div>

                    {/* Wave 2 — Secondary sine, slightly offset, deeper blue */}
                    <motion.div
                      className="absolute top-[30%] h-[45%] w-[200%]"
                      style={{ x: waveX2 }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 2400 600" preserveAspectRatio="none">
                        {/* Outer halo */}
                        <path d={wave2Path} stroke="#1e3a8a" strokeWidth="16" fill="none" opacity="0.18"
                          style={{ filter: "blur(14px)" }} />
                        {/* Mid glow */}
                        <path d={wave2Path} stroke="#3b82f6" strokeWidth="6" fill="none" opacity="0.4"
                          filter={`url(#${glowFilterId})`} />
                        {/* Sharp bright core */}
                        <path d={wave2Path} stroke="#60a5fa" strokeWidth="2" fill="none" opacity="1"
                          filter="url(#glow-tight)" />
                        {/* Ultra-thin white hotline */}
                        <path d={wave2Path} stroke="#bfdbfe" strokeWidth="0.8" fill="none" opacity="0.85" />
                      </svg>
                    </motion.div>

                    {/* Wave 3 — High-frequency fine detail wave */}
                    <motion.div
                      className="absolute top-[20%] h-[60%] w-[200%]"
                      style={{ x: waveX3 }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 2400 600" preserveAspectRatio="none">
                        <path d={wave3Path} stroke="#1d4ed8" strokeWidth="4" fill="none" opacity="0.2"
                          style={{ filter: "blur(6px)" }} />
                        <path d={wave3Path} stroke="#6b9fff" strokeWidth="1.2" fill="none" opacity="0.5"
                          filter="url(#glow-tight)" />
                      </svg>
                    </motion.div>

                    {/* Wave 5 — Additional thin overlapping wave */}
                    <motion.div
                      className="absolute top-[22%] h-[56%] w-[200%]"
                      style={{ x: waveX2 }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 2400 600" preserveAspectRatio="none">
                        <path d={wave5Path} stroke="#93c5fd" strokeWidth="1" fill="none" opacity="0.65"
                          filter="url(#glow-tight)" />
                      </svg>
                    </motion.div>

                    {/* Wave 6 — Additional thin intersecting wave */}
                    <motion.div
                      className="absolute top-[18%] h-[64%] w-[200%]"
                      style={{ x: waveX1 }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 2400 600" preserveAspectRatio="none">
                        <path d={wave6Path} stroke="#bfdbfe" strokeWidth="0.8" fill="none" opacity="0.75"
                          filter="url(#glow-tight)" />
                      </svg>
                    </motion.div>

                    {/* Wave 4 — Deep ambient slow wave, huge amplitude */}
                    <motion.div
                      className="absolute top-[0%] h-[100%] w-[200%]"
                      style={{ x: waveX4 }}
                    >
                      <svg width="100%" height="100%" viewBox="0 0 2400 600" preserveAspectRatio="none">
                        {/* Soft ambient glow body */}
                        <path d={wave4Path} stroke="#1e40af" strokeWidth="60" fill="none" opacity="0.06"
                          style={{ filter: "blur(40px)" }} />
                        <path d={wave4Path} stroke="#3b82f6" strokeWidth="20" fill="none" opacity="0.04"
                          style={{ filter: "blur(20px)" }} />
                      </svg>
                    </motion.div>

                  </div>

                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/10 via-transparent to-[var(--bg-primary)]/80 opacity-50 pointer-events-none z-0" />
                </div>

                {/* ── Our Vision Slide ── */}
                <motion.div
                  style={{ opacity: visionOpacity, scale: visionScale, y: visionY }}
                  className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-16 px-6 lg:px-24"
                >
                  <div className="lg:w-[42%] flex justify-center">
                    <img src={image2} alt="Vision" className="rounded-3xl max-w-full h-auto shadow-2xl" style={{ boxShadow: colors.imgShadow }} />
                  </div>
                  <div className="lg:w-[42%] text-center lg:text-left p-10 md:p-14 rounded-[2.5rem] border border-white/20 backdrop-blur-md"
                    style={{ ...cardStyle, background: dark ? "rgba(15, 23, 42, 0.3)" : "rgba(255, 255, 255, 0.6)" }}>
                    <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent uppercase tracking-tight">Our Vision</h2>
                    <p className="leading-relaxed text-base font-medium" style={{ color: colors.cardText }}>
                      <span className=" font-black animate-float-blue uppercase">At Solve</span>, we envision a future where engineering integrates creativity, logic, and sustainability to deliver impactful solutions. We specialize in designing custom electronic systems that combine innovation with a strong foundation in scientific principles. Our focus is on developing technology that serves society, aligns with environmental responsibility, and supports a more connected and sustainable world.
                    </p>
                  </div>
                </motion.div>

                {/* ── Our Mission Slide ── */}
                <motion.div
                  style={{ opacity: missionOpacity, scale: missionScale, y: missionY }}
                  className="absolute inset-0 flex flex-col-reverse lg:flex-row items-center justify-center gap-16 px-6 lg:px-24"
                >
                  <div className="lg:w-[42%] text-center lg:text-left p-10 md:p-14 rounded-[2.5rem] border border-white/20 backdrop-blur-md"
                    style={{ ...cardStyle, background: dark ? "rgba(15, 23, 42, 0.3)" : "rgba(255, 255, 255, 0.6)" }}>
                    <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent uppercase tracking-tight">Our Mission</h2>
                    <p className="leading-relaxed text-base font-medium" style={{ color: colors.cardText }}>
                      <span className="font-black animate-float-blue uppercase">At Solve</span>, our mission is to deliver custom electronic solutions that combine precision, innovation, and purpose. We simplify complex challenges through thoughtful design and advanced technology, guided by strong engineering principles and ethical responsibility. We are committed to quality, transparency, and continuous learning, with a focus on creating environmentally responsible and sustainable solutions.
                    </p>
                  </div>
                  <div className="lg:w-[42%] flex justify-center">
                    <img src={image} alt="Mission" className="rounded-3xl max-w-full h-auto shadow-2xl" />
                  </div>
                </motion.div>

                {/* ── Our Passion Slide ── */}
                <motion.div
                  style={{ opacity: passionOpacity, scale: passionScale, y: passionY }}
                  className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-16 px-6 lg:px-24"
                >
                  <div className="lg:w-[42%] flex justify-center relative group">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                    <img src={image3} alt="Passion" className="rounded-3xl max-w-full h-auto shadow-2xl relative z-10 border border-white/20" />
                  </div>
                  <div className="lg:w-[42%] text-center lg:text-left p-10 md:p-14 rounded-[2.5rem] border border-white/40 backdrop-blur-xl relative"
                    style={{
                      ...cardStyle,
                      background: dark ? "rgba(15, 23, 42, 0.4)" : "rgba(255, 255, 255, 0.7)",
                      border: `1px solid ${dark ? 'var(--accent)' : 'rgba(37, 99, 235, 0.2)'}`,
                      boxShadow: dark ? '0 0 30px rgba(56, 189, 248, 0.1)' : '0 20px 40px -10px rgba(0, 0, 0, 0.05)'
                    }}>
                    {!dark && <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />}
                    <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent uppercase tracking-tight">Our Passion</h2>
                    <p className="leading-relaxed text-base font-medium" style={{ color: colors.cardText }}>
                      <span className="font-black animate-float-blue uppercase">At Solve</span>, we are committed to logical problem-solving and the transformative power of engineering. By combining analytical thinking with creative ingenuity, we deliver solutions that are both effective and purposeful. Continuous learning drives our innovation, and every design is an opportunity to create a meaningful impact on industries, people, and the environment.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Version: Swiper (Visible on screens smaller than XL) */}
          <div className="xl:hidden px-6 py-20">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              className="rounded-[2.5rem] overflow-hidden"
            >
              <SwiperSlide>
                <div className="flex flex-col items-center gap-8 p-10 rounded-[2.5rem] border border-white/20 backdrop-blur-md" style={{ background: dark ? "rgba(15, 23, 42, 0.3)" : "rgba(255, 255, 255, 0.6)" }}>
                  <img src={image2} alt="Vision" className="rounded-2xl w-full h-48 object-cover shadow-lg" />
                  <h2 className="text-3xl font-black bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent uppercase tracking-tight">Our Vision</h2>
                  <p className="text-sm font-medium leading-relaxed opacity-90" style={{ color: colors.cardText }}>
                    <span className="font-black animate-float-blue uppercase">At Solve</span>, we envision a future where engineering integrates creativity, logic, and sustainability to deliver impactful solutions.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col items-center gap-8 p-10 rounded-[2.5rem] border border-white/20 backdrop-blur-md" style={{ background: dark ? "rgba(15, 23, 42, 0.3)" : "rgba(255, 255, 255, 0.6)" }}>
                  <img src={image} alt="Mission" className="rounded-2xl w-full h-48 object-cover shadow-lg" />
                  <h2 className="text-3xl font-black bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent uppercase tracking-tight">Our Mission</h2>
                  <p className="text-sm font-medium leading-relaxed opacity-90" style={{ color: colors.cardText }}>
                    <span className="font-black animate-float-blue uppercase">At Solve</span>, our mission is to deliver custom electronic solutions that combine precision, innovation, and purpose.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex flex-col items-center gap-8 p-10 rounded-[2.5rem] border border-white/20 backdrop-blur-md" style={{ background: dark ? "rgba(15, 23, 42, 0.3)" : "rgba(255, 255, 255, 0.6)" }}>
                  <img src={image3} alt="Passion" className="rounded-2xl w-full h-48 object-cover shadow-lg" />
                  <h2 className="text-3xl font-black bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent uppercase tracking-tight">Our Passion</h2>
                  <p className="text-sm font-medium leading-relaxed opacity-90" style={{ color: colors.cardText }}>
                    <span className="font-black animate-float-blue uppercase">At Solve</span>, we are committed to logical problem-solving and the transformative power of engineering.
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          {/* ─── Core Values ─── */}
          <section className="relative z-20 py-20 px-6">
            <div className="relative w-[92%] lg:w-[85%] mx-auto text-center rounded-[3rem] shadow-[0_0_60px_rgba(0,0,0,0.08)] border overflow-hidden bg-cover bg-center transition-colors duration-500"
              style={{
                backgroundImage: `url(${valuesImage})`,
                borderColor: dark ? "rgba(2, 6, 23, 0.9)" : "rgba(255, 255, 255, 0.3)"
              }}>

              {/* Inner Overlay for Legibility */}
              <div className="absolute inset-0 z-0 transition-all duration-500"
                style={{
                  background: dark ? "rgba(2, 6, 23, 0.75)" : "rgba(255, 255, 255, 0.25)",
                  backdropFilter: dark ? "blur(6px)" : "blur(3px)"
                }}
              />

              {/* Content Wrapper */}
              <div className="relative z-10 px-4 py-16 md:p-24">
                <motion.h2
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl font-black mb-12 md:mb-24 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent uppercase tracking-tight"
                >
                  Our Core <span className="text-[var(--text-primary)]">Values</span>
                </motion.h2>

                {/* Desktop Grid for Core Values */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="p-10 rounded-[2.5rem] group hover:-translate-y-2 transition-all duration-500"
                      style={{ ...cardStyle, background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: "none" }}
                    >
                      <h3 className="text-xl font-black mb-6 drop-shadow-md group-hover:text-[var(--primary)] transition-colors duration-300" style={{ color: dark ? "#ffffff" : "#1e293b" }}>{value.title}</h3>
                      <p className="text-lg font-bold leading-relaxed drop-shadow-sm" style={{ color: dark ? "#f1f5f9" : "#334155" }}>{value.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Swiper for Core Values */}
                <div className="md:hidden">
                  <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    className="pb-16"
                  >
                    {values.map((value, index) => (
                      <SwiperSlide key={index}>
                        <div className="p-6 md:p-10 rounded-[2.5rem] text-left h-full min-h-[280px] flex flex-col justify-center"
                          style={{ ...cardStyle, background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.9)", border: "none" }}>
                          <h3 className="text-2xl font-black mb-6" style={{ color: dark ? "#ffffff" : "#1e293b" }}>{value.title}</h3>
                          <p className="text-lg font-medium leading-relaxed" style={{ color: dark ? "#cbd5e1" : "#334155" }}>{value.desc}</p>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Trusted Partners / Infinite Marquee ─── */}
          {/* <section className="relative z-20 py-24 mb-10 overflow-hidden"> */}
          {/* <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-4xl md:text-7xl font-black bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent uppercase tracking-tight mb-6"
              >
                Trusted <span className="text-[var(--text-primary)]">Partners</span>
              </motion.h2>
              <p className="text-[var(--text-secondary)] text-xl md:text-2xl max-w-3xl mx-auto opacity-70">
                Collaborating with industry leaders to deliver precision-engineered solutions across the globe.
              </p>
            </div> */}

          {/* <div className="max-w-7xl mx-auto px-6"> */}
          {/* <div className="hidden md:flex flex-wrap justify-center py-10">
                {client_img.map((items, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="mx-4 my-4 md:mx-6 p-8 min-w-[240px] md:min-w-[280px] lg:min-w-[320px] h-[140px] md:h-[160px] lg:h-[180px] rounded-3xl border border-white/10 backdrop-blur-xl flex items-center justify-center transition-all duration-300"
                    style={{
                      background: dark ? "rgba(255,255,255,0.03)" : "rgba(15, 23, 42, 0.05)",
                      boxShadow: dark ? "0 20px 40px rgba(0,0,0,0.4)" : "0 10px 30px rgba(0,0,0,0.03)"
                    }}
                  >
                    {items.img ? (
                      <img
                        src={items.img}
                        alt={items.name}
                        className="max-h-16 md:max-h-20 lg:max-h-24 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                      />
                    ) : (
                      <span className="text-3xl font-bold opacity-30 tracking-widest">{items.name}</span>
                    )}
                  </motion.div>
                ))}
              </div> */}

          {/* <div className="md:hidden py-10">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={2}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  className="pb-12"
                >
                  {client_img.map((items, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="p-6 h-[120px] rounded-2xl border border-white/10 backdrop-blur-xl flex items-center justify-center"
                        style={{
                          background: dark ? "rgba(255,255,255,0.05)" : "rgba(15, 23, 42, 0.05)",
                        }}
                      >
                        {items.img ? (
                          <img
                            src={items.img}
                            alt={items.name}
                            className="max-h-16 w-auto object-contain opacity-80"
                          />
                        ) : (
                          <span className="text-xl font-bold opacity-30 tracking-widest">{items.name}</span>
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div> */}
          {/* </div> */}
          {/* </section> */}
        </div>
      </div>
    </>
  );
};

export default Home;
