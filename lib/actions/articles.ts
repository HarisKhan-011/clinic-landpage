"use server";

import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq, ilike, or } from "drizzle-orm";

export async function getArticles(category?: string) {
    if (category && category !== "All") {
        return await db.select().from(articles).where(eq(articles.category, category));
    }
    return await db.select().from(articles).orderBy(articles.createdAt);
}

export async function getArticleById(id: string) {
    const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
    return result[0] ?? null;
}

export async function searchArticles(query: string) {
    if (!query.trim()) return getArticles();
    return await db
        .select()
        .from(articles)
        .where(
            or(
                ilike(articles.title, `%${query}%`),
                ilike(articles.summary, `%${query}%`),
                ilike(articles.category, `%${query}%`),
                ilike(articles.tags, `%${query}%`)
            )
        );
}

export async function seedArticles() {
    const existing = await db.select().from(articles);
    if (existing.length > 0) return;

    await db.insert(articles).values([
        {
            title: "Understanding Heart Disease",
            summary: "Heart disease is the leading cause of death worldwide. Learn about risk factors, prevention, and treatment options.",
            content: "Heart disease encompasses a range of conditions affecting the heart's structure and function...",
            category: "Diseases & Conditions",
            tags: "heart,cardiology,prevention",
            featured: true,
        },
        {
            title: "Managing Type 2 Diabetes",
            summary: "Type 2 diabetes affects millions globally. Discover how lifestyle changes and medication can help manage blood sugar levels.",
            content: "Type 2 diabetes is a chronic condition that affects the way your body metabolizes sugar...",
            category: "Diseases & Conditions",
            tags: "diabetes,blood sugar,lifestyle",
            featured: true,
        },
        {
            title: "What to Expect During an MRI",
            summary: "An MRI scan is a painless procedure that produces detailed images of the inside of your body.",
            content: "Magnetic resonance imaging (MRI) uses strong magnetic fields and radio waves to create detailed images...",
            category: "Diagnostics & Testing",
            tags: "MRI,imaging,diagnostics",
            featured: false,
        },
        {
            title: "Blood Tests Explained",
            summary: "A complete guide to common blood tests, what they measure, and what your results mean.",
            content: "Blood tests are one of the most common types of medical tests. They can be used to assess your general health...",
            category: "Diagnostics & Testing",
            tags: "blood test,lab,diagnostics",
            featured: false,
        },
        {
            title: "Hip Replacement Surgery",
            summary: "Hip replacement is a surgical procedure to replace a worn or damaged hip joint with an artificial one.",
            content: "Hip replacement surgery removes damaged sections of the hip joint and replaces them with prosthetic parts...",
            category: "Treatment & Procedures",
            tags: "surgery,orthopedics,hip",
            featured: true,
        },
        {
            title: "Chemotherapy: What You Need to Know",
            summary: "Chemotherapy uses drugs to destroy cancer cells. Learn about the process, side effects, and what to expect.",
            content: "Chemotherapy is a type of cancer treatment that uses one or more anti-cancer drugs...",
            category: "Treatment & Procedures",
            tags: "cancer,chemotherapy,oncology",
            featured: false,
        },
        {
            title: "How the Immune System Works",
            summary: "Your immune system is your body's defense against infection. Understand how it functions and how to keep it strong.",
            content: "The immune system is a complex network of cells, tissues, and organs that work together to defend the body...",
            category: "Body Systems & Organs",
            tags: "immune system,health,biology",
            featured: false,
        },
        {
            title: "The Nervous System Explained",
            summary: "The nervous system controls everything from breathing to thinking. Learn about its structure and common disorders.",
            content: "The nervous system is the body's command center, originating from the brain...",
            category: "Body Systems & Organs",
            tags: "nervous system,brain,neurology",
            featured: false,
        },
        {
            title: "Common Pain Medications Guide",
            summary: "From ibuprofen to opioids — a comprehensive guide to pain medications, their uses, and risks.",
            content: "Pain medications, also called analgesics, are drugs used to relieve pain...",
            category: "Drugs, Devices & Supplements",
            tags: "pain,medication,drugs",
            featured: false,
        },
        {
            title: "Vitamin D: Benefits and Deficiency",
            summary: "Vitamin D is essential for bone health and immune function. Learn about sources, supplements, and deficiency signs.",
            content: "Vitamin D is a fat-soluble vitamin that is naturally present in very few foods...",
            category: "Drugs, Devices & Supplements",
            tags: "vitamins,supplements,bone health",
            featured: true,
        },
    ]);
}
