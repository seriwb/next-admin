import { router } from "../router";
import { accountRouter } from "./account";
import { articleRouter } from "./article";
import { userRouter } from "./user";

export const appRouter = router({
  account: accountRouter,
  article: articleRouter,
  user: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
