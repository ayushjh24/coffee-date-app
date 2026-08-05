import { useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, Bean } from "lucide-react";

export default function Particles({ count = 16 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 16,
        duration: 16 + Math.random() * 14,
        delay: -Math.random() * 24,
        heart: Math.random() > 0.45,
        opacity: 0.12 + Math.random() * 0.22,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {items.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.left}%`, bottom: "-6%" }}
          animate={{ y: ["0vh", "-112vh"], x: [0, 28, -28, 0], rotate: [0, 50, -50, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          {p.heart ? (
            <Heart size={p.size} className="text-primary" fill="currentColor" style={{ opacity: p.opacity }} />
          ) : (
            <Bean size={p.size} className="text-foreground" style={{ opacity: p.opacity }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
