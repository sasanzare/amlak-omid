import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { parseForm } from "../../../lib/parse-form";
import { verify } from "../../../lib/jwt-provider";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    get(req, res);
  } else if (req.method === "POST") {
    // upsert(req, res)
  } else if (req.method === "DELETE") {
    remove(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

async function get(req, res) {
  const { id } = req.query;
  let { number } = req.query;
  let obj = null;
  if (id) {
    obj = await prisma.realEstate.findUnique({
      where: {
        id: id,
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
        gallery: true
      },
    });
  } else {
    obj = await prisma.realEstate.findMany({
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

      skip: 0,
      take: parseInt(number) ? parseInt(number) : 20,
    });
  }
  res.status(200).json(obj);
}

// async function upsert(req, res) {
//     console.log("kir")
//     const uploadDirCategory = 'advertising'
//     const { fields, files } = await parseForm(req, uploadDirCategory);
//     const media = JSON.stringify(files.media.filepath).split("advertising/")[1].replace('"','');
//     const user = await verify(req, String(env.JWT_SECRET));
//     const estateId : string = String(fields.id) || '';
//     delete fields.id;
//     console.log("khar")
//     let obj = await prisma.realEstate.upsert({
//         where: {
//             id: estateId,
//         },
//         update: {
//             ...fields,
//             Photos: media
//         },
//         create: {
//             ...fields,
//             Photos: media,
//             userId: user._id
//         },
//     });
//     res.status(200).json(obj);
// }

// // async function upsert(req, res) {
// //     const { id }  = req.query;
// //     delete req.body.id;
// //     // req.body.status = (parseInt(req.body.status) == 1)? true :false ;
// //     let obj = await prisma.realEstate.upsert({
// //       where: {
// //         id,
// //       },
// //       update: {
// //         ...req.body,
// //       },
// //       create: {
// //         ...req.body,
// //       },
// //     });
// //     res.status(200).json(obj);
// //   }

async function remove(req, res) {
  let obj = await prisma.realEstate.delete({ where: { id: req.query.id } });
  res.status(200).json(obj);
}
