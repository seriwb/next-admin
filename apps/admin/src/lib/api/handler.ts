import type { NextApiRequest, NextApiResponse } from "next";

 
export function onError(err: unknown, req: NextApiRequest, res: NextApiResponse<any>) {
  console.error((err as Error).stack);
  res.status(500).end("Something broke!");
}

 
export function onNoMatch(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(404).end("Page is not found");
}
