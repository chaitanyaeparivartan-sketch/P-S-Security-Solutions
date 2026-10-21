"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedDevelopments({ onOpenContact }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const developments = [
    {
      id: "school-building",
      category: "institutional",
      tag: "Institutional",
      title: "School Building",
      subtitle: "INSTITUTIONAL CAMPUS DEVELOPMENT",
      desc: "A flagship modern institutional campus development delivered turnkey in Hyderabad. Featuring specialized educational spaces, seismic structural reinforcement, acoustic privacy partitioning, and tested non-toxic environmental materials.",
      image: "/images/featured/school/sancta-maria-02.webp",
      alt: "School Building - Institutional Campus Development",
      gallery: [
        "/images/featured/school/sancta-maria-01.webp",
        "/images/featured/school/sancta-maria-02.webp",
        "/images/featured/school/sancta-maria-03.webp",
        "/images/featured/school/sancta-maria-04.webp",
        "/images/featured/school/sancta-maria-05.webp",
      ],
      details: {
        Client: "Sancta Maria",
        "Built-Up Area": "1,20,000 sq. ft.",
        Year: "2026",
        Role: "Turnkey EPC",
      },
    },
    {
      id: "tech-complex",
      category: "commercial",
      tag: "Commercial & Tech",
      title: "Commercial Complex",
      subtitle: "ENTERPRISE COMMERCIAL & TECH DEVELOPMENT",
      desc: "A multi-tower landmark commercial and tech park featuring modern architectural block facades, integrated sky bridges, landscaped central courtyards, and open-air recreational decks.",
      image: "/images/featured/tech/complex-commercials-1.webp",
      alt: "Commercial Complex - Enterprise Commercial & Tech Development",
      gallery: [
        "/images/featured/tech/complex-commercials-1.webp",
        "/images/featured/tech/complex-commercials-2.webp",
        "/images/featured/tech/complex-commercials-3.webp",
      ],
      details: {
        Client: "Enterprise Commercial & Tech Park",
        "Built-Up Area": "85,000 sq. ft.",
        Location: "Hyderabad",
        Year: "2025",
        Role: "Turnkey Commercial EPC",
      },
    },
    {
      id: "tech-park",
      category: "commercial",
      tag: "Commercial & Tech",
      title: "Tech Park",
      subtitle: "ENTERPRISE TECH CAMPUS & COURTYARD",
      desc: "A flagship commercial and enterprise tech campus featuring lush landscaped podium terraces, central courtyard atriums, geometric water elements, and interconnected high-rise towers.",
      image: "/images/tech/complex-commercials-3.webp",
      alt: "Tech Park - Enterprise Tech Campus & Courtyard",
      gallery: [
        "/images/tech/complex-commercials-3.webp",
        "/images/tech/complex-commercials-2.webp",
      ],
      details: {
        Client: "Enterprise Commercial & Tech Park",
        "Built-Up Area": "95,000 sq. ft.",
        Location: "Hyderabad",
        Year: "2025",
        Role: "Turnkey Commercial EPC",
      },
    },
    {
      id: "industrial",
      category: "industrial",
      tag: "Cleanroom",
      title: "Industrial",
      subtitle: "MEDICAL DEVICE FACILITY",
      desc: "A high-precision ISO-certified medical equipment assembly plant for B&A Health. Incorporates clinical-grade seamless antimicrobial epoxy flooring, multi-stage HEPA air filtration systems, and vibration-damped foundation slabs.",
      image: "/images/featured/industrial/ba-frame-5.webp",
      alt: "Industrial - Medical Device Facility",
      gallery: [
        "/images/featured/industrial/ba-frame-5.webp",
        "/images/featured/industrial/ba-frame-1.webp",
        "/images/featured/industrial/ba-frame-2.webp",
        "/images/featured/industrial/ba-frame-6.webp",
      ],
      details: {
        Client: "B&A Health",
        "Built-Up Area": "10,000 sq. ft.",
        Location: "Hyderabad",
        Role: "Cleanroom Contractor",
      },
    },
    {
      id: "luxury-villa",
      category: "residential",
      tag: "Residential",
      title: "Luxury Villa",
      subtitle: "CUSTOM-ENGINEERED LUXURY RESIDENCE",
      desc: "An ultra-premium private estate engineering feat featuring dramatic pitched tiled roofs, low-E solar control glazing, integrated multi-zone climate automation, natural stone patios, and bespoke architectural woodwork.",
      image: "/images/featured/villa/villa-01.webp",
      alt: "Luxury Villa - Custom-Engineered Luxury Residence",
      gallery: [
        "/images/featured/villa/villa-01.webp",
        "/images/featured/villa/villa-02.webp",
      ],
      details: {
        "Built-Up Area": "25,000 sq. ft.",
        Location: "Western Hills",
        Year: "2025",
        Role: "Turnkey Builder",
      },
    },
    {
      id: "retail-complex",
      category: "commercial",
      tag: "Retail",
      title: "Retail Complex",
      subtitle: "HIGH-STREET RETAIL PROMENADE",
      desc: "A prime multi-tenant commercial arcade engineering marvel featuring seamless spider-glass curtain walls, subterranean multi-level vehicle parking, and high-efficiency central VRF cooling infrastructure.",
      image: "/images/featured/retail/prime-retail1.webp",
      alt: "Retail Complex - High-Street Retail Promenade",
      gallery: [
        "/images/featured/retail/prime-retail1.webp",
        "/images/featured/retail/prime-retail3.webp",
        "/images/featured/retail/prime-retail-reality.webp",
      ],
      details: {
        Tenant: "Aditya Birla",
        Year: "2023",
        Location: "Hyderabad",
        Role: "Facade & Civil EPC",
      },
    },
    {
      id: "hospitality",
      category: "residential",
      tag: "Hospitality",
      title: "Hospitality",
      subtitle: "LUXURY BEACHFRONT VILLAS & DINING",
      desc: "A beachfront hospitality destination comprising private timber cottages and an open-air coastal restaurant deck. Crafted with marine-grade weather-resistant finishes, custom teak woodwork, and climate-resilient insulation designed to endure severe tropical conditions.",
      image: "/images/featured/hospitality/project-legala-01.webp",
      alt: "Hospitality - Luxury Beachfront Villas & Dining",
      gallery: [
        "/images/featured/hospitality/project-legala-01.webp",
        "/images/featured/hospitality/project-legala-02.webp",
        "/images/featured/hospitality/project-legala-03.webp",
        "/images/featured/hospitality/project-legala-04.webp",
      ],
      details: {
        Client: "Legala Coastal Resort",
        Location: "South Goa",
        "Built-Up Area": "45,000 sq. ft.",
        Year: "2025",
        Role: "Turnkey Handover",
      },
    },
  ];

  const handleOpenPreview = (project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  const handleClosePreview = () => {
    setSelectedProject(null);
    setActiveImageIndex(0);
  };

  const handleNextImage = useCallback(() => {
    if (!selectedProject?.gallery) return;
    setActiveImageIndex((prev) => (prev + 1) % selectedProject.gallery.length);
  }, [selectedProject]);

  const handlePrevImage = useCallback(() => {
    if (!selectedProject?.gallery) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
    );
  }, [selectedProject]);

  // Lock background scroll when preview modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  // Keyboard navigation for image preview modal
  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClosePreview();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, handleNextImage, handlePrevImage]);

  return (
    <section
      id="projects"
      className="w-full bg-[#090c10] text-white pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-12 lg:pb-14 px-6 sm:px-8 lg:px-12 select-none border-t border-white/10"
    >
      <span id="developments" className="absolute -top-24 left-0 pointer-events-none opacity-0" />
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 lg:mb-14">
          <div className="flex items-center gap-2 mb-3 sm:mb-3.5">
            <span className="w-2 h-2 rotate-45 bg-[#bf900e] inline-block"></span>
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#bf900e]">
              FEATURED DEVELOPMENTS
            </span>
          </div>

          <h2 className="font-canela text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] tracking-tight text-white font-light leading-[1.12] mb-4 sm:mb-5">
            Landmark Developments
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-[16.5px] font-light leading-relaxed max-w-2xl">
            Explore our engineered landmarks across institutional, cleanroom, hospitality, and custom residential developments.
          </p>
        </div>

        {/* Landmark Developments Cards Grid */}
        <div className="w-full space-y-5 sm:space-y-6">
          {/* Row 1: First 3 Featured Developments */}
          {(() => {
            const row1 = developments.slice(0, 3);
            const isRowHovered = row1.some((item) => item.id === hoveredId);

            return (
              <div className="flex flex-col md:flex-row gap-5 sm:gap-6 items-stretch w-full min-h-[440px] sm:min-h-[480px] lg:min-h-[510px]">
                {row1.map((item, idx) => {
                  const isHovered = hoveredId === item.id;

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => {
                        if (hoveredId === item.id) {
                          handleOpenPreview(item);
                        } else {
                          setHoveredId(item.id);
                        }
                      }}
                      className={`relative h-[420px] sm:h-[460px] lg:h-[510px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group border border-white/10 ${
                        isHovered
                          ? "md:flex-[2.6] shadow-[0_20px_60px_rgba(0,0,0,0.85)] border-white/30"
                          : isRowHovered
                          ? "md:flex-[0.8] opacity-75 md:opacity-85 hover:opacity-100"
                          : "md:flex-1"
                      }`}
                    >
                      {/* Background Image with Zoom on Hover */}
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={idx === 0}
                        className={`object-cover object-center transition-transform duration-700 ease-out ${
                          isHovered ? "scale-105" : "scale-100"
                        }`}
                      />

                      {/* Dark Gradient Overlay for optimal contrast */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/25 to-black/90 pointer-events-none" />

                      {/* Card Top: Title Only */}
                      <div className="absolute top-6 left-6 right-6 sm:top-8 sm:left-8 sm:right-8 z-10">
                        <h3 className="font-sans text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight leading-[1.18] max-w-sm drop-shadow-md">
                          {item.title}
                        </h3>
                      </div>

                      {/* Card Bottom: Header Style Split CTA Button - Appears only on hover on lg/xl */}
                      <div
                        className={`absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10 transition-all duration-300 ease-out ${
                          isHovered
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-100 sm:opacity-100 lg:opacity-0 lg:translate-y-3 lg:pointer-events-none"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenPreview(item);
                          }}
                          className="group/btn flex items-stretch cursor-pointer select-none rounded-[4px] overflow-hidden transition-transform duration-300 hover:scale-[1.03] shadow-2xl"
                          aria-label={`View More about ${item.title}`}
                        >
                          <span className="bg-[#bf900e] text-white text-[12px] sm:text-[12.5px] font-bold tracking-[0.12em] uppercase px-4 sm:px-5 py-2.5 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-[#ce9e16]">
                            View More
                          </span>
                          <span className="w-[1px] bg-white/25"></span>
                          <span className="bg-[#bf900e] text-white px-2.5 sm:px-3 py-2.5 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-[#ce9e16]">
                            <ArrowUpRight
                              size={15}
                              strokeWidth={2.2}
                              className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            />
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* Row 2: Remaining Developments (Revealed when showAll is true) */}
          {showAll &&
            (() => {
              const row2 = developments.slice(3);
              const isRowHovered = row2.some((item) => item.id === hoveredId);

              return (
                <div className="flex flex-col md:flex-row gap-5 sm:gap-6 items-stretch w-full min-h-[440px] sm:min-h-[480px] lg:min-h-[510px] animate-in fade-in duration-500">
                  {row2.map((item) => {
                    const isHovered = hoveredId === item.id;

                    return (
                      <div
                        key={item.id}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => {
                          if (hoveredId === item.id) {
                            handleOpenPreview(item);
                          } else {
                            setHoveredId(item.id);
                          }
                        }}
                        className={`relative h-[420px] sm:h-[460px] lg:h-[510px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group border border-white/10 ${
                          isHovered
                            ? "md:flex-[2.6] shadow-[0_20px_60px_rgba(0,0,0,0.85)] border-white/30"
                            : isRowHovered
                            ? "md:flex-[0.8] opacity-75 md:opacity-85 hover:opacity-100"
                            : "md:flex-1"
                        }`}
                      >
                        {/* Background Image with Zoom on Hover */}
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className={`object-cover object-center transition-transform duration-700 ease-out ${
                            isHovered ? "scale-105" : "scale-100"
                          }`}
                        />

                        {/* Dark Gradient Overlay for optimal contrast */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/25 to-black/90 pointer-events-none" />

                        {/* Card Top: Title Only */}
                        <div className="absolute top-6 left-6 right-6 sm:top-8 sm:left-8 sm:right-8 z-10">
                          <h3 className="font-sans text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight leading-[1.18] max-w-sm drop-shadow-md">
                            {item.title}
                          </h3>
                        </div>

                        {/* Card Bottom: Header Style Split CTA Button - Appears only on hover on lg/xl */}
                        <div
                          className={`absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10 transition-all duration-300 ease-out ${
                            isHovered
                              ? "opacity-100 translate-y-0 pointer-events-auto"
                              : "opacity-100 sm:opacity-100 lg:opacity-0 lg:translate-y-3 lg:pointer-events-none"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenPreview(item);
                            }}
                            className="group/btn flex items-stretch cursor-pointer select-none rounded-[4px] overflow-hidden transition-transform duration-300 hover:scale-[1.03] shadow-2xl"
                            aria-label={`View More about ${item.title}`}
                          >
                            <span className="bg-[#bf900e] text-white text-[12px] sm:text-[12.5px] font-bold tracking-[0.12em] uppercase px-4 sm:px-5 py-2.5 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-[#ce9e16]">
                              View More
                            </span>
                            <span className="w-[1px] bg-white/25"></span>
                            <span className="bg-[#bf900e] text-white px-2.5 sm:px-3 py-2.5 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-[#ce9e16]">
                              <ArrowUpRight
                                size={15}
                                strokeWidth={2.2}
                                className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                              />
                            </span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
        </div>

        {/* View All Button After the Cards */}
        <div className="mt-10 sm:mt-12 lg:mt-14 flex justify-center items-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="group/btn flex items-stretch cursor-pointer select-none rounded-[4px] overflow-hidden transition-transform duration-300 hover:scale-[1.02] shadow-2xl"
            aria-label={showAll ? "Show Fewer Projects" : "View All Projects"}
          >
            <span className="bg-[#bf900e] text-white text-[12px] sm:text-[12.5px] font-bold tracking-[0.12em] uppercase px-6 sm:px-8 py-3 sm:py-3.5 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-[#ce9e16]">
              {showAll ? "Show Less" : "View All"}
            </span>
            <span className="w-[1px] bg-white/25"></span>
            <span className="bg-[#bf900e] text-white px-3 sm:px-3.5 py-3 sm:py-3.5 flex items-center justify-center transition-all duration-300 group-hover/btn:bg-[#ce9e16]">
              <ArrowUpRight
                size={16}
                strokeWidth={2.2}
                className={`transition-transform duration-300 ${
                  showAll ? "rotate-90" : "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Pop-up Image Preview Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300 select-none"
          onClick={handleClosePreview}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-6xl max-h-[94vh] bg-[#0c1017] border border-white/15 rounded-none shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Header Bar: Title, Subtitle, Spec Chips & Close Button (NOT overlaying the image) */}
            <div className="p-4 sm:p-5 md:px-7 md:py-4 bg-[#090c10] border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 shrink-0">
              {/* Title & Subtitle */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#bf900e]" />
                  <span className="text-[#caa156] font-bold text-[10px] sm:text-[11px] tracking-[0.16em] uppercase">
                    {selectedProject.subtitle}
                  </span>
                </div>
                <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight truncate">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Right Side: Info Spec Chips & Close Button */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {selectedProject.details &&
                  Object.entries(selectedProject.details).map(([label, value]) => (
                    <div
                      key={label}
                      className="bg-[#141820] border border-white/10 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-1.5 shadow-sm"
                    >
                      <span className="text-[#caa156] text-[9px] sm:text-[9.5px] font-bold tracking-[0.14em] uppercase block leading-none mb-0.5">
                        {label}
                      </span>
                      <span className="text-white text-xs sm:text-[12.5px] font-medium block leading-tight whitespace-nowrap">
                        {value}
                      </span>
                    </div>
                  ))}

                {/* Close Button Top Right */}
                <button
                  type="button"
                  onClick={handleClosePreview}
                  className="p-2 sm:p-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors duration-200 border border-white/10 ml-1 cursor-pointer"
                  aria-label="Close Preview"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Stage: 100% Clean Image Viewer without Any Text Overlay */}
            <div className="relative w-full flex-1 min-h-[380px] sm:min-h-[480px] md:min-h-[540px] lg:min-h-[580px] bg-black flex items-center justify-center overflow-hidden">
              {/* Full Image */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <Image
                  key={selectedProject.gallery[activeImageIndex]}
                  src={selectedProject.gallery[activeImageIndex]}
                  alt={`${selectedProject.title} preview ${activeImageIndex + 1}`}
                  fill
                  priority
                  className="object-contain object-center transition-all duration-300"
                  sizes="(max-width: 1400px) 100vw, 1400px"
                />
              )}

              {/* Previous Button */}
              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/60 hover:bg-[#bf900e] text-white border border-white/20 transition-all duration-200 backdrop-blur-md shadow-2xl group cursor-pointer z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft
                    size={22}
                    className="transition-transform group-hover:-translate-x-0.5"
                  />
                </button>
              )}

              {/* Next Button */}
              {selectedProject.gallery && selectedProject.gallery.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/60 hover:bg-[#bf900e] text-white border border-white/20 transition-all duration-200 backdrop-blur-md shadow-2xl group cursor-pointer z-10"
                  aria-label="Next image"
                >
                  <ChevronRight
                    size={22}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>
              )}

              {/* Image Counter Badge */}
              {selectedProject.gallery && (
                <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-white text-[11px] sm:text-xs font-mono font-medium tracking-wider px-3 py-1.5 border border-white/15 z-10">
                  {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                  {String(selectedProject.gallery.length).padStart(2, "0")}
                </div>
              )}
            </div>

            {/* Bottom Bar: Thumbnails Strip */}
            <div className="px-5 sm:px-8 py-4 bg-[#090c10] border-t border-white/10 flex items-center justify-center">
              {/* Thumbnails row */}
              <div className="flex items-center justify-center gap-2.5 overflow-x-auto max-w-full pb-1 no-scrollbar">
                {selectedProject.gallery &&
                  selectedProject.gallery.map((imgSrc, imgIdx) => (
                    <button
                      key={imgSrc}
                      type="button"
                      onClick={() => setActiveImageIndex(imgIdx)}
                      className={`relative w-16 h-12 sm:w-20 sm:h-14 shrink-0 overflow-hidden transition-all duration-200 border cursor-pointer ${
                        activeImageIndex === imgIdx
                          ? "border-[#bf900e] ring-2 ring-[#bf900e]/60 scale-105"
                          : "border-white/15 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={imgSrc}
                        alt={`Thumbnail ${imgIdx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
