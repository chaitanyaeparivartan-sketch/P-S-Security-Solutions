"use client";

import { useState } from "react";
import Image from "next/image";

/*
  How We Build - Engineering Standards Bento Grid with Hover Image Reveal
  Displays 5 engineering standards; on hover, each card reveals its corresponding high-res imagery.
*/

const STEPS = [
  {
    id: "01",
    title: "Plan",
    text: "Plan for function & comfort",
    image: "/images/process/01-plan.jpg",
    alt: "Architectural blueprints and engineering plans on work desk",
    gridClass:
      "md:col-span-2 lg:col-span-1 lg:row-span-2 lg:col-start-1 lg:row-start-1 min-h-[340px] sm:min-h-[420px] lg:min-h-full",
  },
  {
    id: "02",
    title: "Engineer",
    text: "Engineer before execution",
    image: "/images/process/02-engineer.jpg",
    alt: "Engineers inspecting building construction site with blueprints",
    gridClass: "lg:col-start-2 lg:row-start-1 min-h-[220px] sm:min-h-[240px]",
  },
  {
    id: "03",
    title: "Materials",
    text: "Select quality materials",
    image: "/images/process/03-materials.jpg",
    alt: "Quality construction materials, cement, concrete mixer and rebar steel",
    gridClass: "lg:col-start-3 lg:row-start-1 min-h-[220px] sm:min-h-[240px]",
  },
  {
    id: "04",
    title: "Execute",
    text: "Inspect every critical stage",
    image: "/images/process/04-execute.jpg",
    alt: "Active construction site with tower crane, concrete framework and machinery",
    gridClass: "lg:col-start-2 lg:row-start-2 min-h-[220px] sm:min-h-[240px]",
  },
  {
    id: "05",
    title: "Handover",
    text: "Handover with complete records",
    image: "/images/process/05-handover.jpg",
    alt: "Key handover handshake in front of completed modern building",
    gridClass: "lg:col-start-3 lg:row-start-2 min-h-[220px] sm:min-h-[240px]",
  },
];

