import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function getById(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    let obj;
    if (req.method === "GET") {
         obj = await prisma.cityArea.findMany({
            // where: { cityId: req.query.cityId }    
            
            where: {
                cityId: {
                  contains: req.query.cityId  /* Optional filter */,
                },
              }, 



        });
        res.status(200).json(obj);
    }
}