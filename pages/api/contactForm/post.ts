import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
   
export default  async function upsertContact(req: NextApiRequest,
    res: NextApiResponse,) {
        let obj;
        if (req.method === "POST"){
            let id = req.body.id || '';
            delete req.body.id;
            obj = await prisma.contactFrom.upsert({
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

