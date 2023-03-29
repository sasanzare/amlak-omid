import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    const queryText = String(req.query.text)
    let searchList = await prisma.article.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: queryText
                    }
                },
                {
                    summary: {
                        contains: queryText
                    }
                },
                {
                    title: {
                        contains: queryText
                    }
                }
            ]
        }
    })
    res.status(200).json(searchList);
}
