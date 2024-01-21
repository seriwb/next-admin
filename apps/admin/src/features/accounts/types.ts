import { Privilege } from '@/types/application';

export type AccountSummary = {
  id: number;
  email: string;
  name: string | null;
  privilege: Privilege;
};
