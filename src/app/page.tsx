import Hero from "@/components/Hero";
import LogoCarousel from "@/components/LogoCarousel";
import Testimonials from "@/components/Testimonials";
import ProcessTimeline from "@/components/ProcessTimeline";
import TeamSection from "@/components/TeamSection";
import { Footerdemo } from "@/components/ui/footer-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoCarousel />
      <ProcessTimeline />
      <TeamSection />
      <Testimonials />
      <Footerdemo />
    </main>
  );
}
