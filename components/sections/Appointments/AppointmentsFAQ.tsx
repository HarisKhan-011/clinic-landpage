"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CircleDollarSign, FolderOpen, Briefcase, HeartOff, HelpCircle } from "lucide-react";

const faqs = [
  { question: "Is my insurance accepted at Cleveland Clinic?", description: "We accept most major insurance plans. Contact us to verify your specific coverage before your visit.", icon: ShieldCheck },
  { question: "Does Cleveland Clinic provide financial assistance?", description: "Yes, we offer financial counseling and assistance programs for eligible patients.", icon: CircleDollarSign },
  { question: "How do I access my medical records?", description: "You can access your records anytime through the MyChart patient portal.", icon: FolderOpen },
  { question: "Can I get a second opinion remotely?", description: "Yes, our specialists offer virtual second opinion consultations for complex cases.", icon: Briefcase },
  { question: "How early should I arrive for my appointment?", description: "We recommend arriving 15 minutes early to complete any necessary paperwork.", icon: HelpCircle },
  { question: "What should I bring to my first visit?", description: "Bring a photo ID, insurance card, and a list of current medications.", icon: HeartOff },
];

export default function AppointmentsFAQ() {
  return (
    <section className="py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Common Questions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            Have questions before your appointment?
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {faqs.map(({ question, description, icon: Icon }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{question}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
