"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function MetricsSection() {
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // Detect when user reaches this section on scroll or direct navigation
  useEffect(() => {
    const handleScrollOrReach = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Section is reaching or visible in the viewport
      const isReaching = rect.top < window.innerHeight * 0.75 && rect.bottom > 80;

      if (isReaching) {
        setIsInView(true);
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        }
      } else {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    window.addEventListener("scroll", handleScrollOrReach, { passive: true });
    // Check immediately on mount in case user landed on #metrics or refreshed
    handleScrollOrReach();

    return () => {
      window.removeEventListener("scroll", handleScrollOrReach);
    };
  }, []);

  // Handle play/pause toggle in place
  const togglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Handle mute/unmute toggle in place
  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const metrics = [
    {
      value: "1M+",
      label: "SQUARE FEET BUILT",
      desc: "Homes, schools, hospitals, resorts and factories across India.",
    },
    {
      value: "40+",
      label: "YEARS IN INDIA",
      desc: "Building since 1985, trusted across generations.",
    },
    {
      value: "5",
      label: "TYPES OF BUILDINGS",
      desc: "Residential, resorts, healthcare, commercial and industrial.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="metrics"
      className="w-full bg-[#090c10] text-white py-16 sm:py-20 lg:py-24 px-6 sm:px-8 lg:px-12 select-none border-t border-b border-white/10 overflow-hidden"
    >
      {/* Pop-Up Effect Keyframes: Card pops up into view with scale and elevation when reaching the section */}
      <style>{`
        @keyframes cardPopUpEntrance {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(36px);
            box-shadow: 0 0 0 rgba(174, 123, 19, 0);
          }
          65% {
            opacity: 1;
            transform: scale(1.03) translateY(-4px);
            box-shadow: 0 20px 45px rgba(174, 123, 19, 0.4);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85);
          }
        }

        .animate-card-popup {
          animation: cardPopUpEntrance 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-[1440px] mx-auto">
        {/* 50% Video + 50% Content & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Column 1: 50% Video Card - Plays in place with Pop-up Entrance Effect */}
          <div className="lg:col-span-6 flex items-center">
            <div
              onClick={togglePlay}
              className={`relative group overflow-hidden bg-neutral-900 aspect-[16/10] w-full shadow-2xl border border-white/15 cursor-pointer transition-all duration-500 hover:border-white/35 ${
                isInView ? "animate-card-popup" : "opacity-0 scale-90"
              }`}
            >
              {/* High-Definition Video Playing in Place */}
              <video
                ref={videoRef}
                src="/video/updated_UNICO.mp4"
                poster="/images/video-poster.jpg"
                playsInline
                loop
                muted={isMuted}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />


              {/* Center Play Overlay when paused */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300 pointer-events-none">
                  <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    <Play size={24} fill="white" className="ml-1 text-white" />
                  </div>
                </div>
              )}

              {/* In-Place Bottom Video Controls */}
              <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-2">
                  {/* Play / Pause Toggle Button */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-2 rounded bg-black/70 backdrop-blur-md text-white hover:bg-black/90 border border-white/20 transition-all cursor-pointer shadow-lg"
                    aria-label={isPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} fill="white" />}
                  </button>

                  {/* Sound Toggle (Mute / Unmute) Button */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/70 backdrop-blur-md text-white hover:bg-black/90 border border-white/20 transition-all cursor-pointer shadow-lg text-[11px] font-medium"
                    aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    <span className="hidden sm:inline text-[10px] uppercase tracking-wider font-semibold">
                      {isMuted ? "Unmute" : "Sound On"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: 50% Stats Container with Title on Top and Stats on Bottom */}
          <div
            className={`lg:col-span-6 flex flex-col justify-between py-1 lg:pl-2 transition-all duration-1000 delay-200 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Top Part: Title & Tag placed right above stats */}
            <div className="mb-8 lg:mb-10">
              <div className="flex items-center gap-2 mb-3 sm:mb-3.5">
                <span className="w-2 h-2 rotate-45 bg-[#bf900e] inline-block"></span>
                <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#bf900e]">
                  CONSTRUCTION METRICS
                </span>
              </div>
              <h2 className="font-canela text-2xl sm:text-3xl lg:text-[2.6rem] font-light tracking-tight leading-[1.18] text-white max-w-xl">
                Building and developing across India since 1985.
              </h2>
            </div>

            {/* Bottom Part: 3 Metrics Columns with Vertical Dividers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 items-stretch pt-6 border-t border-white/10 lg:border-t-0">
              {metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col justify-start ${
                    idx === 0
                      ? "sm:pr-5 lg:pr-6 sm:pl-0"
                      : idx === metrics.length - 1
                      ? "sm:pl-5 lg:pl-6 sm:pr-0"
                      : "sm:px-5 lg:px-6"
                  } ${
                    idx < metrics.length - 1
                      ? "sm:border-r border-white/10"
                      : ""
                  }`}
                >
                  <div>
                    <span
                      className="font-light text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] tracking-tight leading-none block font-canela w-fit bg-clip-text text-transparent"
                      style={{
                        backgroundImage: "linear-gradient(135deg, #FCEDBA 0%, #E5C985 45%, #D5B26C 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {metric.value}
                    </span>
                    <span className="text-[11px] sm:text-[11.5px] font-bold tracking-[0.16em] uppercase text-neutral-300 mt-3 sm:mt-4 block">
                      {metric.label}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2 sm:mt-2.5 font-normal leading-relaxed">
                    {metric.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
