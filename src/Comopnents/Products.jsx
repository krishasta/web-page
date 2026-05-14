import Papa from "papaparse";
import { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform
} from "framer-motion";
import { useParams } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import Moveable from "react-moveable";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const normalize = (str = "") => str.toLowerCase().replace(/[^a-z0-9]/g, " ").trim().replace(/\s+/g, " ");

/**
 * Explosion/Assembly Image Component
 * This mimics the video's effect: Image 1 lifts up, Image 2 comes into focus, Image 3 appears below.
 */
// const ExplodedImageGallery = ({ images, scrollYProgress }) => {
//   // Image 1: Lifts up and fades out
//   const y1 = useTransform(scrollYProgress, [0, 0.33], ["0%", "-100%"]);
//   const opacity1 = useTransform(scrollYProgress, [0, 0.33], [1, 0]);
//   // const scale1 = useTransform(scrollYProgress, [0, 0.33], [1, 0.85]);
//   const scale1 = useTransform(scrollYProgress, [0, 0.33], [1, 0.95]);

//   // Image 2: Comes up from below, stays centered, then drops
//   const y2 = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], ["50%", "0%", "0%", "-50%"]);
//   const opacity2 = useTransform(scrollYProgress, [0.1, 0.33, 0.6, 0.9], [0, 1, 1, 0]);
//   // const scale2 = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0.85, 1, 1, 0.85]);
//   const scale2 = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [0.95, 1, 1, 0.95]);

//   // Image 3: Rises up at the end
//   const y3 = useTransform(scrollYProgress, [0.6, 0.9], ["50%", "0%"]);
//   const opacity3 = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
//   // const scale3 = useTransform(scrollYProgress, [0.6, 0.9], [0.85, 1]);
//   const scale3 = useTransform(scrollYProgress, [0.6, 0.9], [0.95, 1]);


//   return (
//     <div className="w-full flex items-center justify-center relative h-full">
//       {/* ANIMATED GLOW EFFECT */}
//       <motion.div
//         animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
//         transition={{ duration: 8, repeat: Infinity }}
//         className="ab
// e inset-0 bg-sky-500/10 rounded-full blur-[100px]"
//       />

//       {images[0] && (
//         <motion.img
//           src={images[0]}
//           alt="Layer 1"
//           style={{ y: y1, opacity: opacity1, scale: scale1 }}
//           className="absolute max-h-[50vh] md:max-h-[65vh] object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.4)]"
//         />
//       )}

//       {images[1] && (
//         <motion.img
//           src={images[1]}
//           alt="Layer 2"
//           style={{ y: y2, opacity: opacity2, scale: scale2 }}
//           className="absolute max-h-[50vh] md:max-h-[65vh] object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.4)]"
//         />
//       )}

//       {images[2] && (
//         <motion.img
//           src={images[2]}
//           alt="Layer 3"
//           style={{ y: y3, opacity: opacity3, scale: scale3 }}
//           className="absolute max-h-[50vh] md:max-h-[65vh] object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.4)]"
//         />
//       )}

//       {/* Fallback if no images found */}
//       {!images[0] && !images[1] && !images[2] && (
//         <div className="absolute opacity-50 font-bold">No images found</div>
//       )}
//     </div>
//   );
// };

/**
 * Products Component: Exploded Assembly Animation
 */
// const ExplodedImageGallery = ({ images, scrollYProgress }) => {
//   // Image 1 (Top shell): Slower lift-off
//   // const y1 = useTransform(scrollYProgress, [0, 0.55], ["0%", "-60%"]);         // was [0, 0.4]
//   // const opacity1 = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 0.5, 0]); // was [0, 0.25, 0.4]
//   // const scale1 = useTransform(scrollYProgress, [0, 0.55], [1, 1.05]);           // was [0, 0.4]

