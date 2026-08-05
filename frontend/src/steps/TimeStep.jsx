import { Clock, ArrowRight, ArrowLeft } from "lucide-react";

const SLOTS = [
  "09:00 AM", "10:30 AM", "12:00 PM", "01:30 PM",
  "03:00 PM", "04:30 PM", "06:00 PM", "07:30 PM", "09:00 PM",
];

export default function TimeStep({ value, onSelect, onNext, onBack }) {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-20" data-testid="time-step">
      <div className="glass w-full max-w-lg rounded-[2rem] p-8 shadow-2xl shadow-black/5 dark:shadow-black/40 md:p-12">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Chapter 02</p>
        <h2 className="mt-4 flex items-center gap-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Pick our time <Clock className="text-primary" size={28} />
        </h2>
        <div className="mt-10 grid grid-cols-3 gap-3" data-testid="time-picker">
          {SLOTS.map((t) => (
            <button
              key={t}
              data-testid={`time-slot-${t.replace(/[: ]/g, "-")}`}
              onClick={() => onSelect(t)}
              className={`rounded-2xl border px-2 py-4 text-sm tracking-wider transition-all duration-300 ${
                value === t
                  ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                  : "border-border bg-background/40 hover:border-primary/60 hover:scale-105"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-between">
          <button
            data-testid="time-back-btn"
            onClick={onBack}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <button
            data-testid="time-next-btn"
            disabled={!value}
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
