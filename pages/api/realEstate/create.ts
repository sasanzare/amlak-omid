import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import { parseForm } from "../../../lib/parse-form";
import { verify } from '../../../lib/jwt-provider';

export default async function upsert(
    req: NextApiRequest,
    res: NextApiResponse,

) {
 if (req.method === "POST") {
    console.log("kir")
    const uploadDirCategory = 'advertising'
    const { fields, files } = await parseForm(req, uploadDirCategory);
    const media = JSON.stringify(files.media.filepath).split("advertising/")[1].replace('"','');
    const gallery = JSON.stringify(files.gallery.filepath).split("advertising/")[1].replace('"','');
    const user = await verify(req, String(env.JWT_SECRET));
    const estateId : string = String(fields.id) || '';
    delete fields.id;
    console.log("khar")
    let obj = await prisma.realEstate.upsert({
        where: {
            id: estateId,
        },
        update: {
            ...fields,
            estateImage: media,
            Photos:gallery
        },
        create: {
            ...fields,
            estateImage: media,
            Photos: gallery,
            userId: user._id
        },
    });
    res.status(200).json(obj);
    }else(
       console.log("fuck")
    )
}


