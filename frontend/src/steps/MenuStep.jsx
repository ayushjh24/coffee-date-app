import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const ITEMS = [
  { id: "cappuccino", emoji: "☕", name: "Cappuccino", note: "Classic & foamy" },
  { id: "latte", emoji: "🥛", name: "Latte", note: "Smooth & silky" },
  { id: "cold-coffee", emoji: "🧋", name: "Cold Coffee", note: "Iced & bold" },
  { id: "hot-chocolate", emoji: "🍫", name: "Hot Chocolate", note: "A warm hug" },
  { id: "cheesecake", emoji: "🍰", name: "Cheesecake", note: "Creamy slice" },
  { id: "croissant", emoji: "🥐", name: "Croissant", note: "Buttery layers" },
  { id: "cookies", emoji: "🍪", name: "Cookies", note: "Freshly baked" },
  { id: "pizza", emoji: "🍕", name: "Pizza", note: "Why not?" },
];

export default function MenuStep({ value, onChange, onNext, onBack }) {
  const toggle = (id) =>
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-20" data-testid="menu-step">
      <div className="w-full max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Chapter 03</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          What shall we order? <span className="font-caveat text-primary">pick a few</span>
        </h2>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {ITEMS.map((item, i) => {
            const active = value.includes(item.id);
            return (
              <motion.button
                key={item.id}
                data-testid={`menu-item-${item.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 0.97 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => toggle(item.id)}
                className={`glass relative flex flex-col items-start rounded-3xl p-5 text-left transition-shadow duration-300 ${
                  active
                    ? "border-primary shadow-[0_0_30px_rgba(200,155,60,0.25)]"
                    : "hover:shadow-xl"
                }`}
              >
                {active && (
                  <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check size={12} />
                  </span>
                )}
                <span className="text-3xl">{item.emoji}</span>
                <span className="mt-4 text-sm font-medium">{item.name}</span>
                <span className="mt-1 text-xs text-muted-foreground">{item.note}</span>
              </motion.button>
            );
          })}
        </div>
        <div className="mt-10 flex items-center justify-between">
          <button
            data-testid="menu-back-btn"
            onClick={onBack}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <button
            data-testid="menu-next-btn"
            disabled={value.length === 0}
            onClick={onNext}
            className="flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-xs font-medium uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
          >
            Next <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
