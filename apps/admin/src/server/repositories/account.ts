import type { Account, Prisma } from "@next-admin/db/prisma/generated/prisma/client";
import prisma from "@/lib/prisma";

export type AccountListCondition = {
  email?: string;
  name?: string;
  orderBy?: string;
  limit?: number;
  offset?: number;
};

export const countActiveAccounts = async (): Promise<number> => {
  const result = await prisma.account.count({ where: { status: "active" } });
  return result;
};

export const getAccountById = async (id: string): Promise<Account | null> => {
  const account = await prisma.account.findUnique({ where: { id: id } });
  return account;
};

export const getAccountCount = async (condition: AccountListCondition): Promise<number> => {
  const filter = {
    where: {
      OR: [{ email: { startsWith: `%${condition.email}` } }, { name: { startsWith: `%${condition.name}` } }],
    },
  };
  const result = await prisma.account.count(filter);
  return result;
};

export const getAccounts = async (condition: AccountListCondition): Promise<Account[]> => {
  let query = {};

  query = {
    where: {
      OR: [{ email: { startsWith: `%${condition.email}` } }, { name: { startsWith: `%${condition.name}` } }],
    },
  };

  if (condition.orderBy === "recent") {
    query = { ...query, orderBy: { createdAt: "desc" } };
  } else {
    query = { ...query, orderBy: { createdAt: "asc" } };
  }

  condition.offset && condition.offset >= 0 && (query = { ...query, skip: condition.offset });
  condition.limit && condition.limit >= 0 && (query = { ...query, take: condition.limit });

  const result = await prisma.account.findMany(query);
  return result;
};

export const createAccount = async (account: Prisma.AccountCreateInput): Promise<Account> => {
  const ret = await prisma.account.create({ data: account });
  return ret;
};

export const updateOneAccount = async (id: string, user: Prisma.AccountUpdateInput): Promise<Account> => {
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

export const deleteOneAccount = async (id: string): Promise<boolean> => {
  await prisma.account.delete({ where: { id: id } });
  return true;
};
