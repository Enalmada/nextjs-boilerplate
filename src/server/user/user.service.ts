import { getLogger } from "@/logging/log-util";
import prismaClient from "@/server/db/db";
import { type User } from "@prisma/client";

export default class UserService {
  static async createOrGetFirebaseUser(
    firebaseId: string,
    email: string | undefined
  ): Promise<User> {
    const logger = getLogger(UserService.name);
    const childLogger = logger.child({ firebaseId, email });

    // TODO - send welcome email on new user creation
    // EmailService.sendWelcome()

    // To avoid an unnecessary update, we need to find first and compare incoming attributes that might be different
    const user = await prismaClient.user.findFirst({ where: { firebaseId } });

    if (!user || user.email != email) {
      !user ? childLogger.info("user created") : childLogger.info("user updated");
      return prismaClient.user.upsert({
        where: { firebaseId: firebaseId },
        update: { firebaseId: firebaseId, email: email },
        create: { firebaseId: firebaseId, email: email },
      });
    }

    return user;
  }
}
