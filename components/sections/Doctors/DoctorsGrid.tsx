"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { searchDoctors, seedDoctors } from "@/lib/actions/doctors";
import { Star, Stethoscope, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type Doctor = {
    id: string;
    name: string;
    specialty: string;
    department: string;
    bio: string | null;
    rating: number | null;
};

const SPECIALTIES = ["All", "Cardiology", "Neurology", "Orthopedics", "Oncology", "Pediatrics", "Dermatology"];

export default function DoctorsGrid({ initialQuery = "" }: { initialQuery?: string }) {
    const router = useRouter();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [query, setQuery] = useState(initialQuery);
    const [activeSpecialty, setActiveSpecialty] = useState("All");
    const [loading, setLoading] = useState(true);

    const fetchDoctors = useCallback(async (q: string) => {
        setLoading(true);
        const results = await searchDoctors(q);
        setDoctors(results as Doctor[]);
        setLoading(false);
    }, []);

    useEffect(() => {
        seedDoctors().then(() => fetchDoctors(query));
    }, []);

    const handleSearch = () => fetchDoctors(query);

    const handleSpecialty = (specialty: string) => {
        setActiveSpecialty(specialty);
        fetchDoctors(specialty === "All" ? "" : specialty);
        setQuery(specialty === "All" ? "" : specialty);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            {/* Search bar */}
            <div className="flex gap-3 mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search by name, specialty, or department..."
                    className="flex-1 border-2 border-gray-100 rounded-2xl px-5 py-3 text-gray-900 focus:outline-none focus:border-blue-400 bg-gray-50"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-semibold transition-colors"
                >
                    Search
                </button>
            </div>

            {/* Specialty filters */}
            <div className="flex flex-wrap gap-3 mb-12">
                {SPECIALTIES.map((s) => (
                    <button
                        key={s}
                        onClick={() => handleSpecialty(s)}
                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeSpecialty === s
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-64 bg-gray-100 rounded-[2rem] animate-pulse" />
                    ))}
                </div>
            ) : doctors.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-2xl font-bold text-gray-400">No doctors found for &quot;{query}&quot;</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doc, idx) => (
                        <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col"
                        >
                            {/* Avatar */}
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                                <Stethoscope className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-1">{doc.name}</h3>
                            <p className="text-blue-600 font-semibold text-sm mb-1">{doc.specialty}</p>
                            <p className="text-gray-400 text-sm mb-4">{doc.department}</p>

                            {doc.bio && (
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{doc.bio}</p>
                            )}

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-6">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${star <= (doc.rating ?? 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
                                    />
                                ))}
                                <span className="text-sm text-gray-500 ml-1">{doc.rating}.0</span>
                            </div>

                            <button
                                onClick={() => router.push(`/find-doctor/${doc.id}`)}
                                className="flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform"
                            >
                                View Profile <ArrowRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
