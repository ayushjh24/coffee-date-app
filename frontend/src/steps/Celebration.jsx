import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart } from "lucide-react";

const MESSAGE = "Yay! I can't wait to spend this time with you. ☕❤️";
const COLORS = ["#C89B3C", "#D4AF37", "#E6D0CE", "#FDFBF7", "#c08552"];

export default function Celebration() {
  const [shown, setShown] = useState("");

  useEffect(() => {
    confetti({ particleCount: 180, spread: 110, origin: { y: 0.6 }, colors: COLORS });
    const end = Date.now() + 2600;
    const frame = () => {
      confetti({ particleCount: 3, angle: 60, spread: 60, origin: { x: 0 }, colors: COLORS });
      confetti({ particleCount: 3, angle: 120, spread: 60, origin: { x: 1 }, colors: COLORS });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setShown(MESSAGE.slice(0, i));
      if (i >= MESSAGE.length) clearInterval(t);
    }, 60);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
      data-testid="celebration-step"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="glass flex h-24 w-24 items-center justify-center rounded-full shadow-2xl shadow-primary/30"
      >
        <Heart size={40} className="text-primary" fill="currentColor" />
      </motion.div>
      <h2
        className="mt-12 min-h-[3.5rem] max-w-2xl text-3xl font-semibold leading-snug tracking-tight md:text-5xl"
        data-testid="celebration-message"
      >
        {shown}
        <span className="animate-pulse text-primary">|</span>
      </h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: shown.length >= MESSAGE.length ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="font-caveat mt-8 text-3xl text-primary md:text-4xl"
      >
        — see you soon ☕
      </motion.p>
    </section>
  );
}
