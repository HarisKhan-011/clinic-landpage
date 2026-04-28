"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Waves from "@/components/ui/animations/Waves";
import { Search } from "lucide-react";

export default function HealthLibraryFullHero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/health-library?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-br from-blue-50/50 to-white">
      <div className="absolute inset-0 z-0 opacity-20">
        <Waves lineColor="rgba(59, 130, 246, 0.3)" backgroundColor="transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-[48px] md:text-[64px] font-bold text-gray-900 leading-[1.05] tracking-tighter mb-6">
            Best health library <br className="hidden md:block" />
            <span className="text-blue-600 italic">for your loved ones</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Find accurate and easy-to-understand answers to your health questions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-4 shadow-[0_48px_96px_-24px_rgba(0,0,0,0.12)] border border-gray-100"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={24} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search diseases, treatments, conditions..."
                className="w-full bg-gray-50 border-none rounded-2xl py-5 pl-16 pr-6 text-xl font-medium focus:ring-0 placeholder:text-gray-400 transition-all outline-none"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all shadow-xl shadow-blue-600/20 active:scale-95 whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
