"use client";

import { motion } from "framer-motion";
import { ProfileCarousel } from "@/components/ui/profile-card-testimonial-carousel";

const team = [
  {
    name: "Samuel Vikse Bruvik",
    title: "Co-Founder, SN Digital",
    description:
      "Focused on building lead generation systems and growth strategies that turn outbound into predictable revenue. Obsessed with the details that make the difference between a cold call and a booked meeting.",
    imageUrl: "/samuel.png",
    linkedinUrl: "#",
    emailUrl: "mailto:samuel@sndigital.eu",
  },
  {
    name: "Niko Oliver Hergge",
    title: "Co-Founder, SN Digital",
    description:
      "Specializes in AI automation and optimization, designing intelligent workflows that eliminate busywork and scale what works. Believes every business process can be made smarter.",
    imageUrl: "/office2.png",
    linkedinUrl: "#",
    emailUrl: "mailto:niko@sndigital.eu",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-white py-20 md:py-28 px-8 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-[#231f20]/15" />
            <span className="text-[11px] font-light tracking-[0.25em] uppercase text-[#231f20]/30">
              Who we are
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-light text-[#231f20] tracking-[-0.02em] leading-[1.2] max-w-xl">
            The people behind the systems.
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <ProfileCarousel profiles={team} />
      </motion.div>
    </section>
  );
}
