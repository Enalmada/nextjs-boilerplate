import { type GetServerSidePropsContext } from "next";
import { env } from "@/env.mjs";
import { prisma } from "@/server/db/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type SessionStrategy,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

const strategy = "jwt";
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    // jwt vs database: https://stytch.com/blog/jwts-vs-sessions-which-is-right-for-you/
    // errors when trying to change to jwt possibly fixed by:
    // https://stackoverflow.com/questions/70409219/get-user-id-from-session-in-next-auth-client
    strategy: strategy,
  },
  callbacks: {
    // Guide to getting this working.  next-auth docs were not working
    // https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/?unapproved=2132&moderation-hash=cb5ecacd77d3a4ec285c31770cfc3928#comment-2132
    session({ session, token, user }) {
      if (strategy === ("session" as SessionStrategy)) {
        if (session.user) {
          session.user.id = user.id;
          // session.user.role = user.role; <-- put other properties on the session here
          return session;
        }
        return session;
      } else {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
          },
        };
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
