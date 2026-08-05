import { ArrowRight, ArrowLeft, PenLine } from "lucide-react";

export default function MessageStep({ value, onChange, onNext, onBack }) {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-20" data-testid="message-step">
      <div className="glass w-full max-w-xl rounded-[2rem] p-8 shadow-2xl shadow-black/5 dark:shadow-black/40 md:p-12">
        <p className="text-xs uppercase tracking-[0.4em] text-primary">Chapter 04</p>
        <h2 className="mt-4 flex items-center gap-3 text-3xl font-semibold tracking-tight md:text-4xl">
          A little note? <PenLine className="text-primary" size={26} />
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Anything you'd like to tell me before our coffee date?
        </p>
        <textarea
          data-testid="special-message-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          placeholder="Write it here… (optional)"
          className="mt-8 w-full resize-none rounded-3xl border border-border bg-background/50 p-5 text-sm leading-relaxed outline-none transition-all duration-300 placeholder:text-muted-foreground/60 focus:border-primary focus:shadow-[0_0_24px_rgba(200,155,60,0.15)]"
        />
        <div className="mt-8 flex items-center justify-between">
          <button
            data-testid="message-back-btn"
            onClick={onBack}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <button
            data-testid="message-next-btn"
            onClick={onNext}
            className="flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-xs font-medium uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105"
          >
            Review <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
