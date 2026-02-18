"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const imageRef = useRef<SVGImageElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      // Convert scroll to SVG coordinate offset for parallax
      const parallaxOffset = (scrollY / viewportHeight) * 12;
      imageRef.current.setAttribute("y", String(-15 + parallaxOffset));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden">
      <img src="/logo.svg" alt="SN Digital" className="absolute top-8 left-8 h-8 z-10 animate-text-reveal" style={{ animationDelay: "0.2s" } as React.CSSProperties} />

      <div className="relative z-10 flex flex-col justify-center h-full max-w-[540px] pl-8 md:pl-16 lg:pl-24">
        <h1 className="font-sofia text-[clamp(2rem,4vw,3.25rem)] leading-[1.15] font-light tracking-[-0.02em] text-[#231f20]">
          {(() => {
            let charIndex = 0;
            return "We build the systems that turn leads into revenue.".split(" ").map((word, wi) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split("").map((char) => {
                  const i = charIndex++;
                  return (
                    <span
                      key={i}
                      className="inline-block animate-text-reveal"
                      style={{ animationDelay: `${i * 0.02}s` } as React.CSSProperties}
                    >
                      {char}
                    </span>
                  );
                })}
                <span className="inline-block">&nbsp;</span>
                {(() => { charIndex++; return null; })()}
              </span>
            ));
          })()}
        </h1>
        <p
          className="mt-6 text-[clamp(0.9rem,1.1vw,1.05rem)] leading-[1.6] font-light text-[#231f20]/60 max-w-[440px] animate-text-reveal"
          style={{ animationDelay: "1.1s" } as React.CSSProperties}
        >
          B2B lead generation for call-based businesses, plus automation and optimization for smaller companies that need better websites, workflows, and follow-up.
        </p>
        <div className="flex gap-4 mt-10">
          <button
            type="button"
            className="px-6 py-3 bg-[#231f20] text-white text-sm font-light tracking-wide rounded-sm hover:bg-[#3a3536] transition-colors animate-text-reveal"
            style={{ animationDelay: "1.4s" } as React.CSSProperties}
          >
            Initialize System Audit &rarr;
          </button>
          <button
            type="button"
            className="px-6 py-3 text-[#231f20] text-sm font-light tracking-wide border border-[#231f20]/20 rounded-sm hover:border-[#231f20]/50 transition-colors animate-text-reveal"
            style={{ animationDelay: "1.55s" } as React.CSSProperties}
          >
            Send an Inquiry
          </button>
        </div>

        <div
          className="flex items-center gap-5 mt-8 animate-text-reveal"
          style={{ animationDelay: "1.7s" } as React.CSSProperties}
        >
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-[#231f20]/40 hover:text-[#231f20] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#231f20]/40 hover:text-[#231f20] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-[#231f20]/40 hover:text-[#231f20] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-[#231f20]/40 hover:text-[#231f20] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
        </div>
      </div>

      <svg
        viewBox="0 0 48.54 48.43"
        className="absolute right-0 top-0 h-full w-auto animate-slide-right"
        style={{ animationDelay: "0.3s" } as React.CSSProperties}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="sn-clip">
            <path d="M18.6,43.4c0,3.32,3.17,5.75,6.36,4.84,6.45-1.85,7.45-6.57,7.45-12.94,0-5.4-2.8-10.9-11.9-13.1l-6.9-1.7c-3.41-.8-7.21-2.7-7.21-7.1s3.7-7.7,9.1-7.7c3.01,0,5.8,1.19,7.46,3.19,1.94,2.33,4.72,3.81,7.75,3.81h0C30.41,4.3,23.21,0,15.4,0,6.5,0,0,5.7,0,13.3s5.3,11.2,11.9,12.8l6.71,1.6c4.79,1.2,7.4,3.7,7.4,7.5,0,4.7-.71,8.2-7.41,8.2h0Z" />
            <path d="M29.54,0h0c0,3.26,1.99,6.12,4.96,7.48,4.58,2.1,7.64,6.92,7.64,13.52v20.5c0,3.53,2.87,6.4,6.4,6.4h0v-27.2C48.54,7.8,40.84,0,29.54,0Z" />
          </clipPath>
        </defs>
        <g clipPath="url(#sn-clip)">
          <image
            ref={imageRef}
            href="/hero-image.png"
            x="-5"
            y="-15"
            width="60"
            height="75"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </svg>
    </section>
  );
}
