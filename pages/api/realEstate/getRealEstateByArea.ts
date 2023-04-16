import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";
import prisma from "../../../lib/prisma";
import { verify } from "../../../lib/jwt-provider";
import { parseForm } from "../../../lib/parse-form";

export const config = {
    api: {
      bodyParser: false,
    },
  };

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
    const { fields } = await parseForm(req);
    // const user = await verify(req, String(env.JWT_SECRET));
        
   const obj = await prisma.realEstate.findMany({
    where : {
        cityArea :{
            // id :  fields.cityAreaId,
            name :  fields.cityArea,
        },
        // AdStatus: "active"
    },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        description: true,
        roomCount: true,
        meter: true,
        estateImage: true,
        assignmentType: true,
        type: true,
        price: true,
        latitude: true,
        longitude: true,
        createdAt: true,
        isActive: true,
        AdStatus: true,
        cityArea: {
          select: {
            id: true,
            name: true,
          },
        },
        city: {
          select: {
            name: true,
          },
        },
        agency: {
          select: {
            name: true,
            agencyImage: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },

      skip: 0,
      take: 20,
    });
  
  res.status(200).json(obj);
}

