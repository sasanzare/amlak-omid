import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  let obj;
  if (req.method === "GET") {
    obj = await prisma.contactFrom.findMany({
      where: {
        fullName: { contains: req.query.fullName },
        email: { contains: req.query.email },
        title: { contains: req.query.title },
        description: { contains: req.query.description },
      },
        orderBy: {
            createdAt: "desc",
          },
      skip: 0,
      take: 20,
    });
  }

  res.status(200).json(obj);
}
