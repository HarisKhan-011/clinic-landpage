"use client";

import Header from "@/components/layout/Header/Header";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { motion } from "framer-motion";

export default function Visitors() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0f172a]">
      <Header />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#f8fafc] pt-16 pb-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-baseline justify-between gap-12 mb-16">
            {/* Left Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                Patients & visitors<br />
                <span className="text-[#0f172a] opacity-90 font-medium">why we love</span>
              </h1>
            </motion.div>

            {/* Right Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-1/2"
            >
              <p className="text-xl text-[#334155] leading-relaxed max-w-xl">
                We're here to assist you before, during and after your visit to Cleveland
                Clinic. Find everything you need to make your time here as pleasant and
                comfortable as possible. We're here to assist you before, during and
                after your visit to Cleveland Clinic.
              </p>
            </motion.div>
          </div>

          {/* Three-Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mb-24 relative z-10">
            {[
              {
                src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
                alt: "Compassionate patient care",
                offset: false,
              },
              {
                src: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80",
                alt: "Medical team collaboration",
                offset: true,
              },
              {
                src: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&q=80",
                alt: "State-of-the-art clinical environment",
                offset: false,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] ${item.offset ? "translate-y-8" : ""}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacing for grid overlap */}
      <div className="h-32 bg-[#f0f9ff]"></div>

      {/* Plan Your Visit Section */}
      <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Plan Your Visit</h2>
            <p className="text-xl text-[#334155] max-w-2xl">
              Everything you need to know before you arrive, from parking and directions
              to our latest visitor policies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Utility Card 1: Parking & Directions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-[#f8fafc] border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 font-bold text-xl">P</div>
              <h3 className="text-2xl font-bold mb-4">Parking & Directions</h3>
              <p className="text-gray-600 mb-6 font-medium">Find your way to our campus with ease. We offer multiple parking options including valet and self-parking.</p>
              <a href="#" className="text-blue-600 font-bold hover:underline">Get Directions →</a>
            </motion.div>

            {/* Utility Card 2: Visiting Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-[#f8fafc] border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600 font-bold text-xl">H</div>
              <h3 className="text-2xl font-bold mb-4">Visiting Hours</h3>
              <p className="text-gray-600 mb-6 font-medium">Our general visiting hours are 8:00 AM to 8:00 PM daily. Some specialized units may have different policies.</p>
              <a href="#" className="text-blue-600 font-bold hover:underline">View All Hours →</a>
            </motion.div>

            {/* Utility Card 3: Patient Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-3xl bg-[#f8fafc] border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 font-bold text-xl">S</div>
              <h3 className="text-2xl font-bold mb-4">Patient Services</h3>
              <p className="text-gray-600 mb-6 font-medium">Access your medical records, pay bills online, or schedule a virtual visit through the MyChart portal.</p>
              <a href="#" className="text-blue-600 font-bold hover:underline">Access MyChart →</a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Refined Styling */}
      <section className="bg-[#0f172a] py-24 text-white overflow-hidden relative">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/10 skew-x-12 translate-x-24"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">

            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-6xl md:text-7xl font-bold text-blue-400">400+</div>
              <div className="text-lg md:text-xl text-gray-400 mt-4 font-medium">Happy clients</div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-6xl md:text-7xl font-bold text-blue-400">100+</div>
              <div className="text-lg md:text-xl text-gray-400 mt-4 font-medium">Team members</div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-6xl md:text-7xl font-bold text-blue-400">500+</div>
              <div className="text-lg md:text-xl text-gray-400 mt-4 font-medium">Positive reviews</div>
            </motion.div>

            {/* Stat 4 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-6xl md:text-7xl font-bold text-blue-400">20+</div>
              <div className="text-lg md:text-xl text-gray-400 mt-4 font-medium">Towns Served</div>
            </motion.div>

          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
