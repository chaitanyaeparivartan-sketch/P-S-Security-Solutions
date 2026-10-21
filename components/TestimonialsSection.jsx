"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

/*
  Testimonials Section
  - 3 Cards in a row (lg:grid-cols-3)
  - Both Section Background and Card Backgrounds are SOLID BLACK (bg-black)
  - Card Header: Profile avatar on left, rounded company logo pill on right
  - Quotation icon: Soft slate-blue styled double quote symbol
  - Large bold quote typography
  - Author block with vertical left accent border, Name, Role, Location
  - Smooth 3-card sliding carousel navigation
*/

const TESTIMONIALS = [
  {
    id: "01",
    avatar: "/images/testimonials/avatar-anand.png",
    stars: 5,
    quote:
      "“We were living in Dubai throughout the two years of construction. Everyone warned us building remotely was impossible without family on site. UNICO sent daily dashboard photos every single evening at 7 PM. The handover file was immaculate.”",
    author: "Anand & Priya Varma",
    role: "Homeowners (NRI - Dubai) · Kokapet Luxury Villa",
    hasRing: true,
  },
  {
    id: "02",
    avatar: "/images/testimonials/avatar-vikramaditya.png",
    stars: 5,
    quote:
      "“Variations kill margins in commercial builds. UNICO gave us a strict 8% maximum variation cap in writing and stuck to it. The senior project manager we met on day one stayed through the final handover inspection.”",
    author: "Vikramaditya Reddy",
    role: "Managing Director · Financial District Commercial",
    hasRing: true,
  },
  {
    id: "03",
    avatar: "/images/testimonials/avatar-ksrao.png",
    stars: 5,
    quote:
      "“The most critical constraint for us was delivery before the new academic year commenced in June. UNICO didn't just meet the date — they handed over two weeks ahead of schedule. Acoustic separation between classrooms means lessons never disturb each other.”",
    author: "Dr. K. S. Rao (Trust Secretary)",
    role: "CBSE Senior Secondary Campus · Kompally, Hyderabad",
    hasRing: true,
  },
  {
    id: "04",
    avatar: "/images/testimonials/elena.jpg",
    stars: 5,
    quote:
      "“UNICO delivered a level of finish that you usually only see in Zurich or Milan. Every reveal, shadow gap, and Italian terrazzo floor exceeded our expectations from blueprint to final handover.”",
    author: "Elena & Rahul Mehta",
    role: "Private Clients · Goa Sanctuary Villa",
    hasRing: false,
  },
  {
    id: "05",
    avatar: "/images/testimonials/denis.jpg",
    stars: 5,
    quote:
      "“UNICO sculpted our villa into the cliffside topography without harming a single ancient tree. Their environmental precision and structural mastery are unmatched in residential execution.”",
    author: "Dr. Vikram Singhania",
    role: "Estate Commission · Alibaug Hillside Estate",
    hasRing: false,
  },
  {
    id: "06",
    avatar: "/images/testimonials/jahan.jpg",
    stars: 5,
    quote:
      "“They organized their work and internal management was outstanding. Two viewings, one offer, millimeter-accurate execution tolerances from start to finish.”",
    author: "Jahan Melad & Priya",
    role: "Project Directors · Islington Residence & Studio",
    hasRing: false,
  },
];

