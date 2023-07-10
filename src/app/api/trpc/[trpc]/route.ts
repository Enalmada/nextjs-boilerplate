import "reflect-metadata";

import { createContext } from "@/server/trpc/context";
import { fetchRequestHandler, type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { appRouter } from "../trpc-router";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    /**
     * @link https://trpc.io/docs/context
     */
    createContext: function (opts: FetchCreateContextFnOptions): object | Promise<object> {
      return createContext({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        res: undefined,
        ...opts,
      });
    },
    /**
     * @link https://trpc.io/docs/error-handling
     */
    onError({ error }) {
      if (error.code === "INTERNAL_SERVER_ERROR") {
        // send to bug reporting
        console.error("Something went wrong", error);
      }
    },
    /**
     * Enable query batching
     */
    batching: {
      enabled: true,
    },
    /**
     * @link https://trpc.io/docs/caching#api-response-caching
     */
    // responseMeta() {
    //   // ...
    // },
  });
};

export { handler as GET, handler as POST };
