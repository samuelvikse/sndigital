"use client";

import { useRef, useEffect, useState, useCallback } from "react";

const services = [
  {
    num: "01",
    title: "B2B Lead Generation",
    category: "Growth",
    description:
      "We build complete lead generation systems for call-based businesses. From targeting to booking, every step is designed to deliver qualified leads that convert.",
    image: "/office1.png",
  },
  {
    num: "02",
    title: "AI Automation",
    category: "Systems",
    description:
      "Custom AI-powered workflows that eliminate repetitive tasks, streamline operations, and free your team to focus on what actually drives revenue.",
    image: "/office2.png",
  },
  {
    num: "03",
    title: "AI Optimization",
    category: "Performance",
    description:
      "Smarter websites, better follow-up sequences, and data-driven improvements. We optimize every touchpoint so nothing falls through the cracks.",
    image: "/office3.png",
  },
];

export default function ServicesSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const itemHeight = useRef(0);
  const [active, setActive] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const snapTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const totalHeight = services.length;

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const snap = useCallback(() => {
    if (itemHeight.current === 0) return;
    const nearest = Math.round(targetRef.current / itemHeight.current) * itemHeight.current;
    targetRef.current = nearest;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateHeight = () => {
      itemHeight.current = container.offsetHeight;
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetRef.current += e.deltaY * 0.75;
      clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(snap, 120);
    };

    const animate = () => {
      scrollRef.current = lerp(scrollRef.current, targetRef.current, 0.06);

      const h = itemHeight.current;
      if (h === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Wrap scroll
      const totalPx = h * totalHeight;
      scrollRef.current = ((scrollRef.current % totalPx) + totalPx) % totalPx;
      targetRef.current = ((targetRef.current % totalPx) + totalPx) % totalPx;

      // Update active
      const newActive = Math.round(scrollRef.current / h) % totalHeight;
      setActive(newActive);

      // Position items
      services.forEach((_, i) => {
        const el = container.querySelector(`[data-index="${i}"]`) as HTMLElement;
        if (!el) return;

        let offset = i * h - scrollRef.current;
        // Wrap items
        if (offset < -h) offset += totalPx;
        if (offset > totalPx - h) offset -= totalPx;

        el.style.transform = `translateY(${offset}px)`;

        // Parallax on image
        const img = imageRefs.current[i];
        if (img) {
          const parallax = (offset / h) * -20;
          img.style.transform = `translateY(${parallax}%) scale(1.15)`;
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", updateHeight);
      cancelAnimationFrame(rafRef.current);
    };
  }, [snap, totalHeight]);

  const goTo = (index: number) => {
    targetRef.current = index * itemHeight.current;
  };

  return (
    <section className="relative bg-white">
      <div ref={containerRef} className="relative h-screen overflow-hidden flex">
        {/* Main cards */}
        <div className="relative flex-1">
          {services.map((service, i) => (
            <div
              key={i}
              data-index={i}
              className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24"
              style={{ willChange: "transform" }}
            >
              <div className="flex items-center gap-12 lg:gap-20 w-full max-w-6xl mx-auto">
                {/* Image area */}
                <div className="relative w-1/2 aspect-[4/5] overflow-hidden bg-[#f5f5f3] rounded-sm shrink-0">
                  <div
                    ref={(el) => { imageRefs.current[i] = el; }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ willChange: "transform" }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <span className="text-xs font-light tracking-widest uppercase text-[#231f20]/30">
                    {service.category}
                  </span>
                  <h3 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] font-light text-[#231f20] tracking-[-0.02em]">
                    {service.title}
                  </h3>
                  <p className="mt-6 text-base font-light leading-[1.7] text-[#231f20]/50 max-w-md">
                    {service.description}
                  </p>
                  <span className="inline-block mt-8 text-sm font-light text-[#231f20]/40 tracking-widest">
                    {service.num}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Minimap sidebar */}
        <div className="hidden lg:flex flex-col items-center justify-center gap-4 pr-8 w-20">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group flex flex-col items-center gap-1.5"
            >
              <div
                className={`w-10 h-14 rounded-sm transition-all duration-500 ${
                  active === i
                    ? "bg-[#231f20]/10 scale-100"
                    : "bg-[#231f20]/[0.04] scale-90"
                }`}
              />
              <span
                className={`text-[10px] font-light tracking-wider transition-colors duration-500 ${
                  active === i ? "text-[#231f20]/60" : "text-[#231f20]/20"
                }`}
              >
                0{i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
