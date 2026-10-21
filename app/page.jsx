"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MetricsSection from "@/components/MetricsSection";
import StorySection from "@/components/StorySection";
import ServicesSection from "@/components/ServicesSection";
import FeaturedDevelopments from "@/components/FeaturedDevelopments";
import DrawingToDoneSection from "@/components/DrawingToDoneSection";
import ProcessSection from "@/components/ProcessSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ClientLogosSection from "@/components/ClientLogosSection";
import QualitySection from "@/components/QualitySection";
import CtaSection from "@/components/CtaSection";
import ContactModal from "@/components/ContactModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#090c10] text-white selection:bg-[#d4af37]/30 selection:text-white">
      {/* Top Header */}
      <Header onOpenContact={() => setContactOpen(true)} />

      {/* Main Hero Section */}
      <Hero />

      {/* Construction Metrics & Video Section */}
      <MetricsSection />

      {/* Our Story: 'THE UNICO JOURNEY' (1985 to Today) */}
      <StorySection onOpenContact={() => setContactOpen(true)} />

      {/* Services Section with Vertical Scroll Cards: 'WHAT WE DO' */}
      <ServicesSection onOpenContact={() => setContactOpen(true)} />

      {/* Featured Developments: 'LANDMARK DEVELOPMENTS' with Expanding Cards */}
      <FeaturedDevelopments onOpenContact={() => setContactOpen(true)} />

      {/* Interactive Blueprint to Reality Comparison Slider: 'FROM DRAWING TO DONE' */}
      <DrawingToDoneSection />

      {/* Engineering Standards: 'HOW WE BUILD' */}
      <ProcessSection />

      {/* The Process Section: 'HOW WE WORK' */}
      <HowWeWorkSection />

      {/* Testimonials Section: 'CLIENT VOICES' */}
      <TestimonialsSection />

      {/* Client Logos & Institutional Partners Section: 'ESTEEMED CLIENTELE' */}
      <ClientLogosSection />

      {/* Quality Promise & Standards Section: 'QUALITY STANDARDS' */}
      <QualitySection />

      {/* CTA Section: 'YOUR NEXT ADDRESS STARTS HERE' */}
      <CtaSection onOpenContact={() => setContactOpen(true)} />

      {/* Interactive Contact Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      {/* Luxury Atelier Footer */}
      <Footer onOpenContact={() => setContactOpen(true)} />
    </main>
  );
}
