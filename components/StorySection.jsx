"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Award, Compass, Layers, Building2 } from "lucide-react";

export default function StorySection({ onOpenContact }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const mobileTimelineRef = useRef(null);
  const cardRefs = useRef([]);
  const [fillHeight, setFillHeight] = useState(0);
  const [activeNodeIndices, setActiveNodeIndices] = useState([0]);
  const phases = [
    {
      year: "1985",
      badge: "PHASE 01",
      pillar: "Bedrock",
      title: "Land & Master Planning",
      shortDesc: "Strategic land acquisition, zoning layouts, and civic foundation engineering in Hyderabad.",
      fullDesc:
        "UNICO was founded with a non-negotiable principle: permanent structural integrity. Our early years focused on strategic land acquisition, master-planning large parcels, and laying foundational civil infrastructure across Hyderabad's developing corridors.",
      metric: "Bedrock Foundation",
      icon: Compass,
      stats: "35+ Acres Master-Planned",
    },
    {
      year: "1998",
      badge: "PHASE 02",
      pillar: "Craftsmanship",
      title: "Custom Luxury Villas",
      shortDesc: "Turnkey bespoke estates, private architectural residences, and artisan finishes.",
      fullDesc:
        "Pioneered bespoke private estates and turnkey architectural residences. Every villa was engineered for generational longevity, incorporating seismic-reinforced concrete framing, custom stonework, and climate-responsive architecture.",
      metric: "Bespoke Residences",
      icon: Layers,
      stats: "50+ Luxury Estates",
    },
    {
      year: "2010",
      badge: "PHASE 03",
      pillar: "Community",
      title: "Villas & Apartments",
      shortDesc: "Scaled gated residential enclaves, multi-family communities, and modern amenities.",
      fullDesc:
        "Scaled our engineering expertise to develop integrated gated communities and luxury low-rise apartment enclaves, delivering unified utility infrastructure, private road networks, and recreational amenities.",
      metric: "Scaled Communities",
      icon: Building2,
      stats: "250,000+ Sq. Ft. Built",
    },
    {
      year: "2015",
      badge: "PHASE 04",
      pillar: "Enterprise",
      title: "Commercial & Steel",
      shortDesc: "Heavy structural steel, ISO cleanrooms, and institutional campus developments.",
      fullDesc:
        "Diversified into heavy structural steel assemblies, enterprise commercial hubs, precision ISO-certified cleanroom facilities for medical manufacturing, and major institutional education campuses like Sancta Maria.",
      metric: "Grade-A Infrastructure",
      icon: Award,
      stats: "15+ Institutional & EPC",
    },
  ];

  const presentPhase = {
    year: "Now",
    badge: "PRESENT DAY",
    pillar: "Skyline",
    title: "1M+ Sq. Ft. & Beyond",
    shortDesc: "Over one million square feet handed over with an unblemished zero structural failure record across Hyderabad.",
    stats: "40 Years • Zero Failure",
    isHighlight: true,
  };

  const mobileTimelinePhases = [...phases, presentPhase];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!mobileTimelineRef.current) {
            ticking = false;
            return;
          }
          const container = mobileTimelineRef.current;
          const rect = container.getBoundingClientRect();
          const viewportHeight = window.innerHeight || 800;

          // Trigger line: when an element reaches 65% from the top of the viewport
          const triggerY = viewportHeight * 0.65;

          const cards = cardRefs.current.filter(Boolean);
          if (cards.length === 0) {
            ticking = false;
            return;
          }

          const firstCardTop = cards[0].offsetTop;
          const lastCardTop = cards[cards.length - 1].offsetTop;
          const firstDiamondY = firstCardTop + 24; // center of top diamond
          const lastDiamondY = lastCardTop + 24; // center of bottom diamond
          const totalTrack = Math.max(1, lastDiamondY - firstDiamondY);

          // Calculate how far the trigger has scrolled past the first diamond
          const currentScrollY = triggerY - (rect.top + firstDiamondY);
          const clampedFill = Math.max(0, Math.min(totalTrack, currentScrollY));
          setFillHeight(clampedFill);

          // Mark reached nodes
          const reached = [];
          cards.forEach((card, idx) => {
            const nodeY = card.offsetTop + 24;
            // Activate when fill line reaches or is within 12px of node
            if (clampedFill >= nodeY - firstDiamondY - 12) {
              reached.push(idx);
            }
          });

          // Keep at least the first node active once story section is entered
          if (rect.top < triggerY) {
            if (!reached.includes(0)) reached.unshift(0);
          }
          setActiveNodeIndices(reached.length > 0 ? reached : [0]);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      id="story"
      className="w-full bg-[#090c10] text-white pt-12 sm:pt-14 lg:pt-16 pb-8 sm:pb-10 lg:pb-12 px-6 sm:px-8 lg:px-12 select-none border-t border-white/10 relative overflow-hidden"
    >
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#ae7b13]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 lg:mb-14">
          <div className="flex items-center gap-2 mb-3 sm:mb-3.5">
            <span className="w-2 h-2 rotate-45 bg-[#ae7b13] inline-block shadow-[0_0_8px_rgba(174,123,19,0.6)]"></span>
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#ae7b13]">
              OUR STORY • 1985 TO TODAY
            </span>
          </div>

          <h2 className="font-canela text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] tracking-tight text-white font-light leading-[1.12] mb-4 sm:mb-5">
            The UNICO Journey
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-[16.5px] font-light leading-relaxed max-w-2xl">
            Four decades of structural rise in Hyderabad — charted phase by phase from bedrock to the skyline.
          </p>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP VIEW (lg and above): 50/50 Split (1985 to Today) */}
        {/* ======================================================== */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-5 w-full items-stretch">
          {/* Left Column: 2x2 Grid of Historical Phases (1985 -> 1998 -> 2010 -> 2015) */}
          <div className="grid grid-cols-2 gap-5 h-full">
            {phases.slice(0, 4).map((phase) => {
              const Icon = phase.icon;
              return (
                <div
                  key={phase.year}
                  onMouseEnter={() => setHoveredCard(phase.year)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setHoveredCard(hoveredCard === phase.year ? null : phase.year)}
                  className="flip-card relative w-full h-full min-h-[220px] cursor-pointer"
                >
                  <div
                    className="flip-card-inner"
                    style={{
                      transform: hoveredCard === phase.year ? "rotateY(180deg)" : undefined,
                    }}
                  >
                    {/* Front Face: ONLY Year and the Icon displayed initially */}
                    <div className="flip-card-front bg-[#0e1420] border border-[#1b2436] hover:border-white/25 transition-colors duration-300 p-7 flex flex-col justify-between">
                      {/* Top: Big Year on left + Category Icon on right */}
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-none">
                          {phase.year}
                        </h3>

                        <Icon
                          size={20}
                          strokeWidth={1.5}
                          className="text-neutral-400 mt-1 shrink-0"
                        />
                      </div>

                      {/* Clean bottom */}
                      <div className="w-full" />
                    </div>

                    {/* Back Face: Revealed on 3D Flip Hover */}
                    <div className="flip-card-back font-sans bg-gradient-to-br from-[#121926] via-[#0f1522] to-[#0a0f18] border border-[#ae7b13]/60 shadow-[0_12px_40px_rgba(0,0,0,0.85)] p-6 sm:p-7 flex flex-col justify-between text-left">
                      <div>
                        {/* Back Top: Year Milestone + Icon */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2.5">
                          <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#d4af37]">
                            {phase.year} MILESTONE
                          </span>
                          <Icon size={16} strokeWidth={1.5} className="text-[#d4af37]" />
                        </div>

                        {/* Title */}
                        <h4 className="text-base sm:text-[17px] font-bold text-white tracking-normal leading-snug mb-1.5">
                          {phase.title}
                        </h4>

                        {/* Detailed Description */}
                        <p className="text-neutral-300 text-xs sm:text-[12.5px] leading-relaxed font-light">
                          {phase.shortDesc}
                        </p>
                      </div>

                      {/* Bottom Metric / Stats */}
                      <div className="pt-2.5 border-t border-white/10 text-[#d4af37] text-xs font-semibold tracking-wide">
                        {phase.stats}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Featured Present Day / Now Card (Culmination of the Journey) */}
          <div
            onMouseEnter={() => setHoveredCard("now")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => setHoveredCard(hoveredCard === "now" ? null : "now")}
            className="flip-card relative w-full h-full min-h-[440px] cursor-pointer"
          >
            <div
              className="flip-card-inner h-full min-h-[440px]"
              style={{
                transform: hoveredCard === "now" ? "rotateY(180deg)" : undefined,
              }}
            >
              {/* Front Face: ONLY Year (Now) and Icon / Badge displayed initially */}
              <div className="flip-card-front bg-gradient-to-br from-[#1e1a0e] via-[#17140b] to-[#100e08] border border-[#383018] hover:border-[#ae7b13]/60 transition-colors duration-300 p-8 lg:p-10 flex flex-col justify-between min-h-[440px]">
                {/* Top Row: Badge & Radial Sunburst Spinner Icon */}
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-neutral-300 border border-white/10 bg-white/[0.04] px-3 py-1">
                    PRESENT DAY
                  </span>

                  {/* 8-Tick Radial Icon */}
                  <svg
                    className="w-4 h-4 text-neutral-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="12" y1="2" x2="12" y2="5" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
                    <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
                    <line x1="2" y1="12" x2="5" y2="12" />
                    <line x1="19" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
                    <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
                  </svg>
                </div>

                {/* Bottom Content: Huge Serif 'Now' */}
                <div className="pt-20">
                  <div className="font-canela text-7xl lg:text-[5.5rem] font-light text-[#dfb15b] leading-none select-none">
                    Now
                  </div>
                </div>
              </div>

              {/* Back Face: Revealed on 3D Flip Hover */}
              <div className="flip-card-back bg-gradient-to-br from-[#241e0e] via-[#1a160b] to-[#0f0d06] border border-[#d4af37]/70 shadow-[0_16px_50px_rgba(0,0,0,0.9)] p-8 lg:p-10 flex flex-col justify-between min-h-[440px] text-left">
                {/* Back Top: Badge + Icon */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#dfb15b]">
                    PRESENT DAY • SKYLINE
                  </span>

                  <svg
                    className="w-4 h-4 text-[#dfb15b]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <line x1="12" y1="2" x2="12" y2="5" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
                    <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
                    <line x1="2" y1="12" x2="5" y2="12" />
                    <line x1="19" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
                    <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
                  </svg>
                </div>

                {/* Back Middle: Title & Narrative */}
                <div className="my-auto py-4">
                  <div className="font-canela text-3xl sm:text-4xl text-[#dfb15b] font-light mb-2">
                    Now
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                    1M+ Sq. Ft. & Beyond
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
                    Operating across institutional, cleanroom, retail, and luxury residential sectors with over 1,000,000 sq. ft. constructed and handed over with permanent structural certainty.
                  </p>
                </div>

                {/* Back Bottom: Stats */}
                <div className="pt-3 border-t border-white/10 text-xs sm:text-sm font-semibold tracking-wide text-[#dfb15b]">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dfb15b] animate-pulse"></span>
                    40 Years • Zero Failure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MOBILE VIEW (below lg): Vertical Timeline with Diamonds */}
        {/* ======================================================== */}
        <div
          ref={mobileTimelineRef}
          className="lg:hidden relative pl-8 sm:pl-10 space-y-5 sm:space-y-6"
        >
          {/* Continuous Subtle Background Track Line */}
          <div
            className="absolute left-[11px] sm:left-[15px] top-6 bottom-6 w-[2px] bg-white/10 rounded-full"
            aria-hidden="true"
          />

          {/* Golden Animated / Scroll-Driven Filling Line */}
          <div
            className="absolute left-[11px] sm:left-[15px] top-6 w-[2px] rounded-full z-0 transition-[height] duration-75 ease-out pointer-events-none"
            style={{
              height: `${fillHeight}px`,
              background: "linear-gradient(to bottom, #d4af37, #dfb15b, #ae7b13, #f5d076)",
              boxShadow: "0 0 10px rgba(223, 177, 91, 0.8), 0 0 20px rgba(174, 123, 19, 0.4)",
            }}
            aria-hidden="true"
          />

          {/* Glowing Leading Head at the bottom tip of the filling line */}
          {fillHeight > 4 && (
            <div
              className="absolute left-[12px] sm:left-[16px] -translate-x-1/2 w-2 h-2 rotate-45 bg-[#f5d076] shadow-[0_0_12px_#dfb15b,0_0_24px_#ae7b13] z-20 pointer-events-none transition-[top] duration-75 ease-out"
              style={{
                top: `${24 + fillHeight}px`,
              }}
              aria-hidden="true"
            />
          )}

          {mobileTimelinePhases.map((phase, idx) => {
            const Icon = phase.icon;
            const isReached = activeNodeIndices.includes(idx);
            const isCurrent =
              activeNodeIndices.length > 0 &&
              activeNodeIndices[activeNodeIndices.length - 1] === idx;

            return (
              <div
                key={phase.year}
                ref={(el) => (cardRefs.current[idx] = el)}
                onClick={() => {
                  const newActive = [];
                  for (let i = 0; i <= idx; i++) newActive.push(i);
                  setActiveNodeIndices(newActive);
                }}
                className="relative cursor-pointer"
              >
                {/* Golden Diamond Node centered on timeline */}
                <div
                  className={`absolute -left-5 sm:-left-6 top-6 sm:top-7 -translate-x-1/2 w-2.5 h-2.5 rotate-45 z-10 transition-all duration-500 ${
                    isCurrent
                      ? "bg-[#dfb15b] ring-4 ring-[#090c10] shadow-[0_0_16px_rgba(223,177,91,1),0_0_30px_rgba(174,123,19,0.7)] scale-125 opacity-100"
                      : isReached
                      ? "bg-[#d4af37] ring-4 ring-[#090c10] shadow-[0_0_10px_rgba(212,175,55,0.8)] scale-105 opacity-100"
                      : "bg-[#141b27] border border-white/20 ring-4 ring-[#090c10] scale-90 opacity-40"
                  }`}
                />

                {/* Card Container with Prominent Highlight Effect */}
                <div
                  className={`relative overflow-hidden p-5 sm:p-6 border transition-all duration-500 ${
                    isCurrent
                      ? phase.isHighlight
                        ? "bg-gradient-to-br from-[#29200f] via-[#1c160a] to-[#120e06] border-[#dfb15b] shadow-[0_0_35px_rgba(223,177,91,0.25),0_12px_40px_rgba(0,0,0,0.85)] scale-[1.01]"
                        : "bg-gradient-to-br from-[#121c2e] via-[#0d1624] to-[#080d16] border-[#dfb15b] shadow-[0_0_30px_rgba(223,177,91,0.22),0_12px_40px_rgba(0,0,0,0.85)] scale-[1.01]"
                      : isReached
                      ? phase.isHighlight
                        ? "bg-gradient-to-br from-[#1e1a0e] via-[#17140b] to-[#100e08] border-[#ae7b13]/80 shadow-[0_8px_30px_rgba(174,123,19,0.18)]"
                        : "bg-[#0e1420] border-[#ae7b13]/50 shadow-[0_8px_25px_rgba(0,0,0,0.6)]"
                      : "bg-[#0a0d14]/60 border-white/10 opacity-40"
                  }`}
                >
                  {/* Top Glowing Beam Accent for Current Highlighted Card */}
                  {isCurrent && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dfb15b] to-transparent shadow-[0_0_12px_#dfb15b]" />
                  )}

                  {/* Top Row: Year (left) and Icon (right) */}
                  <div className="flex items-center justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-3">
                      {phase.isHighlight && (
                        <span
                          className={`text-[10px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1 border transition-colors duration-300 ${
                            isCurrent
                              ? "text-[#dfb15b] border-[#dfb15b]/40 bg-[#dfb15b]/10"
                              : "text-neutral-300 border-white/10 bg-white/[0.04]"
                          }`}
                        >
                          PRESENT DAY
                        </span>
                      )}
                      <span
                        className={`text-2xl sm:text-3xl font-bold tracking-tight transition-all duration-300 ${
                          phase.isHighlight
                            ? "font-canela text-[#dfb15b]"
                            : isCurrent
                            ? "text-[#dfb15b] drop-shadow-[0_0_12px_rgba(223,177,91,0.5)]"
                            : isReached
                            ? "text-white"
                            : "text-neutral-500"
                        }`}
                      >
                        {phase.year}
                      </span>
                    </div>

                    {phase.isHighlight ? (
                      <svg
                        className={`w-4 h-4 shrink-0 transition-colors duration-300 ${
                          isCurrent ? "text-[#dfb15b]" : "text-neutral-400"
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="12" y1="2" x2="12" y2="5" />
                        <line x1="12" y1="19" x2="12" y2="22" />
                        <line x1="4.93" y1="4.93" x2="7.05" y2="7.05" />
                        <line x1="16.95" y1="16.95" x2="19.07" y2="19.07" />
                        <line x1="2" y1="12" x2="5" y2="12" />
                        <line x1="19" y1="12" x2="22" y2="12" />
                        <line x1="4.93" y1="19.07" x2="7.05" y2="16.95" />
                        <line x1="16.95" y1="7.05" x2="19.07" y2="4.93" />
                      </svg>
                    ) : (
                      <Icon
                        size={18}
                        strokeWidth={1.5}
                        className={`shrink-0 transition-all duration-300 ${
                          isCurrent
                            ? "text-[#dfb15b] scale-110 drop-shadow-[0_0_8px_rgba(223,177,91,0.6)]"
                            : isReached
                            ? "text-neutral-300"
                            : "text-neutral-600"
                        }`}
                      />
                    )}
                  </div>

                  {/* Title */}
                  <h4
                    className={`text-[15px] sm:text-base font-bold tracking-normal leading-snug mb-1.5 transition-colors duration-300 ${
                      isCurrent || isReached ? "text-white" : "text-neutral-400"
                    }`}
                  >
                    {phase.title}
                  </h4>

                  {/* Description */}
                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed font-light mb-3.5 transition-colors duration-300 ${
                      isCurrent
                        ? "text-neutral-200"
                        : isReached
                        ? "text-neutral-400"
                        : "text-neutral-500"
                    }`}
                  >
                    {phase.shortDesc}
                  </p>

                  {/* Bottom Divider & Stats Metric */}
                  <div
                    className={`border-t pt-3 text-xs sm:text-[13px] font-medium tracking-wide transition-colors duration-300 flex items-center justify-between ${
                      isCurrent
                        ? "border-[#dfb15b]/30 text-[#dfb15b] font-semibold"
                        : isReached
                        ? "border-white/10 text-[#d4af37]"
                        : "border-white/5 text-neutral-600"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#dfb15b] shadow-[0_0_8px_#dfb15b] animate-pulse"></span>
                      )}
                      {phase.stats}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Narrative / Heritage Bar */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 bg-[#0c1015] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ae7b13]"></span>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#ae7b13]">
                40 YEARS OF STRUCTURAL CERTAINTY
              </span>
            </div>
            <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed">
              From our first foundational plot in 1985 to commanding major institutional, cleanroom, and residential skylines in 2026, UNICO has never deviated from zero compromise civil engineering.
            </p>
          </div>

          <a
            href="#cta"
            onClick={(e) => {
              if (e?.preventDefault) e.preventDefault();
              const el = document.getElementById("cta");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else window.location.hash = "#cta";
            }}
            className="whitespace-nowrap group/btn flex items-stretch cursor-pointer select-none rounded-[4px] overflow-hidden transition-transform duration-300 hover:scale-[1.02] shadow-2xl"
            aria-label="Start a Project with UNICO"
          >
            <span className="bg-[#bf900e] text-white text-[12px] sm:text-[12.5px] font-bold tracking-[0.12em] uppercase px-5 py-3 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-[#ce9e16]">
              START A PROJECT
            </span>
            <span className="w-[1px] bg-white/25"></span>
            <span className="bg-[#bf900e] text-white px-3 py-3 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-[#ce9e16]">
              <ArrowUpRight
                size={15}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
