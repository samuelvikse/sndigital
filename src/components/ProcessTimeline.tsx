"use client";

import React from "react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";

function BlurReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

const data = [
  {
    title: "B2B Lead Generation",
    content: (
      <div className="pb-8">
        <p className="text-xs font-light tracking-[0.2em] uppercase text-[#231f20]/30 mb-4">
          Growth
        </p>
        <p className="text-[#231f20]/70 text-sm md:text-base font-light leading-[1.8] max-w-lg mb-6">
          We build complete lead generation systems for call-based businesses.
          From targeting to booking, every step is designed to deliver qualified
          leads that convert.
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-1 h-1 rounded-full bg-[#231f20]/30 mt-2 shrink-0" />
            <span className="text-sm font-light text-[#231f20]/50">
              Targeted outreach systems that reach the right decision-makers
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-1 h-1 rounded-full bg-[#231f20]/30 mt-2 shrink-0" />
            <span className="text-sm font-light text-[#231f20]/50">
              Automated qualification so your team only talks to real prospects
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-1 h-1 rounded-full bg-[#231f20]/30 mt-2 shrink-0" />
            <span className="text-sm font-light text-[#231f20]/50">
              End-to-end pipeline management from first touch to booked meeting
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "AI Automation",
    content: (
      <div className="pb-8">
        <p className="text-xs font-light tracking-[0.2em] uppercase text-[#231f20]/30 mb-4">
          Systems
        </p>
        <p className="text-[#231f20]/70 text-sm md:text-base font-light leading-[1.8] max-w-lg mb-6">
          Custom AI-powered workflows that eliminate repetitive tasks, streamline
          operations, and free your team to focus on what actually drives
          revenue.
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-1 h-1 rounded-full bg-[#231f20]/30 mt-2 shrink-0" />
            <span className="text-sm font-light text-[#231f20]/50">
              Intelligent CRM automations that update, tag, and route leads automatically
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-1 h-1 rounded-full bg-[#231f20]/30 mt-2 shrink-0" />
            <span className="text-sm font-light text-[#231f20]/50">
              AI-driven follow-up sequences that respond at the right moment
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-1 h-1 rounded-full bg-[#231f20]/30 mt-2 shrink-0" />
            <span className="text-sm font-light text-[#231f20]/50">
              Custom integrations that connect your tools into one seamless workflow
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "AI Optimization",
    content: (
      <div className="pb-8">
        <p className="text-xs font-light tracking-[0.2em] uppercase text-[#231f20]/30 mb-4">
          Performance
        </p>
        <p className="text-[#231f20]/70 text-sm md:text-base font-light leading-[1.8] max-w-lg mb-6">
          Smarter websites, better follow-up sequences, and data-driven
          improvements. We optimize every touchpoint so nothing falls through
          the cracks.
        </p>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-1 h-1 rounded-full bg-[#231f20]/30 mt-2 shrink-0" />
            <span className="text-sm font-light text-[#231f20]/50">
              AI-enhanced websites that convert more visitors into leads
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-1 h-1 rounded-full bg-[#231f20]/30 mt-2 shrink-0" />
            <span className="text-sm font-light text-[#231f20]/50">
              Data-driven A/B testing across every customer touchpoint
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-1 h-1 rounded-full bg-[#231f20]/30 mt-2 shrink-0" />
            <span className="text-sm font-light text-[#231f20]/50">
              Continuous performance monitoring with actionable recommendations
            </span>
          </div>
        </div>
      </div>
    ),
  },
];

export default function ProcessTimeline() {
  return (
    <section className="bg-white py-12 md:py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto mb-16 px-4 md:px-8 lg:px-10">
        <BlurReveal>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#231f20]/15" />
            <span className="text-[11px] font-light tracking-[0.25em] uppercase text-[#231f20]/30">
              Our process
            </span>
          </div>
        </BlurReveal>
        <BlurReveal delay={0.1}>
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-light text-[#231f20] tracking-[-0.02em] leading-[1.2] max-w-xl">
            Three systems. One outcome.
          </h2>
        </BlurReveal>
        <BlurReveal delay={0.2}>
          <p className="mt-4 text-sm font-light text-[#231f20]/40 max-w-md leading-[1.7]">
            Everything we build is designed to turn attention into revenue, and keep it flowing.
          </p>
        </BlurReveal>
      </div>
      <Timeline data={data} />
    </section>
  );
}
