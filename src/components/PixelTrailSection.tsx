"use client";

import { PixelTrail } from "@/components/ui/pixel-trail";
import { useScreenSize } from "@/hooks/use-screen-size";

export default function PixelTrailSection() {
  const screenSize = useScreenSize();

  const pixelSize =
    screenSize === "sm" ? 16 : screenSize === "md" ? 18 : 22;

  return (
    <section className="relative h-[60vh] bg-[#f5f5f3] overflow-hidden flex items-center justify-center">
      <PixelTrail
        pixelSize={pixelSize}
        fadeDuration={600}
        delay={0}
        className="z-10"
        pixelClassName="rounded-full bg-[#231f20]/[0.08]"
      />

      <div className="relative z-0 text-center pointer-events-none select-none">
        <p className="text-xs font-light tracking-[0.3em] uppercase text-[#231f20]/30 mb-4">
          Move your cursor
        </p>
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-light text-[#231f20]/[0.06] leading-[1.1] tracking-[-0.03em]">
          SN Digital
        </h2>
      </div>
    </section>
  );
}
