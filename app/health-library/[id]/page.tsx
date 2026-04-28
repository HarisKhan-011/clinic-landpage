import { notFound } from "next/navigation";
import { getArticleById } from "@/lib/actions/articles";
import Header from "@/components/layout/Header/Header";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { ArrowLeft, BookOpen, Tag } from "lucide-react";
import Link from "next/link";

const categoryColors: Record<string, string> = {
    "Diseases & Conditions": "bg-red-50 text-red-600",
    "Diagnostics & Testing": "bg-purple-50 text-purple-600",
    "Treatment & Procedures": "bg-blue-50 text-blue-600",
    "Body Systems & Organs": "bg-green-50 text-green-600",
    "Drugs, Devices & Supplements": "bg-amber-50 text-amber-600",
};

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const article = await getArticleById(id);

    if (!article) notFound();

    const tags = article.tags?.split(",").map((t) => t.trim()).filter(Boolean) ?? [];

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Header />
            <Navbar />

            <main className="max-w-3xl mx-auto px-6 py-16">
                {/* Back */}
                <Link
                    href="/health-library"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 font-semibold mb-10 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Health Library
                </Link>

                {/* Article Card */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${categoryColors[article.category] ?? "bg-gray-100 text-gray-600"}`}>
                            {article.category}
                        </span>
                        {article.featured && (
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">Featured</span>
                        )}
                    </div>

                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                        <BookOpen className="w-7 h-7 text-blue-600" />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
                    <p className="text-lg text-gray-500 leading-relaxed mb-8 italic">{article.summary}</p>

                    <div className="border-t border-gray-100 pt-8">
                        <p className="text-gray-700 leading-relaxed text-lg">{article.content}</p>
                    </div>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Tag className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Tags</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span key={tag} className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white text-center">
                    <h2 className="text-2xl font-bold mb-2">Have questions about your health?</h2>
                    <p className="text-blue-100 mb-8">Book an appointment with one of our specialists today.</p>
                    <Link
                        href="/appointments"
                        className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-colors"
                    >
                        Book Appointment
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
