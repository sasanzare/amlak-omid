import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
// import { env } from "process";
// import { verify } from "../../../lib/jwt-provider";
// import { parseForm } from "../../../lib/parse-form";

// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };

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
   const obj = await prisma.agency.findUnique({
    where : {
            id :  req.body.id,
        // AdStatus: "active"
    },
      select: {
        id: true,
        name: true,
        agencyImage: true,
        phoneNumber: true,
        owner : {
          select:{
            id : true,
            firstName : true,
            lastName : true,
          }
        },
        cityArea: {
          select: {
            name: true,
          }
          },
       
        city: {
          select: {
            name: true,
          },
        },

      RealEstate:{
          select:{
              _count:true
          }
      },
      agents: {
        select:{
          agencyId:true
        }
      }
    }

    });
  
  res.status(200).json(obj);
}

