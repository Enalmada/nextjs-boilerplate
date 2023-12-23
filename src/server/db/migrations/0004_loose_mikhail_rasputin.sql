ALTER TABLE "task" RENAME COLUMN "created_by" TO "created_by_id";--> statement-breakpoint
ALTER TABLE "task" RENAME COLUMN "updated_by" TO "updated_by_id";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "created_by" TO "created_by_id";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "updated_by" TO "updated_by_id";--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updated_at" DROP NOT NULL;