// Platform icons for rating badges
function G2Icon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#FF492C" />
      <path
        d="M12.3 7.2c-2.6 0-4.4 1.9-4.4 4.8s1.8 4.8 4.5 4.8c1.9 0 3.3-.9 3.8-2.3h-3.8v-2.2h6.2c.1.4.1.8.1 1.2 0 3.8-2.6 5.8-6.3 5.8-4 0-7.1-3-7.1-7.3s3.1-7.3 7.1-7.3c2.2 0 3.9.8 4.9 1.9l-1.7 1.7c-.8-.8-1.9-1.2-3.3-1.2z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function TrustpilotIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4.5" fill="#00B67A" />
      <path
        d="M12 4.5l2.3 7.1h7.4l-6 4.4 2.3 7.1-6-4.4-6 4.4 2.3-7.1-6-4.4h7.4z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export default function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const total = TESTIMONIALS.length;
  // Display 3 cards at a time in a row
  const visibleCards = [
    TESTIMONIALS[startIndex % total],
    TESTIMONIALS[(startIndex + 1) % total],
    TESTIMONIALS[(startIndex + 2) % total],
  ];

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleNext = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Touch swipe support for mobile
  const minSwipeDistance = 45;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) handleNext();
    if (distance < -minSwipeDistance) handlePrev();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section
      id="testimonials"
      className="relative w-full bg-black text-white py-10 sm:py-12 lg:py-14 px-6 sm:px-8 lg:px-12 select-none border-t border-white/5 scroll-mt-10 overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#d4af65]/[0.02] blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 sm:mb-10">
          <div className="max-w-3xl">
            {/* Tagline / Eyebrow */}
            <div className="flex items-center gap-2 mb-3 sm:mb-3.5">
              <span className="w-2 h-2 rotate-45 bg-[#ae7b13] inline-block" />
              <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#ae7b13]">
                CLIENT VOICES
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="font-canela text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] tracking-tight text-white font-light leading-[1.12] mb-4 sm:mb-5">
              Built on trust.
              <br />
              Remembered for the experience.
            </h2>

            {/* Subtitle / Description */}
            <p className="text-neutral-400 text-sm sm:text-base md:text-[16.5px] font-light leading-relaxed max-w-2xl">
              Every person quoted here has agreed to speak to prospective UNICO clients. Just ask and we will make the introduction.
            </p>
          </div>

          {/* Navigation Controls: Arrows (Desktop & Tablet) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonials"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-none bg-black border border-white/15 hover:border-white/30 hover:bg-white/[0.05] transition-all flex items-center justify-center text-white shadow-sm cursor-pointer active:scale-95 group"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2] group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next testimonials"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-none bg-black border border-white/15 hover:border-white/30 hover:bg-white/[0.05] transition-all flex items-center justify-center text-white shadow-sm cursor-pointer active:scale-95 group"
            >
              <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Testimonials Cards: 1 card on Mobile, 2 on Tablet, 3 on Desktop */}
        <div
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch"
        >
          {visibleCards.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className={`rounded-none bg-black border border-white/10 p-7 sm:p-8 flex-col justify-between transition-all duration-300 hover:border-white/25 hover:shadow-[0_15px_40px_rgba(0,0,0,0.85)] min-h-[380px] ${
                idx === 0
                  ? "flex"
                  : idx === 1
                  ? "hidden md:flex"
                  : "hidden lg:flex"
              }`}
            >
              <div>
                {/* 5 Gold Star Rating at Top of Card */}
                <div className="flex items-center gap-1.5 text-[#caa156] mb-5 sm:mb-6">
                  {[...Array(item.stars || 5)].map((_, starIdx) => (
                    <svg
                      key={starIdx}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Quote Statement */}
                <p className="text-[15px] sm:text-[16px] text-neutral-100 font-normal leading-[1.68] tracking-normal mb-8">
                  {item.quote}
                </p>
              </div>

              {/* Bottom Author Section with Glowing Circular Avatar */}
              <div className="flex items-center gap-4 mt-auto pt-4">
                <div
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-full overflow-hidden ${
                    item.hasRing
                      ? "drop-shadow-[0_0_12px_rgba(202,161,86,0.5)]"
                      : "ring-2 ring-[#caa156] shadow-[0_0_14px_rgba(202,161,86,0.4)]"
                  }`}
                >
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    fill
                    quality={95}
                    className="object-cover object-center"
                    sizes="64px"
                  />
                </div>

                <div className="min-w-0">
                  <div className="font-bold text-white text-[16px] sm:text-[17px] tracking-tight leading-snug truncate">
                    {item.author}
                  </div>
                  <div className="text-[12.5px] sm:text-[13px] text-[#caa156] font-medium mt-1 leading-snug">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Controls: Horizontally Centered Under Cards */}
        <div className="flex md:hidden items-center justify-center gap-3.5 mt-6">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-11 h-11 rounded-none bg-black border border-white/15 hover:border-white/30 hover:bg-white/[0.05] transition-all flex items-center justify-center text-white shadow-sm cursor-pointer active:scale-95 group"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2] group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-11 h-11 rounded-none bg-black border border-white/15 hover:border-white/30 hover:bg-white/[0.05] transition-all flex items-center justify-center text-white shadow-sm cursor-pointer active:scale-95 group"
          >
            <ArrowRight className="w-4 h-4 stroke-[2] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-4">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setStartIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === startIndex % total
                  ? "w-6 bg-[#caa156]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
