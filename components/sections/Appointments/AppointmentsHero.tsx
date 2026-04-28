"use client";

import { motion } from "framer-motion";
import Waves from "@/components/ui/animations/Waves";
import BlurReveal from "@/components/ui/animations/BlurReveal";

export default function AppointmentsHero() {
  return (
    <section className="relative bg-[#f8fafc] pt-16 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background Animation - Subtle Waves */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Waves
          lineColor="rgba(59, 130, 246, 0.2)"
          backgroundColor="transparent"
          waveSpeedX={0.01}
          waveSpeedY={0.005}
          waveAmpX={30}
          waveAmpY={15}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-12 mb-16">
          {/* Left Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:w-1/2"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] text-[#0f172a]">
              Make <br />
              <span className="text-blue-600 italic">Appointments</span>
            </h1>
          </motion.div>

          {/* Right Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="md:w-1/2"
          >
            <p className="text-xl md:text-2xl text-[#334155] leading-relaxed max-w-xl font-medium">
              At Cleveland Clinic, we're here when you need us most. That's why we're bringing you more ways to get the care you need than ever before.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="bg-[#0095ff] hover:bg-[#0081dd] text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                Request an Appointment
              </button>
              <button className="border-2 border-blue-100 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl text-lg font-bold transition-all active:scale-95">
                Schedule in MyChart
              </button>
            </div>
          </motion.div>
        </div>

        {/* Staggered Three-Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mb-32 relative z-10">
          {[
            {
              src: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80",
              alt: "Doctor consultation",
            },
            {
              src: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=800&q=80",
              alt: "Healthcare support team",
              offset: true,
            },
            {
              src: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&q=80",
              alt: "Doctor with patient",
            },
          ].map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] border-4 border-white ${img.offset ? "translate-y-12" : ""}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
