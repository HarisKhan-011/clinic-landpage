import { pgTable, text, timestamp, uuid, integer, boolean } from "drizzle-orm/pg-core";

export const doctors = pgTable("doctors", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  department: text("department").notNull(),
  image: text("image"),
  bio: text("bio"),
  rating: integer("rating").default(5),
  createdAt: timestamp("created_at").defaultNow(),
});

export const appointments = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),         // Clerk user ID
  userName: text("user_name").notNull(),
  userEmail: text("user_email").notNull(),
  doctorId: uuid("doctor_id").references(() => doctors.id),
  doctorName: text("doctor_name").notNull(),
  specialty: text("specialty").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  reason: text("reason"),
  status: text("status").default("pending"), // pending | confirmed | cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

export const articles = pgTable("articles", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // "Diseases & Conditions" | "Diagnostics & Testing" | "Treatment & Procedures" | "Body Systems & Organs" | "Drugs, Devices & Supplements"
  tags: text("tags"), // comma-separated
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const institutes = pgTable("institutes", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "Specialty" | "Diagnostics" | "Research"
  icon: text("icon").notNull(),         // lucide icon name string
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id"),               // nullable — allow guest seed data
  authorName: text("author_name").notNull(),
  role: text("role").notNull(),
  category: text("category").notNull(),
  text: text("text").notNull(),
  rating: integer("rating").notNull().default(5),
  createdAt: timestamp("created_at").defaultNow(),
});
