import { DefaultUser } from 'next-auth';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface LoginUser extends DefaultUser {
  email: string;
  status: string;
  privilege: string;
  caution?: string;
}
