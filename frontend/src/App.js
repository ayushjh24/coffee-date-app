import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import Loader from "@/components/Loader";
import Particles from "@/components/Particles";
import SparkleCursor from "@/components/SparkleCursor";
import Controls from "@/components/Controls";
import Hero from "@/steps/Hero";
import Question from "@/steps/Question";
import DateStep from "@/steps/DateStep";
import TimeStep from "@/steps/TimeStep";
import MenuStep from "@/steps/MenuStep";
import MessageStep from "@/steps/MessageStep";
import SummaryStep from "@/steps/SummaryStep";
import Celebration from "@/steps/Celebration";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const BGM_URL =
  "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";

const stepMotion = {
  initial: { opacity: 0, y: 40, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -40, filter: "blur(10px)" },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState("hero");
  const [dark, setDark] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [data, setData] = useState({ date: null, time: "", menu: [], message: "" });
  const audioRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const audio = new Audio(BGM_URL);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => audio.pause();
  }, []);

  const startMusic = () => {
    audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
  };

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const confirmDate = () => {
    axios
      .post(`${API}/dates`, {
        date: data.date,
        time: data.time,
        menu: data.menu,
        message: data.message,
      })
      .catch(() => {});
    setStep("celebration");
  };

  if (loading) return <Loader onDone={() => setLoading(false)} />;

  const steps = {
    hero: (
      <Hero
        onOpen={() => {
          startMusic();
          setStep("question");
        }}
      />
    ),
    question: <Question onYes={() => setStep("date")} />,
    date: (
      <DateStep
        value={data.date}
        onSelect={(d) => setData({ ...data, date: d })}
        onNext={() => setStep("time")}
        onBack={() => setStep("question")}
      />
    ),
    time: (
      <TimeStep
        value={data.time}
        onSelect={(t) => setData({ ...data, time: t })}
        onNext={() => setStep("menu")}
        onBack={() => setStep("date")}
      />
    ),
    menu: (
      <MenuStep
        value={data.menu}
        onChange={(m) => setData({ ...data, menu: m })}
        onNext={() => setStep("message")}
        onBack={() => setStep("time")}
      />
    ),
    message: (
      <MessageStep
        value={data.message}
        onChange={(v) => setData({ ...data, message: v })}
        onNext={() => setStep("summary")}
        onBack={() => setStep("menu")}
      />
    ),
    summary: (
      <SummaryStep data={data} onConfirm={confirmDate} onBack={() => setStep("message")} />
    ),
    celebration: <Celebration />,
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-background text-foreground"
      data-testid="app-root"
    >
      <div className="grain" aria-hidden />
      <Particles />
      <SparkleCursor />
      <Controls dark={dark} setDark={setDark} playing={playing} toggleAudio={toggleAudio} />
      <AnimatePresence mode="wait">
        <motion.main
          key={step}
          {...stepMotion}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex min-h-screen flex-col"
        >
          {steps[step]}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
