ALTER TABLE "task" ADD COLUMN "created_by" varchar;--> statement-breakpoint
ALTER TABLE "task" ADD COLUMN "updated_by" varchar;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "created_by" varchar;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "updated_by" varchar;