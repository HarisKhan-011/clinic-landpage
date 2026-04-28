"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Virtual Visits",
    description: "See a Cleveland Clinic provider online from the comfort of your home.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    tag: "Telehealth",
  },
  {
    title: "Manage Your Health Online",
    description: "Access records, test results, and communicate with your care team via MyChart.",
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&q=80",
    tag: "MyChart",
  },
  {
    title: "Get a Virtual Second Opinion",
    description: "Our specialists provide expert second opinions remotely for complex cases.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
    tag: "Specialist Care",
  },
];

export default function AppointmentsConnect() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Connect With Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Connect with <span className="text-blue-600">Cleveland Clinic</span>
            </h2>
          </div>
          <p className="text-sm text-gray-500 max-w-xs">
            Stay informed with our latest health updates and patient services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{article.tag}</span>
                <h3 className="text-base font-bold text-gray-900 mt-3 mb-2">{article.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{article.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
