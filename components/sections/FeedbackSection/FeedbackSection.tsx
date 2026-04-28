"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Star, Quote, ArrowRight, PenLine } from "lucide-react";
import { getReviews, submitReview, seedReviews } from "@/lib/actions/reviews";
import { toast } from "sonner";

type Review = {
  id: string;
  authorName: string;
  role: string;
  category: string;
  text: string;
  rating: number;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

export default function FeedbackSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ role: "", category: "", text: "", rating: 5 });

  const PER_PAGE = 4;

  const fetchReviews = async () => {
    setLoading(true);
    await seedReviews();
    const data = await getReviews();
    setReviews(data as Review[]);
    setLoading(false);
  };

  useEffect(() => { fetchReviews(); }, []);

  const totalPages = Math.ceil(reviews.length / PER_PAGE);
  const visible = reviews.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.role || !form.category || !form.text) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      await submitReview(form);
      toast.success("Review submitted!");
      setForm({ role: "", category: "", text: "", rating: 5 });
      setShowForm(false);
      fetchReviews();
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-2">Patient Testimonials</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Overall patient satisfaction</h2>
            <p className="text-sm text-gray-500 mt-2 max-w-xl leading-relaxed">
              Real feedback from real patients. Our commitment to excellence shows in every interaction.
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <PenLine className="w-4 h-4" />
            Leave a Review
          </button>
        </motion.div>

        {/* Submit Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-100 rounded-[2rem] p-8 mb-12"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Share your experience</h3>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="Your role (e.g. Patient, Visitor)"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="border-2 border-gray-100 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-blue-400 text-gray-900"
              />
              <input
                placeholder="Visit type (e.g. Cardiology Visit)"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border-2 border-gray-100 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-blue-400 text-gray-900"
              />
              <textarea
                placeholder="Share your experience..."
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                rows={3}
                className="md:col-span-2 border-2 border-gray-100 rounded-2xl px-4 py-3 bg-white focus:outline-none focus:border-blue-400 text-gray-900 resize-none"
              />
              {/* Star rating picker */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-600">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm({ ...form, rating: star })}
                  >
                    <Star className={`w-6 h-6 ${star <= form.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`} />
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-2xl font-semibold transition-colors"
                >
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Reviews Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-base font-medium">No reviews yet. Be the first to leave one!</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {visible.map((r, i) => (
              <motion.div
                key={r.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="bg-white border border-gray-100 rounded-[2.5rem] p-10 flex flex-col h-full shadow-sm hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] transition-all group"
              >
                <p className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider">{r.category}</p>
                <p className="text-xl font-medium text-gray-700 flex-1 leading-relaxed italic">&quot;{r.text}&quot;</p>
                <div className="mt-6 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className={`${star <= r.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`} />
                  ))}
                </div>
                <div className="mt-auto pt-8 flex items-center justify-between border-t border-gray-50">
                  <div>
                    <p className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{r.authorName}</p>
                    <p className="text-sm text-gray-500 font-medium">{r.role}</p>
                  </div>
                  <Quote size={40} className="text-gray-100 group-hover:text-blue-50 transition-colors" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-6 mt-16"
          >
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-90 disabled:opacity-30"
            >
              <ArrowRight className="rotate-180" size={24} />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900 tracking-tighter">{String(page + 1).padStart(2, "0")}</span>
              <div className="h-0.5 w-16 bg-blue-600 rounded-full" />
              <span className="text-2xl font-bold text-gray-300 tracking-tighter">{String(totalPages).padStart(2, "0")}</span>
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all active:scale-90 disabled:opacity-30"
            >
              <ArrowRight size={24} />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
