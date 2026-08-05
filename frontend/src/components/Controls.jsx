import { Moon, Sun, Volume2, VolumeX } from "lucide-react";

const btn =
  "glass fixed z-40 flex h-11 w-11 items-center justify-center rounded-full text-foreground shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95";

export default function Controls({ dark, setDark, playing, toggleAudio }) {
  return (
    <>
      <button
        data-testid="theme-toggle"
        aria-label="Toggle dark mode"
        onClick={() => setDark(!dark)}
        className={`${btn} right-5 top-5`}
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <button
        data-testid="music-toggle"
        aria-label="Toggle background music"
        onClick={toggleAudio}
        className={`${btn} bottom-5 right-5`}
      >
        {playing ? (
          <span className="flex items-end gap-[3px] text-primary">
            <span className="wave-bar" style={{ animationDelay: "0s" }} />
            <span className="wave-bar" style={{ animationDelay: "0.2s" }} />
            <span className="wave-bar" style={{ animationDelay: "0.4s" }} />
          </span>
        ) : (
          <VolumeX size={18} />
        )}
        <span className="sr-only">{playing ? "Mute" : "Unmute"}</span>
      </button>
      {playing && <Volume2 className="hidden" aria-hidden />}
    </>
  );
}
