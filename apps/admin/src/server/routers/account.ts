import { Account } from '@prisma/client';
import { z } from 'zod';
import { checkActiveAccountExist, createNewAccount } from '../domains/account';
import { publicProcedure, router } from '../router';

export const accountRouter = router({
  checkActiveAccountExist: publicProcedure.query(async () => {
    const existed = await checkActiveAccountExist();
    return { existed: existed };
  }),
  createFirstuser: publicProcedure
    .input(
      z.object({
        username: z.string().email("ID must be in email address format."),
        password: z.string().min(4, "Password must contain at least 4 character(s)."),
      }),
    )
    .mutation(async ({ input }) => {
      const newUser: Account = await createNewAccount(input.username, input.password, 'SuperAdmin');
      return newUser;
    }),
});