//   // // Image 2 (PCB): Slower reveal and hide
//   // const y2 = useTransform(scrollYProgress, [0.2, 0.5, 0.7, 0.95], ["8%", "0%", "0%", "8%"]);           // was [0.1, 0.4, 0.6, 0.9]
//   // const opacity2 = useTransform(scrollYProgress, [0.2, 0.5, 0.72, 0.95], [0, 1, 1, 0]);                 // was [0.1, 0.35, 0.65, 0.9]
//   // const scale2 = useTransform(scrollYProgress, [0.2, 0.5, 0.7, 0.95], [0.88, 1, 1, 0.88]);              // was [0.1, 0.4, 0.6, 0.9]

//   // // Image 3 (Reassemble): Slower drop-in
//   // const y3 = useTransform(scrollYProgress, [0.75, 1.0], ["-30%", "0%"]);       // was [0.65, 0.95]
//   // const opacity3 = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);         // was [0.65, 0.88]
//   // const scale3 = useTransform(scrollYProgress, [0.75, 1.0], [1.05, 1]);         // was [0.65, 0.95]

//   const smooth = [0.25, 0.1, 0.25, 1];

//   // Image 1 (Top shell): Slower lift-off
//   const y1 = useTransform(scrollYProgress, [0, 0.55], ["0%", "-60%"], smooth);
//   const opacity1 = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 0.5, 0], smooth);
//   const scale1 = useTransform(scrollYProgress, [0, 0.55], [1, 1.05], smooth);

//   // Image 2 (PCB): Slower reveal and hide
//   const y2 = useTransform(scrollYProgress, [0.2, 0.5, 0.7, 0.95], ["8%", "0%", "0%", "8%"], smooth);
//   const opacity2 = useTransform(scrollYProgress, [0.2, 0.5, 0.72, 0.95], [0, 1, 1, 0], smooth);
//   const scale2 = useTransform(scrollYProgress, [0.2, 0.5, 0.7, 0.95], [0.88, 1, 1, 0.88], smooth);

//   // Image 3 (Reassemble): Slower drop-in
//   const y3 = useTransform(scrollYProgress, [0.75, 1.0], ["-30%", "0%"], smooth);
//   const opacity3 = useTransform(scrollYProgress, [0.75, 0.95], [0, 1], smooth);
//   const scale3 = useTransform(scrollYProgress, [0.75, 1.0], [1.05, 1], smooth);

//   return (
//     <div className="w-full flex items-center justify-center relative h-full [perspective:1400px]">
//       {/* DARK RADIAL GLOW - mimics the dark studio spotlight in the video */}
//       <motion.div
//         animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.18, 0.08] }}
//         transition={{ duration: 8, repeat: Infinity }}
//         className="absolute w-[600px] h-[600px] bg-white/10 rounded-full blur-[140px]"
//       />

//       {/* LAYER 1: Top shell lifts off */}
//       {images[0] && (
//         <motion.img
//           src={images[0]}
//           alt="Closed Device"
//           style={{
//             translateY: y1,
//             translateZ: z1,
//             rotateX,
//             rotateY,
//             opacity: opacity1,
//             filter: blur1
//           }}
//           className="absolute max-h-[50vh] md:max-h-[65vh] object-contain 
//                      drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
//         />
//       )}

//       {/* LAYER 2: PCB internals revealed */}
//       {images[1] && (
//         <motion.img
//           src={images[1]}
//           alt="PCB Internals"
//           style={{
//             translateY: y2,
//             translateZ: z2,
//             rotateX,
//             rotateY,
//             opacity: opacity2,
//             filter: blur2
//           }}
//           className="absolute max-h-[50vh] md:max-h-[65vh] object-contain 
//                      drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
//         />
//       )}

//       {/* LAYER 3: Device reassembles */}
//       {images[2] && (
//         <motion.img
//           src={images[2]}
//           alt="Reassembled"
//           style={{
//             translateY: y3,
//             translateZ: z3,
//             rotateX,
//             rotateY,
//             opacity: opacity3,
//             filter: blur3
//           }}
//           className="absolute max-h-[50vh] md:max-h-[65vh] object-contain 
//                      drop-shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
//         />
//       )}

