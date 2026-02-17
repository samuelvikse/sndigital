"use client";

import { useMotionValue, motion, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";

const SERVICES = [
  {
    num: "01",
    heading: "B2B Lead Generation",
    tag: "Growth",
    subheading: "Qualified leads that convert",
    imgSrc: "/office1.png",
    href: "#",
  },
  {
    num: "02",
    heading: "AI Automation",
    tag: "Systems",
    subheading: "Workflows that run themselves",
    imgSrc: "/office2.png",
    href: "#",
  },
  {
    num: "03",
    heading: "AI Optimization",
    tag: "Performance",
    subheading: "Smarter at every touchpoint",
    imgSrc: "/office3.png",
    href: "#",
  },
];

export default function ServicesHover() {
  return (
    <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-14">
          <div className="w-8 h-px bg-[#231f20]/15" />
          <span className="text-[11px] font-light tracking-[0.25em] uppercase text-[#231f20]/30">
            What we do
          </span>
        </div>
        <div className="border-t border-[#231f20]/[0.06]">
          {SERVICES.map((service) => (
            <ServiceLink key={service.heading} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceLinkProps {
  num: string;
  heading: string;
  tag: string;
  imgSrc: string;
  subheading: string;
  href: string;
}

function ServiceLink({ num, heading, tag, imgSrc, subheading, href }: ServiceLinkProps) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 18 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 18 });

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["35%", "65%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["78%", "68%"]);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center border-b border-[#231f20]/[0.06] py-7 md:py-9 transition-colors duration-700 hover:border-[#231f20]/15 cursor-pointer"
    >
      {/* Number */}
      <span className="relative z-10 w-12 shrink-0 text-[11px] font-light tracking-widest text-[#231f20]/15 transition-colors duration-700 group-hover:text-[#231f20]/40">
        {num}
      </span>

      {/* Expanding line on hover */}
      <motion.div
        className="absolute left-0 bottom-0 h-px bg-[#231f20]/30 origin-left"
        variants={{
          initial: { scaleX: 0 },
          whileHover: { scaleX: 1 },
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Title + sub */}
      <div className="flex-1 min-w-0">
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -6 },
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            staggerChildren: 0.02,
            delayChildren: 0.05,
          }}
          className="relative z-10 block text-[1.35rem] md:text-[1.75rem] lg:text-[2rem] font-light text-[#231f20]/20 transition-colors duration-700 group-hover:text-[#231f20] tracking-[-0.015em] leading-tight"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 6 },
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          ))}
        </motion.span>
        <motion.span
          className="relative z-10 mt-1 block text-[12px] font-light text-[#231f20]/0 transition-all duration-700 group-hover:text-[#231f20]/35 tracking-wide"
          variants={{
            initial: { y: -4, opacity: 0 },
            whileHover: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {subheading}
        </motion.span>
      </div>

      {/* Tag */}
      <motion.span
        className="relative z-10 hidden md:block text-[10px] font-light tracking-[0.15em] uppercase text-[#231f20]/0 mr-6 transition-colors duration-700 group-hover:text-[#231f20]/25"
        variants={{
          initial: { opacity: 0, x: 8 },
          whileHover: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        {tag}
      </motion.span>

      {/* Floating image */}
      <motion.div
        style={{
          top,
          left,
          translateX: "-10%",
          translateY: "-50%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-4deg", opacity: 0 },
          whileHover: { scale: 1, rotate: "2deg", opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="absolute z-20 pointer-events-none"
      >
        <div className="relative h-28 w-40 md:h-40 md:w-56 overflow-hidden rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <img
            src={imgSrc}
            className="w-full h-full object-cover"
            alt={heading}
          />
        </div>
      </motion.div>

      {/* Arrow */}
      <div className="overflow-hidden relative z-10">
        <motion.div
          variants={{
            initial: { x: "120%", opacity: 0 },
            whileHover: { x: "0%", opacity: 1 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.05 }}
          className="p-1"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 9H14M14 9L10 5M14 9L10 13"
              stroke="#231f20"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </motion.a>
  );
}
