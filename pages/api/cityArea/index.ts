import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import initMiddleware from '../../../lib/init-middleware';
import validateMiddleware from '../../../lib/validate-middleware';
import { check, validationResult } from 'express-validator';
import { env } from 'process';

const validateBody = initMiddleware(
    validateMiddleware([
        check('name').isString().notEmpty(),
        check('cityId').isString().notEmpty()
    ], validationResult)
)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    console.log(env.DATABASE_URL)
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
    let obj = await prisma.cityArea.findMany({
        // where: {
        //     name: { contains: req.query.name },

        // },
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
    let obj = await prisma.cityArea.upsert({
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
    let obj = await prisma.cityArea.delete({ where: { id: req.query.id } });
    res.status(200).json(obj);
}
