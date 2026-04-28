"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { bookAppointment } from "@/lib/actions/appointments";
import { getDoctors, seedDoctors } from "@/lib/actions/doctors";
import { toast } from "sonner";
import { Calendar, Clock, Stethoscope, FileText, CheckCircle } from "lucide-react";

type Doctor = {
    id: string;
    name: string;
    specialty: string;
    department: string;
};

const TIME_SLOTS = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
];

export default function BookingForm() {
    const { isSignedIn } = useUser();
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [form, setForm] = useState({
        doctorId: "",
        date: "",
        time: "",
        reason: "",
    });

    useEffect(() => {
        seedDoctors().then(() => {
            getDoctors().then((data) => setDoctors(data as Doctor[]));
        });
    }, []);

    const selectedDoctor = doctors.find((d) => d.id === form.doctorId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSignedIn) {
            toast.error("Please sign in to book an appointment");
            return;
        }
        if (!form.doctorId || !form.date || !form.time) {
            toast.error("Please fill in all required fields");
            return;
        }

        setLoading(true);
        try {
            await bookAppointment({
                doctorId: form.doctorId,
                doctorName: selectedDoctor!.name,
                specialty: selectedDoctor!.specialty,
                date: form.date,
                time: form.time,
                reason: form.reason,
            });
            setSuccess(true);
            toast.success("Appointment booked successfully!");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Get today's date in YYYY-MM-DD for min date
    const today = new Date().toISOString().split("T")[0];

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">Appointment Booked!</h3>
                <p className="text-gray-500 text-lg mb-2">
                    Your appointment with <span className="font-semibold text-blue-600">{selectedDoctor?.name}</span> is confirmed.
                </p>
                <p className="text-gray-400 mb-8">{form.date} at {form.time}</p>
                <button
                    onClick={() => { setSuccess(false); setForm({ doctorId: "", date: "", time: "", reason: "" }); }}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors"
                >
                    Book Another
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Doctor Selection */}
            <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <Stethoscope className="w-4 h-4 text-blue-600" />
                    Select Doctor *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {doctors.map((doc) => (
                        <button
                            key={doc.id}
                            type="button"
                            onClick={() => setForm({ ...form, doctorId: doc.id })}
                            className={`p-4 rounded-2xl border-2 text-left transition-all ${form.doctorId === doc.id
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-100 bg-gray-50 hover:border-blue-200"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm flex-shrink-0">
                                    {doc.name.split(" ").pop()?.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">{doc.name}</p>
                                    <p className="text-xs text-gray-500">{doc.specialty}</p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Date */}
            <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Select Date *
                </label>
                <input
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-400 bg-gray-50"
                />
            </div>

            {/* Time Slots */}
            <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Select Time *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot) => (
                        <button
                            key={slot}
                            type="button"
                            onClick={() => setForm({ ...form, time: slot })}
                            className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${form.time === slot
                                ? "bg-blue-600 text-white"
                                : "bg-gray-50 border border-gray-100 text-gray-700 hover:border-blue-300"
                                }`}
                        >
                            {slot}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reason */}
            <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Reason for Visit (optional)
                </label>
                <textarea
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    placeholder="Briefly describe your symptoms or reason for visit..."
                    rows={3}
                    className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-gray-900 focus:outline-none focus:border-blue-400 bg-gray-50 resize-none"
                />
            </div>

            {/* Submit */}
            {!isSignedIn ? (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
                    <p className="text-amber-700 font-medium">Please sign in to book an appointment</p>
                </div>
            ) : (
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                >
                    {loading ? "Booking..." : "Confirm Appointment"}
                </button>
            )}
        </form>
    );
}
