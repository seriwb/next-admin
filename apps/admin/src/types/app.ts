import type { ACCOUNT_PRIVILEGE } from "@/constants/application";

export type valueOf<T> = T[keyof T];

export type LoginUser = {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  status: string;
  privilege: string;
  caution?: string | null;
};

export type Privilege = keyof typeof ACCOUNT_PRIVILEGE;

type ResultSuccess<T = undefined> = {
  success: true;
  data?: T;
};
type ResultError = {
  success: false;
  error: string;
  fieldErrors?: Record<string, string[]>;
};

export type ActionResult<T = undefined> = ResultSuccess<T> | ResultError;
export type ApiResult<T = undefined> = ActionResult<T>;
export type ServerResult<T = undefined> = ActionResult<T>;

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type OffsetPaginator<T> = {
  rows: T[];
  offset: number;
  total: number;
};

export type FetchError = {
  status: number;
  statusText: string;
} & Error;
