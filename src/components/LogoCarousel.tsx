"use client";

const logos = [
  "FutureProof™",
  "Botsy®",
  "Vercel",
  "GitHub",
  "Stripe",
];

export default function LogoCarousel() {
  return (
    <section className="py-16 bg-white">
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex animate-scroll w-max">
          {[...logos, ...logos, ...logos, ...logos].map((name, i) => (
            <div
              key={i}
              className="shrink-0 mx-10 flex items-center justify-center"
            >
              <span className="text-2xl font-extralight tracking-tight text-[#231f20]/20 whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
