export type AccountSummary = {
  id: string;
  email: string;
  name: string | null;
  privilege: string;
  status: string;
  createdAt: string;
};

export type AccountDetail = AccountSummary & {
  caution: string | null;
  updatedAt: string;
};
