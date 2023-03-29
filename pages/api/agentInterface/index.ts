import { check, validationResult } from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process';
import initMiddleware from '../../../lib/init-middleware';
import { verify } from '../../../lib/jwt-provider';
import prisma from '../../../lib/prisma';
import validateMiddleware from '../../../lib/validate-middleware';

const validateBody = initMiddleware(
    validateMiddleware([
        check('agencyId').isString().notEmpty()
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
    let obj = await prisma.agentInterface.findMany({
        where: {
            isActive: { equals: req.query.isActive },

        },
        // orderBy: [
        //     {
        //         createdAt: req.query.dateSort , //'desc',
        //     },

        //   ],
        skip: 0,
        take: 20,
    });
    res.status(200).json(obj);
}

async function upsert(req, res) {
    const owner = await verify(req, String(env.JWT_SECRET))
    let id = req.body.id || '';
    delete req.body.id;
    let obj = await prisma.agentInterface.upsert({
        where: {
            id,
        },
        update: {
            ...req.body,
            userId: owner._id
        },
        create: {
            ...req.body,
            userId: owner._id
        },
    });
    res.status(200).json(obj);
}

async function remove(req, res) {
    let obj = await prisma.agentInterface.delete({ where: { id: req.query.id } });
    res.status(200).json(obj);
}
