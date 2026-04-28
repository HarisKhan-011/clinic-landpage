"use server";

import { db } from "@/lib/db";
import { appointments } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function bookAppointment(formData: {
    doctorId: string;
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    reason?: string;
}) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const user = await currentUser();
    const userName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();
    const userEmail = user?.emailAddresses[0]?.emailAddress ?? "";

    await db.insert(appointments).values({
        userId,
        userName,
        userEmail,
        doctorId: formData.doctorId as any,
        doctorName: formData.doctorName,
        specialty: formData.specialty,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        status: "pending",
    });

    revalidatePath("/appointments");
}

export async function getMyAppointments() {
    const { userId } = await auth();
    if (!userId) return [];

    return await db
        .select()
        .from(appointments)
        .where(eq(appointments.userId, userId))
        .orderBy(appointments.createdAt);
}

export async function cancelAppointment(id: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    // verify the appointment belongs to this user before cancelling
    const existing = await db
        .select()
        .from(appointments)
        .where(and(eq(appointments.id, id), eq(appointments.userId, userId)))
        .limit(1);

    if (existing.length === 0) throw new Error("Appointment not found or access denied");

    await db
        .update(appointments)
        .set({ status: "cancelled" })
        .where(and(eq(appointments.id, id), eq(appointments.userId, userId)));

    revalidatePath("/appointments");
    revalidatePath("/dashboard");
}
