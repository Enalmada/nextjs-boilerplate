import prisma from "@/server/db/db";

// import { singleton } from "tsyringe";

export * from "@prisma/client";

// Reference: https://github.com/prisma/prisma/issues/18628#issuecomment-1584985619
// @singleton()
export class PrismaService extends getExtendedClient() {}

function getExtendedClient() {
  const client = () => prisma;
  return class {
    // wrapper with type-safety 🎉
    constructor() {
      return client();
    }
  } as new () => ReturnType<typeof client>;
}

/*
TYPEDI

I did get prisma injected using typedi but then felt like
Saving the dependency injection if that becomes desirable in the future.
https://docs.typestack.community/typedi/advanced-usage/08-custom-decorators

import { PrismaClient } from "@prisma/client";
import { Container } from "typedi";
export * from '@prisma/client';

export function Prisma() {
  return function (
    object: object,
    propertyName: string | undefined,
    index?: number
  ) {
    const prisma = new PrismaClient();

    Container.registerHandler({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      object,
      propertyName,
      index,
      value: () => prisma,
    });
  };

usage
constructor { @Prisma prismaService: PrismaClient }

 */

/*
RAW see t3 default project

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log:
            env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

 */
