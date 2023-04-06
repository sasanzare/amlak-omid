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

  //  const obj = await prisma.realEstate.findMany({
  //   where : {
  //       userId : user._id
  //   },
  //     select: {
  //       id: true,
  //       name: true,
  //       phoneNumber: true,
  //     },
  //     orderBy: {
  //       createdAt: "desc",
  //     },

  //     skip: 0,
  //     take: 20,
  //   });

  const idAgency = await prisma.agency.findFirst({
    where: {
      ownerId: user._id,
    },
    select:{
      id: true
    }
  });

  // const id = idAgency.id;
  // console.log(id)

 
  
  const obj = await prisma.user.findMany({
    where: {
      agentOf: {
        some: {
          agencyId: idAgency.id,
        }
      }
    }
  
  })
  
  res.status(200).json(obj);
}

