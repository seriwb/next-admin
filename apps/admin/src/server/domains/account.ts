import type { Account, Prisma } from "@next-admin/db/prisma/generated/prisma/client";
import type { AccountSummary } from "@/app/(app)/system/accounts/_lib/types";
import type { OffsetPaginator } from "@/types/app";
import type { Privilege } from "@/types/app";
import type { AccountListCondition } from "../repositories/account";
import {
  countActiveAccounts,
  createAccount,
  deleteOneAccount,
  getAccountById,
  getAccountCount,
  getAccounts,
  updateOneAccount,
} from "../repositories/account";

export const checkActiveAccountExist = async (): Promise<boolean> => {
  const total = await countActiveAccounts();
  return total > 0 ? true : false;
};

export const getAccount = async (id: string): Promise<Account | null> => {
  const result = await getAccountById(id);
  return result;
};

// export const getAccountList = async (condition: AccountListCondition): Promise<OffsetPaginator<AccountSummary>> => {
//   const total: number = await getAccountCount(condition);
//   const accounts = await getAccounts(condition);
//   const nextOffset = (condition.offset ?? 0) + (condition.limit ?? 20);

//   const ret: AccountSummary[] = accounts.map((account) => ({
//     id: account.id,
//     email: account.email,
//     name: account.name,
//     privilege: account.privilege as Privilege,
//   }));
//   return { rows: ret, offset: nextOffset, total: total };
// };

export const createNewAccount = async (username: string, privilege: Privilege, name?: string): Promise<Account> => {
  const newOne = {
    email: username,
    privilege: privilege,
    status: "active",
    name: name,
  };

  const ret: Account = await createAccount(newOne);
  return ret;
};

export const updateAccount = async (id: string, account: Prisma.AccountUpdateInput): Promise<Account> => {
  try {
    const result = await updateOneAccount(id, account);
    return result;
  } catch (_e) {
    throw new Error("Account update failed!");
  }
};

export const deleteAccount = async (id: string): Promise<boolean> => {
  const ret = deleteOneAccount(id);
  return ret;
};
