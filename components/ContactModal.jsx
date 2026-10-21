"use client";

import { useState } from "react";
import { X, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Villa Architectural Design",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-[#0c1017] border border-amber-500/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-6 sm:p-10 z-10 text-white rounded-none">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <CheckCircle2 size={56} className="text-amber-400 mb-4 animate-bounce" />
            <h3 className="font-canela text-3xl font-light text-white mb-2 uppercase tracking-wide">
              Inquiry Received
            </h3>
            <p className="text-sm text-neutral-300 max-w-sm font-light">
              Thank you for reaching out to UNICO. Our architectural director will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <span className="text-[11px] uppercase tracking-[0.25em] text-amber-400/90 font-medium block mb-1">
                Bespoke Architecture & Design
              </span>
              <h2 className="font-canela text-3xl sm:text-4xl font-light uppercase tracking-wide text-white">
                Get In Touch
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm mt-2 font-light">
                Begin a conversation about your residence, penthouse, or villa project.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Lord / Lady / Architect..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="architect@domain.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                  Project Scope
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                  className="w-full bg-[#111622] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors cursor-pointer"
                >
                  <option value="Villa Architectural Design">
                    Mediterranean Villa Architecture
                  </option>
                  <option value="Penthouse Modern Interior">
                    Modern Penthouse Interior
                  </option>
                  <option value="Private Estate Masterplan">
                    Private Estate Masterplan
                  </option>
                  <option value="Commercial Hospitality">
                    Luxury Hospitality / Resort
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                  Vision / Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details about the site, location, square meters or timeline..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full group flex items-stretch cursor-pointer select-none rounded-[4px] overflow-hidden"
                >
                  <span className="flex-1 bg-[#bf900e] text-white text-[13px] font-bold tracking-[0.12em] uppercase py-3.5 flex items-center justify-center transition-all duration-300 group-hover:bg-[#ce9e16]">
                    Submit Private Inquiry
                  </span>
                  <span className="w-[1px] bg-white/25"></span>
                  <span className="bg-[#bf900e] text-white px-4 py-3.5 flex items-center justify-center transition-all duration-300 group-hover:bg-[#ce9e16]">
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
