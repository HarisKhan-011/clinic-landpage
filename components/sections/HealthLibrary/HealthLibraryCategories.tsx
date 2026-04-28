"use client";

import { motion } from "framer-motion";
import { ClipboardList, Heart, Stethoscope, ChevronRight } from "lucide-react";

const categories = [
  {
    title: "Procedures",
    description: "Learn what to expect before, during and or medical procedure. You'll learn its risks and benefits.",
    icon: <ClipboardList size={32} className="text-blue-600" />,
    link: "/procedures"
  },
  {
    title: "Diseases & Conditions",
    description: "Get information about the conditions that affect you or your loved ones. You'll find explanations.",
    icon: <Heart size={32} className="text-blue-600" />,
    link: "/diseases"
  },
  {
    title: "Drugs, Devices",
    description: "Learn what to expect before, during and or medical procedure. You'll learn its risks and benefits.",
    icon: <Stethoscope size={32} className="text-blue-600" />,
    link: "/drugs"
  }
];

export default function HealthLibraryCategories() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[40px] md:text-[56px] font-bold text-gray-900 leading-[1.1] tracking-tighter"
          >
            Search medical questions <br className="hidden md:block" />
            and answers by <span className="text-blue-600 italic">category</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white border border-gray-100 p-12 rounded-[3rem] shadow-sm hover:shadow-[0_40px_80px_-16px_rgba(0,0,0,0.1)] transition-all flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <div className="group-hover:text-white transition-all">
                  {cat.icon}
                </div>
              </div>

              <h3 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight group-hover:text-blue-600 transition-colors">
                {cat.title}
              </h3>
              
              <p className="text-gray-500 text-lg leading-relaxed font-medium mb-10">
                {cat.description}
              </p>

              <button className="flex items-center gap-2 text-blue-600 font-bold text-lg hover:underline transition-all">
                View Service <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
