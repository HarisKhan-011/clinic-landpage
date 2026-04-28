"use server";

import { db } from "@/lib/db";
import { appointments } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
    const { sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    if (role !== "admin") throw new Error("Unauthorized");
}

export async function getAllAppointments() {
    await requireAdmin();
    return await db.select().from(appointments).orderBy(appointments.createdAt);
}

export async function updateAppointmentStatus(id: string, status: "pending" | "confirmed" | "cancelled") {
    await requireAdmin();
    await db.update(appointments).set({ status }).where(eq(appointments.id, id));
    revalidatePath("/admin");
}
