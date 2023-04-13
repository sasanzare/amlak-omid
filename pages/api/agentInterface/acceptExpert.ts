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

  const idExpert = req.body.idExpert;
  const agency = await prisma.agency.findFirst({
    where: {
      ownerId: user._id,
    },
    select: {
      id: true,
    },
  });

  const targetUser = await prisma.agentInterface.findFirst({
    where: {
      userId: idExpert,
      agencyId: agency.id,
    },
    select: {
      id: true,
      userId: true,
    },
  });

  const { id } = targetUser;
  const { userId } = targetUser;

  const active = await prisma.agentInterface.update({
    where: {
      id: id,
    },
    data: {
      isActive: {
        set: true,
      },
    },
  });

  const deleteOther = await prisma.agentInterface.deleteMany({
    where: {
      userId: idExpert,
      isActive: false,
    },
  });

  res.status(200).json(deleteOther);
}
