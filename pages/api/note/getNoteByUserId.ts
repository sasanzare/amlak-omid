import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";
import prisma from "../../../lib/prisma";
import { verify } from "../../../lib/jwt-provider";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    get(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
    const user = await verify(req, String(env.JWT_SECRET));

   const obj = await prisma.note.findMany({
    where : {
        userId : user._id
    },
      select: {
        id: true,
        note         : true,
        realEstateId : true,
        createdAt    : true,
       
      },
      orderBy: {
        createdAt: "desc",
      },

      skip: 0,
      take: 20,
    });
  
  res.status(200).json(obj);
}