//       {!images[0] && !images[1] && !images[2] && (
//         <div className="absolute opacity-50 font-bold">No images found</div>
//       )}
//     </div>
//   );
// };
// const ExplodedImageGallery = ({ images, scrollYProgress }) => {

//   // =========================
//   // 🎯 APPLE-STYLE TRANSFORMS
//   // =========================

//   // IMAGE 1 (Top shell)
//   const y1 = useTransform(scrollYProgress, [0, 0.45], ["0%", "-50%"]);
//   const z1 = useTransform(scrollYProgress, [0, 0.45], [0, 250]);
//   const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.45], [1, 0.6, 0]);
//   const blur1 = useTransform(scrollYProgress, [0, 0.45], ["0px", "10px"]);

//   // IMAGE 2 (PCB focus)
//   const y2 = useTransform(scrollYProgress, [0.25, 0.6, 0.75], ["10%", "0%", "10%"]);
//   const z2 = useTransform(scrollYProgress, [0.25, 0.6, 0.75], [-300, 0, -200]);
//   const opacity2 = useTransform(scrollYProgress, [0.25, 0.4, 0.7], [0, 1, 1]);
//   const blur2 = useTransform(scrollYProgress, [0.25, 0.6], ["12px", "0px"]);

//   // IMAGE 3 (Reassemble)
//   const y3 = useTransform(scrollYProgress, [0.7, 1], ["0%", "0%"]);
//   const z3 = useTransform(scrollYProgress, [0.7, 1], [200, 0]);
//   const opacity3 = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
//   const blur3 = useTransform(scrollYProgress, [0.7, 1], ["8px", "0px"]);

//   // Subtle rotation (Apple feel)
//   const rotateX = useTransform(scrollYProgress, [0, 1], [2, -2]);
//   const rotateY = useTransform(scrollYProgress, [0, 1], [-3, 3]);

//   return (
//     <div className="w-full flex items-center justify-center relative h-full [perspective:1400px]">

//       {/* ✨ PREMIUM LIGHTING */}
//       <motion.div
//         className="absolute w-[600px] h-[600px] bg-white/10 rounded-full blur-[140px]"
//         animate={{ scale: [1, 1.1, 1] }}
//         transition={{ duration: 8, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px]"
//         animate={{ scale: [1.1, 0.95, 1.1] }}
//         transition={{ duration: 7, repeat: Infinity }}
//       />

//       {/* IMAGE 1 */}
//       {images[0] && (
//         <motion.img
//           src={images[0]}
//           alt="Closed Device"
//           style={{
//             transformStyle: "preserve-3d",
//             translateY: y1,
//             translateZ: z1,
//             rotateX,
//             rotateY,
//             opacity: opacity1,
//             filter: blur1
//           }}
//           transition={{ ease: [0.25, 0.1, 0.25, 1] }}
//           className="absolute max-h-[65vh] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
//         />
//       )}

//       {/* IMAGE 2 */}
//       {images[1] && (
//         <motion.img
//           src={images[1]}
//           alt="PCB Internals"
//           style={{
//             transformStyle: "preserve-3d",
//             translateY: y2,
//             translateZ: z2,
//             rotateX,
//             rotateY,
//             opacity: opacity2,
//             filter: blur2
//           }}
//           transition={{ ease: [0.25, 0.1, 0.25, 1] }}
//           className="absolute max-h-[65vh] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.25)] z-20"
//         />
//       )}

//       {/* IMAGE 3 */}
//       {images[2] && (
//         <motion.img
//           src={images[2]}
//           alt="Reassembled"
//           style={{
//             transformStyle: "preserve-3d",
//             translateY: y3,
//             translateZ: z3,
//             rotateX,
//             rotateY,
//             opacity: opacity3,
//             filter: blur3
//           }}
//           transition={{ ease: [0.25, 0.1, 0.25, 1] }}
//           className="absolute max-h-[65vh] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
//         />
//       )}

//     </div>
//   );
// };

