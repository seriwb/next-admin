import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { z } from "zod";
import { appRouter } from "@/server/routers/_app";

// this is the server RPC API handler

const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`);
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: () => ({}),
    // TODO
    onError({ error }) {
      if (error.cause instanceof z.ZodError) {
        error.message = error.cause.issues[0].message;
      }
    },
  });
};

export { handler as GET, handler as POST };
