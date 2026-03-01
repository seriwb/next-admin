import type { NextApiRequest, NextApiResponse } from "next";
import type { NextHandler } from "next-connect";

require("@/lib/prisma");

export const db = async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
  next();
};
