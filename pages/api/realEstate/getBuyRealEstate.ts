import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    get(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// async function get(req: NextApiRequest, res: NextApiResponse) { 
//    const obj = await prisma.realEstate.findMany({
//     where : {
//         assignmentType : "forSale"
//         // AdStatus: "active"
//     },
//       select: {
//         id: true,
//         name: true,
//         phoneNumber: true,
//         description: true,
//         roomCount: true,
//         meter: true,
//         estateImage: true,
//         assignmentType: true,
//         type: true,
//         price: true,
//         latitude: true,
//         longitude: true,
//         createdAt: true,
//         isActive: true,
//         AdStatus: true,
//         cityArea: {
//           select: {
//             id: true,
//             name: true,
//           },
//         },
//         city: {
//           select: {
//             name: true,
//           },
//         },
//         agency: {
//           select: {
//             name: true,
//             agencyImage: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },

//       skip: 0,
//       take: 20,
//     });
  
//   res.status(200).json(obj);
// }




async function get(req, res) {
  let { number } = req.query;
  let obj = null;
 if (number) {
    obj = await prisma.realEstate.findMany({
      where :{
        assignmentType : "forSale",
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
            id : true,
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
      take: parseInt(number) ? parseInt(number) : 20,
    });
  }  else {
    obj = await prisma.realEstate.findMany({
      where: {
        assignmentType : "forSale"
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
            id :true,
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
        gallery: true
      },
    });
  }
  res.status(200).json(obj);
}