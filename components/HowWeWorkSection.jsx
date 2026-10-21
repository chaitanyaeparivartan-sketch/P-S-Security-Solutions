"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  "We understand your requirement before we build",
  "Scope, cost and timelines are defined upfront",
  "You receive regular progress updates",
  "Our team stays accountable on site",
  "We stay involved beyond handover",
];

export default function HowWeWorkSection() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number(e.target.dataset.index));
          }
        });
      },
      { rootMargin: "-35% 0px -35% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section
      id="how-we-work"
      className="relative w-full bg-[#090c10] text-white py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12 select-none border-t border-white/10"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
        {/* LEFT – sticky on desktop */}
        <div className="relative py-8 sm:py-12 lg:sticky lg:top-28 lg:flex lg:h-[70vh] lg:flex-col lg:justify-center lg:self-start lg:py-0">
          {/* Eyebrow: Diamond + THE PROCESS */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rotate-45 bg-[#ae7b13] inline-block shadow-[0_0_8px_rgba(174,123,19,0.6)]" />
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#ae7b13]">
              THE PROCESS
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-canela text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] tracking-tight text-white font-light leading-[1.12] mb-4 sm:mb-5">
            How we work
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-[16.5px] font-light leading-relaxed max-w-md">
            A transparent, disciplined five-stage methodology that turns architectural blueprints into reality with zero guesswork.
          </p>
        </div>

        {/* RIGHT – scrolling steps */}
        <div className="pb-12 lg:py-8 space-y-4 sm:space-y-6">
          {steps.map((title, i) => {
            const isActive = i === active;
            return (
              <article
                key={i}
                data-index={i}
                ref={(el) => (refs.current[i] = el)}
                className={`grid grid-cols-1 gap-4 border-b border-white/10 py-8 transition-all duration-500 last:border-b-0 sm:grid-cols-[1fr_1.4fr] sm:items-center sm:gap-x-8 sm:py-10 lg:flex lg:min-h-[42vh] lg:flex-col lg:items-start lg:justify-center lg:gap-6 lg:py-10 ${
                  isActive
                    ? "lg:translate-y-0 lg:opacity-100"
                    : "lg:translate-y-4 lg:opacity-35"
                }`}
              >
                {/* Number in Signature Gold */}
                <span
                  aria-hidden="true"
                  className={`m-0 origin-left font-sans font-extrabold leading-[0.85] tracking-[-0.04em] transition-all duration-500 text-[clamp(80px,18vw,140px)] sm:text-[clamp(90px,14vw,160px)] lg:text-[clamp(110px,11vw,180px)] text-[#ae7b13] ${
                    isActive ? "scale-[1.03] drop-shadow-[0_0_24px_rgba(174,123,19,0.35)]" : ""
                  }`}
                >
                  {pad(i + 1)}
                </span>

                <h3 className="max-w-[20em] text-lg sm:text-xl lg:text-2xl font-light leading-[1.4] text-white">
                  {title}
                  <span className="mt-3.5 block h-0.5 w-10 bg-[#ae7b13]" />
                </h3>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
