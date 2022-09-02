
    import type { NextApiRequest, NextApiResponse } from 'next'

    import prisma from '../../../lib/prisma';
    
 
    export default async function handler(
      req: NextApiRequest,
      res: NextApiResponse,
    
    ) {
        let searchList = await prisma.cityArea.findMany({
            where:{
                name:{
                    contains: req.query.text
                }
            }
        })
        res.status(200).json(searchList);
    }
    