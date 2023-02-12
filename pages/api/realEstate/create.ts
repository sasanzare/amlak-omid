import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';
import prisma from '../../../lib/prisma';
import { parseForm } from "../../../lib/parse-form";
import { verify } from '../../../lib/jwt-provider';


export const config = {
    api: {
        bodyParser: false,
    },
};
export default async function upsert(
    req: NextApiRequest,
    res: NextApiResponse,

) {
 if (req.method === "POST") {
    // console.log(typeof req.body.isActive)
    const uploadDirCategory = 'advertising';

    const { fields, files } = await parseForm(req, uploadDirCategory);
    const media = JSON.stringify(files.media.filepath).split("advertising/")[1].replace('"','');
    // const photo = JSON.stringify(files.photo.filepath).split("advertising/")[1].replace('"','');
    const user = await verify(req, String(env.JWT_SECRET));
    const estateId : string = String(fields.id) || '';
    delete fields.id;
    console.log(typeof fields.isActive)
    const isActive = (fields.isActive === "true")? true : false;
    let obj = await prisma.realEstate.upsert({
        where: {
            id: estateId,
        },
        update: {
            ...fields,
            estateImage: media,
            isActive
            // gallery: photo
        },
        create: {
            ...fields,
            estateImage: media,
            // gallery: photo,
            userId: user._id,
            isActive
        },
    });
    res.status(200).json(obj);
    }else{
       console.log("fuck")
    }
    
}



// export default async function upsert(
//     req: NextApiRequest,
//     res: NextApiResponse,

// ) {
//  if (req.method === "POST") {
//     let id = req.body.id || '';
//     delete req.body.id;
//     // req.body.status = (parseInt(req.body.status) == 1)? true :false ;
//     let obj = await prisma.realEstate.upsert({
//       where: {
//         id,
//       },
//       update: {
//         ...req.body,
//       },
//       create: {
//         ...req.body,
//       },
//     });
//     res.status(200).json(obj);
//     }else{
//        console.log("fuck")
//     }
    
// }