export default function ProcessSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const activeId = hoveredCard || "01";

  return (
    <section
      id="how-we-build"
      className="relative bg-[#0a0a0b] text-white py-10 sm:py-12 lg:py-14 px-6 sm:px-8 lg:px-12 border-t border-white/5 scroll-mt-10"
    >
      {/* Anchor for process links */}
      <span id="process" className="absolute -top-16 left-0 opacity-0 pointer-events-none" />

      {/* Embedded fonts and CSS :has() rules for zero-latency default + single-hover preview on desktop */}
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Manrope:wght@400;500;600&display=swap");

        /* Default: Card 01 preview is active when no other card in the grid is hovered */
        .bento-grid:not(:has(.bento-card:hover)) .bento-card-first,
        .bento-card:hover {
          border-color: rgba(201, 163, 90, 0.7) !important;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(201, 163, 90, 0.12) !important;
          transform: translateY(-4px) !important;
          background-color: #141311 !important;
        }

        .bento-grid:not(:has(.bento-card:hover)) .bento-card-first .card-img,
        .bento-card:hover .card-img {
          opacity: 0.8 !important;
          transform: scale(1) !important;
          filter: brightness(1) !important;
        }

        .bento-grid:not(:has(.bento-card:hover)) .bento-card-first .card-scrim,
        .bento-card:hover .card-scrim {
          opacity: 1 !important;
        }

        .bento-grid:not(:has(.bento-card:hover)) .bento-card-first .card-glow,
        .bento-card:hover .card-glow {
          opacity: 1 !important;
        }

        .bento-grid:not(:has(.bento-card:hover)) .bento-card-first .card-num,
        .bento-card:hover .card-num {
          color: #f3d690 !important;
          filter: drop-shadow(0 0 12px rgba(243, 214, 144, 0.4)) !important;
        }

        .bento-grid:not(:has(.bento-card:hover)) .bento-card-first .card-title,
        .bento-card:hover .card-title {
          transform: translateX(4px) !important;
        }

        .bento-grid:not(:has(.bento-card:hover)) .bento-card-first .card-desc,
        .bento-card:hover .card-desc {
          color: #e5e5e5 !important;
        }
      `}</style>

      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#d4af65]/[0.025] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-10 sm:mb-14 lg:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rotate-45 bg-[#ae7b13] inline-block shadow-[0_0_8px_rgba(174,123,19,0.6)]" />
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#ae7b13]">
              ENGINEERING STANDARDS
            </span>
          </div>

          <h2 className="font-canela text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] tracking-tight text-white font-light leading-[1.12] mb-3 sm:mb-4">
            How We Build
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-[16.5px] font-light leading-relaxed max-w-2xl">
            Five engineering standards that govern our process from planning to handover.
          </p>
        </div>

        {/* Mobile View: Vertical Sticky Stacking / Swipable Cards (Matching What We Do Section) */}
        <div className="md:hidden relative pb-6">
          {STEPS.map((step, idx) => (
            <div
              key={`mobile-${step.id}`}
              className="sticky top-20 sm:top-24 bg-[#0a0a0b] py-3.5"
              style={{
                zIndex: idx + 1,
              }}
            >
              <div className="bg-[#12110f] border border-[#c9a35a]/35 rounded-none p-5 sm:p-6 shadow-2xl shadow-black relative overflow-hidden flex flex-col">
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900 border border-white/10 mb-4 shadow-lg">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    className="object-cover object-center filter brightness-95"
                    sizes="100vw"
                    priority={idx === 0}
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  {/* Stage Counter Badge on top right */}
                  <div className="absolute top-2.5 right-2.5 bg-black/85 backdrop-blur-md px-2.5 py-1 border border-[#ae7b13]/60">
                    <span className="font-['Sora',sans-serif] text-[11px] font-bold text-[#f3d690] tracking-wider">
                      {step.id} / 05
                    </span>
                  </div>
                </div>

                {/* Stage Tag */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#ae7b13] inline-block" />
                  <span className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-[#ae7b13]">
                    STAGE {step.id}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-['Sora',sans-serif] text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-['Manrope',sans-serif] text-sm sm:text-[15px] text-[#caa156] font-medium leading-relaxed">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Bento Grid with Single Active Card Preview (01 by default, hovered card when hovering) */}
        <div
          onMouseLeave={() => setHoveredCard(null)}
          className="bento-grid hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 auto-rows-fr"
        >
          {STEPS.map((step) => {
            const isFirst = step.id === "01";

            return (
              <div
                key={step.id}
                onMouseEnter={() => setHoveredCard(step.id)}
                className={`bento-card ${isFirst ? "bento-card-first" : ""} group relative rounded-none border border-[#272522]/80 bg-[#181715] p-7 sm:p-8 lg:p-9 flex flex-col justify-end transition-all duration-500 overflow-hidden cursor-pointer ${step.gridClass}`}
              >
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    className="card-img object-cover opacity-0 scale-110 filter brightness-95 transition-all duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={isFirst}
                  />

                  {/* Gradient Scrim: Deep dark at bottom for crisp text legibility, subtle at top for vibrant imagery */}
                  <div className="card-scrim absolute inset-0 bg-gradient-to-t from-[#100f0d] via-[#100f0d]/80 to-[#100f0d]/25 opacity-0 transition-opacity duration-500" />
                </div>

                {/* Ambient Card Border Glow */}
                <div className="card-glow absolute inset-0 rounded-none bg-gradient-to-br from-[#c9a35a]/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-500 pointer-events-none z-10" />

                {/* Card Content Aligned to Bottom */}
                <div className="relative z-20">
                  {/* Large Gold Number */}
                  <div className="card-num font-['Sora',sans-serif] text-[40px] sm:text-[46px] lg:text-[50px] font-bold leading-none text-[#d4af65] mb-3 sm:mb-3.5 tracking-tight transition-all duration-300">
                    {step.id}
                  </div>

                  {/* Step Title */}
                  <h3 className="card-title font-['Sora',sans-serif] text-xl sm:text-2xl lg:text-[26px] font-bold text-white tracking-tight mb-1.5 sm:mb-2 transition-transform duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="card-desc font-['Manrope',sans-serif] text-sm sm:text-[15px] lg:text-base text-[#9e988f] font-normal leading-relaxed transition-colors duration-300">
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
