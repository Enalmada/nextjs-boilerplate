import { env } from "@/env.mjs";
import { PrismaClient } from "@prisma/client";

// https://github.com/karlhorky/next-js-tricks#avoid-postgresql-connection-slots-error-with-development-server
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
