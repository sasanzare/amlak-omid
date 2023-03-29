import { check, validationResult } from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next'
import initMiddleware from '../../../lib/init-middleware';

import prisma from '../../../lib/prisma';
import validateMiddleware from '../../../lib/validate-middleware';

const validateBody = initMiddleware(
    validateMiddleware([
        check('name').isString()
    ], validationResult)
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    if (req.method === "GET") {
        get(req, res)
    }
    else if (req.method === "POST") {
        await validateBody(req, res)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        upsert(req, res)
    }
    else if (req.method === "DELETE") {
        remove(req, res)
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}
//schema.definitions[table].properties[current]
async function get(req, res) {
    let obj = await prisma.city.findMany({
        where: {
            name: { contains: req.query.name },

        },
        // orderBy: [
        //     {
        //         createdAt: req.query.dateSort , //'desc',
        //     },

        //   ],


        select: {
            id: true,
            name: true,
            createdAt: true,
            cityArea:{
                select:{
                    name: true
                }
            }
          },
        orderBy: {
            createdAt: "desc",
          },
        skip: 0,
        take: 20,
    });
    res.status(200).json(obj);
}

async function upsert(req, res) {
    let id = req.body.id || '';
    delete req.body.id;
    let obj = await prisma.city.upsert({
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
    res.status(200).json(obj);
}

async function remove(req, res) {
    let obj = await prisma.city.delete({ where: { id: req.query.id } });
    res.status(200).json(obj);
}
