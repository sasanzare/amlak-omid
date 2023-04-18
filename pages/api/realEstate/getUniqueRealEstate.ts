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
  //  const obj = await prisma.realEstate.findMany({
  //   where : {
  //     agencyId : req.body.agencyManagerId
  //   },
  //     select: {
  //       id: true,
  //       name: true,
  //       phoneNumber: true,
  //       description: true,
  //       roomCount: true,
  //       meter: true,
  //       estateImage: true,
  //       assignmentType: true,
  //       type: true,
  //       price: true,
  //       latitude: true,
  //       longitude: true,
  //       createdAt: true,
  //       isActive: true,
  //       AdStatus: true,
  //       cityArea: {
  //         select: {
  //           name: true,
  //         },
  //       },
  //       city: {
  //         select: {
  //           name: true,
  //         },
  //       },
  //       agency: {
  //         select: {
  //           name: true,
  //           agencyImage: true,
  //         },
  //       },
  //     },
  //     orderBy: {
  //       createdAt: "desc",
  //     },

  //   });

    const user = await prisma.agentInterface.findMany({
      where: {
        agencyId : req.body.agencyId
      },
      select:{
        userId: true,
  
      }
    });

    let userAgency = new Array();
    user.forEach(function (value, i) {
      userAgency.push(value.userId) 
      
    });

    userAgency.push(req.body.agencyManagerId) 
    // console.log(userAgency)

    const userReal = await prisma.realEstate.findMany({
      where : {
        userId: {
          in: userAgency
        }
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
  
      });
    // console.log(userReal)
    // console.log(user)
  
  res.status(200).json(userReal);
}

