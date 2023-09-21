CREATE TYPE IF NOT EXISTS "role" AS ENUM('MEMBER', 'ADMIN');

--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "user_id" SET NOT NULL;

--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role" DEFAULT 'MEMBER';