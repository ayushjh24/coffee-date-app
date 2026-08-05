import { motion } from "framer-motion";
import { Calendar, Clock, UtensilsCrossed, Mail, ArrowLeft, Heart } from "lucide-react";

const MENU_NAMES = {
  cappuccino: "Cappuccino",
  latte: "Latte",
  "cold-coffee": "Cold Coffee",
  "hot-chocolate": "Hot Chocolate",
  cheesecake: "Cheesecake",
  croissant: "Croissant",
  cookies: "Cookies",
  pizza: "Pizza",
};

const Row = ({ icon: Icon, label, children, testid }) => (
  <div className="flex items-start gap-4" data-testid={testid}>
    <span className="mt-1 text-primary"><Icon size={18} /></span>
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium">{children}</p>
    </div>
  </div>
);

export default function SummaryStep({ data, onConfirm, onBack }) {
  const menuList = data.menu.map((m) => MENU_NAMES[m] || m).join(", ");

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-20" data-testid="summary-step">
      <div className="flex w-full max-w-4xl flex-col items-center gap-12 md:flex-row md:items-start md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass w-full max-w-md rounded-[2rem] p-8 shadow-2xl shadow-black/5 dark:shadow-black/40 md:p-10"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-primary">Final chapter</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">Our little plan 💌</h2>
          <div className="mt-8 space-y-6">
            <Row icon={Calendar} label="Date" testid="summary-date">{data.date}</Row>
            <Row icon={Clock} label="Time" testid="summary-time">{data.time}</Row>
            <Row icon={UtensilsCrossed} label="Menu" testid="summary-menu">{menuList}</Row>
            <Row icon={Mail} label="Your note" testid="summary-message">
              {data.message || "—"}
            </Row>
          </div>
          <div className="mt-10 flex items-center justify-between">
            <button
              data-testid="summary-back-btn"
              onClick={onBack}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              data-testid="confirm-date-btn"
              onClick={onConfirm}
              className="flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-xs font-medium uppercase tracking-widest text-primary-foreground shadow-xl shadow-primary/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Confirm Our Coffee Date <Heart size={14} fill="currentColor" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="receipt-zigzag w-full max-w-xs bg-[#fffdf8] p-8 pb-12 font-mono text-sm tracking-wider text-[#2c1e16] shadow-2xl shadow-black/20 dark:bg-[#f5efe4]"
          data-testid="funny-bill"
        >
          <p className="text-center text-base font-bold tracking-[0.3em]">CAFÉ AMOUR</p>
          <p className="mt-1 text-center text-[10px] uppercase tracking-widest opacity-60">
            est. the day you said yes
          </p>
          <div className="my-5 border-t border-dashed border-[#2c1e16]/30" />
          <div className="space-y-3">
            <p className="flex justify-between"><span>Coffee</span><span>₹199</span></p>
            <p className="flex justify-between"><span>Dessert</span><span>₹149</span></p>
            <p className="flex justify-between"><span>Memories</span><span>Priceless</span></p>
            <p className="flex justify-between"><span>Your Smile</span><span>FREE ❤️</span></p>
          </div>
          <div className="my-5 border-t border-dashed border-[#2c1e16]/30" />
          <p className="text-center text-xs uppercase tracking-widest opacity-60">Total</p>
          <p className="mt-2 text-center font-caveat text-2xl">Just one happy smile 😊</p>
        </motion.div>
      </div>
    </section>
  );
}
