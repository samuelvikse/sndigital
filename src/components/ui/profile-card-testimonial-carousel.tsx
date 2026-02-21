"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface Profile {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  linkedinUrl?: string;
  emailUrl?: string;
}

export interface ProfileCarouselProps {
  profiles: Profile[];
  className?: string;
}

const AUTO_SWITCH_MS = 6000;

const imageVariants = {
  enter: { opacity: 0, scale: 1.04 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

const textVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

export function ProfileCarousel({ profiles, className }: ProfileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
    }, AUTO_SWITCH_MS);
  }, [profiles.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
    resetTimer();
  };

  const current = profiles[currentIndex];

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Desktop layout */}
      <div className="hidden md:flex relative items-center">
        {/* Photo */}
        <div className="w-[400px] h-[480px] rounded-sm overflow-hidden bg-[#f5f5f3] flex-shrink-0">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={current.imageUrl}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="w-full h-full"
            >
              <Image
                src={current.imageUrl}
                alt={current.name}
                width={400}
                height={480}
                className="w-full h-full object-cover"
                draggable={false}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card */}
        <div className="bg-white rounded-sm shadow-[0_4px_40px_rgba(0,0,0,0.06)] p-10 ml-[-60px] z-10 max-w-md flex-1">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={current.name}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <div className="mb-6">
                <h2 className="text-xl font-light text-[#231f20] mb-1 tracking-[-0.01em]">
                  {current.name}
                </h2>
                <p className="text-xs font-light text-[#231f20]/40 tracking-wide">
                  {current.title}
                </p>
              </div>

              <p className="text-sm font-light text-[#231f20]/60 leading-[1.8] mb-8">
                {current.description}
              </p>

              <div className="flex gap-3">
                {current.linkedinUrl && (
                  <Link
                    href={current.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-[#231f20]/10 rounded-full flex items-center justify-center transition-colors hover:border-[#231f20]/30"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#231f20]/40" />
                  </Link>
                )}
                {current.emailUrl && (
                  <Link
                    href={current.emailUrl}
                    className="w-9 h-9 border border-[#231f20]/10 rounded-full flex items-center justify-center transition-colors hover:border-[#231f20]/30"
                    aria-label="Email"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#231f20]/40" />
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden max-w-sm mx-auto">
        <div className="w-full aspect-[4/5] bg-[#f5f5f3] rounded-sm overflow-hidden mb-6">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={current.imageUrl}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              className="w-full h-full"
            >
              <Image
                src={current.imageUrl}
                alt={current.name}
                width={400}
                height={500}
                className="w-full h-full object-cover"
                draggable={false}
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={current.name}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
          >
            <h2 className="text-lg font-light text-[#231f20] mb-1">
              {current.name}
            </h2>
            <p className="text-xs font-light text-[#231f20]/40 tracking-wide mb-4">
              {current.title}
            </p>
            <p className="text-sm font-light text-[#231f20]/60 leading-[1.8] mb-6">
              {current.description}
            </p>
            <div className="flex gap-3">
              {current.linkedinUrl && (
                <Link
                  href={current.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-[#231f20]/10 rounded-full flex items-center justify-center transition-colors hover:border-[#231f20]/30"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#231f20]/40" />
                </Link>
              )}
              {current.emailUrl && (
                <Link
                  href={current.emailUrl}
                  className="w-9 h-9 border border-[#231f20]/10 rounded-full flex items-center justify-center transition-colors hover:border-[#231f20]/30"
                  aria-label="Email"
                >
                  <Mail className="w-3.5 h-3.5 text-[#231f20]/40" />
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicator lines */}
      <div className="flex justify-center items-center gap-2 mt-10">
        {profiles.map((profile, i) => (
          <button
            key={profile.name}
            type="button"
            onClick={() => handleIndicatorClick(i)}
            aria-label={`Show ${profile.name}`}
            className="relative h-[3px] w-8 rounded-full overflow-hidden cursor-pointer"
            style={{ backgroundColor: "rgba(35,31,32,0.12)" }}
          >
            <span
              className="absolute inset-0 rounded-full bg-[#231f20] origin-left"
              style={{
                transform: i === currentIndex ? "scaleX(1)" : "scaleX(0)",
                transition: i === currentIndex
                  ? `transform ${AUTO_SWITCH_MS}ms linear`
                  : "transform 300ms ease-out",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
