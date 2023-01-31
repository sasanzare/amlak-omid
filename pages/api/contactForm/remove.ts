import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
   
 
export default async function removeForm(   req: NextApiRequest,
    res: NextApiResponse,) {
    let obj
    if (req.method === "DELETE"){
            obj = await prisma.contactFrom.delete({ where: { id:req.query.id } });
    
    }
    res.status(200).json(obj);
}
