import { Prisma, Account } from '@prisma/client';
import { OffsetPaginator } from '@/types/api';
import { LoginUser } from '@/features/auth';
import {
  Condition,
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

export const getAccountList = async (
  email?: string,
  orderBy?: string,
  limit?: number,
  offset?: number,
): Promise<OffsetPaginator<Account>> => {
  const condition: Condition = {};
  email && (condition.email = email);

  const total: number = await getAccountCount(condition);
  const users = await getAccounts(condition, orderBy, limit, offset);
  const nextOffset = (offset || 0) + (limit || 20);

  return { rows: users, offset: nextOffset, total: total };
};

export const createNewAccount = async (
  username: string,
  password: string,
  privilege: string,
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
