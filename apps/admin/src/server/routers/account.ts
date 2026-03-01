import type { Account } from "@next-admin/db/prisma/generated/prisma/client";
import { z } from "zod";
import { listAccountSchema } from "@/app/(app)/system/accounts/_components/schemas";
import type { AccountSummary } from "@/app/(app)/system/accounts/_components/types";
import { createNewAccountSchema } from "@/app/(app)/system/accounts/new/_components/schemas";
import { createFirstAccountSchema } from "@/app/(auth)/firstuser/_components/schemas";
import type { OffsetPaginator } from "@/types/api";
import { checkActiveAccountExist, createNewAccount, getAccountList } from "../domains/account";
import { protectedProcedure, publicProcedure, router } from "../router";

export const accountRouter = router({
  checkActiveAccountExist: publicProcedure.query(async () => {
    const existed = await checkActiveAccountExist();
    return { existed: existed };
  }),
  createFirstAccount: publicProcedure.input(createFirstAccountSchema).mutation(async ({ input }) => {
    const newUser: Account = await createNewAccount(input.username, input.password, "SuperAdmin");
    return newUser;
  }),
  createNewAccount: publicProcedure.input(createNewAccountSchema).mutation(async ({ input }) => {
    const newUser: Account = await createNewAccount(input.email, input.password, "SuperAdmin");
    return newUser;
  }),
  list: protectedProcedure
    .input(listAccountSchema)
    .output(z.custom<OffsetPaginator<AccountSummary>>())
    .query(async ({ input }) => {
      const limit = input.perPage;
      const offset = limit * (input.page - 1);
      const result: OffsetPaginator<AccountSummary> = await getAccountList({
        email: input.query,
        name: input.query,
        orderBy: input.sort,
        limit: limit,
        offset: offset,
      });
      return result;
    }),
});
