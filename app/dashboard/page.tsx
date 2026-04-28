"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import MyAppointments from "@/components/sections/Appointments/MyAppointments";
import Link from "next/link";
import { CalendarPlus } from "lucide-react";
import { PageHeader, Button } from "@/components/ui";

export default function DashboardPage() {
    const { isSignedIn, user, isLoaded } = useUser();

    if (isLoaded && !isSignedIn) redirect("/");

    return (
        <div className="min-h-screen bg-[#f8fafc] font-sans">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-16">
                <PageHeader
                    title="My Dashboard"
                    subtitle={`Welcome back, ${user?.firstName ?? "there"}`}
                    action={
                        <Link href="/appointments">
                            <Button size="md">
                                <CalendarPlus className="w-5 h-5" />
                                New Appointment
                            </Button>
                        </Link>
                    }
                />

                {/* Appointments */}
                <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Your Appointments</h2>
                    <MyAppointments />
                </div>
            </main>

            <Footer />
        </div>
    );
}
