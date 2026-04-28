"use server";

import { db } from "@/lib/db";
import { reviews } from "@/lib/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getReviews() {
    return await db.select().from(reviews).orderBy(reviews.createdAt);
}

export async function submitReview(data: {
    role: string;
    category: string;
    text: string;
    rating: number;
}) {
    const { userId } = await auth();
    const user = await currentUser();
    const authorName = userId
        ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || "Anonymous"
        : "Anonymous";

    await db.insert(reviews).values({
        userId: userId ?? null,
        authorName,
        role: data.role,
        category: data.category,
        text: data.text,
        rating: data.rating,
    });

    revalidatePath("/");
}

export async function seedReviews() {
    const existing = await db.select().from(reviews);
    if (existing.length > 0) return;

    await db.insert(reviews).values([
        { authorName: "Jenna Milton", role: "Visit Cosmetician", category: "New visit by medical center", text: "The care and attention I received was beyond my expectations. Truly world-class.", rating: 5 },
        { authorName: "Michiko Miller", role: "Surgeon Clinic", category: "Medical Center patient", text: "Trust isn't given; it's earned. And my surgeon here didn't just earn my trust — they exceeded it.", rating: 5 },
        { authorName: "Sharon Roberts", role: "Patient", category: "Dentist Visit", text: "My dental experience here was exceptional. The staff made me feel completely at ease.", rating: 4 },
        { authorName: "David Park", role: "Cardiology Patient", category: "Specialist Visit", text: "The cardiology team was incredibly thorough and compassionate throughout my entire treatment.", rating: 5 },
    ]);
}
