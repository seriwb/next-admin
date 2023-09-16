import { Prisma, Account } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { LoginUser } from '@/features/auth';
import prisma from '@/libs/prisma';

const saltRounds = 10;

export type Condition = {
  email?: string;
};

export const tryLogin = async (username: string, password: string): Promise<LoginUser | null> => {
  const user = await prisma.account.findUnique({ where: { email: username } });
  if (user && (await compare(password, user.password))) {
    return {
      id: user.email,
      email: user.email,
      status: user.status,
      privilege: user.privilege,
      name: user.name,
      image: user.image,
    };
  } else {
    return null;
  }
};

export const getAccountCount = async (condition: Condition): Promise<number> => {
  const filter = condition.email ? { where: { email: { search: `${condition.email}*` } } } : undefined;
  const result = await prisma.account.count(filter);
  return result;
};

export const countActiveAccounts = async (): Promise<number> => {
  const result = await prisma.account.count({ where: { status: 'active' } });
  return result;
};

export const getAccountById = async (id: number): Promise<Account | null> => {
  const account = await prisma.account.findUnique({ where: { id: id } });
  return account;
};

export const getAccounts = async (
  condition: Condition,
  orderBy?: string,
  limit?: number,
  offset?: number,
): Promise<Account[]> => {
  let query = {};
  if (condition.email) {
    query = { where: { email: { search: `${condition.email}*` } } };
  }

  if (orderBy === 'recent') {
    query = { ...query, orderBy: { createdAt: 'desc' } };
  } else {
    query = { ...query, orderBy: { createdAt: 'asc' } };
  }

  offset && offset >= 0 && (query = { ...query, skip: offset });
  limit && limit >= 0 && (query = { ...query, take: limit });

  const result = await prisma.account.findMany(query);
  return result;
};

export const createAccount = async (account: Prisma.AccountCreateInput): Promise<Account> => {
  const hashPassword = await hash(account.password, saltRounds);
  const newAccount = { ...account, password: hashPassword };
  const ret = await prisma.account.create({ data: newAccount });
  return ret;
};

export const updateOneAccount = async (id: number, user: Prisma.AccountUpdateInput): Promise<Account> => {
  const ret = await prisma.account.update({
    where: { id: id },
    data: {
      name: user.name,
      email: user.email,
      image: user.image,
      privilege: user.privilege,
    },
  });
  return ret;
};

export const deleteOneAccount = async (id: number): Promise<boolean> => {
  await prisma.account.delete({ where: { id: id } });
  return true;
};

export const updatePassword = async (username: string, password: string): Promise<boolean> => {
  const hashPassword = await hash(password, saltRounds);
  const ret = await prisma.account.update({
    where: { email: username },
    data: { password: hashPassword },
  });
  return ret ? true : false;
};
