"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const promoCards = [
  {
    title: "How can I get my COVID 19 vaccine?",
    linkText: "Schedule a Vaccine",
    label: "5%",
    subLabel: "Cashback",
    bgColor: "bg-[#e0f2fe]", // Light Blue
    textColor: "text-blue-900",
    image: "/doctorland.png"
  },
  {
    title: "Traveling Cleveland for appointment",
    linkText: "Let us you Plan",
    label: "Flat",
    subLabel: "10% Off",
    bgColor: "bg-[#fdf2f2]", // Light Pink
    textColor: "text-red-900",
    image: "/doctorimg.png"
  },
  {
    title: "Need to schedule an Appointment",
    linkText: "Let us you Plan",
    label: "Flat",
    subLabel: "10% Off",
    bgColor: "bg-[#f0fdf4]", // Light Green
    textColor: "text-green-900",
    image: "/clinic-hero-final.png"
  }
];

export default function HealthLibraryPromo() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {promoCards.map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`${card.bgColor} rounded-[2.5rem] p-10 flex flex-col h-full relative overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer`}
            >
              <div className="relative z-10 space-y-6 max-w-[240px]">
                <h3 className={`text-4xl font-extrabold leading-[1.1] tracking-tight ${card.textColor}`}>
                  {card.title}
                </h3>
                
                <button className={`flex items-center gap-2 font-bold text-lg ${card.textColor} group-hover:translate-x-2 transition-transform`}>
                  {card.linkText} <ArrowRight size={20} />
                </button>

                <div className="pt-12">
                  <p className={`text-4xl font-black ${card.textColor}`}>{card.label}</p>
                  <p className={`text-lg font-bold opacity-60 ${card.textColor}`}>{card.subLabel}</p>
                </div>
              </div>

              {/* Decorative Image */}
              <div className="absolute right-[-40px] bottom-0 w-2/3 h-[85%] z-0">
                <img 
                  src={card.image} 
                  alt="Doctor" 
                  className="w-full h-full object-contain object-bottom transform group-hover:scale-105 transition-transform duration-1000 origin-bottom"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
