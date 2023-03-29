import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let obj;
  if (req.method === "GET") {
     obj = await prisma.user.findMany({
      where: {
        role: "agencyOwner",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    
  }
  res.status(200).json(obj);
}
