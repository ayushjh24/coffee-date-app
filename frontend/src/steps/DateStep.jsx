import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function DateStep({ value, onSelect, onNext, onBack }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];
  const canPrev = new Date(year, month, 1) > new Date(today.getFullYear(), today.getMonth(), 1);
  const selected = value ? new Date(value) : null;

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-20" data-testid="date-step">
      <div className="glass w-full max-w-md rounded-[2rem] p-8 shadow-2xl shadow-black/5 dark:shadow-black/40 md:p-12">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Chapter 01</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">Pick our date 📅</h2>

        <div className="mt-8 flex items-center justify-between" data-testid="date-picker">
          <button
            data-testid="calendar-prev"
            aria-label="Previous month"
            disabled={!canPrev}
            onClick={() => setView(new Date(year, month - 1, 1))}
            className="rounded-full p-2 transition-colors hover:bg-secondary disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>
          <p className="text-sm font-medium tracking-widest">
            {MONTHS[month]} {year}
          </p>
          <button
            data-testid="calendar-next"
            aria-label="Next month"
            onClick={() => setView(new Date(year, month + 1, 1))}
            className="rounded-full p-2 transition-colors hover:bg-secondary"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-widest text-muted-foreground">
          {WEEKDAYS.map((d) => (
            <span key={d} className="py-2">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) =>
            d === null ? (
              <span key={`e-${i}`} />
            ) : (
              <button
                key={d.toISOString()}
                data-testid={`date-day-${d.getDate()}`}
                disabled={d < today}
                onClick={() => onSelect(d.toDateString())}
                className={`aspect-square rounded-full text-sm transition-all duration-200 ${
                  selected && d.toDateString() === selected.toDateString()
                    ? "bg-primary font-semibold text-primary-foreground shadow-lg shadow-primary/30 scale-110"
                    : d < today
                      ? "text-muted-foreground/30"
                      : "hover:bg-accent hover:scale-105"
                }`}
              >
                {d.getDate()}
              </button>
            )
          )}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button
            data-testid="date-back-btn"
            onClick={onBack}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <button
            data-testid="date-next-btn"
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
