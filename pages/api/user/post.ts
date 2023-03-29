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
export default async function upsert(   req: NextApiRequest,
    res: NextApiResponse,) {
        let obj;
        if (req.method === "POST"){
            const uploadDirCategory = 'users'
            const { fields, files } = await parseForm(req, uploadDirCategory);
            const media = JSON.stringify(files.media.filepath).split("users/")[1].replace('"','');
            // const user = await verify(req, String(env.JWT_SECRET));
            const userId: string = String(fields.id) || '';
            delete fields.id;
            const isActive = (fields.isActive === "true")? true : false;
            const nationalCode = parseInt(fields.nationalCode);
            obj = await prisma.user.upsert({
                where: {
                    id: userId,
                },
                update: {
                    ...fields,
                    userImage: media,
                    isActive,
                    nationalCode
                },
                create: {
                    ...fields,
                    userImage: media,
                    isActive,
                    nationalCode
                    // userId: user._id
                },
            });

        }   

        res.status(200).json(obj);
}

    


// async function upsert(req: NextApiRequest, res: NextApiResponse) {

//     const uploadDirCategory = 'users'
//     const { fields, files } = await parseForm(req, uploadDirCategory);
//     const media = JSON.stringify(files.media.filepath).split("users/")[1].replace('"','');
//     // const user = await verify(req, String(env.JWT_SECRET));
//     const userId: string = String(fields.id) || '';
//     delete fields.id;
//     const obj = await prisma.user.upsert({
//         where: {
//             id: userId,
//         },
//         update: {
//             ...fields,
//             userImage: media
//         },
//         create: {
//             ...fields,
//             userImage: media,
//             // userId: user._id
//         },
//     });
//     res.status(200).json(obj);
// }