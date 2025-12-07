import type { ACCOUNT_PRIVILEGE } from "./constants";

export type Privilege = keyof typeof ACCOUNT_PRIVILEGE;

export type AccountSummary = {
  id: number;
  email: string;
  name: string | null;
  privilege: Privilege;
};
