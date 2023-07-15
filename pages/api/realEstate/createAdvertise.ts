import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";
import prisma from "../../../lib/prisma";
import { parseForm } from "../../../lib/parse-form";
import { verify } from "../../../lib/jwt-provider";
import moment from 'jalali-moment';

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
    try {
      const obj = await update(req, res);
      console.log(obj)
      res.status(200).json(obj);
    }
    catch (error) {
      console.log(error)
      res.status(400).json(error)
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// async function createRealEstate (fields,user,estateImage) {
async function createRealEstate(user, fields, estateImage) {
    console.log(fields)
    // var date = new DateObject({date:fields?.expirationDate,calendar:persian,locale:persian_en});
    const date = moment(fields.expirationDate, 'jYYYY/jMM/jDD').toDate();
    console.log(date)

  const estateId: string = String(fields.id) || '';
  const realEstate = await prisma.realEstate.upsert({
    where: {
      id: estateId,
    },
    update: {
      ...fields,
      expirationDate:date,
      isActive: Boolean(fields.isActive),
      estateImage: estateImage
    },
    create: {
      ...fields,
      expirationDate:date,
      userId: user._id,
      isActive: Boolean(fields.isActive),
      estateImage: estateImage
    },
  })
  console.log(realEstate)
  return realEstate.id;
}

async function createGallery(data) {
  const createGallery = await prisma.gallery.createMany({
    data: data,
  });
  return createGallery;
}


async function update(req: NextApiRequest, res: NextApiResponse) {
  const user = await verify(req, String(env.JWT_SECRET));
  const uploadDirCategory = "advertising";
  const { fields, files } = await parseForm(req, uploadDirCategory);
  let estateImage = null;
  let data = new Array();
  // const user = await verify(req, String(env.JWT_SECRET));
  let isActive = fields.isActive
  if (files.media.length == undefined) {
    estateImage = JSON.stringify(files.media.filepath).split("advertising/")[1].replace('"', "");
    // const realEstate = createRealEstate(fields,user,estateImage);
    const realEstate = createRealEstate(user, fields, estateImage);
    console.log(await realEstate)
    console.log('here')
    return realEstate
  } else {
    estateImage = JSON.stringify(files.media[0].filepath).split("advertising/")[1].replace('"', "");
    // createRealEstate(fields,user,estateImage).then((id) => {
    return createRealEstate(user, fields, estateImage).then((id) => {
      console.log(`New post created with ID: ${id}`)
      for (let i = 1; i < files.media.length; i++) {
        data[i] = { "realEstateId": id, "Photos": JSON.stringify(files.media[i].filepath).split("advertising/")[1].replace('"', "") };

      }
      const gallery = createGallery(data)
      return id

    }).catch((err) => {
      console.error(err)
      throw error

    })

  }
}




// import type { NextApiRequest, NextApiResponse } from "next";
// import { env } from "process";
// import prisma from "../../../lib/prisma";
// import { parseForm } from "../../../lib/parse-form";
// import { verify } from "../../../lib/jwt-provider";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// interface RealEstateFields {
//   [key: string]: string | number;
// }

// interface GalleryPhoto {
//   realEstateId: number;
//   Photos: string;
// }

// async function createRealEstate(fields: RealEstateFields, userId: number, estateImage: string): Promise<number> {
//   const realEstate = await prisma.realEstate.create({
//     data: {
//       ...fields,
//       userId,
//       estateImage,
//     },
//   });
//   return realEstate.id;
// }

// async function createGallery(data: GalleryPhoto[]): Promise<unknown> {
//   return prisma.gallery.createMany({
//     data,
//   });
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
//   if (req.method !== "POST") {
//     res.status(405).send(`The HTTP ${req.method} method is not supported at this route.`);
//     return;
//   }

//   const uploadDirCategory = "advertising";
//   const { fields, files } = await parseForm(req, uploadDirCategory);
//   const user = await verify(req, String(env.JWT_SECRET));
//   const estateImage = JSON.stringify(files.media[0].filepath).split("advertising/")[1].replace('"', "");
//   const realEstateId = await createRealEstate(fields, user._id, estateImage);

//   const galleryData: GalleryPhoto[] = [];
//   for (let i = 1; i < files.media.length; i++) {
//     galleryData[i - 1] = { realEstateId, Photos: JSON.stringify(files.media[i].filepath).split("advertising/")[1].replace('"', "") };
//   }
//   const gallery = await createGallery(galleryData);

//   res.status(200).json(gallery);
// }