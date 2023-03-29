
import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process';
import initMiddleware from '../../../lib/init-middleware';
import { verify } from '../../../lib/jwt-provider';
import prisma from '../../../lib/prisma';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    if (req.method === "DELETE") {
        let obj = await prisma.agency.delete({ where: { id: req.query.id } });
        res.status(200).json(obj);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}
