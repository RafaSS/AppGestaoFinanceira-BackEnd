import { generateKey, randomUUID } from "crypto";
import { pgTable, varchar, foreignKey, decimal, uuid } from "drizzle-orm/pg-core";

export const User = pgTable("usersTable", {
  id: uuid().primaryKey().default(randomUUID()),
  username: varchar({ length: 255 }).notNull(),
  password_hash: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  balance: decimal({ precision: 10, scale: 2 }).default('0').notNull(),
});

export const Transaction = pgTable("transactionsTable", {
  id: uuid().primaryKey().default(randomUUID()),
  fromUserId: uuid().notNull().references(() => User.id),
  toUserId: uuid().notNull().references(() => User.id),
  amount: decimal({ precision: 10, scale: 2 }).notNull(),
  transactionDate: varchar({ length: 50 }).notNull(),
  description: varchar({ length: 255 }),
}, (table) => ({
  fkFromUser: foreignKey({ columns: [table.fromUserId], foreignColumns: [User.id] }),
  fkToUser: foreignKey({ columns: [table.toUserId], foreignColumns: [User.id] }),
}));
