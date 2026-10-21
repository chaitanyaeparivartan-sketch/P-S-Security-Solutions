"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/*
  Quality Promise & Standards Section
  - Mobile view:
    * ONLY cards are displayed (image showcase hidden)
    * Normal natural page scroll with standard vertical stacking
  - Desktop view (lg and above):
    * Image showcase pinned in the vertical center of the screen
    * Drives through cards one by one as user scrolls
    * Full synchronization with Next/Prev buttons and step dots
  - ISO Accreditations: 3-column layout with vertical dividers and rotating medallion IsoBadge
*/

// Restored Original IsoBadge with rotating outer ring on hover
function IsoBadge({ number }) {
  return (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-8 group cursor-default">
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full transition-transform duration-700 ease-out group-hover:rotate-45"
      >
        {/* Outer Dotted / Ticked Ring */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#ae7b13"
          strokeWidth="1.2"
          strokeDasharray="2 3.5"
          className="opacity-75"
        />
        {/* Inner Solid Gold Ring */}
        <circle
          cx="60"
          cy="60"
          r="46"
          fill="#0c1017"
          stroke="#ae7b13"
          strokeWidth="1.5"
          className="transition-colors duration-300 group-hover:stroke-[#d4af37]"
        />
      </svg>

      {/* Center ISO & Number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#d4af37] mb-0.5">
          ISO
        </span>
        <span className="text-[22px] sm:text-[24px] font-bold tracking-tight text-white">
          {number}
        </span>
      </div>
    </div>
  );
}

const COMMITMENTS = [
  {
    id: "01",
    title: "Approved materials from trusted sources",
    tag: "Certified Supply Chain",
    desc: "Rigorous laboratory testing and tier-1 vendor verification for all cement, structural steel, aggregates, and engineered components.",
    image: "/images/quality/Construction Material List for House Building India _ AECORD Blog.jpg",
  },
  {
    id: "02",
    title: "Quality checks at every critical stage",
    tag: "Multi-Tier Inspections",
    desc: "Comprehensive engineering audits, slump & cube-strength testing at every milestone prior to subsequent phase clearance.",
    image: "/images/quality/Construction Quality Inspection at Daylight.png",
  },
  {
    id: "03",
    title: "Strong site supervision & execution control",
    tag: "Site Governance",
    desc: "Dedicated senior site engineers and certified safety supervisors maintaining round-the-clock precision and tolerance standards.",
    image: "/images/quality/Supervisor Directing a Busy Construction Site.png",
  },
  {
    id: "04",
    title: "Progress & QC updates shared regularly",
    tag: "Transparent Reporting",
    desc: "Weekly photographic audits, digital milestones, and quality control reports shared directly with property owners and partners.",
    image: "/images/quality/Construction Planning at the Site.png",
  },
  {
    id: "05",
    title: "Safety, finish & long-term performance",
    tag: "Enduring Finishes",
    desc: "Zero-compromise safety protocols coupled with architectural finish tolerances engineered to perform flawlessly for generations.",
    image: "/images/quality/Residential Building Inspection.png",
  },
  {
    id: "06",
    title: "Complete drawings, records & documentation",
    tag: "As-Built Archives",
    desc: "Detailed architectural drawings, structural calculations, and MEP warranties catalogued for lifelong reference and transparency.",
    image: "/images/quality/Construction Engineers Reviewing Plans Onsite.png",
  },
  {
    id: "07",
    title: "Support continuing after completion",
    tag: "Lifecycle Warranty",
    desc: "Post-handover transition assistance, structured maintenance checks, and long-term structural guarantee stewardship.",
    image: "/images/quality/Modern Home Handover Inspection.png",
  },
];

const ISO_STANDARDS = [
  {
    number: "9001",
    title: "Quality Management",
    desc: "Consistent, documented processes from groundbreaking to handover.",
  },
  {
    number: "14001",
    title: "Environmental Management",
    desc: "Responsible construction that respects people and the planet.",
  },
  {
    number: "45001",
    title: "Health & Safety",
    desc: "Safe sites and safe teams, with safety built into every stage of work.",
  },
];

export default function QualitySection() {
  const [activeId, setActiveId] = useState("01");
  const activeIdRef = useRef("01");
  const trackRef = useRef(null);
  const isJumpingRef = useRef(false);

  // Jump to a specific step
  const jumpToStep = useCallback((id) => {
    setActiveId(id);
    activeIdRef.current = id;

    // Only scroll window on desktop with sticky track
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      const track = trackRef.current;
      if (track) {
        const idx = COMMITMENTS.findIndex((c) => c.id === id);
        if (idx !== -1) {
          const windowHeight = window.innerHeight;
          const trackHeight = track.offsetHeight;
          const maxScroll = trackHeight - windowHeight;
          if (maxScroll > 0) {
            isJumpingRef.current = true;
            const stepProgress = (idx + 0.5) / COMMITMENTS.length;
            const trackTop = track.getBoundingClientRect().top + window.scrollY;
            const targetWindowScroll = trackTop + stepProgress * maxScroll;

            window.scrollTo({
              top: targetWindowScroll,
              behavior: "smooth",
            });

            setTimeout(() => {
              isJumpingRef.current = false;
            }, 600);
          }
        }
      }
    }
  }, []);

  const handlePrev = useCallback(() => {
    const currentIdx = COMMITMENTS.findIndex((c) => c.id === activeIdRef.current);
    if (currentIdx > 0) {
      jumpToStep(COMMITMENTS[currentIdx - 1].id);
    }
  }, [jumpToStep]);

  const handleNext = useCallback(() => {
    const currentIdx = COMMITMENTS.findIndex((c) => c.id === activeIdRef.current);
    if (currentIdx < COMMITMENTS.length - 1) {
      jumpToStep(COMMITMENTS[currentIdx + 1].id);
    }
  }, [jumpToStep]);

  // Window scroll drives the cards one at a time on desktop while the image is pinned vertically centered
  useEffect(() => {
    const handleWindowScroll = () => {
      // In mobile view: normal scroll, do not hijack or calculate track progress
      if (typeof window !== "undefined" && window.innerWidth < 1024) return;
      if (isJumpingRef.current) return;
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const trackHeight = track.offsetHeight;
      const maxScroll = trackHeight - windowHeight;

      if (maxScroll <= 0) return;

      // rect.top <= 0 indicates the image has reached vertical center and is fixed
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));

      // Map progress to steps 0..6
      const stepIndex = Math.min(
        COMMITMENTS.length - 1,
        Math.floor(progress * COMMITMENTS.length)
      );

      const targetItem = COMMITMENTS[stepIndex];
      if (targetItem && targetItem.id !== activeIdRef.current) {
        activeIdRef.current = targetItem.id;
        setActiveId(targetItem.id);
      }
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    handleWindowScroll();
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  const currentIndex = COMMITMENTS.findIndex((c) => c.id === activeId);

  return (
    <section
      id="quality"
      className="relative w-full bg-[#090c10] text-white pt-12 sm:pt-16 lg:pt-24 border-t border-white/5 scroll-mt-10"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#d4af65]/[0.02] blur-[150px] rounded-full pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-[1440px] mx-auto relative z-10 px-5 sm:px-8 lg:px-12 mb-6 sm:mb-8 lg:mb-12">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-2.5 sm:mb-3.5">
            <span className="w-2 h-2 rotate-45 bg-[#ae7b13] inline-block" />
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#ae7b13]">
              QUALITY STANDARDS
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-canela text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] tracking-tight text-white font-light leading-[1.12] mb-3 sm:mb-5">
            Quality Promise
          </h2>

          {/* Subtitle */}
          <p className="text-neutral-400 text-xs sm:text-base md:text-[16.5px] font-light leading-relaxed max-w-2xl mx-auto">
            Seven commitments engineered into every project, experienced step by step from groundbreaking to handover.
          </p>
        </div>
      </div>

      {/* Scroll Track:
          - Mobile (< 1024px): h-auto, normal natural page scroll with only cards
          - Desktop (>= 1024px): h-[320vh] with vertically centered sticky frame and image showcase
      */}
      <div ref={trackRef} className="relative w-full h-auto lg:h-[320vh]">
        {/* Sticky Frame on Desktop / Normal Flow on Mobile */}
        <div className="relative lg:sticky lg:top-0 h-auto lg:h-screen w-full flex flex-col justify-center px-4 sm:px-6 lg:px-12 pointer-events-auto lg:pointer-events-none z-10 pb-10 sm:pb-12 lg:pb-0">
          <div className="max-w-[1440px] w-full mx-auto pointer-events-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
              {/* Left Column: All 7 Cards (Full width and all active by default on Mobile) */}
              <div className="w-full lg:col-span-7 xl:col-span-7 relative flex flex-col justify-center">
                <div className="w-full space-y-2.5 sm:space-y-3 lg:space-y-2.5 select-none">
                  {COMMITMENTS.map((item, idx) => {
                    const isActive = activeId === item.id;
                    const isEven = idx % 2 === 1;

                    return (
                      <div
                        key={item.id}
                        data-card-id={item.id}
                        onClick={() => jumpToStep(item.id)}
                        className={`group cursor-pointer w-full py-3.5 sm:py-4 lg:py-3.5 px-4 sm:px-6 transition-all duration-300 border relative overflow-hidden min-h-[60px] sm:min-h-[66px] lg:min-h-[62px] flex items-center bg-gradient-to-r from-[#17140f] to-[#12100c] border-[#d4af37]/85 shadow-[0_4px_20px_rgba(212,175,55,0.14)] opacity-100 scale-100 ${
                          isActive
                            ? "lg:bg-gradient-to-r lg:from-[#17140f] lg:to-[#12100c] lg:border-[#d4af37]/85 lg:shadow-[0_6px_25px_rgba(212,175,55,0.18)] lg:opacity-100 lg:scale-100"
                            : isEven
                            ? "lg:shadow-none lg:opacity-45 lg:scale-[0.99] lg:from-[#14120e] lg:to-[#18140f] lg:border-[#c9a35a]/15 hover:lg:opacity-75 hover:lg:border-white/30"
                            : "lg:shadow-none lg:opacity-45 lg:scale-[0.99] lg:from-[#11141a] lg:to-[#0c0f14] lg:border-white/5 hover:lg:opacity-75 hover:lg:border-white/30"
                        }`}
                      >
                        {/* Left Gold Accent Pip (Always active on mobile, step-activated on desktop) */}
                        <span
                          className={`absolute left-0 top-0 bottom-0 w-[4px] bg-[#d4af37] transition-all duration-300 opacity-100 shadow-[0_0_10px_rgba(212,175,55,0.9)] ${
                            isActive
                              ? "lg:opacity-100 lg:shadow-[0_0_10px_rgba(212,175,55,0.9)]"
                              : "lg:opacity-0 lg:shadow-none group-hover:lg:opacity-40"
                          }`}
                        />

                        {/* Title (Always bright gold on mobile, step-activated on desktop) */}
                        <div className="relative z-10 pr-12 sm:pr-18">
                          <h3
                            className={`text-[13.5px] sm:text-[15.5px] lg:text-[16.5px] font-bold tracking-tight leading-snug transition-colors duration-300 text-[#d4af37] ${
                              isActive
                                ? "lg:text-[#d4af37]"
                                : "lg:text-[#caa156] group-hover:lg:text-white"
                            }`}
                          >
                            {item.title}
                          </h3>
                        </div>

                        {/* Watermark Number (Gold on mobile, step-activated on desktop) */}
                        <div className="absolute right-3.5 sm:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none">
                          <span
                            aria-hidden="true"
                            className={`font-sans font-black text-3xl sm:text-5xl md:text-[54px] tracking-tight leading-none select-none transition-all duration-300 text-[#d4af37]/35 scale-105 ${
                              isActive
                                ? "lg:text-[#d4af37]/35 lg:scale-105"
                                : "lg:text-white/[0.06] lg:scale-100"
                            }`}
                          >
                            {item.id}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Synchronized Image Showcase (Desktop Only: hidden lg:block) */}
              <div className="hidden lg:block lg:col-span-5 xl:col-span-5 relative">
                <div className="w-full transition-all duration-300">
                  <div className="relative bg-[#0d1016] border border-white/10 p-2 sm:p-2.5 shadow-2xl">
                    {/* Main Image Stage */}
                    <div className="relative w-full h-[380px] sm:h-[410px] lg:h-[440px] overflow-hidden bg-neutral-900">
                      {COMMITMENTS.map((item) => {
                        const isActive = activeId === item.id;
                        return (
                          <div
                            key={item.id}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                              isActive
                                ? "opacity-100 z-10"
                                : "opacity-0 z-0 pointer-events-none"
                            }`}
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 550px"
                              className="object-cover object-center filter brightness-[0.95] contrast-[1.05]"
                              priority={item.id === "01"}
                            />
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom Navigation Controls: Next/Prev & Step Indicators */}
                    <div className="pt-3 px-3 flex items-center justify-between border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePrev}
                          disabled={currentIndex === 0}
                          className="p-1.5 border border-white/10 hover:border-[#d4af37] text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                          aria-label="Previous Step"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={currentIndex === COMMITMENTS.length - 1}
                          className="p-1.5 border border-white/10 hover:border-[#d4af37] text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                          aria-label="Next Step"
                        >
                          <ChevronRight size={16} />
                        </button>
                        <span className="text-[11px] font-medium tracking-[0.16em] uppercase text-neutral-400 pl-1">
                          Step {currentIndex + 1} of 7
                        </span>
                      </div>

                      {/* Step Pips */}
                      <div className="flex items-center gap-1.5">
                        {COMMITMENTS.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => jumpToStep(item.id)}
                            className={`h-1.5 transition-all duration-300 rounded-full ${
                              activeId === item.id
                                ? "w-6 bg-[#d4af37]"
                                : "w-2 bg-white/20 hover:bg-white/50"
                            }`}
                            aria-label={`Jump to step ${item.id}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restored Original 3-Column ISO Layout with Vertical Dividers & Rotating Medallion Badges */}
      <div className="border-t border-white/10 pt-16 sm:pt-20 lg:pt-24 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-18 lg:pb-24">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-14 lg:mb-16 text-center md:text-left flex flex-col items-center md:items-start mx-auto md:mx-0">
          <div className="flex items-center justify-center md:justify-start gap-2.5 mb-3.5">
            <span className="w-2 h-2 rotate-45 bg-[#ae7b13] inline-block" />
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#ae7b13]">
              STANDARDS & ACCREDITATIONS
            </span>
          </div>

          <h3 className="font-canela text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] tracking-tight text-white font-light leading-[1.12] mb-4">
            ISO Certified Excellence
          </h3>

          <p className="text-neutral-400 text-sm sm:text-base md:text-[16.5px] font-light leading-relaxed max-w-2xl">
            Internationally recognised standards behind every site and handover.
          </p>
        </div>

        {/* 3-Column Grid with Vertical Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/10 md:divide-x md:divide-white/10">
          {ISO_STANDARDS.map((item, idx) => (
            <div
              key={item.number}
              className={`py-10 sm:py-12 md:py-14 flex flex-col items-center text-center md:items-start md:text-left ${
                idx === 0
                  ? "md:pr-10 lg:pr-14"
                  : idx === 1
                  ? "md:px-10 lg:px-14 border-t border-white/10 md:border-t-0"
                  : "md:pl-10 lg:pl-14 border-t border-white/10 md:border-t-0"
              }`}
            >
              {/* Rotating Medallion Badge */}
              <IsoBadge number={item.number} />

              {/* Title */}
              <h4 className="font-sans text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                {item.title}
              </h4>

              {/* Description */}
              <p className="text-neutral-400 text-sm sm:text-[15px] font-light leading-relaxed max-w-sm mx-auto md:mx-0">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
