"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function InstitutesHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Cleveland Clinic</p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Institutes &amp; <span className="text-blue-600">Departments</span>
            </h1>
          </div>

          <p className="text-base text-gray-500 leading-relaxed max-w-lg">
            Comprehensive guide to all departments, institutes and services within Cleveland Clinic — from routine care to world-class specialty treatment.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/appointments" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20">
              Book Appointment
            </Link>
            <a href="tel:866.320.4573" className="border border-gray-200 hover:border-blue-200 text-gray-700 hover:text-blue-600 px-6 py-3 rounded-xl text-sm font-semibold transition-colors">
              Call 866.320.4573
            </a>
          </div>

          <div className="flex gap-8 pt-2 border-t border-gray-100">
            <div>
              <p className="text-2xl font-bold text-gray-900">200+</p>
              <p className="text-xs text-gray-400 mt-0.5">Locations</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">6,500+</p>
              <p className="text-xs text-gray-400 mt-0.5">Physicians</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">100+</p>
              <p className="text-xs text-gray-400 mt-0.5">Specialties</p>
            </div>
          </div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]"
        >
          <img
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80"
            alt="Cleveland Clinic"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
