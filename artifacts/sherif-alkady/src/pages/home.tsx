import { useState, useEffect, useRef } from "react";
import {
  motion, AnimatePresence, useMotionValue, useSpring,
  useScroll, useTransform
} from "framer-motion";
import { ArrowRight, ChevronRight, ChevronDown, RotateCcw, Heart, MessageCircle } from "lucide-react";
import { SiInstagram, SiFacebook, SiTiktok } from "react-icons/si";

/* ── Core portraits & hero ── */
import portraitImg      from "@assets/Image_(z)_1775312883505.jpg";
import brushPortraitImg from "@assets/IMG_3121_1775340923314.jpeg";
import aboutMirrorImg   from "@assets/IMG_5272_1775298299059.jpeg";

const officialLogoUrl = `${import.meta.env.BASE_URL}sk-logo-official.png`;

/* ── Services (4 unique) ── */
import bridalCardImg    from "@assets/IMG_5010_1775290559884.jpeg";
import bridalVeilImg    from "@assets/IMG_5011_1775290559885.jpeg";
import eventGlamGoldImg from "@assets/IMG_4991_1775290559884.jpeg";
import naturalGlamImg   from "@assets/IMG_5013_1775290559885.jpeg";

/* ── Portfolio (8 unique, none repeat services) ── */
import neonEditorialImg from "@assets/IMG_5280_1775326873289.jpeg";
import pinkFeatherImg  from "@assets/IMG_5289_1775309845223.jpeg";
import bridalGownImg   from "@assets/IMG_5002_1775290559884.jpeg";
import sparkleGlamImg  from "@assets/IMG_4998_1775290559885.jpeg";
import softGlamWavyImg from "@assets/IMG_4994_1775290559885.jpeg";
import brideBouquetImg from "@assets/IMG_5012_1775290559885.jpeg";
import extraEditorialImg from "@assets/Editorial_Yellow_Floral.jpeg";

/* ── Instagram (6 fresh, none repeat above) ── */
import igGhadaCarImg       from "@assets/IMG_5276_1775306939768.jpeg";
import igAsmaaEditorialImg from "@assets/IMG_5279_1775307003416.jpeg";
import igMaybellineImg     from "@assets/IMG_5290_1775298299059.jpeg";
import igGreyTopImg        from "@assets/IMG_5309_1775308632536.jpeg";
import igOnSetImg          from "@assets/IMG_5310_1775308801835.jpeg";

/* ── Press thumbnails (actual article covers) ── */
import pressImg1 from "@assets/Article_cover_1_1775312883505.png";
import pressImg2 from "@assets/Article_cover_2_1775312883505.png";
import pressImg3 from "@assets/Article_cover_3_1775312883506.JPG";
import pressImg4 from "@assets/IMG_5312_1775308319908.jpeg";

/* ── Additional celebrity ── */
import celeb_amira from "@assets/Amira_Adeeb__1775312883505.JPG";

/* ── Celebrity assets ── */
import celeb_yasmina from "@assets/IMG_5272_1775306856917.jpeg";
import celeb_engy from "@assets/IMG_5307_1775308141232.jpg";
import celeb_tamima from "@assets/IMG_5274_1775306893758.jpeg";
import celeb_ghada from "@assets/IMG_5277_1775306939768.jpeg";
import celeb_asmaa from "@assets/IMG_5278_1775307003416.jpeg";
import celeb_lella from "@assets/IMG_5305_1775307084418.jpeg";
import celeb_amuun from "@assets/IMG_5306_1775307084418.jpeg";
import celeb_jowhara from "@assets/IMG_5311_1775309582120.jpeg";
import celeb_nahed from "@assets/Nahed_El_Sebai.jpeg";

const WHATSAPP = "https://wa.me/201222279195";
const SOCIAL = {
  instagram: "https://instagram.com/sherifalkadi",
  facebook: "https://facebook.com/sherifalkadi",
  tiktok: "https://tiktok.com/@sherifalkadi",
};

/* ─── GLASS BUTTON ─── */
const glassBtnBase: React.CSSProperties = {
  background: "rgba(244,114,182,0.12)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(244,114,182,0.45)",
  boxShadow: "0 8px 32px rgba(244,114,182,0.18), inset 0 1px 0 rgba(255,255,255,0.28)",
};
const glassBtnHover: React.CSSProperties = {
  background: "rgba(244,114,182,0.24)",
  boxShadow: "0 16px 48px rgba(244,114,182,0.38), inset 0 1px 0 rgba(255,255,255,0.38)",
};
const glassBtnPrimary: React.CSSProperties = {
  background: "linear-gradient(135deg,rgba(244,114,182,0.55),rgba(225,29,72,0.42))",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(244,114,182,0.6)",
  boxShadow: "0 10px 40px rgba(244,114,182,0.35), inset 0 1px 0 rgba(255,255,255,0.35)",
};

