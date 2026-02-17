"use client";

import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (ref.current && itemRefs.current.length > 0) {
      const lastItem = itemRefs.current[itemRefs.current.length - 1];
      if (lastItem) {
        const containerTop = ref.current.getBoundingClientRect().top;
        const lastItemBottom = lastItem.getBoundingClientRect().bottom;
        setHeight(lastItemBottom - containerTop);
      }
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (!ref.current) return;
    const containerTop = ref.current.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.4;

    let current = 0;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const elTop = el.getBoundingClientRect().top - containerTop;
      const absTop = el.getBoundingClientRect().top;
      if (absTop < trigger) current = i;
    });
    setActiveIndex(current);
  });

  return (
    <div
      className="w-full bg-white font-sans md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto">
        {data.map((item, index) => (
          <div
            key={index}
            ref={(el) => { itemRefs.current[index] = el; }}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                <div
                  className={`h-4 w-4 rounded-full border p-2 transition-colors duration-500 ${
                    activeIndex === index
                      ? "bg-[#231f20]/20 border-[#231f20]/40"
                      : "bg-neutral-200 border-neutral-300"
                  }`}
                />
              </div>
              <h3
                className={`hidden md:block text-xl md:pl-20 md:text-5xl font-bold transition-colors duration-500 ${
                  activeIndex === index
                    ? "text-[#231f20]"
                    : "text-[#231f20]/15"
                }`}
              >
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3
                className={`md:hidden block text-2xl mb-4 text-left font-bold transition-colors duration-500 ${
                  activeIndex === index
                    ? "text-[#231f20]"
                    : "text-[#231f20]/15"
                }`}
              >
                {item.title}
              </h3>
              <TimelineContent>{item.content}</TimelineContent>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#231f20] via-[#231f20]/40 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

function TimelineContent({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
