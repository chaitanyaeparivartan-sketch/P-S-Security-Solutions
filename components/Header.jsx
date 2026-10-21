"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Header({ onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const leftNavItems = [
    { label: "Projects", href: "#projects" },
    { label: "Our Story", href: "#story" },
    { label: "Our Work", href: "#work" },
  ];

  const rightNavItems = [
    { label: "How We Build", href: "#how-we-build" },
    { label: "Quality", href: "#quality" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Check if user is scrolled near bottom of page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 120
      ) {
        setActiveSection("#quality");
        return;
      }

      // Check sections from bottom to top to identify currently active section
      const scrollPosition = window.scrollY + 220;
      const sectionMap = [
        { id: "quality", nav: "#quality" },
        { id: "how-we-work", nav: "#how-we-build" },
        { id: "how-we-build", nav: "#how-we-build" },
        { id: "work", nav: "#work" },
        { id: "projects", nav: "#projects" },
        { id: "services", nav: "#work" },
        { id: "story", nav: "#story" },
      ];

      let current = "";
      for (const item of sectionMap) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            current = item.nav;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCta = (e) => {
    if (e?.preventDefault) e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById("cta");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "#cta";
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md py-3.5 border-b border-white/10 shadow-2xl"
          : "bg-gradient-to-b from-black/60 via-black/25 to-transparent py-5 sm:py-6"
      }`}
    >
      {/* Page Load Growing Animations */}
      <style>{`
        @keyframes navGrowIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
            letter-spacing: 0.06em;
          }
          65% {
            transform: scale(1.08);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            letter-spacing: 0.14em;
          }
        }

        @keyframes logoGrowIn {
          0% {
            opacity: 0;
            transform: scale(0.78);
            filter: drop-shadow(0 0 0px rgba(212, 175, 55, 0));
          }
          65% {
            transform: scale(1.08);
            filter: drop-shadow(0 0 28px rgba(212, 175, 55, 0.75));
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: drop-shadow(0 2px 12px rgba(212, 175, 55, 0.4));
          }
        }

        @keyframes ctaGrowIn {
          0% {
            opacity: 0;
            transform: scale(0.84);
          }
          65% {
            transform: scale(1.06);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-nav-grow {
          animation: navGrowIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .animate-logo-grow {
          animation: logoGrowIn 1s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .animate-cta-grow {
          animation: ctaGrowIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between">
        {/* Left Navigation (Projects, Our Story, Our Work) with Active Indicator (No Dot) */}
        <nav className="hidden xl:flex items-center space-x-9 text-[13px] tracking-[0.14em] uppercase font-medium">
          {leftNavItems.map((item, idx) => {
            const isActive = activeSection === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                style={{ animationDelay: `${idx * 120}ms` }}
                className={`relative py-1 transition-all duration-300 flex items-center group animate-nav-grow ${
                  isActive
                    ? "text-[#d4af37] font-semibold"
                    : "text-white/85 hover:text-white"
                }`}
              >
                <span
                  className={`inline-block transition-all duration-300 ease-out origin-center group-hover:scale-105 group-hover:tracking-[0.18em] ${
                    isActive
                      ? "text-[#d4af37]"
                      : "group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>

                {/* Solid Gold Underline on Active & Hover */}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#d4af37] transition-all duration-300 ${
                    isActive
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Center UNICO Logo with Page Load Growing Bloom */}
        <div className="flex items-center justify-center">
          <Link href="/" className="relative flex items-center group">
            <div
              style={{ animationDelay: "220ms" }}
              className="relative h-14 sm:h-16 md:h-15 w-38 sm:w-44 md:w-44 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 animate-logo-grow"
            >
              <Image
                src="/images/unico-logo-cropped.png"
                alt="UNICO Logo"
                fill
                priority
                className="object-contain filter drop-shadow-[0_2px_12px_rgba(212,175,55,0.4)]"
                sizes="(max-width: 768px) 180px, 180px"
              />
            </div>
          </Link>
        </div>

        {/* Right Navigation & CTA with Active Indicator (No Dot) */}
        <div className="hidden xl:flex items-center space-x-8">
          <nav className="flex items-center space-x-7 text-[13px] tracking-[0.14em] uppercase font-medium">
            {rightNavItems.map((item, idx) => {
              const isActive = activeSection === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{ animationDelay: `${380 + idx * 120}ms` }}
                  className={`relative py-1 transition-all duration-300 group flex items-center animate-nav-grow ${
                    isActive
                      ? "text-[#d4af37] font-semibold"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  <span
                    className={`inline-block transition-all duration-300 ease-out origin-center group-hover:scale-105 group-hover:tracking-[0.18em] ${
                      isActive
                        ? "text-[#d4af37]"
                        : "group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Solid Gold Underline on Active & Hover */}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-[#d4af37] transition-all duration-300 ${
                      isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Luxury Split CTA Button: 'START A PROJECT' Redirecting to #cta Section */}
          <a
            href="#cta"
            onClick={scrollToCta}
            style={{ animationDelay: "620ms" }}
            className="group flex items-stretch cursor-pointer select-none rounded-[4px] overflow-hidden transition-transform duration-300 hover:scale-[1.04] animate-cta-grow shadow-md hover:shadow-[0_4px_20px_rgba(191,144,14,0.4)]"
            aria-label="Start a Project"
          >
            <span className="bg-[#bf900e] text-white text-[12px] sm:text-[12.5px] font-bold uppercase tracking-[0.12em] px-5 py-2.5 flex items-center justify-center transition-all duration-300 group-hover:bg-[#ce9e16]">
              <span className="inline-block transition-all duration-300 group-hover:scale-105 group-hover:tracking-[0.16em]">
                START A PROJECT
              </span>
            </span>
            <span className="w-[1px] bg-white/25"></span>
            <span className="bg-[#bf900e] text-white px-3 py-2.5 flex items-center justify-center transition-all duration-300 group-hover:bg-[#ce9e16]">
              <ArrowUpRight
                size={16}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-125"
              />
            </span>
          </a>
        </div>

        {/* Medium screens layout (lg to xl) */}
        <div className="hidden lg:flex xl:hidden items-center space-x-5">
          <a
            href="#cta"
            onClick={scrollToCta}
            className="group flex items-stretch cursor-pointer select-none rounded-[4px] overflow-hidden transition-transform duration-300 hover:scale-[1.03] shadow-md"
            aria-label="Start a Project"
          >
            <span className="bg-[#bf900e] text-white text-xs font-bold tracking-wider uppercase px-4 py-2 transition-colors duration-300 group-hover:bg-[#ce9e16]">
              START A PROJECT
            </span>
            <span className="w-[1px] bg-white/25"></span>
            <span className="bg-[#bf900e] text-white px-2.5 py-2 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#ce9e16]">
              <ArrowUpRight size={14} />
            </span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#caa156] hover:text-[#e6c669] transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={28} strokeWidth={2.2} /> : <Menu size={28} strokeWidth={2.2} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-[#caa156] hover:text-[#e6c669] transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={34} strokeWidth={2.2} /> : <Menu size={34} strokeWidth={2.2} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with active state detection */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0c1016]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-4 text-sm uppercase tracking-[0.16em]">
            {[...leftNavItems, ...rightNavItems].map((item) => {
              const isActive = activeSection === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1.5 transition-all duration-300 group flex items-center justify-between border-b border-white/5 ${
                    isActive
                      ? "text-[#d4af37] font-semibold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  <span className="inline-block transition-transform duration-300 group-hover:scale-105 group-hover:tracking-[0.2em] origin-left">
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]" />
                  )}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-white/10">
              <a
                href="#cta"
                onClick={scrollToCta}
                className="w-full group flex items-stretch cursor-pointer select-none rounded-[4px] overflow-hidden shadow-md"
                aria-label="Start a Project"
              >
                <span className="flex-1 bg-[#bf900e] text-white px-5 py-3 font-bold tracking-wider text-xs uppercase flex items-center justify-center transition-colors group-hover:bg-[#ce9e16]">
                  START A PROJECT
                </span>
                <span className="w-[1px] bg-white/25"></span>
                <span className="bg-[#bf900e] text-white px-4 py-3 flex items-center justify-center transition-colors group-hover:bg-[#ce9e16]">
                  <ArrowUpRight size={16} />
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
