import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  address: text("address").notNull(),
  commune: text("commune").notNull(),
  propertyType: text("property_type").notNull(), // 'Bodega', 'Estacionamiento', 'Pack', 'Oficina', etc.
  unitNumber: text("unit_number").notNull(),
  size: decimal("size", { precision: 8, scale: 2 }).notNull(),
  floor: text("floor").notNull(),
  status: text("status").notNull().default("Disponible"), // 'Disponible', 'Reservado', 'Vendido', 'En verde', 'Entrega inmediata'
  price: integer("price").notNull(), // in UF
  originalPrice: integer("original_price"), // in UF, for discount calculation
  discount: integer("discount").default(0), // percentage
  annualYield: decimal("annual_yield", { precision: 4, scale: 2 }).notNull(), // percentage
  viewCount: integer("view_count").default(0),
  imageUrl: text("image_url"),
  isAvailable: boolean("is_available").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const investments = pgTable("investments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  propertyId: varchar("property_id").references(() => properties.id).notNull(),
  investmentAmount: integer("investment_amount").notNull(), // in UF
  purchaseDate: timestamp("purchase_date").defaultNow(),
  status: text("status").notNull().default("Active"), // 'Active', 'Completed', 'Cancelled'
});

export const communes = pgTable("communes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  propertyCount: integer("property_count").default(0),
  averageYield: decimal("average_yield", { precision: 4, scale: 2 }),
  minPrice: integer("min_price"), // in UF
  maxPrice: integer("max_price"), // in UF
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
});

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  purchaseDate: true,
});

export const insertCommuneSchema = createInsertSchema(communes).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;

export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;

export type Commune = typeof communes.$inferSelect;
export type InsertCommune = z.infer<typeof insertCommuneSchema>;

// Validation schemas for filters and search
export const propertyFiltersSchema = z.object({
  commune: z.string().optional(),
  propertyType: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minYield: z.number().optional(),
  maxYield: z.number().optional(),
  status: z.string().optional(),
});

export type PropertyFilters = z.infer<typeof propertyFiltersSchema>;

export const calculatorInputSchema = z.object({
  amount: z.number().min(50).max(10000),
  expectedYield: z.number().min(3).max(25),
  period: z.number().min(1).max(30),
  propertyType: z.string().optional(),
});

export type CalculatorInput = z.infer<typeof calculatorInputSchema>;
