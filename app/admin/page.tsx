import { getAllAppointments } from "@/lib/actions/admin";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import AdminAppointmentsTable from "@/components/sections/Admin/AdminAppointmentsTable";
import { StatCard, PageHeader } from "@/components/ui";

export default async function AdminPage() {
    const appointments = await getAllAppointments();

    const stats = {
        total: appointments.length,
        pending: appointments.filter((a) => a.status === "pending").length,
        confirmed: appointments.filter((a) => a.status === "confirmed").length,
        cancelled: appointments.filter((a) => a.status === "cancelled").length,
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-16">
                <PageHeader
                    title="Admin Panel"
                    subtitle="Manage all appointments across the clinic"
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <StatCard label="Total" value={stats.total} variant="blue" />
                    <StatCard label="Pending" value={stats.pending} variant="amber" />
                    <StatCard label="Confirmed" value={stats.confirmed} variant="green" />
                    <StatCard label="Cancelled" value={stats.cancelled} variant="red" />
                </div>

                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-8 py-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">All Appointments</h2>
                    </div>
                    <AdminAppointmentsTable appointments={appointments} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
