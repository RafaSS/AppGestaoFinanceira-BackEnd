CREATE TABLE IF NOT EXISTS "transactionsTable" (
	"id" uuid PRIMARY KEY DEFAULT 'e3fbabcb-f842-425c-83e1-1a9538e09d23' NOT NULL,
	"fromUserId" uuid NOT NULL,
	"toUserId" uuid NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"transactionDate" varchar(50) NOT NULL,
	"description" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usersTable" (
	"id" uuid PRIMARY KEY DEFAULT '22e08c16-3178-4efc-a497-ca53188f938a' NOT NULL,
	"username" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"balance" numeric(10, 2) DEFAULT '0' NOT NULL,
	CONSTRAINT "usersTable_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactionsTable" ADD CONSTRAINT "transactionsTable_fromUserId_usersTable_id_fk" FOREIGN KEY ("fromUserId") REFERENCES "public"."usersTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactionsTable" ADD CONSTRAINT "transactionsTable_toUserId_usersTable_id_fk" FOREIGN KEY ("toUserId") REFERENCES "public"."usersTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
