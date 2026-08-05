import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Coffee } from "lucide-react";

const MAX_DODGES = 4;

export default function Question({ onYes }) {
  const [dodges, setDodges] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const dodge = () => {
    if (dodges >= MAX_DODGES) return;
    setPos({ x: (Math.random() - 0.5) * 280, y: (Math.random() - 0.5) * 180 });
    setDodges((d) => d + 1);
  };

  const tired = dodges >= MAX_DODGES;

  return (
    <section className="flex min-h-screen items-center justify-center px-6" data-testid="question-step">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass relative w-full max-w-xl rounded-[2rem] p-10 shadow-2xl shadow-black/5 dark:shadow-black/40 md:p-16"
      >
        <Coffee className="absolute -top-6 right-10 text-primary" size={40} />
        <p className="text-xs uppercase tracking-[0.4em] text-primary">The big question</p>
        <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          Would you like to go on a <span className="font-caveat text-primary">coffee date</span> with me? ☕
        </h2>
        <div className="relative mt-14 flex flex-wrap items-center gap-6">
          <button
            data-testid="yes-date-btn"
            onClick={onYes}
            className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium tracking-widest text-primary-foreground shadow-xl shadow-primary/30 transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <Heart size={16} fill="currentColor" /> Yes
          </button>
          <motion.button
            data-testid="dodge-btn"
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onHoverStart={dodge}
            onPointerEnter={dodge}
            onFocus={dodge}
            onClick={() => (tired ? onYes() : dodge())}
            className="rounded-full border border-border bg-secondary px-8 py-4 text-sm font-medium tracking-widest text-secondary-foreground transition-colors"
          >
            🤭 {tired ? "Okay, fine…" : "Let Me Think"}
          </motion.button>
        </div>
        {dodges > 0 && !tired && (
          <p className="mt-8 text-xs italic text-muted-foreground">
            {["Hmm, it seems shy…", "It's running away!", "Almost caught it…"][Math.min(dodges - 1, 2)]}
          </p>
        )}
      </motion.div>
    </section>
  );
}
