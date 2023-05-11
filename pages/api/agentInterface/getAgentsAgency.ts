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

async function get(req,res) {

  const obj = await prisma.user.findMany({
    where: {
      agentOf: {
        some: {
          agencyId: req.body.ownerId,
          isActive : true
        },
      },
    },
    select:{
        id: true,
        firstName: true,
        lastName: true,
        userImage: true,

    }
  });
  res.status(200).json(obj);
}
