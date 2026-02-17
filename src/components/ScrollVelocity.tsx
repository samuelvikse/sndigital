"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useAnimationFrame,
} from "motion/react";

function VelocityRow({
  text,
  baseVelocity,
  scrollVelocity,
}: {
  text: string;
  baseVelocity: number;
  scrollVelocity: ReturnType<typeof useSpring>;
}) {
  const [repetitions, setRepetitions] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const baseX = useRef(0);

  const x = useTransform(scrollVelocity, [0, 1], [0, 0], { clamp: false });

  const calculateRepetitions = useCallback(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      const needed = Math.ceil(containerWidth / textWidth) + 2;
      setRepetitions(needed);
    }
  }, []);

  useEffect(() => {
    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [calculateRepetitions]);

  useAnimationFrame((_, delta) => {
    const velocity = scrollVelocity.get();
    const moveBy = baseVelocity + velocity * 0.05;
    baseX.current += moveBy * (delta / 1000) * 50;

    if (textRef.current) {
      const textWidth = textRef.current.offsetWidth;
      if (textWidth > 0) {
        baseX.current = baseX.current % textWidth;
      }
    }

    x.set(baseX.current);
  });

  return (
    <div ref={containerRef} className="overflow-hidden whitespace-nowrap">
      <motion.div className="inline-block" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? textRef : undefined}
            className="inline-block text-[clamp(2.5rem,6vw,5rem)] font-extralight tracking-[-0.02em] text-[#231f20]/10 uppercase mr-[0.3em]"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function ScrollVelocity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, {
    damping: 50,
    stiffness: 300,
  });

  return (
    <section
      ref={containerRef}
      className="py-16 bg-white overflow-hidden select-none pointer-events-none"
    >
      <div className="flex flex-col gap-2">
        <VelocityRow
          text="Lead Generation  ·  Automation  ·  Web Development  ·  System Design  ·  Optimization  ·"
          baseVelocity={-1}
          scrollVelocity={smoothVelocity}
        />
        <VelocityRow
          text="Workflows  ·  Follow-Up Systems  ·  B2B Growth  ·  Conversion  ·  Revenue  ·"
          baseVelocity={1}
          scrollVelocity={smoothVelocity}
        />
      </div>
    </section>
  );
}
