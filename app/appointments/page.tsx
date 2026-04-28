"use client";

import Header from "@/components/layout/Header/Header";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import AppointmentsHero from "@/components/sections/Appointments/AppointmentsHero";
import AppointmentsConnect from "@/components/sections/Appointments/AppointmentsConnect";
import AppointmentsFAQ from "@/components/sections/Appointments/AppointmentsFAQ";
import HealthLibraryPromo from "@/components/sections/HealthLibrary/HealthLibraryPromo";
import BookingForm from "@/components/sections/Appointments/BookingForm";
import { motion } from "framer-motion";
import { ClipboardList, Clock, Pill } from "lucide-react";

export default function MakeAppointments() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0f172a]" suppressHydrationWarning>
      <Header />
      <Navbar />

      <main>
        {/* Hero */}
        <div className="bg-white">
          <AppointmentsHero />
        </div>
        <div className="h-40 bg-white"></div>

        {/* How to Prepare */}
        <section className="bg-[#f8fafc] section-divider py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">How to Prepare</h2>
                <p className="text-xl text-[#334155] max-w-lg">
                  Ensuring you have everything ready for your appointment helps us provide the best possible care.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-[2rem] overflow-hidden shadow-xl aspect-video"
              >
                <img
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80"
                  alt="Doctor preparing for appointment"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-[2.5rem] bg-[#f8fafc] border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <ClipboardList className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">What to Bring</h3>
                <p className="text-gray-600 mb-6 font-medium">Please bring your photo ID, insurance card, and any relevant medical records or test results.</p>
                <a href="#" className="text-blue-600 font-bold hover:underline">Checklist Details →</a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-[2.5rem] bg-[#f8fafc] border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Arrival Time</h3>
                <p className="text-gray-600 mb-6 font-medium">We recommend arriving 15-20 minutes before your scheduled appointment to complete any paperwork.</p>
                <a href="#" className="text-blue-600 font-bold hover:underline">Parking Info →</a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-8 rounded-[2.5rem] bg-[#f8fafc] border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <Pill className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Medications</h3>
                <p className="text-gray-600 mb-6 font-medium">Have a list of your current medications, including dosage and frequency, ready for your provider.</p>
                <a href="#" className="text-blue-600 font-bold hover:underline">List Template →</a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Connect Section */}
        <div className="bg-white section-divider">
          <AppointmentsConnect />
        </div>

        {/* Booking Form */}
        <section className="bg-[#f8fafc] section-divider py-16 px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Book an Appointment</h2>
              <p className="text-xl text-gray-500">Choose your doctor, date, and time — we'll handle the rest.</p>
            </motion.div>
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100">
              <BookingForm />
            </div>
          </div>
        </section>

        {/* Clinic Stats - Standardized Premium Style */}
        <section className="bg-[#0f172a] py-32 text-white overflow-hidden relative mt-12">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/5 skew-x-12 translate-x-32"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24">
              {[
                { label: "Providers", value: "6,500+" },
                { label: "Locations", value: "200+" },
                { label: "Patient Visits", value: "13M+" },
                { label: "Years of Care", value: "100+" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-4">{stat.value}</div>
                  <div className="text-lg text-gray-400 font-medium uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <div className="section-divider">
          <AppointmentsFAQ />
        </div>
        <div className="bg-white section-divider">
          <HealthLibraryPromo />
        </div>
      </main>

      <Footer />
    </div>
  );
}
