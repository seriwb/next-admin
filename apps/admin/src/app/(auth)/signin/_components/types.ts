// Better Auth用のLoginUser型
export type LoginUser = {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  status: string;
  privilege: string;
  caution?: string | null;
};
