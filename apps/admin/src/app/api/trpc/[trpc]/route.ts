import "server-only";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { z } from "zod";
import { getAppSession } from "@/lib/auth";
import { appRouter } from "@/server/routers/_app";

const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`);
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: async () => {
      const session = await getAppSession();
      return { session };
    },
    // TODO: 最適化しきれていないので、運用に合わせて変更すること
    // 変更した場合はTRPCClientErrorの利用箇所を横展開して修正すること
    onError({ error }) {
      if (error.cause instanceof z.ZodError) {
        error.message = error.cause.issues[0].message;
      }
    },
  });
};

export { handler as GET, handler as POST };
