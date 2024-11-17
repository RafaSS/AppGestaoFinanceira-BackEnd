import { pgTable, varchar, foreignKey, decimal, uuid } from "drizzle-orm/pg-core";

export const User = pgTable("usersTable", {
  id: uuid().primaryKey().default('uuid_generate_v4()'),
  username: varchar({ length: 255 }).notNull(),
  password_hash: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  balance: decimal({ precision: 10, scale: 2 }).default('0').notNull(),
});

export const Transaction = pgTable("transactionsTable", {
  id: uuid().primaryKey().default('uuid_generate_v4()'),
  fromUserId: uuid().notNull().references(() => User.id),
  toUserId: uuid().notNull().references(() => User.id),
  amount: decimal({ precision: 10, scale: 2 }).notNull(),
  transactionDate: varchar({ length: 50 }).notNull(), // This could be timestamp
  description: varchar({ length: 255 }),
}, (table) => ({
  fkFromUser: foreignKey({ columns: [table.fromUserId], foreignColumns: [User.id] }),
  fkToUser: foreignKey({ columns: [table.toUserId], foreignColumns: [User.id] }),
}));