// const ExplodedImageGallery = ({ images, scrollYProgress }) => {
//   // 1. Perspective and Rotation for that "Product Showcase" feel
//   const rotateX = useTransform(scrollYProgress, [0, 1], [15, -10]);
//   const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

//   // IMAGE 1: The Top Lid / Shell
//   // It lifts UP (y) and TOWARDS the camera (z) while fading
//   const y1 = useTransform(scrollYProgress, [0, 0.4], ["0%", "-80%"]);
//   const z1 = useTransform(scrollYProgress, [0, 0.4], [0, 400]);
//   const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.4], [1, 1, 0]);

//   // IMAGE 2: The Internal PCB
//   // It starts hidden and deep, comes to focus, then moves away
//   const y2 = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], ["20%", "0%", "0%", "-20%"]);
//   const z2 = useTransform(scrollYProgress, [0.1, 0.4, 0.6, 0.9], [-200, 0, 0, 200]);
//   const opacity2 = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

//   // IMAGE 3: The Bottom Base / Reassembled View
//   // It rises from the bottom and settles into the center
//   const y3 = useTransform(scrollYProgress, [0.6, 0.9], ["60%", "0%"]);
//   const z3 = useTransform(scrollYProgress, [0.6, 0.9], [-300, 0]);
//   const opacity3 = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

//   return (
//     <div className="w-full flex items-center justify-center relative h-full [perspective:2000px]">

//       {/* Dynamic Studio Lighting Background */}
//       <motion.div
//         className="absolute w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-[120px]"
//         style={{ scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.2]) }}
//       />

//       {/* Layer 1 - Top Shell */}
//       {images[0] && (
//         <motion.img
//           src={images[0]}
//           alt="Top Layer"
//           style={{
//             y: y1,
//             z: z1,
//             rotateX,
//             rotateY,
//             opacity: opacity1,
//           }}
//           className="absolute max-h-[60vh] w-auto object-contain drop-shadow-2xl"
//         />
//       )}

//       {/* Layer 2 - PCB internals */}
//       {images[1] && (
//         <motion.img
//           src={images[1]}
//           alt="Middle Layer"
//           style={{
//             y: y2,
//             z: z2,
//             rotateX,
//             rotateY,
//             opacity: opacity2,
//           }}
//           className="absolute max-h-[60vh] w-auto object-contain drop-shadow-2xl"
//         />
//       )}

//       {/* Layer 3 - Final Assembly */}
//       {images[2] && (
//         <motion.img
//           src={images[2]}
//           alt="Bottom Layer"
//           style={{
//             y: y3,
//             z: z3,
//             rotateX,
//             rotateY,
//             opacity: opacity3,
//           }}
//           className="absolute max-h-[60vh] w-auto object-contain drop-shadow-2xl"
//         />
//       )}
//     </div>
//   );
// };

