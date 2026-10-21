"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ServicesSection({ onOpenContact }) {
  const services = [
    {
      id: "01",
      title: "Villas",
      desc: "Bespoke private estates engineered as a harmonious dialogue between modern architecture, refined natural materials, and Mediterranean coastal living.",
      image: "/images/image.png",
      alt: "Luxury Modern Villas Architecture",
    },
    {
      id: "02",
      title: "Educational Institutions",
      desc: "Purpose-built campus architecture designed to inspire focus, community, and longevity through sustainable structural engineering and light-filled spaces.",
      image: "/images/image-2.png",
      alt: "Educational Institutions Architecture",
    },
    {
      id: "03",
      title: "Commercial Complex",
      desc: "High-performance commercial developments engineered for retail, enterprise, and civic vitality with enduring structural integrity.",
      image: "/images/image-3.png",
      alt: "Commercial Complex Architecture",
    },
  ];

  return (
    <section id="services" className="w-full bg-[#090b0e] text-white pt-8 sm:pt-10 lg:pt-12 pb-2 sm:pb-4 px-6 sm:px-8 lg:px-12 select-none border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        {/* Top Header Row with Reduced Heading Font Size */}
        <div className="mb-5 sm:mb-6">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-2 h-2 rotate-45 bg-[#bf900e] inline-block"></span>
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#bf900e]">
              SERVICES
            </span>
          </div>

          {/* Main Title - Reduced Font Size */}
          <h2 className="font-canela text-2xl sm:text-3xl md:text-4xl lg:text-[3.25rem] tracking-tight uppercase font-light text-white leading-tight">
            What We Do
          </h2>
        </div>

        {/* Thin Divider Line */}
        <div className="w-full border-t border-white/10 mb-5 sm:mb-6" />

        {/* Vertical Scroll Cards with Uniform Height and Complete Overlap Closure */}
        <div className="relative pb-0">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="sticky top-20 sm:top-24 lg:top-28 bg-[#090b0e] py-4 sm:py-6 lg:py-7 mb-0"
              style={{
                zIndex: idx + 1,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[460px] lg:min-h-[480px]">
                {/* Left: Architectural Image Card (Wider Width) */}
                <div className="lg:col-span-6 xl:col-span-6">
                  <div className="relative aspect-[16/11] w-full max-h-[460px] overflow-hidden bg-neutral-900 shadow-xl">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      priority={idx === 0}
                      quality={90}
                      className="object-cover object-center filter brightness-[0.96] contrast-[1.03] transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Right: Service Details & CTA without Service Number Tag */}
                <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center items-start lg:pl-10 xl:pl-14 py-2">
                  <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-light text-white mb-4 sm:mb-5 leading-[1.18] tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-neutral-300 text-sm sm:text-[15px] lg:text-base font-light leading-relaxed max-w-xl mb-7 sm:mb-8">
                    {service.desc}
                  </p>

                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("projects");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="border border-white/20 text-white bg-transparent hover:bg-[#bf900e] hover:border-[#bf900e] hover:text-white px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-[13px] font-medium uppercase tracking-[0.12em] transition-all duration-300 cursor-pointer shadow-sm inline-flex items-center gap-2 group/btn"
                  >
                    <span>View Our Services</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
