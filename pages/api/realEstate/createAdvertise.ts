import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";
import prisma from "../../../lib/prisma";
import { parseForm } from "../../../lib/parse-form";
import { verify } from "../../../lib/jwt-provider";

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
    update(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

async function createRealEstate (fields,user,estateImage) {
    const realEstate = await prisma.realEstate.create({
        data: {
            ...fields,
            userId :  user._id,
            estateImage : estateImage
    
        },
      })
    return realEstate.id;
  }

async function createGallery (data) {
    const createGallery = await prisma.gallery.createMany({
        data: data,
      });
    return createGallery;
  }


async function update(req: NextApiRequest, res: NextApiResponse) {
  const uploadDirCategory = "advertising";
  const { fields, files } = await parseForm(req, uploadDirCategory);
    let estateImage = null;
    let data = new Array();
    const user = await verify(req, String(env.JWT_SECRET));

    if(files.media.length == undefined){
         estateImage = JSON.stringify(files.media.filepath).split("advertising/")[1].replace('"', "");
        const realEstate = createRealEstate(fields,user,estateImage);
        res.status(200).json(realEstate);
    }else{
         estateImage = JSON.stringify(files.media[0].filepath).split("advertising/")[1].replace('"', "");
        createRealEstate(fields,user,estateImage).then((id) => {
            console.log(`New post created with ID: ${id}`)
            for (let i = 1; i < files.media.length; i++) {
                data[i] = { "realEstateId": id, "Photos": JSON.stringify(files.media[i].filepath).split("advertising/")[1].replace('"', "") };
                
             }
             const gallery = createGallery(data)
             res.status(200).json(gallery);

          }).catch((err) => {
            console.error(err)
            res.status(200).json(err);

          })

    } 
}


