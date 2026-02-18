"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue } from "motion/react";

const testimonials = [
  {
    quote: "They completely transformed how we handle inbound leads. Our conversion rate doubled within three months.",
    author: "Erik Hansen",
    role: "CEO",
    company: "NordicFlow",
  },
  {
    quote: "The automation systems they built saved us countless hours every week. It just works, seamlessly.",
    author: "Maria Solberg",
    role: "Head of Sales",
    company: "Callwise",
  },
  {
    quote: "Finally a team that understands both the technical side and the business outcomes we need to hit.",
    author: "Jonas Berge",
    role: "Founder",
    company: "Leadfront",
  },
];

function WordReveal({ text, animKey }: { text: string; animKey: string }) {
  return (
    <span className="inline">
      {text.split(" ").map((word, i) => (
        <span key={`${animKey}-${i}`} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", rotateX: 40, opacity: 0 }}
            animate={{ y: "0%", rotateX: 0, opacity: 1 }}
            exit={{ y: "-50%", opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const lastMove = useRef(0);
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastMove.current < 32) return;
    lastMove.current = now;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.08);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.08);
  }, [mouseX, mouseY]);

  const t = testimonials[current];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-white py-32 pb-48 px-8 md:px-16 lg:px-24 overflow-hidden min-h-[600px] flex items-center justify-center"
    >
      {/* Background number */}
      <motion.span
        className="absolute left-[5%] md:left-[10%] top-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] font-extralight text-[#231f20]/[0.03] leading-none select-none pointer-events-none"
        style={{ x: springX, y: springY }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            0{current + 1}
          </motion.span>
        </AnimatePresence>
      </motion.span>

      {/* Left column */}
      <div className="flex flex-col items-center mr-12 md:mr-20 pt-2 shrink-0">
        <span className="text-xs font-light tracking-[0.2em] uppercase text-[#231f20]/40 [writing-mode:vertical-lr] rotate-180">
          Testimonials
        </span>
        <div className="mt-6 w-px h-24 bg-[#231f20]/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#231f20]/60"
            animate={{ height: `${((current + 1) / testimonials.length) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Right column */}
      <div className="flex flex-col justify-center flex-1 max-w-2xl mx-auto">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-light tracking-widest uppercase text-[#231f20]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#231f20]/40" />
            {t.company}
          </span>
        </div>

        <div className="text-[clamp(1.5rem,3.5vw,2.75rem)] leading-[1.2] font-light text-[#231f20] min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div key={current}>
              &ldquo;
              <WordReveal text={t.quote} animKey={String(current)} />
              &rdquo;
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-end justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <p className="text-sm font-normal text-[#231f20]">{t.author}</p>
              <p className="text-sm font-light text-[#231f20]/40">{t.role}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={prev}
              className="group w-10 h-10 border border-[#231f20]/15 rounded-full flex items-center justify-center relative overflow-hidden hover:border-[#231f20]/40 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative z-10">
                <path d="M8.5 3L4.5 7L8.5 11" stroke="currentColor" strokeWidth="1.2" className="text-[#231f20]/60 group-hover:text-[#231f20] transition-colors" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="group w-10 h-10 border border-[#231f20]/15 rounded-full flex items-center justify-center relative overflow-hidden hover:border-[#231f20]/40 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative z-10">
                <path d="M5.5 3L9.5 7L5.5 11" stroke="currentColor" strokeWidth="1.2" className="text-[#231f20]/60 group-hover:text-[#231f20] transition-colors" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
