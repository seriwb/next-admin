import { Prisma, Account } from '@prisma/client';
import { AccountSummary } from '@/features/accounts';
import { LoginUser } from '@/features/auth';
import { OffsetPaginator } from '@/types/api';
import { Privilege } from '@/types/application';
import {
  AccountListCondition,
  countActiveAccounts,
  createAccount,
  deleteOneAccount,
  getAccountById,
  getAccountCount,
  getAccounts,
  tryLogin,
  updateOneAccount,
} from '../repositories/account';

// login check
export const login = async (username: string, password: string): Promise<LoginUser | null> => {
  const user = await tryLogin(username, password);
  return user;
};

export const checkActiveAccountExist = async (): Promise<boolean> => {
  const total = await countActiveAccounts();
  return total > 0 ? true : false;
};

export const getAccount = async (id: number): Promise<Account | null> => {
  const result = await getAccountById(id);
  return result;
};

export const getAccountList = async (condition: AccountListCondition): Promise<OffsetPaginator<AccountSummary>> => {
  const total: number = await getAccountCount(condition);
  const accounts = await getAccounts(condition);
  const nextOffset = (condition.offset ?? 0) + (condition.limit ?? 20);

  const ret: AccountSummary[] = accounts.map((account) => ({
    id: account.id,
    email: account.email,
    name: account.name,
    privilege: account.privilege as Privilege,
  }));
  return { rows: ret, offset: nextOffset, total: total };
};

export const createNewAccount = async (
  username: string,
  password: string,
  privilege: Privilege,
  name?: string,
): Promise<Account> => {
  const newOne = {
    email: username,
    password: password,
    privilege: privilege,
    status: 'active',
    name: name,
  };

  const ret: Account = await createAccount(newOne);
  return ret;
};

export const updateAccount = async (id: number, account: Prisma.AccountUpdateInput): Promise<Account> => {
  try {
    const result = await updateOneAccount(id, account);
    return result;
  } catch (e) {
    throw new Error('Account update failed!');
  }
};

export const deleteAccount = async (id: number): Promise<boolean> => {
  const ret = deleteOneAccount(id);
  return ret;
};
