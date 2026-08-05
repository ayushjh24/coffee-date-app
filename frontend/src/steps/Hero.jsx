import { useState } from "react";
import { motion } from "framer-motion";
import Marquee from "@/components/Marquee";

const Reveal = ({ children, delay = 0, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export default function Hero({ onOpen }) {
  const [glow, setGlow] = useState({ x: 50, y: 40 });

  return (
    <section
      className="relative flex min-h-screen flex-col"
      onMouseMove={(e) =>
        setGlow({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 })
      }
      data-testid="hero-step"
    >
      <div
        className="glow-orb h-[45vmax] w-[45vmax] transition-transform duration-700 ease-out"
        style={{
          left: 0,
          top: 0,
          transform: `translate(calc(${glow.x}vw - 50%), calc(${glow.y}vh - 50%))`,
        }}
      />
      <div className="flex flex-1 flex-col items-start justify-center px-8 md:px-24">
        <Reveal delay={0.2}>
          <span className="text-xs uppercase tracking-[0.5em] text-primary">For someone special</span>
        </Reveal>
        <Reveal delay={0.45} className="mt-6">
          <h1 className="text-5xl font-light tracking-tighter md:text-8xl">
            Hi Palak <span className="inline-block animate-pulse">😊</span>
          </h1>
        </Reveal>
        <Reveal delay={0.75} className="mt-4">
          <p className="max-w-md text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            I made something just for you…
          </p>
        </Reveal>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <button
            data-testid="open-invitation-btn"
            onClick={onOpen}
            className="group relative overflow-hidden rounded-full bg-primary px-10 py-4 text-sm font-medium tracking-widest text-primary-foreground shadow-2xl shadow-primary/30 transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Open It ❤️</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
          </button>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <Marquee />
      </motion.div>
    </section>
  );
}
