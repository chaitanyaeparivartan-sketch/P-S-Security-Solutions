"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const slides = [
    {
      src: "/images/Sunlit Tropical Villa Courtyard.png",
      alt: "Sunlit Tropical Villa Courtyard",
    },
    {
      src: "/images/Sunny Tropical Bungalow Pathway.png",
      alt: "Sunny Tropical Bungalow Pathway",
    },
  ];

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Scroll-driven text growth calculation:
  // Text starts at normal scale (1.0) and grows smoothly as user scrolls down
  const scrollProgress = Math.min(Math.max(scrollY / 450, 0), 1);
  const textScale = 1 + scrollProgress * 0.25;
  const trackingValue = (0.005 + scrollProgress * 0.01).toFixed(4);

  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEntranceComplete(true);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-end overflow-hidden select-none">
      {/* Page Load Growing Keyframe Animations */}
      <style>{`
        @keyframes heroTitleEntrance {
          0% {
            opacity: 0;
            transform: scale(0.8);
            letter-spacing: 0em;
            filter: drop-shadow(0 0 0px rgba(212, 175, 55, 0));
          }
          65% {
            transform: scale(1.06);
            letter-spacing: 0.015em;
            filter: drop-shadow(0 4px 28px rgba(212, 175, 55, 0.45));
          }
          100% {
            opacity: 1;
            transform: scale(1);
            letter-spacing: 0.005em;
            filter: drop-shadow(0 4px 24px rgba(0, 0, 0, 0.9));
          }
        }

        @keyframes heroSubEntrance {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(14px);
          }
          70% {
            transform: scale(1.02) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-hero-title {
          animation: heroTitleEntrance 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-hero-sub {
          animation: heroSubEntrance 1s cubic-bezier(0.16, 1, 0.3, 1) 0.32s forwards;
        }
      `}</style>

      {/* Background Architectural Carousel Images */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide
                ? "opacity-100 z-0"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={idx === 0}
              quality={95}
              className="object-cover object-center filter brightness-[0.95] contrast-[1.02]"
              sizes="100vw"
            />
          </div>
        ))}

        {/* Subtle Vignettes & Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-transparent h-[30%] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent top-[45%] pointer-events-none" />
      </div>

      {/* Bottom Centered Content Area with Page Load & Scroll Growing Effect */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-12 md:pb-8 lg:pb-10 -translate-y-4 sm:-translate-y-3 md:translate-y-0 flex flex-col items-center text-center">
        {/* Single-line Headline: BUILD FOR THE LIFE INSIDE with Page-Load + Scroll-Driven Growth */}
        <div
          className={`origin-center ${
            isMounted ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transition: "opacity 0.8s ease-out",
          }}
        >
          <h1
            className={`font-bricolage text-xl sm:text-2xl md:text-3xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold leading-tight text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] whitespace-nowrap mb-3 sm:mb-3.5 origin-center will-change-transform cursor-default select-none transition-[drop-shadow] duration-300 ${
              !entranceComplete && scrollY === 0 ? "animate-hero-title" : ""
            }`}
            style={
              entranceComplete || scrollY > 0
                ? {
                    transform: `scale(${textScale})`,
                    letterSpacing: `${trackingValue}em`,
                    transition: "transform 0.08s ease-out, letter-spacing 0.08s ease-out",
                  }
                : {}
            }
          >
            Build For The Life Inside
          </h1>
        </div>

        {/* Philosophy Paragraph with Growing Entrance */}
        <p className="max-w-xl text-white/85 text-[11px] sm:text-xs md:text-[13px] lg:text-[14px] font-light leading-relaxed tracking-wide drop-shadow-md cursor-default select-none animate-hero-sub opacity-0">
          Crafting timeless spaces where life unfolds effortlessly. From
          enduring foundations to purposeful design, every detail is shaped
          around how you truly live.
        </p>
      </div>

      {/* Bottom Right Corner Small Carousel Dots */}
      <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 right-6 sm:right-8 lg:right-12 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentSlide
                ? "w-2.5 h-2.5 bg-white ring-2 ring-white/40 shadow-sm"
                : "w-2 h-2 bg-white/40 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
