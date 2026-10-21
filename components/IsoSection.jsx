"use client";

function IsoBadge({ number }) {
  return (
    <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-8 group">
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

export default function IsoSection() {
  const standards = [
    {
      id: "9001",
      number: "9001",
      title: "Quality Management",
      desc: "Consistent, documented processes from groundbreaking to handover.",
    },
    {
      id: "14001",
      number: "14001",
      title: "Environmental Management",
      desc: "Responsible construction that respects people and the planet.",
    },
    {
      id: "45001",
      number: "45001",
      title: "Health & Safety",
      desc: "Safe sites and safe teams, with safety built into every stage of work.",
    },
  ];

  return (
    <section
      id="quality"
      className="w-full bg-[#090b0e] text-white py-20 sm:py-24 lg:py-28 px-6 sm:px-8 lg:px-12 select-none border-t border-white/5"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16 lg:mb-20">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rotate-45 bg-[#ae7b13] inline-block"></span>
            <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#ae7b13]">
              STANDARDS & ACCREDITATIONS
            </span>
          </div>

          <h2 className="font-canela text-3xl sm:text-5xl md:text-6xl lg:text-[3.8rem] tracking-tight text-white font-light leading-[1.12] mb-5">
            ISO Certified Excellence
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base md:text-[16.5px] font-light leading-relaxed max-w-2xl">
            Internationally recognised standards behind every site and handover.
          </p>
        </div>

        {/* 3-Column Grid with Vertical Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/10 md:divide-x md:divide-white/10">
          {standards.map((item, idx) => (
            <div
              key={item.id}
              className={`py-10 sm:py-12 md:py-14 flex flex-col items-start ${
                idx === 0
                  ? "md:pr-10 lg:pr-14"
                  : idx === 1
                  ? "md:px-10 lg:px-14 border-t border-white/10 md:border-t-0"
                  : "md:pl-10 lg:pl-14 border-t border-white/10 md:border-t-0"
              }`}
            >
              {/* Medallion Badge */}
              <IsoBadge number={item.number} />

              {/* Title */}
              <h3 className="font-sans text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-400 text-sm sm:text-[15px] font-light leading-relaxed max-w-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
