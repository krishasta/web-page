import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Papa from "papaparse";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductMain = () => {
  const { dark } = useTheme();
  const [products, setProducts] = useState([]);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    fetch("/products.csv")
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const grouped = result.data.reduce((acc, row) => {
              if (!acc[row.title]) acc[row.title] = [];
              acc[row.title].push(row);
              return acc;
            }, {});

            const productArray = Object.keys(grouped).map((title) => ({
              title,
              paragraphs: grouped[title],
            }));

            setProducts(productArray);
          },
        });
      });
  }, []);

  const styles = {
    sectionBg: "var(--bg-primary)",
    cardBg: "var(--surface)",
    cardBorder: "1px solid var(--border)",
    accent: "var(--primary)",
    textPrimary: "var(--text-primary)",
    textSecondary: "var(--text-secondary)",
    glass: "backdrop-blur-xl bg-white/70 dark:bg-slate-900/40",
    navBtnBg: "var(--surface)",
    shimmer: "from-sky-400/0 via-sky-400/20 to-sky-400/0"
  };

  return (
    <div
      className="min-h-screen py-24 px-4 transition-all duration-700 font-sans relative overflow-hidden"
      style={{ background: styles.sectionBg }}
    >
      {/* Decorative background blurs for premium feel */}
      {!dark && (
        <>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[120px] pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 15, repeat: Infinity, delay: 2 }}
            className="absolute bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-indigo-400 rounded-full blur-[140px] pointer-events-none"
          />
        </>
      )}
      {/* ── Header ── */}
      <div className="max-w-5xl mx-auto text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
            style={{
              background: dark ? "rgba(56, 189, 248, 0.1)" : "rgba(14, 165, 233, 0.08)",
              color: styles.accent,
              border: `1px solid ${dark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(14, 165, 233, 0.2)'}`
            }}>
            Innovation Showcase
          </span> */}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 uppercase transition-colors" style={{ color: "var(--text-primary)" }}>
            <span className="animate-float-blue">Engineered</span> Solutions
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium opacity-80 transition-colors" style={{ color: "var(--text-secondary)" }}>
            Discover our portfolio of industry-leading products, designed with precision and built for scale.
          </p>
        </motion.div>
      </div>

      {/* ── Slider Section ── */}
      <div className="max-w-[1400px] mx-auto relative group/nav">
        {/* Sleek Custom Navigation */}
        <div className="hidden md:flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 z-40 px-2 pointer-events-none">
          <button
            ref={prevRef}
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 pointer-events-auto
                       hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-xl"
            style={{ background: styles.navBtnBg, border: styles.cardBorder, color: styles.textPrimary }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            ref={nextRef}
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 pointer-events-auto
                       hover:scale-110 active:scale-95 shadow-2xl backdrop-blur-xl"
            style={{ background: styles.navBtnBg, border: styles.cardBorder, color: styles.textPrimary }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          className="pb-16 px-4"
        >
          {products.map((product, index) => {
            const displayImage = product.paragraphs.find((p) => p.id === "0")?.image;

            return (
              <SwiperSlide key={index} className="h-auto ">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <NavLink
                    to={`/products/${product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`}
                    state={product}
                    className={`group relative flex flex-col rounded-[2.5rem] overflow-hidden transition-all duration-500 h-full
                                ${styles.glass} ] hover:shadow-[0_40px_80px_rgba(0,0,0,0.25)]`}
                    style={{ border: styles.cardBorder }}
                  >
                    {/* Premium Image Header - Enlarged for impact */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-b-[2rem] bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {displayImage ? (
                        <img
                          src={displayImage}
                          alt={product.title}
                          className="w-full h-full object-contain p-6 transition-transform duration-700 ease-out scale-100 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                          <span className="text-4xl">🛠️</span>
                        </div>
                      )}

                      {/* Floating Badge */}
                      <div className="absolute top-6 right-6 z-20">
                        {/* <div className="px-4 py-1.5 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 text-[10px] font-bold text-white uppercase tracking-widest">
                          Premium
                        </div> */}
                      </div>
                    </div>

                    <div className="p-8 flex flex-col justify-center items-center flex-1 text-center">
                      <h2 className="text-xl md:text-2xl font-black tracking-tight mb-2 group-hover:text-[var(--primary)] transition-colors uppercase"
                        style={{ color: styles.textPrimary }}>
                        {product.title}
                      </h2>
                      {/* <div className="flex items-center gap-2">
                          <span className="w-8 h-[2px] rounded-full" style={{ background: styles.accent }} />
                          <span className="text-[10px] font-bold uppercase tracking-tighter" style={{ color: styles.textSecondary }}>
                            Project Series
                          </span>
                        </div> */}
                    </div>

                    {/* <div className="mt-auto pt-6 flex items-center justify-between border-t" style={{ borderColor: 'rgba(148,163,184,0.1)' }}>
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-7 h-7 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[8px] font-bold text-sky-400">
                              {product.paragraphs.length}+
                            </div>
                          ))}
                        </div>
                      </div> */}
                    {/* Animated Shimmer Overlay */}
                    <div className={`absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700
                                   bg-gradient-to-r ${styles.shimmer} skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%]`} />
                  </NavLink>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductMain;