function GlassBtn({
  children, href, onClick, primary = false, className = "", testId = "",
}: {
  children: React.ReactNode; href?: string; onClick?: () => void;
  primary?: boolean; className?: string; testId?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const style = primary
    ? { ...glassBtnPrimary, ...(hovered ? { background: "linear-gradient(135deg,rgba(244,114,182,0.7),rgba(225,29,72,0.58))", boxShadow: "0 16px 48px rgba(244,114,182,0.5), inset 0 1px 0 rgba(255,255,255,0.42)" } : {}) }
    : { ...glassBtnBase, ...(hovered ? glassBtnHover : {}) };

  const base = `inline-flex items-center justify-center gap-2 px-9 py-4 text-xs uppercase tracking-widest font-semibold text-white cursor-pointer select-none transition-transform duration-300 ${className}`;

  return href ? (
    <motion.a
      href={href} target="_blank" rel="noreferrer"
      style={style} className={base} data-testid={testId}
      whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97, y: 0 }}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
    >
      {children}
    </motion.a>
  ) : (
    <motion.button
      onClick={onClick} style={style} className={base} data-testid={testId}
      whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97, y: 0 }}
      onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)}
    >
      {children}
    </motion.button>
  );
}

/* ─── CUSTOM CURSOR ─── */
function CustomCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const cx = useSpring(mx, { stiffness: 600, damping: 35 });
  const cy = useSpring(my, { stiffness: 600, damping: 35 });
  const trailX = useSpring(mx, { stiffness: 120, damping: 25 });
  const trailY = useSpring(my, { stiffness: 120, damping: 25 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); setVisible(true); };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseleave", leave); };
  }, [mx, my]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] w-3 h-3 rounded-full bg-pink-400 pointer-events-none hidden md:block mix-blend-difference"
        style={{ x: cx, y: cy, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border border-pink-300/50 pointer-events-none hidden md:block"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%", opacity: visible ? 0.6 : 0 }}
      />
    </>
  );
}

/* ─── QUIZ DATA ─── */
const quizSteps = [
  { question: "What's the occasion?", options: [
    { label: "My Wedding Day", value: "bridal" },
    { label: "Engagement / Pre-Wedding", value: "preview" },
    { label: "A Special Event or Party", value: "event" },
    { label: "Something Bold & Editorial", value: "baddie" },
  ]},
  { question: "How do you want people to see you?", options: [
    { label: "Timeless & Ethereal", value: "soft" },
    { label: "Fierce & Unapologetic", value: "bold" },
    { label: "Glowing & Effortless", value: "glow" },
    { label: "Sultry & Mysterious", value: "dark" },
  ]},
  { question: "What's your skin like?", options: [
    { label: "Fair & Porcelain", value: "fair" },
    { label: "Medium & Warm-Toned", value: "medium" },
    { label: "Olive & Golden", value: "olive" },
    { label: "Deep & Luminous", value: "deep" },
  ]},
  { question: "Pick your vibe:", options: [
    { label: "Less is More", value: "minimal" },
    { label: "Full Glam, No Apologies", value: "full" },
    { label: "Soft & Romantic", value: "romantic" },
    { label: "Dramatic & High Fashion", value: "dramatic" },
  ]},
];

const getResult = (answers: string[]) => {
  const has = (...v: string[]) => answers.some((a) => v.includes(a));
  if (has("bridal") && has("soft","romantic")) return { title: "Ethereal Bridal", desc: "Soft luminosity, flawless skin, and timeless elegance. A look that photographs like a dream and lasts all day.", badge: "Bridal Makeup" };
  if (has("baddie") || has("bold","dramatic")) return { title: "Baddie Glam", desc: "High-impact, unapologetic, and runway-ready. All eyes on you — no exceptions.", badge: "Baddie Glam" };
  if (has("event") && has("full","glow")) return { title: "Event Glam", desc: "Polished, camera-ready, and perfectly suited to every flash. You'll walk into any room and own it.", badge: "Event Glam" };
  if (has("preview")) return { title: "Bridal Preview", desc: "A full trial run of your wedding look so you feel calm, confident, and perfectly prepared on your big day.", badge: "Bridal Preview" };
  return { title: "Signature Soft Glam", desc: "Naturally you — only more radiant. Clean skin, soft definition, and effortless luminosity.", badge: "Event Glam" };
};

