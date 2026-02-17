"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Profile {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  linkedinUrl?: string;
}

export interface ProfileCarouselProps {
  profiles: Profile[];
  className?: string;
}

export function ProfileCarousel({ profiles, className }: ProfileCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % profiles.length);
  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + profiles.length) % profiles.length
    );

  const current = profiles[currentIndex];

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      {/* Desktop layout */}
      <div className="hidden md:flex relative items-center">
        {/* Photo */}
        <div className="w-[400px] h-[480px] rounded-sm overflow-hidden bg-[#f5f5f3] flex-shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.imageUrl}
              initial={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, filter: "blur(12px)", y: -4 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden max-w-sm mx-auto">
        <div className="w-full aspect-[4/5] bg-[#f5f5f3] rounded-sm overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.imageUrl}
              initial={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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

        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(12px)", y: -4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-5 mt-10">
        <button
          onClick={handlePrevious}
          aria-label="Previous"
          className="group w-10 h-10 border border-[#231f20]/15 rounded-full flex items-center justify-center hover:border-[#231f20]/40 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-[#231f20]/50 group-hover:text-[#231f20] transition-colors" />
        </button>

        <div className="flex gap-2">
          {profiles.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors cursor-pointer",
                i === currentIndex ? "bg-[#231f20]" : "bg-[#231f20]/15"
              )}
              aria-label={`Go to profile ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next"
          className="group w-10 h-10 border border-[#231f20]/15 rounded-full flex items-center justify-center hover:border-[#231f20]/40 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 text-[#231f20]/50 group-hover:text-[#231f20] transition-colors" />
        </button>
      </div>
    </div>
  );
}
