import 'server-only';

import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { z } from 'zod';
import { getAppSession } from '@/server/auth';
import { appRouter } from '@/server/routers/_app';

const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`);
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: async () => {
      const session = await getAppSession();
      return { session };
    },
    // TODO
    onError({ error }) {
      if (error.cause instanceof z.ZodError) {
        error.message = error.cause.issues[0].message;
      }
    },
  });
};

export { handler as GET, handler as POST };