/* ─── ANIMATION PRESETS ─── */
const fadeUp = {
  initial: { opacity: 0, y: 55 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
};

/* ─── TILT CARD ─── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setRotX(y); setRotY(x);
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={() => { setRotX(0); setRotY(0); }}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <motion.div
        animate={{ rotateX: rotX, rotateY: rotY }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── INSTAGRAM POSTS (6 fresh assets — never repeat other sections) ─── */
const igPosts = [
  { src: igGhadaCarImg,       pos: "object-center", likes: "4.8k", comments: "163", caption: "Every star deserves a moment like this 🌟" },
  { src: igAsmaaEditorialImg, pos: "object-top",    likes: "3.9k", comments: "121", caption: "Black & white never looked this alive 🖤" },
  { src: igMaybellineImg,     pos: "object-top",    likes: "3.4k", comments: "108", caption: "Maybelline collab — backstage realness" },
  { src: igGreyTopImg,        pos: "object-top",    likes: "2.7k", comments: "84",  caption: "Clean. Sharp. Unforgettable." },
  { src: igOnSetImg,          pos: "object-center", likes: "2.1k", comments: "67",  caption: "On-set energy, always 🎬" },
];

/* ─── PRESS DATA (actual article cover images) ─── */
const pressItems = [
  {
    publication: "Hia Magazine",
    headline: "Ghada AbdelRazek rocks a bold beauty look — and Sherif shares how to recreate it",
    url: "https://www.hiamag.com/جمال/مشاهير-وجمال/1784594-غادة-عبد-الرازق-بإطلالة-جمالية-جريئة-ونصائح-لإتباع-هذا-اللوك-الشبابي",
    img: pressImg1,
    objPos: "object-center",
    date: "2025",
  },
  {
    publication: "Masrawy",
    headline: "Bold makeup & a brand-new look — Ghada AbdelRazek steals every eye in her latest appearance",
    url: "https://www.masrawy.com/howa_w_hya/fashion-moda/details/2025/7/1/2813807/لوك-مختلف-ومكياج-جريء-غادة-عبد-الرازق-تخطف-الأنظار-في-أحدث-ظهور",
    img: pressImg2,
    objPos: "object-top",
    date: "July 1, 2025",
  },
  {
    publication: "Facebook Feature",
    headline: "Sherif Alkadi's signature glam takes over — fans and celebrities can't stop talking",
    url: "https://www.facebook.com/story.php?story_fbid=753934557314933&id=100080951873146",
    img: pressImg3,
    objPos: "object-center",
    date: "2025",
  },
  {
    publication: "Laha Magazine",
    headline: "Asmaa Galal on her dreams, Diana, and the makeup look that turned heads",
    url: "https://www.lahamag.com/article/214940-أسماء-جلال-أحلم-بأداء-شخصية-الأميرة-ديانا",
    img: pressImg4,
    objPos: "object-top",
    date: "2025",
  },
];

/* ─── CELEBRITY DATA ─── */
const celebrities = [
  { name: "Yasmina El Abd",      img: celeb_yasmina,  role: "Actress"             },
  { name: "Engy El Mokaddem",    img: celeb_engy,     role: "Presenter & Actress"  },
  { name: "Tamima Hafez",        img: celeb_tamima,   role: "TV Personality"       },
  { name: "Ghada AbdelRazek",    img: celeb_ghada,    role: "Actress"              },
  { name: "Asmaa Galal",         img: celeb_asmaa,    role: "Actress"              },
  { name: "Lella Fadda",         img: celeb_lella,    role: "Influencer"           },
  { name: "Amuun Star",          img: celeb_amuun,    role: "Content Creator"      },
  { name: "Jowhara",             img: celeb_jowhara,  role: "Bellydancer"          },
  { name: "Amira Adeeb",         img: celeb_amira,    role: "Actress"              },
  { name: "Nahed El Sebai",      img: celeb_nahed,    role: "Actress"              },
];

/* ═══════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════ */
export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizDone, setQuizDone] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof getResult> | null>(null);
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1.05, 1.18]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  /* Force video autoplay — handles iOS battery-saver pause */
  useEffect(() => {
    const t = setTimeout(() => setLogoLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => { video.play().catch(() => {}); };

    // Immediate attempt
    tryPlay();
    // Retry after a short delay (helps with some iOS codec negotiations)
    const t1 = setTimeout(tryPlay, 300);
    const t2 = setTimeout(tryPlay, 1000);

    // Re-play whenever browser pauses or ends the clip
    video.addEventListener("pause", tryPlay);
    video.addEventListener("ended", tryPlay);

    // Re-play when tab becomes visible again
    const onVisibility = () => { if (!document.hidden) tryPlay(); };
    document.addEventListener("visibilitychange", onVisibility);

    // iOS requires a user gesture for some codecs — grab the very first touch
    const onGesture = () => { tryPlay(); };
    document.addEventListener("touchstart", onGesture, { once: true, passive: true });
    document.addEventListener("click", onGesture, { once: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      video.removeEventListener("pause", tryPlay);
      video.removeEventListener("ended", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("touchstart", onGesture);
      document.removeEventListener("click", onGesture);
    };
  }, []);

  const handleAnswer = (val: string) => {
    const next = [...answers, val];
    setAnswers(next);
    if (quizStep < quizSteps.length - 1) {
      setQuizStep((s) => s + 1);
    } else {
      setResult(getResult(next));
      setQuizDone(true);
    }
  };

  const resetQuiz = () => { setQuizStep(0); setAnswers([]); setQuizDone(false); setResult(null); };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      className="min-h-[100dvh] w-full flex flex-col bg-background text-foreground overflow-x-hidden selection:bg-pink-200"
      style={{ cursor: "none" }}
    >
      <CustomCursor />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          animate={logoLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={logoLoaded ? { opacity: 1, letterSpacing: "0.16em" } : {}}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-lg md:text-xl uppercase text-white drop-shadow-lg tracking-[0.16em] block"
          >
            Sherif Alkadi
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={logoLoaded ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1px] origin-left mt-[3px]"
            style={{ background: "linear-gradient(90deg,#f472b6,#fda4af,transparent)" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={logoLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.1 }}
          className="hidden lg:flex gap-6 text-[10px] tracking-widest uppercase text-white/75"
        >
          {[["about","Philosophy"],["sherif","Meet Sherif"],["services","Services"],["portfolio","Portfolio"],["celebrities","Celebrities"],["press","Press"],["quiz","Glam Quiz"]].map(([id,label]) => (
            <button
              key={id} onClick={() => scrollTo(id)}
              className="relative group text-white/75 hover:text-white transition-colors duration-300"
              data-testid={`nav-${id}`}
            >
              {label}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300"
                style={{ background: "linear-gradient(90deg,#f472b6,transparent)" }} />
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={logoLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <GlassBtn href={WHATSAPP} testId="nav-book">Book</GlassBtn>
        </motion.div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden" data-testid="hero">
        {/* Video with parallax — poster img sits beneath as reliable fallback */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 z-10"
            style={{ background: "linear-gradient(180deg,rgba(0,0,0,0.52) 0%,rgba(0,0,0,0.28) 40%,rgba(0,0,0,0.65) 100%)" }} />
          {/* Fallback poster — always visible, covered by video once it plays */}
          <img
            src={`${import.meta.env.BASE_URL}hero-poster.jpg`}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <motion.video
            ref={videoRef}
            autoPlay loop muted playsInline
            src={`${import.meta.env.BASE_URL}hero.mp4`}
            disablePictureInPicture
            style={{ scale: heroScale, pointerEvents: "none", WebkitUserSelect: "none" } as React.CSSProperties}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        {/* Hero text */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 flex flex-col items-center text-center text-white px-4"
        >
          {/* Autograph signature — first and dominant */}
          <div className="relative w-full overflow-x-hidden px-2 pb-10">
            <motion.h1
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.8 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              transition={{ duration: 2.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="font-script text-white drop-shadow-[0_6px_36px_rgba(244,114,182,0.5)] whitespace-nowrap"
              style={{ fontSize: "clamp(2rem,9.5vw,13rem)", lineHeight: 1.55, textShadow: "0 0 80px rgba(244,114,182,0.35), 0 2px 10px rgba(0,0,0,0.7)" }}
            >
              Sherif Alkadi
            </motion.h1>
            {/* Glow shimmer sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ x: ["-110%", "210%"] }}
              transition={{ repeat: Infinity, duration: 4, delay: 3.2, ease: "easeInOut", repeatDelay: 6 }}
              style={{
                background: "linear-gradient(105deg,transparent 28%,rgba(255,255,255,0.2) 50%,transparent 72%)",
                mixBlendMode: "screen",
              }}
            />
          </div>

          {/* Subtitle below */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.05em" }}
            animate={{ opacity: 1, letterSpacing: "0.48em" }}
            transition={{ duration: 1.8, delay: 1.8 }}
            className="text-[9px] md:text-[11px] uppercase mb-8 mt-1 text-white/55 font-light tracking-widest"
          >
            Makeup Artist
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.2 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <GlassBtn href={WHATSAPP} primary testId="hero-book">Book Now</GlassBtn>
            <GlassBtn onClick={() => scrollTo("services")} testId="hero-services">Services</GlassBtn>
            <GlassBtn onClick={() => scrollTo("quiz")} testId="hero-quiz">Take the Quiz</GlassBtn>
          </motion.div>
        </motion.div>

        {/* SK Logo — flies in from the intro zoom-through and springs to rest */}
        <motion.div
          initial={{ opacity: 0, scale: 7, filter: "blur(18px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 4.1, ease: [0.34, 1.45, 0.64, 1] }}
          className="absolute bottom-20 z-20 flex flex-col items-center gap-3"
        >
          <motion.img
            src={officialLogoUrl}
            alt="Sherif Alkadi monogram"
            className="w-24 h-24 md:w-28 md:h-28 object-contain"
            style={{ mixBlendMode: "screen" }}
            animate={{
              filter: [
                "drop-shadow(0 0 8px rgba(244,114,182,0.55)) drop-shadow(0 0 20px rgba(244,114,182,0.28))",
                "drop-shadow(0 0 22px rgba(244,114,182,1)) drop-shadow(0 0 50px rgba(244,114,182,0.65))",
                "drop-shadow(0 0 8px rgba(244,114,182,0.55)) drop-shadow(0 0 20px rgba(244,114,182,0.28))",
              ],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          className="absolute bottom-6 flex flex-col items-center gap-1 z-20"
        >
          <span className="text-[9px] uppercase tracking-widest text-white/30">Scroll</span>
          <motion.div animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 1.7 }}>
            <ChevronDown className="w-4 h-4 text-pink-300/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section id="about" className="py-28 md:py-44 px-6 md:px-12 lg:px-24" data-testid="section-about">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-28 items-center">
          <motion.div {...fadeUp} className="order-2 lg:order-1 relative pb-24">
            <div className="relative aspect-[3/4] w-4/5 ml-auto overflow-hidden">
              <img src={portraitImg} alt="Sherif Alkadi" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
              <div className="absolute -left-2 -top-2 w-full h-full border border-pink-200/40 pointer-events-none" />
            </div>
            <div className="absolute bottom-0 left-0 aspect-[4/5] w-[52%] border-[6px] border-background shadow-2xl overflow-hidden">
              <img src={aboutMirrorImg} alt="Soft glam" className="w-full h-full object-cover object-top" />
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="order-1 lg:order-2 flex flex-col items-start">
            <p className="text-[10px] uppercase tracking-widest text-pink-400 mb-4">Our Philosophy</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">We Believe</h2>
            <div className="space-y-5 text-foreground/70 leading-relaxed text-lg font-light max-w-lg">
              <p>Every face tells a story, and makeup is simply the light that reveals it. I believe in the power of a calm, supportive presence on one of the most important days of your life.</p>
              <p>My philosophy centers on creating flawless, timeless looks that don't mask who you are — but elevate your natural beauty to its most radiant form.</p>
              <p>That effortless intersection of soft glam and striking editorial confidence? That's where we live.</p>
            </div>
            <motion.p {...fadeUp} className="font-script text-4xl md:text-5xl text-pink-400 mt-8">
              You deserve to feel beautiful.
            </motion.p>
            <div className="mt-10">
              <GlassBtn href={WHATSAPP} testId="about-book">Book a Session <ArrowRight className="w-3.5 h-3.5 ml-1" /></GlassBtn>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MEET SHERIF ── */}
      <section id="sherif" className="py-28 md:py-40 px-6 md:px-12 lg:px-24"
        style={{ background: "linear-gradient(135deg,hsl(340 30% 97%) 0%,hsl(350 25% 95%) 50%,hsl(30 30% 96%) 100%)" }}
        data-testid="section-meet-sherif"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-widest text-pink-400 mb-3">Behind the Brush</p>
            <p className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-none">Meet</p>
            <div className="relative overflow-hidden mt-1">
              <motion.p
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-script text-5xl md:text-6xl lg:text-7xl text-pink-400 leading-tight"
                style={{ textShadow: "0 0 40px rgba(244,114,182,0.25)" }}
              >
                Sherif
              </motion.p>
            </div>
            <div className="w-16 h-[1px] mx-auto mt-5"
              style={{ background: "linear-gradient(90deg,transparent,#f9a8d4,transparent)" }} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div {...fadeUp} className="lg:col-span-2">
              <TiltCard className="max-w-md mx-auto lg:mx-0">
                <div className="relative aspect-[3/4]">
                  <img src={brushPortraitImg} alt="Sherif Alkadi — Professional Makeup Artist"
                    className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(180deg,transparent 60%,rgba(0,0,0,0.18))" }} />
                  <div className="absolute -right-3 -bottom-3 border border-pink-200 w-full h-full pointer-events-none" />
                </div>
              </TiltCard>
            </motion.div>

            <motion.div {...fadeUp} className="lg:col-span-3 space-y-6 text-foreground/75 text-lg font-light leading-relaxed">
              <p>Sherif Alkadi is one of Egypt's most sought-after professional makeup artists, celebrated for his mastery of bridal and editorial beauty. With years of experience transforming brides and celebrities alike, Sherif has built a reputation for looks that are effortlessly flawless, deeply personal, and perfectly photographed.</p>
              <p>His signature style sits at the sweet spot between softly luminous and powerfully confident — a look that feels like <em>you</em>, only more radiant. He works with a calm, reassuring energy that puts every client at ease.</p>
              <p>Trained across Egypt's most prestigious studios, Sherif continues to push the art of makeup into new editorial territory — blending classical bridal techniques with modern high-fashion aesthetics that photograph beautifully both on screen and in person.</p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Bridal Makeup","Editorial Glam","Soft Glam","Event Ready","Pre-Wedding Trials"].map((tag) => (
                  <span key={tag}
                    className="text-xs uppercase tracking-widest border border-pink-200 text-pink-500 px-4 py-2 hover:bg-pink-50 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="pt-2">
                <GlassBtn href={WHATSAPP} testId="meet-book">
                  Book a Session <ArrowRight className="w-3.5 h-3.5" />
                </GlassBtn>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 md:py-40 px-6 md:px-12 bg-card" data-testid="section-services">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16 md:mb-24">
            <p className="text-[10px] uppercase tracking-widest text-pink-400 mb-3">What We Do</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Our Services</h2>
            <div className="w-16 h-[1px] mx-auto mt-5"
              style={{ background: "linear-gradient(90deg,transparent,#f9a8d4,transparent)" }} />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <ServiceCard title="Bridal Makeup" image={bridalCardImg} delay={0} />
            <ServiceCard title="Bridal Preview" image={bridalVeilImg} delay={0.12} />
            <ServiceCard title="Event Glam" image={eventGlamGoldImg} delay={0.24} />
            <ServiceCard title="Baddie Glam" image={naturalGlamImg} delay={0.36} />
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-28 md:py-44 px-6 md:px-12" data-testid="section-portfolio">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-pink-400 mb-3">The Work</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">Spotlight</h2>
            </div>
            <GlassBtn href={SOCIAL.instagram} testId="follow-instagram" className="!px-6 !py-3 !text-[10px]">
              Follow on Instagram <ArrowRight className="w-3.5 h-3.5" />
            </GlassBtn>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[360px]">
            <PortfolioImg src={neonEditorialImg} alt="Neon editorial"     pos="object-center" className="md:col-span-2 md:row-span-2" delay={0.05} />
            <PortfolioImg src={pinkFeatherImg}   alt="Pink feather glam"  pos="object-top"    delay={0.15} />
            <PortfolioImg src={bridalGownImg}    alt="Bridal look"        pos="object-top"    delay={0.2} />
            <PortfolioImg src={sparkleGlamImg}   alt="Sparkle glam"       pos="object-top"    className="md:col-span-2" delay={0.25} />
            <PortfolioImg src={softGlamWavyImg}  alt="Soft glam waves"    pos="object-top"    delay={0.3} />
            <PortfolioImg src={brideBouquetImg}  alt="Bride with bouquet" pos="object-top"    delay={0.35} />
            <PortfolioImg src={extraEditorialImg} alt="Editorial glam"     pos="object-center" delay={0.4} />
          </div>
        </div>
      </section>

      {/* ── CELEBRITIES ── */}
      <section id="celebrities" className="py-28 md:py-44 px-6 md:px-12 overflow-hidden" data-testid="section-celebrities"
        style={{ background: "linear-gradient(160deg,hsl(0,0%,7%) 0%,hsl(340,12%,10%) 60%,hsl(0,0%,7%) 100%)" }}>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div {...fadeUp} className="text-center mb-16 md:mb-24">
            <p className="text-[10px] uppercase tracking-[0.35em] text-pink-400 mb-3">Star Roster</p>
            <h2 className="font-serif text-4xl md:text-6xl text-white">In Good Company</h2>
            <p className="text-white/40 font-light mt-4 text-base md:text-lg">
              Egypt's most iconic faces, touched by Sherif
            </p>
            <div className="w-20 h-[1px] mx-auto mt-6"
              style={{ background: "linear-gradient(90deg,transparent,#f9a8d4,transparent)" }} />
          </motion.div>

          {/* Grid — 2 col mobile / 4 col desktop, alternating tall cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {celebrities.map((c, i) => {
              const tall = i === 0 || i === 3 || i === 5;
              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative overflow-hidden ${tall ? "row-span-2" : ""}`}
                  style={{ aspectRatio: tall ? undefined : "3/4" }}
                >
                  {/* Photo */}
                  <img
                    src={c.img}
                    alt={c.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    style={{ minHeight: tall ? "560px" : undefined }}
                  />

                  {/* Gradient scrim */}
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top,rgba(0,0,0,0.82) 0%,rgba(0,0,0,0.18) 45%,transparent 100%)" }} />

                  {/* Pink shimmer on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(135deg,rgba(244,114,182,0.12),transparent)" }} />

                  {/* Name + underline */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <p className="text-white font-serif text-base md:text-lg leading-tight">{c.name}</p>
                    <p className="text-pink-300/80 text-[10px] uppercase tracking-widest mt-0.5">{c.role}</p>
                    <div className="h-[1px] w-0 group-hover:w-12 bg-pink-400 transition-all duration-500 mt-2" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── PRESS ── */}
      <section id="press" className="py-24 md:py-40 px-6 md:px-12" data-testid="section-press"
        style={{ background: "hsl(30 30% 96%)" }}>
        <div className="max-w-7xl mx-auto">

          <motion.div {...fadeUp} className="text-center mb-14 md:mb-20">
            <p className="text-[10px] uppercase tracking-[0.35em] text-pink-400 mb-3">Press & Features</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">As Seen In</h2>
            <div className="w-16 h-[1px] mx-auto mt-5"
              style={{ background: "linear-gradient(90deg,transparent,#f9a8d4,transparent)" }} />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pressItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group flex flex-col overflow-hidden border border-border bg-white shadow-sm hover:shadow-md transition-shadow duration-400"
              >
                {/* Thumbnail */}
                <div className="relative h-52 overflow-hidden">
                  <img src={item.img} alt={item.publication}
                    className={`w-full h-full object-cover ${item.objPos} group-hover:scale-105 transition-transform duration-700`} />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 60%)" }} />
                  {/* Pink corner accent */}
                  <div className="absolute top-0 left-0 w-1 h-full"
                    style={{ background: "linear-gradient(180deg,#f472b6,#e11d48)" }} />
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5 gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-pink-500 font-medium">
                      {item.publication}
                    </span>
                    <span className="text-[10px] text-foreground/40">{item.date}</span>
                  </div>
                  <p className="font-serif text-sm md:text-base text-foreground leading-snug flex-1">
                    {item.headline}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-pink-400 group-hover:gap-2.5 transition-all duration-300 mt-auto">
                    Read Article <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

        </div>
      </section>

      {/* ── INSTAGRAM SECTION ── */}
      <section id="instagram" className="py-28 md:py-40 px-6 md:px-12 bg-card" data-testid="section-instagram">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <SiInstagram className="w-5 h-5 text-pink-400" />
                <span className="text-[10px] uppercase tracking-widest text-pink-400">Instagram</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">@sherifalkadi</h2>
            </div>
            <GlassBtn href={SOCIAL.instagram} primary testId="ig-follow" className="!px-6 !py-3 !text-[10px]">
              Follow <SiInstagram className="w-3.5 h-3.5" />
            </GlassBtn>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {igPosts.map((post, i) => (
              <motion.a
                key={i}
                href={SOCIAL.instagram}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative aspect-square overflow-hidden bg-foreground/5 cursor-pointer"
                data-testid={`ig-post-${i}`}
              >
                <img src={post.src} alt={post.caption}
                  className={`w-full h-full object-cover ${post.pos} group-hover:scale-105 transition-transform duration-700`} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-6 text-white text-sm font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 fill-white" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 fill-white" /> {post.comments}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-10">
            <p className="text-sm text-foreground/50 font-light mb-4">
              See all of Sherif's work on Instagram
            </p>
            <GlassBtn href={SOCIAL.instagram} testId="ig-view-all">
              View Full Profile <SiInstagram className="w-3.5 h-3.5" />
            </GlassBtn>
          </motion.div>
        </div>
      </section>

      {/* ── QUIZ ── */}
      <section id="quiz" className="py-28 md:py-44 px-6 md:px-12" data-testid="section-quiz"
        style={{ background: "linear-gradient(135deg,hsl(340 30% 97%) 0%,hsl(350 25% 95%) 50%,hsl(30 30% 96%) 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-widest text-pink-400 mb-3">Find Your Look</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">What's Your Glam?</h2>
            <p className="text-foreground/60 font-light text-lg">Answer four questions and discover your perfect makeup style.</p>
            <div className="w-16 h-[1px] mx-auto mt-5"
              style={{ background: "linear-gradient(90deg,transparent,#f9a8d4,transparent)" }} />
          </motion.div>

          <AnimatePresence mode="wait">
            {!quizDone ? (
              <motion.div
                key={`step-${quizStep}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="border border-pink-100 p-8 md:p-12 shadow-sm"
                style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)" }}
              >
                <div className="flex gap-2 mb-8">
                  {quizSteps.map((_, i) => (
                    <div key={i} className="h-[3px] flex-1 transition-all duration-500 rounded-full"
                      style={{ background: i <= quizStep ? "linear-gradient(90deg,#f472b6,#e11d48)" : "hsl(var(--border))" }} />
                  ))}
                </div>
                <p className="text-[10px] uppercase tracking-widest text-pink-400 mb-3">
                  Question {quizStep + 1} of {quizSteps.length}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                  {quizSteps[quizStep].question}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quizSteps[quizStep].options.map((opt) => (
                    <motion.button
                      key={opt.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(opt.value)}
                      className="text-left border border-border hover:border-pink-300 hover:bg-pink-50/50 px-6 py-4 text-foreground/80 font-light transition-all duration-300 group"
                      data-testid={`quiz-opt-${opt.value}`}
                    >
                      <span className="flex items-center justify-between">
                        {opt.label}
                        <ChevronRight className="w-4 h-4 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="border border-pink-100 p-8 md:p-12 text-center shadow-sm"
                style={{ background: "linear-gradient(135deg,rgba(253,242,248,0.9),rgba(255,228,230,0.9))", backdropFilter: "blur(12px)" }}
              >
                <p className="text-[10px] uppercase tracking-widest text-pink-400 mb-4">Your Perfect Look</p>
                <span className="inline-block border border-pink-300 text-pink-500 text-xs uppercase tracking-widest px-4 py-2 mb-6">
                  {result?.badge}
                </span>
                <h3 className="font-serif text-3xl md:text-5xl text-foreground mb-5">{result?.title}</h3>
                <p className="text-foreground/70 font-light text-lg leading-relaxed max-w-lg mx-auto mb-10">{result?.desc}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <GlassBtn href={WHATSAPP} primary testId="quiz-book">Book This Look</GlassBtn>
                  <GlassBtn onClick={resetQuiz} testId="quiz-retry">
                    <RotateCcw className="w-3.5 h-3.5" /> Try Again
                  </GlassBtn>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-36 md:py-52 px-6 text-center flex flex-col items-center justify-center overflow-hidden" data-testid="section-cta"
        style={{ background: "linear-gradient(135deg,hsl(var(--primary)) 0%,hsl(25 25% 42%) 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(ellipse at 20% 50%,rgba(249,168,212,0.18) 0%,transparent 60%),radial-gradient(ellipse at 80% 30%,rgba(253,164,175,0.12) 0%,transparent 55%)"
        }} />
        <motion.div {...fadeUp} className="relative z-10 max-w-3xl flex flex-col items-center">
          <p className="text-[10px] uppercase tracking-widest text-pink-200/70 mb-6">Let's Create Something Beautiful</p>
          <h2 className="font-serif italic text-4xl md:text-6xl lg:text-7xl text-white mb-12 leading-tight">
            Ready to feel Confident, Calm & Beautiful?
          </h2>
          <GlassBtn href={WHATSAPP} primary testId="cta-enquire" className="!px-12 !py-5 !text-[11px]">
            Enquire About Your Date
          </GlassBtn>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-background py-16 px-6 md:px-12" data-testid="footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-3xl mb-1">Sherif Alkadi</h3>
            <p className="font-script text-pink-300 text-2xl mb-5">Makeup Artist</p>
            <p className="text-background/45 font-light max-w-xs mb-5 text-sm leading-relaxed">
              Editorial bridal makeup and event glam. Based in Egypt, available for weddings worldwide.
            </p>
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              className="text-2xl md:text-3xl font-light tracking-wide hover:text-pink-300 transition-colors" data-testid="footer-phone">
              +20 122 227 9195
            </a>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6">
            <p className="text-[10px] uppercase tracking-widest text-background/35">Follow Along</p>
            <div className="flex gap-6">
              {[
                { Icon: SiInstagram, href: SOCIAL.instagram, label: "Instagram @sherifalkadi", id: "ig" },
                { Icon: SiFacebook, href: SOCIAL.facebook, label: "Facebook Sherif Alkadi", id: "fb" },
                { Icon: SiTiktok, href: SOCIAL.tiktok, label: "TikTok @sherifalkadi", id: "tt" },
              ].map(({ Icon, href, label, id }) => (
                <motion.a key={id} href={href} target="_blank" rel="noreferrer"
                  aria-label={label} data-testid={`footer-${id}`}
                  whileHover={{ scale: 1.25, color: "#f9a8d4" }}
                  className="text-background/55 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
            <p className="text-background/25 text-xs mt-4">
              &copy; {new Date().getFullYear()} Sherif Alkadi. All rights reserved.
            </p>
            <p className="text-background/20 text-[10px]">@sherifalkadi · Sherif Alkadi</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── SERVICE CARD ─── */
function ServiceCard({ title, image, delay }: { title: string; image: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="group relative aspect-square overflow-hidden cursor-pointer"
      data-testid={`service-${title.toLowerCase().replace(/\s+/g,"-")}`}
    >
      <img src={image} alt={title}
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 transition-all duration-500"
        style={{ background: "linear-gradient(180deg,transparent 30%,rgba(0,0,0,0.68))" }} />
      <div className="absolute inset-0 p-7 flex flex-col justify-end text-white">
        <h3 className="font-serif text-2xl mb-1.5">{title}</h3>
        <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-pink-300 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <span>Enquire</span>
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── PORTFOLIO IMAGE ─── */
function PortfolioImg({ src, alt, className = "", delay = 0, pos = "object-center" }: {
  src: string; alt: string; className?: string; delay?: number; pos?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={`relative w-full h-full overflow-hidden group ${className}`}
      data-testid="portfolio-image"
    >
      <img src={src} alt={alt}
        className={`w-full h-full object-cover ${pos} group-hover:scale-105 transition-transform duration-1000`} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(180deg,transparent 50%,rgba(244,114,182,0.08))" }} />
    </motion.div>
  );
}
