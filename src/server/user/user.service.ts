import prismaClient from "@/server/db/db";
import { PrismaService } from "@/server/db/prisma.service";
import { type User } from "@prisma/client";
import { injectable } from "tsyringe";

@injectable()
export default class UserService {
  constructor(private prisma: PrismaService) {}

  static async createOrGetFirebaseUser(
    firebaseId: string,
    email: string | undefined
  ): Promise<User> {
    // TODO - send welcome email on new user creation
    // EmailService.sendWelcome()

    // To avoid an unnecessary update, we need to find first and compare incoming attributes that might be different
    const user = await prismaClient.user.findFirst({ where: { firebaseId } });

    if (!user || user.email != email) {
      return prismaClient.user.upsert({
        where: { firebaseId: firebaseId },
        update: { firebaseId: firebaseId, email: email },
        create: { firebaseId: firebaseId, email: email },
      });
    }

    return user;
  }
}
