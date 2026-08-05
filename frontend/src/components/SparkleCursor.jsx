import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function SparkleCursor() {
  const [sparks, setSparks] = useState([]);
  const last = useRef(0);

  useEffect(() => {
    const onMove = (e) => {
      const now = Date.now();
      if (now - last.current < 60) return;
      last.current = now;
      const id = now + Math.random();
      setSparks((s) => [...s.slice(-12), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setSparks((s) => s.filter((sp) => sp.id !== id)), 700);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40" aria-hidden>
      {sparks.map((sp) => (
        <motion.span
          key={sp.id}
          initial={{ opacity: 0.9, scale: 0 }}
          animate={{ opacity: 0, scale: 1.5, y: -16 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute select-none text-xs text-primary"
          style={{ left: sp.x, top: sp.y }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}
