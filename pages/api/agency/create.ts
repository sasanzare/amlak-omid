import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process';
import prisma from '../../../lib/prisma';
import { parseForm } from "../../../lib/parse-form";
import { verify } from '../../../lib/jwt-provider';




export const config = {
    api: {
        bodyParser: false,
    },
};



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    let obj;
 if (req.method === "POST") {
    const uploadDirCategory = 'agency'
    const { fields, files } = await parseForm(req, uploadDirCategory);
    const media = JSON.stringify(files.media.filepath).split("agency/")[1].replace('"','');
    // const user = await verify(req, String(env.JWT_SECRET));
    const agencyId: string = String(fields.id) || '';
    delete fields.id;
    const isActive = (fields.isActive === "true")? true : false;
    const obj = await prisma.agency.upsert({
        where: {
            id: agencyId,
        },
        update: {
            ...fields,
            agencyImage: media,
            isActive
        },
        create: {
            ...fields,
            agencyImage: media,
            isActive
            // userId: user._id
        },
    });


    // const owner = await verify(req, String(env.JWT_SECRET))
    // let id = req.body.id || '';
    // delete req.body.id;
    // obj = await prisma.agency.upsert({
    //     where: {
    //         id,
    //     },
    //     update: {
    //         ...req.body,
    //         ownerId: owner._id
    //     },
    //     create: {
    //         ...req.body,
    //         ownerId: owner._id
    //     },
    // });
    
    }
     else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
    res.status(200).json(obj);
}

