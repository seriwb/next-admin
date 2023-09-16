// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  export interface Session {
    user: {
      status: string;
    } & DefaultSession["user"]
  }
}
