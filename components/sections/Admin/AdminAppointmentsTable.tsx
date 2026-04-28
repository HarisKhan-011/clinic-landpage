"use client";

import { useState } from "react";
import { updateAppointmentStatus } from "@/lib/actions/admin";
import { toast } from "sonner";
import { Calendar, Clock, User, Stethoscope, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Badge, Button } from "@/components/ui";

type Appointment = {
    id: string;
    userName: string;
    userEmail: string;
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

export default function AdminAppointmentsTable({ appointments }: { appointments: Appointment[] }) {
    const [updating, setUpdating] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

    const filtered = filter === "all" ? appointments : appointments.filter((a) => a.status === filter);

    const handleStatus = async (id: string, status: "pending" | "confirmed" | "cancelled") => {
        setUpdating(id);
        try {
            await updateAppointmentStatus(id, status);
            toast.success(`Appointment marked as ${status}`);
        } catch {
            toast.error("Failed to update status");
        } finally {
            setUpdating(null);
        }
    };

    return (
        <div>
            {/* Filter tabs */}
            <div className="flex gap-2 px-8 py-4 border-b border-gray-100">
                {(["all", "pending", "confirmed", "cancelled"] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all ${filter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {filtered.length === 0 ? (
                <div className="text-center py-20 text-gray-400 font-medium">No appointments found</div>
            ) : (
                <div className="divide-y divide-gray-50">
                    {filtered.map((appt) => {
                        const status = (appt.status ?? "pending") as keyof typeof statusConfig;
                        const cfg = statusConfig[status] ?? statusConfig.pending;

                        return (
                            <div key={appt.id} className="px-8 py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors">
                                {/* Left info */}
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Stethoscope className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-3 mb-1">
                                            <p className="font-bold text-gray-900">{appt.doctorName}</p>
                                            <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">{appt.specialty}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{appt.userName}</span>
                                            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{appt.date}</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{appt.time}</span>
                                        </div>
                                        {appt.reason && (
                                            <p className="text-xs text-gray-400 mt-1 italic">"{appt.reason}"</p>
                                        )}
                                        <p className="text-xs text-gray-400 mt-0.5">{appt.userEmail}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <Badge variant={cfg.variant} icon={cfg.icon}>{cfg.label}</Badge>
                                    <div className="flex gap-2">
                                        {status !== "confirmed" && (
                                            <Button variant="secondary" size="sm" loading={updating === appt.id} onClick={() => handleStatus(appt.id, "confirmed")} className="bg-green-50 text-green-700 hover:bg-green-100">Confirm</Button>
                                        )}
                                        {status !== "pending" && (
                                            <Button variant="secondary" size="sm" loading={updating === appt.id} onClick={() => handleStatus(appt.id, "pending")} className="bg-amber-50 text-amber-700 hover:bg-amber-100">Pending</Button>
                                        )}
                                        {status !== "cancelled" && (
                                            <Button variant="danger" size="sm" loading={updating === appt.id} onClick={() => handleStatus(appt.id, "cancelled")}>Cancel</Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
