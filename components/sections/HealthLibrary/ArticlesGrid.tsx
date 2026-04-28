"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { searchArticles, seedArticles } from "@/lib/actions/articles";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

type Article = {
    id: string;
    title: string;
    summary: string;
    category: string;
    tags: string | null;
    featured: boolean | null;
};

const CATEGORIES = [
    "All",
    "Diseases & Conditions",
    "Diagnostics & Testing",
    "Treatment & Procedures",
    "Body Systems & Organs",
    "Drugs, Devices & Supplements",
];

const categoryColors: Record<string, string> = {
    "Diseases & Conditions": "bg-red-50 text-red-600",
    "Diagnostics & Testing": "bg-purple-50 text-purple-600",
    "Treatment & Procedures": "bg-blue-50 text-blue-600",
    "Body Systems & Organs": "bg-green-50 text-green-600",
    "Drugs, Devices & Supplements": "bg-amber-50 text-amber-600",
};

export default function ArticlesGrid({ initialQuery = "" }: { initialQuery?: string }) {
    const searchParams = useSearchParams();
    const urlQuery = searchParams.get("q") ?? initialQuery;
    const [articles, setArticles] = useState<Article[]>([]);
    const [query, setQuery] = useState(urlQuery);
    const [activeCategory, setActiveCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    const fetchArticles = useCallback(async (q: string) => {
        setLoading(true);
        await seedArticles();
        const results = await searchArticles(q);
        setArticles(results as Article[]);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchArticles(urlQuery);
        setQuery(urlQuery);
    }, [urlQuery]);

    const handleSearch = () => fetchArticles(query);

    const handleCategory = (cat: string) => {
        setActiveCategory(cat);
        setQuery(cat === "All" ? "" : cat);
        fetchArticles(cat === "All" ? "" : cat);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            {/* Search */}
            <div className="flex gap-3 mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search diseases, treatments, conditions..."
                    className="flex-1 border-2 border-gray-100 rounded-2xl px-5 py-3 text-gray-900 focus:outline-none focus:border-blue-400 bg-gray-50"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-semibold transition-colors"
                >
                    Search
                </button>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-3 mb-12">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-56 bg-gray-100 rounded-[2rem] animate-pulse" />
                    ))}
                </div>
            ) : articles.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-2xl font-bold text-gray-400">No articles found for &quot;{query}&quot;</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, idx) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[article.category] ?? "bg-gray-100 text-gray-600"}`}>
                                    {article.category}
                                </span>
                                {article.featured && (
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Featured</span>
                                )}
                            </div>

                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                                <BookOpen className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors flex-1">
                                {article.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">{article.summary}</p>

                            <Link
                                href={`/health-library/${article.id}`}
                                className="flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform mt-auto"
                            >
                                Read Article <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
