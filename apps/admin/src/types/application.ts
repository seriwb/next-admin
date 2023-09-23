import { ACCOUNT_PRIVILEGE } from "@/constants/application";

export type valueOf<T> = T[keyof T];

export type Privilege = keyof typeof ACCOUNT_PRIVILEGE;
