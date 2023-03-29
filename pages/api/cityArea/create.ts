import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import initMiddleware from '../../../lib/init-middleware';
import validateMiddleware from '../../../lib/validate-middleware';
import { check, validationResult } from 'express-validator';

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
    if (req.method === "POST") {
        await validateBody(req, res)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }
        upsert(req, res)
    }else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
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

