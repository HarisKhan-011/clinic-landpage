"use client";

import { useEffect, useState, useCallback } from "react";
import { searchInstitutes, seedInstitutes } from "@/lib/actions/institutes";
import { motion } from "framer-motion";
import { Search, ChevronRight, Activity, Heart, Brain, Eye, User, Bone, Baby, Syringe, Microscope, Zap, FlaskRound as Flask } from "lucide-react";

type Institute = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
};

const CATEGORIES = ["All", "Specialty", "Diagnostics", "Research"];

const iconMap: Record<string, React.ReactNode> = {
  Syringe: <Syringe className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Bone: <Bone className="w-5 h-5" />,
  Baby: <Baby className="w-5 h-5" />,
  Eye: <Eye className="w-5 h-5" />,
  User: <User className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Microscope: <Microscope className="w-5 h-5" />,
  Flask: <Flask className="w-5 h-5" />,
};

export default function InstitutesDirectory() {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchInstitutes = useCallback(async (q: string) => {
    setLoading(true);
    await seedInstitutes();
    const results = await searchInstitutes(q);
    setInstitutes(results as Institute[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchInstitutes(""); }, []);

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setActiveId(null);
    setQuery(cat === "All" ? "" : cat);
    fetchInstitutes(cat === "All" ? "" : cat);
  };

  const handleSearch = () => fetchInstitutes(query);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">Our Specialties</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
              Explore Our <span className="text-blue-600">Centers of Excellence</span>
            </h2>
            <p className="text-sm text-gray-400 mt-1.5 max-w-lg">
              From routine care to specialized treatments, discover why Cleveland Clinic is uniquely qualified to care for you.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search departments..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full bg-gray-50 border border-gray-200 focus:border-blue-300 focus:bg-white pl-9 pr-4 py-2.5 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 transition-all outline-none"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : institutes.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-base font-semibold text-gray-400">No departments found for &quot;{query}&quot;</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {institutes.map((inst, idx) => {
              const isActive = activeId === inst.id;
              return (
                <motion.div
                  key={inst.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => setActiveId(isActive ? null : inst.id)}
                  className={`cursor-pointer border rounded-2xl p-6 transition-all flex flex-col justify-between ${isActive
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "bg-white border-gray-100 hover:border-blue-200 hover:shadow-md"
                    }`}
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${isActive ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"
                      }`}>
                      {iconMap[inst.icon] ?? <Activity className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider mb-1 block ${isActive ? "text-blue-100" : "text-gray-400"}`}>
                      {inst.category}
                    </span>
                    <h3 className={`text-base font-bold mb-2 ${isActive ? "text-white" : "text-gray-900"}`}>
                      {inst.name}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-4 ${isActive ? "text-blue-100" : "text-gray-500"}`}>
                      {inst.description}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1.5 text-sm font-semibold ${isActive ? "text-white" : "text-blue-600"}`}>
                    Read detail <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