const ExplodedImageGallery = ({ images, activeIndex, interactiveMode }) => {
  const [target, setTarget] = useState(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    if (interactiveMode && imageRefs.current[activeIndex]) {
      setTarget(imageRefs.current[activeIndex]);
    } else {
      setTarget(null);
    }
  }, [activeIndex, interactiveMode]);

  return (
    <div className="w-full flex items-center justify-center relative h-full [perspective:2000px]">
      {/* Dynamic Glow Background remains the same for premium feel */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative w-full h-full flex items-center justify-center">
        {images.map((img, i) => {
          if (!img) return null;

          // Find if this is the "effective" image to show.
          // An image at index 'i' should be shown if:
          // 1. activeIndex === i
          // 2. activeIndex > i AND all images between i and activeIndex are null.
          let isEffective = activeIndex === i;
          if (!isEffective && activeIndex > i) {
            const followingImages = images.slice(i + 1, activeIndex + 1);
            isEffective = followingImages.every(image => !image);
          }

          return (
            <motion.img
              key={i}
              ref={(el) => (imageRefs.current[i] = el)}
              src={img}
              alt={`Assembly Stage ${i}`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isEffective ? 1 : 0,
                scale: isEffective ? (interactiveMode ? undefined : 1) : 0.95,
              }}
              transition={{ duration: 1 }}
              style={{
                pointerEvents: isEffective ? "auto" : "none",
                zIndex: isEffective ? 50 : 0
              }}
              className="absolute max-h-[70vh] w-auto object-contain drop-shadow-2xl"
            />
          );
        })}

        {interactiveMode && (
          <Moveable
            target={target}
            draggable={true}
            resizable={true}
            rotatable={true}
            warpable={true}
            snappable={true}
            keepRatio={true}
            edge={true}
            onDrag={(e) => {
              e.target.style.transform = e.transform;
            }}
            onRotate={(e) => {
              e.target.style.transform = e.drag.transform;
            }}
            onResize={(e) => {
              e.target.style.width = `${e.width}px`;
              e.target.style.height = `${e.height}px`;
              e.target.style.transform = e.drag.transform;
            }}
            onWarp={(e) => {
              e.target.style.transform = e.transform;
            }}
          />
        )}
      </div>
    </div>
  );
};
const Products = () => {
  const { title } = useParams();
  const { dark } = useTheme();

  const decodedTitle = title.replace(/-/g, " ");
  const normalizedTitle = normalize(decodedTitle);

  const [items, setItems] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const containerRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [interactiveMode, setInteractiveMode] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Filter items by selected type (if types exist)
  const displayItems = selectedType
    ? items.filter(item => item.type === selectedType)
    : items;

  // Monitor scroll progress and update the active index for both image and text
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (displayItems.length === 0) return;

      const newIndex = Math.min(
        Math.floor(latest * displayItems.length),
        displayItems.length - 1
      );
      setActiveIndex(newIndex);
    });
  }, [scrollYProgress, displayItems.length]);
  // CSV LOAD
  useEffect(() => {
    Papa.parse("/products.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const filtered = result.data
          .filter((row) => normalize(row.title?.trim()) === normalizedTitle)
          .sort((a, b) => Number(a.id) - Number(b.id)); // Ensure order matches ID

        // Extract available types
        const availableTypes = [...new Set(filtered.map(item => item.type).filter(Boolean))];
        setTypes(availableTypes);

        // Auto-select first type if available
        if (availableTypes.length > 0) {
          setSelectedType(availableTypes[0]);
        }

        setItems(filtered);
      },
    });
  }, [normalizedTitle]);

  const colors = dark
    ? {
      bg: "radial-gradient(circle at center, #0a192f 0%, #020617 100%)",
      text: "#cbd5e1",
      heading: "#38bdf8",
      glass: "rgba(15, 23, 42, 0.7)",
    }
    : {
      bg: "linear-gradient(135deg, #fcfdff 0%, #f4f7ff 50%, #eff6ff 100%)",
      text: "#475569",
      heading: "#0ea5e9",
      glass: "rgba(255, 255, 255, 0.75)",
    };


  // We need exactly the 3 images from the filtered items for the animation setup
  // We assume the items are ordered correctly based on id (e.g. Assembled, PCB, etc)
  const layerImages = displayItems.map(item => 
    item.image || item.image1 || item.image2 || item.image3 || 
    item.image4 || item.image5 || item.image6 || item.image7 || 
    item.image8 || item.image9 || item.image10
  );

  return (
    <div
      ref={containerRef}
      className="relative transition-colors duration-700 font-sans"
      style={{ background: colors.bg, minHeight: "100vh" }}
    >
      {items.length === 0 ? (
        <div className="h-screen flex items-center justify-center font-bold text-2xl" style={{ color: colors.text }}>
          Synchronizing Product Catalog...
        </div>
      ) : (
        <>
          {/* Desktop Version: Sticky Scroll (Visible on Extra Large Screens) */}
          <div className="hidden xl:block" style={{ height: "500vh" }}>
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 lg:px-24">

              {/* Top Center Heading */}
              <div className="absolute top-20 left-0 w-full flex justify-center z-[60] px-6 py-8">
                {displayItems.length > 0 && (
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-4xl font-black bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent uppercase tracking-tight text-center max-w-4xl"
                  >
                    {displayItems[0].title}
                  </motion.h2>
                )}
              </div>

              <div className="w-full flex lg:flex-row items-center justify-center h-full gap-12 relative mt-24">
                <div className="w-full lg:w-5/12 flex items-center justify-start z-50 relative h-[400px]">
                  {displayItems.map((item, i) => {
                    const hasText = item?.title?.trim() || item?.paragraph?.trim();
                    if (!hasText) return null;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{
                          opacity: activeIndex === i ? 1 : 0,
                          x: activeIndex === i ? 0 : (activeIndex > i ? -30 : 30),
                          pointerEvents: activeIndex === i ? "auto" : "none"
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-left max-w-xl absolute"
                      >
                        {/* Sub-heading positioned where the main heading was */}
                        <div
                          className="inline-block w-full text-center px-4 py-1.5 rounded-full text-[20px] font-bold uppercase tracking-[0.2em] mb-6"
                          // style={{ background: colors.heading + "10", color: colors.heading, border: `1px solid ${colors.heading}40` }}
                          style={{ color: colors.heading, background: "transparent" }}
                        >
                          {item.subtitle || `Stage ${i + 1}`}
                        </div>

                        <p className="text-base font-medium leading-relaxed opacity-90 border-l-2 border-sky-500/30 pl-6" style={{ color: colors.text }}>
                          {item.paragraph}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="w-full lg:w-7/12 flex items-center justify-center relative h-full py-16">
                  <ExplodedImageGallery images={layerImages} activeIndex={activeIndex} interactiveMode={interactiveMode} />
                </div>
              </div>

              <motion.div
                animate={{
                  opacity: activeIndex > 0 ? 0 : [0.3, 0.6, 0.3],
                  x: [0, 10, 0]
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute bottom-10 right-10 flex items-center gap-4 opacity-40 z-50 pointer-events-none"
                style={{ color: colors.text }}
              >
                {/* <span className="text-[10px] uppercase tracking-widest font-black whitespace-nowrap">Scroll to Disassemble</span> */}
                <div className="w-12 h-1 bg-sky-500 rounded-full" />
              </motion.div>
            </div>
          </div>

          {/* Mobile/Tablet Version: Swiper (Visible on screens smaller than XL) */}
          <div className="xl:hidden min-h-screen pt-24 pb-12">
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="w-full h-full"
            >
              {displayItems.map((item, i) => {
                // For mobile, we also want to persist the image if it's null
                const effectiveImage = layerImages.slice(0, i + 1).reverse().find(img => img);

                return (
                  <SwiperSlide key={i} className="px-6 flex flex-col items-center">
                    <div className="flex flex-col items-center text-center w-full">
                      {/* Image Stage */}
                      <div className="relative w-full h-[45vh] flex items-center justify-center mb-10">
                        {/* Glow effect similar to desktop */}
                        <div className="absolute w-48 h-48 bg-sky-500/10 rounded-full blur-[60px]" />
                        {effectiveImage && (
                          <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            src={effectiveImage}
                            alt={item.title}
                            className="max-h-full max-w-full object-contain drop-shadow-2xl relative z-10"
                          />
                        )}
                      </div>

                      {/* Text Stage */}
                      <div className="max-w-md mx-auto">
                        <h2 className="text-3xl font-black mb-4 leading-tight bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent uppercase tracking-tight">
                          {displayItems[0].title}
                        </h2>
                        <div
                          className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] mb-4"
                          style={{ background: colors.heading + "15", color: colors.heading, border: `1px solid ${colors.heading}30` }}
                        >
                          {item.subtitle || `Stage ${i + 1}`}
                        </div>
                        <p className="text-sm font-medium leading-relaxed opacity-90" style={{ color: colors.text }}>
                          {item.paragraph}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div className="mt-12 flex justify-center opacity-40 animate-pulse">
              <span className="text-[10px] uppercase tracking-widest font-black">Swipe to Explore</span>
            </div>
          </div>
        </>

      )}
    </div>
  );
};

export default Products;