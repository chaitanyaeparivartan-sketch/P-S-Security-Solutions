"use client";

import Image from "next/image";
import { PhoneCall, FileDown } from "lucide-react";

export default function CtaSection({ onOpenContact }) {
  return (
    <section id="cta" className="relative w-full min-h-[560px] sm:min-h-[620px] lg:min-h-[680px] flex items-center justify-center overflow-hidden select-none border-t border-white/5 scroll-mt-20">
      {/* Background Architectural Image */}
      {/* Background Architectural Image - Clean, bright, and vibrant */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/Tropical Bungalow Garden Walkway.png"
          alt="Tropical Bungalow Garden Walkway"
          fill
          priority
          quality={95}
          className="object-cover object-center filter brightness-[0.92] contrast-[1.02]"
          sizes="100vw"
        />
      </div>

      {/* Gentle Edge Blends & Soft Scrim to ensure the background is clearly visible while text is crisp */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090c10]/75 via-transparent to-[#090c10]/85 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.15)_60%,transparent_100%)] pointer-events-none" />

      {/* Center Call To Action Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center py-20 sm:py-24 lg:py-28">
        {/* Tag: ■ LET'S TALK */}
        <div className="flex items-center justify-center gap-2.5 mb-5 sm:mb-6">
          <span className="w-2 h-2 rotate-45 bg-[#ae7b13] inline-block"></span>
          <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.24em] uppercase text-[#ae7b13]">
            LET&apos;S TALK
          </span>
        </div>

        {/* Main Headline */}
        <h2 className="font-canela text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] text-white font-normal tracking-tight leading-[1.14] mb-6 sm:mb-7 text-center max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.75)]">
          Tell us what you want to build.
          <br className="hidden sm:inline" />
          <span className="text-white"> We will tell you honestly if we can help.</span>
        </h2>

        {/* Description Paragraph */}
        <p className="text-white/95 text-sm sm:text-base md:text-[16.5px] font-normal leading-relaxed max-w-3xl text-center mb-10 sm:mb-12 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          A quick call or a site visit — that is all it takes to get started. No long presentations, no obligation. Whether you are planning a new home, expanding a school, developing a piece of land, or building a factory — just get in touch and we will take it from there.
        </p>

        {/* 3 Action Split Buttons with Distinct Relevant Colors and Specific Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 w-full max-w-4xl flex-wrap">
          {/* 1. Request a call back: Crisp White UI with Phone Icon */}
          <button
            onClick={onOpenContact}
            className="group flex items-stretch cursor-pointer select-none transition-all duration-300 hover:scale-[1.02] shadow-xl rounded-[4px] overflow-hidden"
            aria-label="Request a call back"
          >
            <span className="bg-[#bf900e] text-white text-[13px] font-bold tracking-[0.12em] uppercase px-5 py-3 flex items-center justify-center transition-all duration-300 group-hover:bg-[#ce9e16]">
              Request a call back
            </span>
            <span className="w-[1px] bg-white/25"></span>
            <span className="bg-[#bf900e] text-white px-3.5 py-3 flex items-center justify-center transition-all duration-300 group-hover:bg-[#ce9e16]">
              <PhoneCall
                size={16}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </span>
          </button>

          {/* 2. Download our project portfolio: UNICO Architectural Gold with Download/FileDown Icon */}
          <a
            href="https://unico-spaces.unicodev.workers.dev/UNICO_Company_Profile.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-stretch cursor-pointer select-none transition-all duration-300 hover:scale-[1.02] shadow-xl rounded-[2px] overflow-hidden"
            aria-label="Download our project portfolio"
          >
            <span className="bg-[#ae7b13] text-white text-[13px] font-medium tracking-[0.06em] px-5 py-3 flex items-center justify-center transition-all duration-300 group-hover:bg-[#976a10]">
              Download our project portfolio
            </span>
            <span className="w-[1px] bg-white/25"></span>
            <span className="bg-[#ae7b13] text-white px-3.5 py-3 flex items-center justify-center transition-all duration-300 group-hover:bg-[#976a10]">
              <FileDown
                size={17}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </span>
          </a>

          {/* 3. WhatsApp us now: Official WhatsApp Green with WhatsApp Icon */}
          <a
            href="https://wa.me/919876543210?text=Hi%20UNICO%20team%2C%20I%20would%20like%20to%20discuss%20a%20construction%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-stretch cursor-pointer select-none transition-all duration-300 hover:scale-[1.02] shadow-xl rounded-[2px] overflow-hidden"
            aria-label="WhatsApp us now"
          >
            <span className="bg-[#25D366] text-white text-[13px] font-semibold tracking-[0.06em] px-5 py-3 flex items-center justify-center transition-all duration-300 group-hover:bg-[#20ba59]">
              WhatsApp us now
            </span>
            <span className="w-[1px] bg-white/30"></span>
            <span className="bg-[#25D366] text-white px-3.5 py-3 flex items-center justify-center transition-all duration-300 group-hover:bg-[#20ba59]">
              <svg
                className="w-4 h-4 fill-white transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
