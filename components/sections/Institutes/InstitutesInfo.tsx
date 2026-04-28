"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InstitutesInfo() {
  const [activeCard, setActiveCard] = useState<"phone" | "clinic" | "doctors">("clinic");

  const cardBase = "p-5 rounded-2xl transition-all duration-300 cursor-pointer";
  const activeStyle = "bg-blue-600 text-white shadow-xl shadow-blue-600/25";
  const inactiveStyle = "bg-white border border-gray-100 shadow-md";

  return (
    <section className="py-16 bg-white section-divider">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">Cleveland Clinic</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-6">
                More information about Cleveland Clinic
              </h2>
            </div>

            <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl flex flex-wrap gap-8">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Appointments</p>
                <a href="tel:8663204573" className="text-lg font-bold text-blue-600 hover:underline">866.320.4573</a>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Questions</p>
                <a href="tel:2164442200" className="text-lg font-bold text-blue-600 hover:underline">216.444.2200</a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/appointments" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20">
                Book Appointment
              </Link>
              <a href="tel:2164442200" className="border border-gray-200 hover:border-blue-200 text-gray-700 hover:text-blue-600 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                Contact Us
              </a>
            </div>
          </motion.div>

          {/* Right — stacked clickable cards */}
          <div className="flex flex-col gap-4">

            {/* Card 1: Phone Directory */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => setActiveCard("phone")}
              className={`${cardBase} ${activeCard === "phone" ? activeStyle : inactiveStyle}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${activeCard === "phone" ? "bg-white/20" : "bg-blue-50"}`}>
                  <Phone className={`w-4 h-4 ${activeCard === "phone" ? "text-white" : "text-blue-600"}`} />
                </div>
                <h3 className={`text-sm font-bold ${activeCard === "phone" ? "text-white" : "text-gray-900"}`}>Phone Directory</h3>
              </div>
              <p className={`text-xs leading-relaxed ${activeCard === "phone" ? "text-blue-100" : "text-gray-500"}`}>
                Find important access and frequently called numbers across our entire network.
              </p>
            </motion.div>

            {/* Card 2: Getting to clinic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => setActiveCard("clinic")}
              className={`${cardBase} ${activeCard === "clinic" ? activeStyle : inactiveStyle}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${activeCard === "clinic" ? "bg-white/20" : "bg-blue-50"}`}>
                  <MapPin className={`w-4 h-4 ${activeCard === "clinic" ? "text-white" : "text-blue-600"}`} />
                </div>
                <h3 className={`text-sm font-bold italic ${activeCard === "clinic" ? "text-white" : "text-gray-900"}`}>Getting to clinic</h3>
              </div>
              <p className={`text-xs leading-relaxed mb-3 ${activeCard === "clinic" ? "text-blue-100" : "text-gray-500"}`}>
                Access interactive maps, driving directions and campus parking information.
              </p>
              <a href="#" className={`inline-flex items-center gap-1.5 text-xs font-bold hover:translate-x-1 transition-transform ${activeCard === "clinic" ? "text-white" : "text-blue-600"}`}>
                Get directions <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Card 3: Our Doctors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => setActiveCard("doctors")}
              className={`${cardBase} ${activeCard === "doctors" ? activeStyle : inactiveStyle}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${activeCard === "doctors" ? "bg-white/20" : "bg-blue-50"}`}>
                  <Users className={`w-4 h-4 ${activeCard === "doctors" ? "text-white" : "text-blue-600"}`} />
                </div>
                <h3 className={`text-sm font-bold ${activeCard === "doctors" ? "text-white" : "text-gray-900"}`}>Our Doctors</h3>
              </div>
              <p className={`text-xs leading-relaxed mb-3 ${activeCard === "doctors" ? "text-blue-100" : "text-gray-500"}`}>
                Our find a doctor tool assists you in choosing from our diverse pool of health specialists.
              </p>
              <Link
                href="/find-doctor"
                onClick={(e) => e.stopPropagation()}
                className={`inline-flex items-center gap-1.5 text-xs font-bold hover:translate-x-1 transition-transform ${activeCard === "doctors" ? "text-white" : "text-blue-600"}`}
              >
                Find a doctor <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
