import { router } from "../router";
import { accountRouter } from "./account";
import { userRouter } from "./user";

export const appRouter = router({
  account: accountRouter,
  user: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
