import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

const SPACING = 48;
const TRAIL_MAX = 28;

function buildArrows(W, H) {
  const arr = [];
  const cols = Math.ceil(W / SPACING) + 2;
  const rows = Math.ceil(H / SPACING) + 2;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      arr.push({
        gx: c * SPACING + SPACING / 2,
        gy: r * SPACING + SPACING / 2,
        angle: 0,
      });
    }
  }
  return arr;
}

export default function Main() {
  const canvasRef = useRef(null);
  const { dark } = useTheme();

  // ── darkRef lets the canvas loop always read the latest theme ──
  const darkRef = useRef(dark);
  useEffect(() => {
    darkRef.current = dark;
  }, [dark]);

  const stateRef = useRef({
    mode: "electron",
    mouse: { x: -999, y: -999 },
    particle: { x: -300, y: -300, vx: 0, vy: 0, trail: [] },
    arrows: [],
    t: 0,
    raf: null,
  });
  const [mode, setMode] = useState("electron");

  useEffect(() => {
    stateRef.current.mode = mode;
  }, [mode]);

  const handleMouseMove = useCallback((e) => {
    stateRef.current.mouse.x = e.clientX;
    stateRef.current.mouse.y = e.clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    stateRef.current.mouse.x = e.touches[0].clientX;
    stateRef.current.mouse.y = e.touches[0].clientY;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const S = stateRef.current;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      S.arrows = buildArrows(canvas.width, canvas.height);
    }
    resize();
    window.addEventListener("resize", resize);

    // ── Draw helpers ───────────────────────────────────────────────

    function drawArrow(x, y, angle, dist, alpha, isElectron, isDark) {
      const len = 14;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.globalAlpha = alpha;

      // Dark: cyan arrows  |  Light: Professional Blue arrows on light bg
      const headColor = isDark
        ? (isElectron ? "#38bdf8" : "#ff6b35")
        : (isElectron ? "#2563eb" : "#ea580c");
      const tailColor = isDark
        ? (isElectron ? "rgba(56,189,248,0.45)" : "rgba(200,80,20,0.5)")
        : (isElectron ? "rgba(37,99,235,0.2)" : "rgba(234,88,12,0.25)");

      // Tail
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-len, 0);
      ctx.strokeStyle = tailColor;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Shaft
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(len, 0);
      ctx.strokeStyle = headColor;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Arrowhead
      ctx.beginPath();
      ctx.moveTo(len, 0);
      ctx.lineTo(len - 7, -4);
      ctx.lineTo(len - 7, 4);
      ctx.closePath();
      ctx.fillStyle = headColor;
      ctx.fill();

      ctx.restore();
    }

    function drawParticle(x, y, isElectron, isDark) {
      // Dark: sky-blue particle  |  Light: Navy blue particle
      const color = isDark
        ? (isElectron ? "#57cff3" : "#ff6b35")
        : (isElectron ? "#2563eb" : "#ea580c");
      const colorAlt = isDark
        ? (isElectron ? "#29b5ec" : "#a04000")
        : (isElectron ? "#1d4ed8" : "#c2410c");
      const glowRgb = isDark
        ? (isElectron ? "56,189,248" : "255,107,53")
        : (isElectron ? "37,99,235" : "234,88,12");
      const label = isElectron ? "e⁻" : "n⁰";
      const r = 28;

      // Outer glow
      const grd = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      grd.addColorStop(0, `rgba(${glowRgb},0.20)`);
      grd.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(x, y, r * 3, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Body
      const body = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
      body.addColorStop(0, isDark ? color : "#ffffff");
      body.addColorStop(0.6, color);
      body.addColorStop(1, colorAlt);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = body;
      ctx.fill();

      // Ring
      ctx.beginPath();
      ctx.arc(x, y, r + 3, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Label
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${r}px 'Inter', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, x, y);

      // Radiating field lines
      // const lineCount = isElectron ? 8 : 6;
      // for (let i = 0; i < lineCount; i++) {
      //   const a = (i / lineCount) * Math.PI * 2;
      //   ctx.beginPath();
      //   ctx.moveTo(x + Math.cos(a) * (r + 5), y + Math.sin(a) * (r + 5));
      //   ctx.lineTo(x + Math.cos(a) * (r + 22), y + Math.sin(a) * (r + 22));
      //   ctx.strokeStyle = color;
      //   ctx.lineWidth = 1;
      //   ctx.globalAlpha = 0.3;
      //   ctx.stroke();
      //   ctx.globalAlpha = 1;
      // }
    }

    function drawTrail(trail, isElectron, isDark) {
      if (trail.length < 2) return;
      const rgb = isDark
        ? (isElectron ? "56,189,248" : "255,107,53")
        : (isElectron ? "37,99,235" : "234,88,12");
      for (let i = 1; i < trail.length; i++) {
        const t = i / trail.length;
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.strokeStyle = `rgba(${rgb},${t * 0.4})`;
        ctx.lineWidth = t * 4;
        ctx.stroke();
      }
    }

    // ── Main loop ──────────────────────────────────────────────────

    function loop() {
      const W = canvas.width;
      const H = canvas.height;
      const { mouse, particle, arrows, mode } = S;
      const isElectron = mode === "electron";
      const isDark = darkRef.current;           // ← reads latest theme

      // Background from CSS variables
      ctx.fillStyle = isDark ? "#020617" : "#ffffff";
      ctx.fillRect(0, 0, W, H);

      // Smooth particle follow
      particle.vx += (mouse.x - particle.x) * 0.1;
      particle.vy += (mouse.y - particle.y) * 0.1;
      particle.vx *= 0.75;
      particle.vy *= 0.75;
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Trail
      particle.trail.push({ x: particle.x, y: particle.y });
      if (particle.trail.length > TRAIL_MAX) particle.trail.shift();

      const px = particle.x;
      const py = particle.y;

      // Arrows
      for (const a of arrows) {
        const dx = a.gx - px;
        const dy = a.gy - py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let target;
        if (isElectron) {
          target = Math.atan2(dy, dx) + Math.PI;
        } else {
          target = Math.atan2(dy, dx) + Math.PI / 2;
        }

        let diff = target - a.angle;
        while (diff > Math.PI) diff -= 2 * Math.PI;
        while (diff < -Math.PI) diff += 2 * Math.PI;
        a.angle += diff * 0.12;

        const alpha = Math.max(0.08, Math.min(0.9, 1 - dist / 400));
        drawArrow(a.gx, a.gy, a.angle, dist, alpha, isElectron, isDark);
      }

      drawTrail(particle.trail, isElectron, isDark);
      drawParticle(px, py, isElectron, isDark);

      S.raf = requestAnimationFrame(loop);
    }

    S.raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(S.raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "var(--bg-primary)",
        overflow: "hidden",
        cursor: "none",
        fontFamily: '"Inter", sans-serif',
        transition: "background 0.4s",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", position: "absolute", inset: 0 }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-full px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="mt-8 max-w-3xl mx-auto"
        >
          <p
            className="text-2xl sm:text-3xl md:text-4xl leading-tight font-bold tracking-tight transition-colors duration-300 animate-float-blue"
            style={{ color: "var(--text-primary)" }}
          >
            <span className="animate-float-blue text-5xl uppercase font-black tracking-tighter">Solve</span> is a technology company focused on designing and building high-quality electronic solutions for modern applications.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
