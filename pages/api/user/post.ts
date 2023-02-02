import type { NextApiRequest, NextApiResponse } from 'next'
export default async function upsert(   req: NextApiRequest,
    res: NextApiResponse,) {
        let obj;
        if (req.method === "POST"){
            let id = req.body.id || '';
            delete req.body.id;
            obj = await prisma.user.upsert({
                where: {
                    id,
                },
                update: {
                    ...req.body
                },
                create: {
                    ...req.body
                },
            });
        }   

        res.status(200).json(obj);
}

    