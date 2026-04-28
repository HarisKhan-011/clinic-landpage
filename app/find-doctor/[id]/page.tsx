import { notFound } from "next/navigation";
import { getDoctorById } from "@/lib/actions/doctors";
import Header from "@/components/layout/Header/Header";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { Star, Stethoscope, Building2, ArrowLeft, CalendarPlus } from "lucide-react";
import Link from "next/link";

export default async function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const doctor = await getDoctorById(id);

    if (!doctor) notFound();

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Header />
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-16">
                {/* Back */}
                <Link
                    href="/find-doctor"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 font-semibold mb-10 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Doctors
                </Link>

                {/* Profile Card */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col sm:flex-row items-start gap-8">
                        {/* Avatar */}
                        <div className="w-24 h-24 bg-blue-100 rounded-[1.5rem] flex items-center justify-center flex-shrink-0">
                            <Stethoscope className="w-12 h-12 text-blue-600" />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-1">{doctor.name}</h1>
                            <p className="text-blue-600 font-semibold text-lg mb-1">{doctor.specialty}</p>

                            <div className="flex items-center gap-2 text-gray-500 mb-4">
                                <Building2 className="w-4 h-4" />
                                <span className="text-sm font-medium">{doctor.department}</span>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-5 h-5 ${star <= (doctor.rating ?? 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
                                    />
                                ))}
                                <span className="text-gray-600 font-semibold ml-2">{doctor.rating}.0 / 5.0</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                {doctor.bio && (
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 mb-8">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">{doctor.bio}</p>
                    </div>
                )}

                {/* Specialties info */}
                <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Specialty & Department</h2>
                    <div className="flex flex-wrap gap-3">
                        <span className="px-5 py-2.5 bg-blue-50 text-blue-700 rounded-full font-semibold text-sm">
                            {doctor.specialty}
                        </span>
                        <span className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full font-semibold text-sm">
                            {doctor.department}
                        </span>
                    </div>
                </div>

                {/* Book CTA */}
                <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white text-center">
                    <h2 className="text-2xl font-bold mb-2">Ready to book an appointment?</h2>
                    <p className="text-blue-100 mb-8">Schedule your visit with {doctor.name} today.</p>
                    <Link
                        href="/appointments"
                        className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
                    >
                        <CalendarPlus className="w-5 h-5" />
                        Book Appointment
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
