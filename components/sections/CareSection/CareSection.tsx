"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Activity, LifeBuoy } from "lucide-react";

const cards = [
  {
    icon: Activity,
    title: "Get Care",
    desc: "Getting an appointment is easy with our convenient online scheduling options.",
    bg: "bg-white border-gray-100",
    links: ["Express care and urgent care", "Appointment request form", "Virtual second opinions", "Video visits"],
  },
  {
    icon: Heart,
    title: "Live Healthier",
    desc: "Find wellness information to help you and your family live healthier each day.",
    bg: "bg-blue-50/50 border-blue-100",
    links: ["Health news and trends", "Sign up for our newsletter", "Tune in to our podcast", "Healthy eating guides"],
  },
  {
    icon: LifeBuoy,
    title: "Need Help?",
    desc: "Have a question? We want to make it easy to find what you're looking for.",
    bg: "bg-white border-gray-100",
    links: ["Request medical records", "Main campus visitor guide", "Pay your bill online", "Fast patient support"],
  },
];

export default function CareSection() {
  return (
    <section className="py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, title, desc, bg, links }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${bg} border rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all group`}
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">{desc}</p>

              <div className="space-y-3">
                {links.map((link, i) => (
                  <a key={i} href="#" className="flex justify-between items-center group/link py-1">
                    <span className="text-sm font-medium text-gray-700 group-hover/link:text-blue-600 transition-colors">
                      {link}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover/link:text-blue-600 transition-colors flex-shrink-0" />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
