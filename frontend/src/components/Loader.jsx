import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Loader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      data-testid="loader"
    >
      <div className="relative mb-2 flex h-10 items-end justify-center gap-2">
        <span className="steam" style={{ left: "38%", animationDelay: "0s" }} />
        <span className="steam" style={{ left: "50%", animationDelay: "0.5s" }} />
        <span className="steam" style={{ left: "62%", animationDelay: "1s" }} />
      </div>
      <div className="cup">
        <div className="cup-fill" />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-xs uppercase tracking-[0.4em] text-muted-foreground"
      >
        Brewing something special
      </motion.p>
    </motion.div>
  );
}
