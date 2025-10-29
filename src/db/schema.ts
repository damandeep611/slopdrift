import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .references(() => authUsers.id),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"), //google id avatar url
  role: userRoleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const galleryImages = pgTable("gallery_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  imageUrl: text("image_url").notNull(),
  prompt: text("prompt").notNull(),
  aiModel: varchar("ai_model", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
