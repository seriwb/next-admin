import { Account } from '@prisma/client';
import { z } from 'zod';
import { AccountSummary } from '@/features/accounts/types';
import { OffsetPaginator } from '@/types/api';
import { Privilege } from '@/types/application';
import { checkActiveAccountExist, createNewAccount, getAccountList } from '../domains/account';
import { protectedProcedure, publicProcedure, router } from '../router';

export const accountRouter = router({
  checkActiveAccountExist: publicProcedure.query(async () => {
    const existed = await checkActiveAccountExist();
    return { existed: existed };
  }),
  createFirstuser: publicProcedure
    .input(
      z.object({
        username: z.string().email('ID must be in email address format.'),
        password: z.string().min(4, 'Password must contain at least 4 character(s).'),
      }),
    )
    .mutation(async ({ input }) => {
      const newUser: Account = await createNewAccount(input.username, input.password, 'SuperAdmin');
      return newUser;
    }),
  list: protectedProcedure
    .input(
      z.object({
        email: z.string().optional(),
        name: z.string().optional(),
        sort: z.string().optional(),
        page: z.number(),
        perPage: z.number(),
      }),
    )
    .output(
      z.array(
        z.object({
          id: z.number(),
          email: z.string(),
          name: z.string().nullable(),
          privilege: z.custom<Privilege>(),
        }),
      ),
    )
    .query(async ({ input }) => {
      const limit = input.perPage;
      const offset = limit * input.page;
      const result: OffsetPaginator<AccountSummary> = await getAccountList({
        email: input.email,
        name: input.name,
        orderBy: input.sort,
        limit: limit,
        offset: offset,
      });
      const summary = result.rows || [];
      return summary;
    }),
});
