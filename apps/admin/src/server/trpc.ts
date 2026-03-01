import { createTRPCReact } from "@trpc/react-query";
import type { CustomSession } from "@/lib/auth";
import type { AppRouter } from "@/server/routers/_app";

export const trpc = createTRPCReact<AppRouter>();

export type Context = {
  session: CustomSession | null;
};
