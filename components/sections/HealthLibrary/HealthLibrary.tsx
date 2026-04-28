"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const libraryItems = [
  { label: "Diseases & Conditions", href: "/health-library" },
  { label: "Diagnostics & Testing", href: "/health-library" },
  { label: "Treatment & Procedures", href: "/health-library" },
  { label: "Body Systems & Organs", href: "/health-library" },
  { label: "Drugs, Devices & Supplements", href: "/health-library" },
];

export default function HealthLibrary() {
  const [activeIdx, setActiveIdx] = useState(2);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">

          {/* Left — branding card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-5/12"
          >
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-10 h-full flex flex-col items-center justify-center text-center border border-blue-100 shadow-sm">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/25">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">Cleveland Clinic</p>
              <h2 className="text-3xl font-bold text-blue-600 mb-3">Health Library</h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                Trusted medical information written by our expert physicians and healthcare professionals.
              </p>
              <Link
                href="/health-library"
                className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                Browse All Articles <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right — interactive category list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-7/12 flex flex-col justify-center"
          >
            <ul className="space-y-3">
              {libraryItems.map((item, idx) => (
                <motion.li key={idx} whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
                  <button
                    onClick={() => setActiveIdx(idx)}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all text-left ${activeIdx === idx
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        : "text-gray-700 hover:bg-gray-50 border border-gray-100 hover:border-blue-100"
                      }`}
                  >
                    <span className="text-base font-semibold">{item.label}</span>
                    <Link
                      href={item.href}
                      onClick={(e) => e.stopPropagation()}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${activeIdx === idx
                          ? "bg-white text-blue-600"
                          : "border border-gray-200 text-gray-400 hover:border-blue-300 hover:text-blue-600"
                        }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
