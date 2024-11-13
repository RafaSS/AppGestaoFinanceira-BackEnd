import { integer, pgTable, varchar, foreignKey, decimal } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});


export const accountsTable = pgTable("accounts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer().notNull().references(() => users.id),
  accountNumber: varchar({ length: 20 }).notNull().unique(),
  balance: decimal({ precision: 10, scale: 2 }).default('0').notNull(),
  accountType: varchar({ length: 50 }).notNull(),
});

export const transactionsTable = pgTable("transactions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fromAccountId: integer().notNull().references(() => accountsTable.id),
  toAccountId: integer().notNull().references(() => accountsTable.id),
  amount: decimal({ precision: 10, scale: 2 }).notNull(),
  transactionDate: varchar({ length: 50 }).notNull(), // This could be timestamp
  description: varchar({ length: 255 }),
}, (table) => ({
  fkFromAccount: foreignKey({ columns: [table.fromAccountId], foreignColumns: [accountsTable.id] }),
  fkToAccount: foreignKey({ columns: [table.toAccountId], foreignColumns: [accountsTable.id] }),
}));
