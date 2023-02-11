import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    if (req.method === "DELETE") {
        remove(req, res)
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}

async function remove(req, res) {
    let obj = await prisma.cityArea.delete({ where: { id: req.query.id } });
    res.status(200).json(obj);
}
