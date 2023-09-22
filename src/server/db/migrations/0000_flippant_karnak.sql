CREATE TYPE IF NOT EXISTS "status" AS ENUM ('ACTIVE', 'COMPLETED');

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(1024),
	"status" "status",
	"due_date" timestamp,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"user_id" varchar
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" varchar PRIMARY KEY NOT NULL,
	"firebase_id" varchar,
	"name" varchar(255),
	"email" varchar(320),
	"image" varchar(2083),
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_firebase_id_unique" UNIQUE("firebase_id")
);

--> statement-breakpoint
ALTER TABLE "task" ADD CONSTRAINT IF NOT EXISTS "task_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

