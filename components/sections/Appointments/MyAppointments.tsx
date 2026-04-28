"use client";

import { useEffect, useState } from "react";
import { getMyAppointments, cancelAppointment } from "@/lib/actions/appointments";
import { toast } from "sonner";
import { Calendar, Clock, Stethoscope, XCircle, CheckCircle, AlertCircle } from "lucide-react";
import { Badge, Avatar, Skeleton, Button } from "@/components/ui";

type Appointment = {
    id: string;
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    reason: string | null;
    status: string | null;
    createdAt: Date | null;
};

const statusConfig = {
    pending: { label: "Pending", variant: "pending" as const, icon: <AlertCircle className="w-3.5 h-3.5" /> },
    confirmed: { label: "Confirmed", variant: "confirmed" as const, icon: <CheckCircle className="w-3.5 h-3.5" /> },
    cancelled: { label: "Cancelled", variant: "cancelled" as const, icon: <XCircle className="w-3.5 h-3.5" /> },
};

export default function MyAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState<string | null>(null);

    const fetchAppointments = async () => {
        const data = await getMyAppointments();
        setAppointments(data as Appointment[]);
        setLoading(false);
    };

    useEffect(() => { fetchAppointments(); }, []);

    const handleCancel = async (id: string) => {
        setCancelling(id);
        try {
            await cancelAppointment(id);
            toast.success("Appointment cancelled");
            fetchAppointments();
        } catch {
            toast.error("Failed to cancel appointment");
        } finally {
            setCancelling(null);
        }
    };

    if (loading) return <div className="space-y-4"><Skeleton count={3} /></div>;

    if (appointments.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="flex justify-center mb-6">
                    <Avatar icon={<Calendar className="w-10 h-10 text-blue-300" />} size="lg" color="blue" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No appointments yet</h3>
                <p className="text-gray-400">Book your first appointment below</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {appointments.map((appt) => {
                const status = (appt.status ?? "pending") as keyof typeof statusConfig;
                const cfg = statusConfig[status] ?? statusConfig.pending;

                return (
                    <div key={appt.id} className="bg-white border border-gray-100 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <Avatar icon={<Stethoscope className="w-6 h-6" />} size="md" color="blue" />
                            <div>
                                <p className="font-bold text-gray-900 text-lg">{appt.doctorName}</p>
                                <p className="text-blue-600 text-sm font-medium">{appt.specialty}</p>
                                <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {appt.date}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {appt.time}</span>
                                </div>
                                {appt.reason && <p className="text-gray-400 text-sm mt-1 italic">"{appt.reason}"</p>}
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <Badge variant={cfg.variant} icon={cfg.icon}>{cfg.label}</Badge>
                            {status !== "cancelled" && (
                                <Button variant="danger" size="sm" loading={cancelling === appt.id} onClick={() => handleCancel(appt.id)}>
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
