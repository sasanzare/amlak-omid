import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function get(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    let obj;
    if (req.method === "GET") {
         obj = await prisma.cityArea.findMany({
            include: {
                city: true,
              },
           
              orderBy: {
                createdAt: "desc",
              },

            skip: 0,
            take: 20,
        });
        res.status(200).json(obj);
    }
    
}