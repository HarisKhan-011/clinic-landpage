"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Stethoscope, MapPin, Calendar, ArrowRight, Star, Users, Award, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import WhyChoose from "@/components/sections/WhyChoose/WhyChoose";
import CareSection from "@/components/sections/CareSection/CareSection";
import FeedbackSection from "@/components/sections/FeedbackSection/FeedbackSection";
import HealthLibrary from "@/components/sections/HealthLibrary/HealthLibrary";

const stats = [
  { icon: Users, value: "6,500+", label: "Expert Providers" },
  { icon: Star, value: "4.9", label: "Patient Rating" },
  { icon: Award, value: "#1", label: "Ranked Hospital" },
  { icon: Clock, value: "24/7", label: "Care Available" },
];

const quickLinks = [
  { icon: Stethoscope, title: "Find a Doctor", desc: "Search by name, specialty, or location.", href: "/find-doctor", cta: "Search Doctors" },
  { icon: MapPin, title: "Our Locations", desc: "Find any of our 300+ locations nearby.", href: "/institutes", cta: "View Locations" },
  { icon: Calendar, title: "Appointments", desc: "Book in-person or virtual care today.", href: "/appointments", cta: "Book Now" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative bg-gradient-to-br from-slate-50 to-blue-50/30 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[length:24px_24px]" />

          <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center relative z-10">

            {/* Left */}
            <div className="space-y-6 max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  Ranked #1 Hospital in the Nation
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-gray-900 leading-[1.1] tracking-tight">
                  World-class care,{" "}
                  <span className="text-blue-600">close to home</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-gray-500 leading-relaxed"
              >
                Cleveland Clinic brings together the world's best physicians, researchers, and specialists — all focused on one thing: your health.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-wrap gap-3"
              >
                <Link
                  href="/appointments"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-semibold text-base transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/find-doctor"
                  className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-7 py-3.5 rounded-xl font-semibold text-base transition-all hover:border-blue-200"
                >
                  Find a Doctor
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100"
              >
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="text-center">
                    <Icon className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                    <p className="text-lg font-bold text-gray-900">{value}</p>
                    <p className="text-xs text-gray-400 leading-tight">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-blue-500/10 rounded-[2.5rem] blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/80 aspect-[5/4]">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=85"
                  alt="Doctor consulting patient"
                  className="w-full h-full object-cover"
                />
                {/* Floating badge */}
                <div className="absolute bottom-5 left-5 bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-green-600 text-lg">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Verified Excellence</p>
                    <p className="text-xs text-gray-400">98% Patient Satisfaction</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── QUICK LINKS ──────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 -mt-6 relative z-20 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-5"
          >
            {quickLinks.map(({ icon: Icon, title, desc, href, cta }) => (
              <Link
                key={title}
                href={href}
                className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all"
              >
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  {cta} <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </motion.div>
        </section>

        {/* ── WHY CHOOSE ───────────────────────────────────────── */}
        <div className="bg-white section-divider">
          <WhyChoose />
        </div>

        {/* ── CARE SERVICES ────────────────────────────────────── */}
        <div className="bg-[#f8fafc] section-divider">
          <CareSection />
        </div>

        {/* ── HEALTH LIBRARY ───────────────────────────────────── */}
        <div className="bg-white section-divider">
          <HealthLibrary />
        </div>

        {/* ── FEEDBACK ─────────────────────────────────────────── */}
        <div className="bg-[#f8fafc] section-divider">
          <FeedbackSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
