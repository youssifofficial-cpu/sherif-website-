import { motion } from "framer-motion";
import { useEffect } from "react";

const officialLogoImg = `${import.meta.env.BASE_URL}sk-logo-official.png`;
const introSfxUrl = `${import.meta.env.BASE_URL}intro-sfx.mp3`;

let _sfxAttempted = false;
let _sfxActuallyPlayed = false;
let _audio: HTMLAudioElement | null = null;

function playSfx() {
  if (_sfxAttempted) return;
  _sfxAttempted = true;
  try {
    _audio = new Audio(introSfxUrl);
    _audio.volume = 0.75;
    const p = _audio.play();
    if (p && typeof p.then === "function") {
      p.then(() => { _sfxActuallyPlayed = true; })
       .catch(() => {});
    } else {
      _sfxActuallyPlayed = true;
    }
  } catch {
  }
}

interface Props {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: Props) {
  useEffect(() => {
    const t = setTimeout(playSfx, 180);

    const onFirstGesture = () => {
      if (!_sfxActuallyPlayed) {
        _sfxAttempted = false;
        playSfx();
      }
    };
    document.addEventListener("pointerdown", onFirstGesture, { once: true });

    return () => {
      clearTimeout(t);
      document.removeEventListener("pointerdown", onFirstGesture);
      if (_audio) {
        _audio.pause();
        _audio = null;
      }
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black overflow-hidden select-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
    >
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: "65vmin",
          height: "65vmin",
          background:
            "radial-gradient(circle, rgba(244,114,182,0.45) 0%, rgba(200,80,150,0.18) 42%, transparent 70%)",
        }}
        animate={{
          scale:   [0.25, 1.05, 1.1,  0.92, 1.08, 1.0,  18],
          opacity: [0,    0.85, 0.65, 0.9,  0.55, 0.45, 0],
        }}
        transition={{
          duration: 4.0,
          times:    [0,   0.2,  0.36, 0.5,  0.62, 0.7,  1],
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute pointer-events-none rounded-full border border-pink-300/20"
        style={{ width: "75vmin", height: "75vmin" }}
        animate={{
          scale:   [0.6,  1.0,  1.25, 8],
          opacity: [0,    0.35, 0.2,  0],
        }}
        transition={{
          duration: 4.0,
          times:    [0, 0.22, 0.55, 1],
          ease: "easeInOut",
        }}
      />

      <motion.img
        src={officialLogoImg}
        alt="Sherif Alkadi"
        className="relative z-10"
        style={{ width: "clamp(160px, 30vmin, 360px)", height: "auto" }}
        animate={{
          scale: [0.12, 1.0,  1.0,  0.93, 1.05, 1.0,  24],
          opacity: [0,  1,    1,    1,    1,    1,    1],
          filter: [
            "blur(32px) brightness(0.2)",
            "blur(0px)  brightness(1.2)",
            "blur(0px)  brightness(1.0)",
            "blur(0px)  brightness(1.0)",
            "blur(0px)  brightness(1.35)",
            "blur(0px)  brightness(1.0)",
            "blur(8px)  brightness(3.0)",
          ],
          rotate: [0, 0, 0, -1.5, 1.5, 0, 0],
        }}
        transition={{
          duration: 4.0,
          times:    [0,   0.2, 0.32, 0.45, 0.58, 0.68, 1.0],
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute inset-0 bg-black pointer-events-none z-20"
        animate={{ opacity: [0, 0, 0, 0, 0, 0.15, 1] }}
        transition={{
          duration: 4.0,
          times:    [0,   0.5, 0.65, 0.78, 0.87, 0.93, 1.0],
        }}
        onAnimationComplete={onComplete}
      />

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-white/35 text-[10px] uppercase tracking-[0.28em] hover:text-white/65 transition-colors duration-300 z-30 cursor-pointer"
      >
        Skip
      </motion.button>

      <motion.p
        className="absolute z-10 text-white/30 tracking-[0.55em] text-[9px] uppercase"
        style={{ top: "calc(50% + clamp(100px,18vmin,210px))" }}
        animate={{ opacity: [0, 0, 0.7, 0.7, 0, 0] }}
        transition={{
          duration: 4.0,
          times:    [0, 0.22, 0.38, 0.58, 0.72, 1],
        }}
      >
        Sherif Alkadi
      </motion.p>
    </motion.div>
  );
}
