import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";
import prisma from "../../../lib/prisma";
import { verify } from "../../../lib/jwt-provider";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    getInfo(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}


async function getInfo(req: NextApiRequest, res: NextApiResponse) {
  const user = await verify(req, String(env.JWT_SECRET));
 
  const obj = await prisma.user.findUnique({
    where: {
        id: user._id
    },
    select: {
        id: true,
    firstName: true,
    lastName: true,
    userImage: true,
    role: true,
    agency: true,
    note: {
        select: {
            id          : true,
            // user        : true,
            // userId      : true,
            note        : true,
            // realEstate  : true,
            realEstateId: true,
            createdAt   : true,
        },
      },
    save: {
        select: {
            id           :   true,
            // user         :   true,
            // userId       :   true,
            // realEstate   :   true,
            realEstateId :   true,      
            createdAt    :   true,       
        },
      },
    report: {
        select: {
            id             : true,
            // user           : true,
            // userId         : true,
            report         : true,
            // realEstate     : true,
            realEstateId   : true,
            createdAt      : true,   
        },
      },
    },
  })

  res.status(200).json(obj);
}
