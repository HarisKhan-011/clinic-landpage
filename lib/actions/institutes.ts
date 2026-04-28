"use server";

import { db } from "@/lib/db";
import { institutes } from "@/lib/db/schema";
import { ilike, or } from "drizzle-orm";

export async function getInstitutes() {
    return await db.select().from(institutes).orderBy(institutes.name);
}

export async function searchInstitutes(query: string) {
    if (!query.trim()) return getInstitutes();
    return await db
        .select()
        .from(institutes)
        .where(
            or(
                ilike(institutes.name, `%${query}%`),
                ilike(institutes.description, `%${query}%`),
                ilike(institutes.category, `%${query}%`)
            )
        );
}

export async function seedInstitutes() {
    const existing = await db.select().from(institutes);
    if (existing.length > 0) return;

    await db.insert(institutes).values([
        { name: "Taussig Cancer Institute", description: "Leading research and personalized cancer treatment plans.", category: "Specialty", icon: "Syringe" },
        { name: "Heart, Vascular & Thoracic", description: "World-renowned care for cardiovascular conditions.", category: "Specialty", icon: "Heart" },
        { name: "Neurological Institute", description: "Advanced treatment for spine, brain, and nerve disorders.", category: "Specialty", icon: "Brain" },
        { name: "Glickman Urological & Kidney", description: "Innovative surgical and medical care for renal systems.", category: "Specialty", icon: "Activity" },
        { name: "Orthopaedic & Rheumatologic", description: "Specialized care for bones, joints, and autoimmune diseases.", category: "Specialty", icon: "Bone" },
        { name: "Children's Institute", description: "Compassionate, world-class pediatric care for all ages.", category: "Specialty", icon: "Baby" },
        { name: "Cole Eye Institute", description: "Comprehensive vision care and advanced eye surgery.", category: "Specialty", icon: "Eye" },
        { name: "Dermatology & Plastic Surgery", description: "Aesthetic and restorative skin and body treatments.", category: "Specialty", icon: "User" },
        { name: "Imaging Institute", description: "State-of-the-art diagnostic imaging and radiology.", category: "Diagnostics", icon: "Zap" },
        { name: "Lerner Research Institute", description: "Conducting groundbreaking research for medical breakthroughs.", category: "Research", icon: "Microscope" },
        { name: "Laboratory Medicine", description: "Precise clinical testing and diagnostic services.", category: "Diagnostics", icon: "Flask" },
        { name: "Respiratory Institute", description: "Expert care for complex lung and breathing disorders.", category: "Specialty", icon: "Activity" },
    ]);
}
