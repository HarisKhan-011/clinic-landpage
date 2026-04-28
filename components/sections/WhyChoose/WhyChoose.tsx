"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Heart, Award, ShieldCheck } from "lucide-react";
export default function WhyChoose() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* TOP HEADER */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="mb-16"
        >
          <h4 className="text-xl font-bold text-gray-400 mb-6 tracking-widest uppercase">
            Why Choose Cleveland Clinic?
          </h4>
          <div className="w-full h-px bg-gray-100 mb-20 origin-left"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* LEFT COLUMN: Text + Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                Care and compassion provided in <span className="text-blue-600">elderly care</span>
              </h2>
              <p className="text-base text-gray-500 leading-relaxed">
                We provide personalized, compassionate care for every patient — from routine checkups to complex treatments — with a team dedicated to your well-being.
              </p>
            </div>

            {/* TWO DOCTOR IMAGES */}
            <div className="flex gap-4 md:gap-8 pt-8">
              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-1/2 aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-2 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80"
                  alt="Doctor smiling"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative w-1/2 aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-2 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"
                  alt="Doctor with patient"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Features List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:pt-12 space-y-16"
          >

            <motion.div variants={itemVariants} className="flex gap-6 group cursor-default">
              <div className="shrink-0 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Heart size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Patient-centered care
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  We don&apos;t just care for your health conditions. We care about you. That means our providers take the time to listen.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="flex gap-6 group cursor-default">
              <div className="shrink-0 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Award size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  National recognition
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  Cleveland Clinic is recognized in the U.S. and throughout the world for its expertise and quality results.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="flex gap-6 group cursor-default">
              <div className="shrink-0 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  Advanced Technology
                </h3>
                <p className="text-base text-gray-500 leading-relaxed">
                  Access to the latest medical breakthroughs and state-of-the-art facilities for more accurate diagnoses.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
