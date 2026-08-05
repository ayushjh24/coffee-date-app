const PHRASES = ["A COFFEE DATE?", "EST. TODAY", "TWO CUPS", "ONE STORY", "SAVE THE DATE", "☕", "❤️"];

export default function Marquee() {
  const line = [...PHRASES, ...PHRASES, ...PHRASES];
  return (
    <div className="marquee w-full py-4 text-[11px] uppercase tracking-[0.5em] text-muted-foreground">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <span key={half} className="flex shrink-0">
            {line.map((p, i) => (
              <span key={`${half}-${i}`} className="mx-8">
                {p}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
