import { type NextRequest } from "next/server";
import { prisma } from "@/server/db/db";
import { handleFirebase } from "@/server/firebase/firebase";
import type * as trpc from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async ({ req }: trpcNext.CreateNextContextOptions) => {
  const user = await handleFirebase(req as unknown as NextRequest);

  // for API-response caching see https://trpc.io/docs/caching
  return {
    db: prisma,
    prisma,
    user,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
