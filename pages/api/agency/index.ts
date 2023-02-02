import { check, validationResult } from 'express-validator';
import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process';
import initMiddleware from '../../../lib/init-middleware';
import { verify } from '../../../lib/jwt-provider';
import prisma from '../../../lib/prisma';
import validateMiddleware from '../../../lib/validate-middleware';

const validateBody = initMiddleware(
    validateMiddleware([
        check('name').isString().notEmpty(),
        check('cityAreaId').isString().notEmpty()
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
    let obj = await prisma.agency.findMany({
        // where: {
        //     name: { contains: req.query.name },
        //     // isActive: { equals: req.query.isActive },
        //     // status: { equals: req.query.status },

        // },
        // orderBy: [
        //     {
        //         createdAt: req.query.dateSort , //'desc',
        //     },

        //   ],

     

        select: {
            id: true,
            name: true,
            agencyImage: true,
            phoneNumber: true,
            latitude: true,
            longitude : true,
            createdAt: true,
            isActive: true,
            status: true,
            RealEstate: true,
            agents: true,
            rate: true,
            owner: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
            cityArea:{
                select:{
                    name: true
                }
            }
          },

        // skip: 0,
        // take: 20,
    });
    res.status(200).json(obj);
}

async function upsert(req, res) {
    const owner = await verify(req, String(env.JWT_SECRET))
    let id = req.body.id || '';
    delete req.body.id;
    let obj = await prisma.agency.upsert({
        where: {
            id,
        },
        update: {
            ...req.body,
            ownerId: owner._id
        },
        create: {
            ...req.body,
            ownerId: owner._id
        },
    });
    res.status(200).json(obj);
}

async function remove(req, res) {
    let obj = await prisma.agency.delete({ where: { id: req.query.id } });
    res.status(200).json(obj);
}
