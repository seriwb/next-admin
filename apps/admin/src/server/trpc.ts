import { createTRPCReact } from '@trpc/react-query';
import { inferAsyncReturnType } from '@trpc/server';
import { Session } from 'next-auth';
import type { AppRouter } from '@/server/routers/_app';

type CreateContextOptions = {
  session: Session | null;
};

export const trpc = createTRPCReact<AppRouter>();

async function createContext(opts: CreateContextOptions) {
  return {
    session: opts.session,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
