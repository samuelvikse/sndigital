"use client";

import * as React from "react";

interface ProjectData {
  title: string;
  image: string;
  category: string;
  year: string;
  description: string;
}

const PROJECT_DATA: ProjectData[] = [
  {
    title: "B2B Lead Generation",
    image: "/office1.png",
    category: "Growth",
    year: "2025",
    description: "Qualified leads that convert",
  },
  {
    title: "AI Automation",
    image: "/office2.png",
    category: "Systems",
    year: "2025",
    description: "Workflows that run themselves",
  },
  {
    title: "AI Optimization",
    image: "/office3.png",
    category: "Performance",
    year: "2025",
    description: "Smarter at every touchpoint",
  },
];

export function Component() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  const [parallaxY, setParallaxY] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = sectionHeight - viewportHeight;

      // How far we've scrolled into the section (0 to 1)
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / scrollableHeight);

      // Map progress to active index
      const count = PROJECT_DATA.length;
      const index = Math.min(count - 1, Math.floor(progress * count));
      setActive(index);

      // Parallax: offset within the current slide
      const slideProgress = (progress * count) - index;
      setParallaxY(slideProgress * -30);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const data = PROJECT_DATA[active];
  const num = String(active + 1).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      style={{ height: `${PROJECT_DATA.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Background images */}
        {PROJECT_DATA.map((project, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: active === i ? 1 : 0 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute top-0 left-0 w-full h-full object-cover scale-110"
              style={{
                transform: `translateY(${active === i ? parallaxY : 0}px) scale(1.1)`,
              }}
            />
          </div>
        ))}

        {/* Centered info card */}
        <div className="minimap">
          <div className="minimap-card">
            <div className="minimap-card-row">
              <p>{num}</p>
              <p className="minimap-card-title">{data.title}</p>
            </div>
            <div className="minimap-card-image">
              <img
                src={data.image}
                alt={data.title}
              />
            </div>
            <div className="minimap-card-row">
              <p>{data.category}</p>
              <p>{data.year}</p>
            </div>
            <div className="minimap-card-row">
              <p>{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
