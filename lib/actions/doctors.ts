"use server";

import { db } from "@/lib/db";
import { doctors } from "@/lib/db/schema";
import { eq, ilike, or } from "drizzle-orm";

export async function getDoctors() {
    return await db.select().from(doctors);
}

export async function getDoctorById(id: string) {
    const result = await db.select().from(doctors).where(eq(doctors.id, id)).limit(1);
    return result[0] ?? null;
}

export async function searchDoctors(query: string) {
    if (!query.trim()) return getDoctors();
    return await db
        .select()
        .from(doctors)
        .where(
            or(
                ilike(doctors.name, `%${query}%`),
                ilike(doctors.specialty, `%${query}%`),
                ilike(doctors.department, `%${query}%`)
            )
        );
}

export async function seedDoctors() {
    const existing = await db.select().from(doctors);
    if (existing.length > 0) return;

    await db.insert(doctors).values([
        { name: "Dr. Sarah Johnson", specialty: "Cardiology", department: "Heart & Vascular", bio: "15 years experience in interventional cardiology.", rating: 5 },
        { name: "Dr. Michael Chen", specialty: "Neurology", department: "Neurological Institute", bio: "Specialist in stroke and epilepsy treatment.", rating: 5 },
        { name: "Dr. Emily Davis", specialty: "Orthopedics", department: "Musculoskeletal", bio: "Expert in joint replacement and sports medicine.", rating: 4 },
        { name: "Dr. James Wilson", specialty: "Oncology", department: "Cancer Center", bio: "Leading researcher in immunotherapy.", rating: 5 },
        { name: "Dr. Aisha Patel", specialty: "Pediatrics", department: "Children's Health", bio: "Dedicated to child wellness and development.", rating: 5 },
        { name: "Dr. Robert Kim", specialty: "Dermatology", department: "Skin Health", bio: "Specialist in skin cancer and cosmetic dermatology.", rating: 4 },
    ]);
}
