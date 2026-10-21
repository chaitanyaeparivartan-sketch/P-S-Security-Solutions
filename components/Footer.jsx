"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer({ onOpenContact }) {
  return (
    <footer className="relative bg-[#0d0907] text-white overflow-hidden select-none border-t border-white/10">
      {/* Background Brick Texture with Moody Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer-brick-bg.jpg"
          alt="Architectural Brick Background"
          fill
          className="object-cover object-center opacity-40 mix-blend-luminosity brightness-75 contrast-125"
          quality={90}
        />
        {/* Dark Vignette & Shading Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0705]/85 via-[#0a0705]/75 to-[#080504]/90" />
      </div>

      {/* Main Footer Container */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-12 sm:pb-14 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.4fr_1.1fr] gap-x-6 sm:gap-x-10 gap-y-10 sm:gap-y-12 lg:gap-14 pb-14 sm:pb-16 items-start">
          {/* Column 1: UNICO Logo & Tagline */}
          <div className="col-span-2 lg:col-span-1 order-1 lg:order-none flex flex-col items-center md:items-start justify-center md:justify-start w-full">
            <Link
              href="/"
              className="relative w-64 sm:w-72 lg:w-[335px] h-48 sm:h-56 lg:h-[250px] block group mx-auto md:mx-0"
            >
              <Image
                src="/images/unico-logo-cropped.png"
                alt="UNICO - Built for the life inside."
                fill
                className="object-contain object-center md:object-left-top transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 280px, 340px"
                priority
              />
            </Link>
          </div>

          {/* Column 2: NAVIGATION (Side-by-side with Social Links on Mobile) */}
          <div className="col-span-1 lg:col-span-1 order-2 lg:order-none">
            <h5 className="text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-[#caa156] mb-4 sm:mb-5">
              NAVIGATION
            </h5>
            <ul className="space-y-3 sm:space-y-3.5 text-[14px] sm:text-[15px] text-neutral-300 font-normal">
              <li>
                <a href="#projects" className="hover:text-white transition-colors duration-200">
                  Projects
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors duration-200">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors duration-200">
                  Our Work
                </a>
              </li>
              <li>
                <a href="#how-we-build" className="hover:text-white transition-colors duration-200">
                  How We Build
                </a>
              </li>
              <li>
                <a href="#clients" className="hover:text-white transition-colors duration-200">
                  Clients &amp; Partners
                </a>
              </li>
              <li>
                <a href="#quality" className="hover:text-white transition-colors duration-200">
                  Quality
                </a>
              </li>
              <li>
                <a
                  href="#cta"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("cta");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else window.location.hash = "#cta";
                  }}
                  className="hover:text-white transition-colors duration-200 cursor-pointer text-left inline-block"
                >
                  Start a Project
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: SOCIAL LINKS (Side-by-side with Navigation on Mobile) */}
          <div className="col-span-1 lg:col-span-1 order-3 lg:order-none">
            <h5 className="text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-[#caa156] mb-4 sm:mb-5">
              SOCIAL LINKS
            </h5>
            <div className="space-y-4">
              {/* Instagram */}
              <div>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-white hover:text-[#caa156] transition-colors duration-200 text-[14px] sm:text-[15px]"
                >
                  <span>Instagram</span>
                  <ArrowUpRight size={14} className="stroke-[2.2]" />
                </a>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-light mt-0.5">
                  Site photos and updates
                </p>
              </div>

              {/* LinkedIn */}
              <div>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-white hover:text-[#caa156] transition-colors duration-200 text-[14px] sm:text-[15px]"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight size={14} className="stroke-[2.2]" />
                </a>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-light mt-0.5">
                  Company news and team updates
                </p>
              </div>

              {/* YouTube */}
              <div>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-white hover:text-[#caa156] transition-colors duration-200 text-[14px] sm:text-[15px]"
                >
                  <span>YouTube</span>
                  <ArrowUpRight size={14} className="stroke-[2.2]" />
                </a>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-light mt-0.5">
                  Project walkthroughs
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: CONTACT (Full width below Nav & Socials on Mobile) */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1 order-4 lg:order-none lg:pl-6 xl:pl-8">
            <h5 className="text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-[#caa156] mb-4 sm:mb-5">
              CONTACT
            </h5>
            <div className="space-y-4 sm:space-y-5 text-[14px] text-neutral-300">
              {/* Office Address */}
              <div>
                <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#caa156] mb-1.5">
                  OFFICE ADDRESS
                </div>
                <p className="text-neutral-300 font-normal text-[13.5px] sm:text-[14px] leading-relaxed max-w-sm md:max-w-xs">
                  Level 2, Plot No:32, Doyens Township, Serilingampalli (M), Telangana 500019
                </p>
              </div>

              {/* Email */}
              <div>
                <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#caa156] mb-1.5">
                  EMAIL
                </div>
                <a
                  href="mailto:contact@unicospaces.com"
                  className="text-neutral-300 hover:text-white font-normal text-[13.5px] sm:text-[14px] transition-colors duration-200"
                >
                  contact@unicospaces.com
                </a>
              </div>

              {/* WhatsApp */}
              <div>
                <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#caa156] mb-1.5">
                  WHATSAPP
                </div>
                <a
                  href="https://wa.me/910000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white font-normal text-[13.5px] sm:text-[14px] transition-colors duration-200"
                >
                  +91 0000000000
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Notice */}
        <div className="pt-6 sm:pt-8 text-xs sm:text-[13px] text-neutral-400 font-light tracking-wide text-center">
          <p>
            Copyright 2026 UNICO Builders and Developers, Hyderabad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
