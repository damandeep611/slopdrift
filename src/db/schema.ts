import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', {length:255}).notNull().unique(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  authId: text('auth_id').notNull().unique(), //supabase auth.users.id
  createdAt: timestamp('created_at').defaultNow().notNull(),
});