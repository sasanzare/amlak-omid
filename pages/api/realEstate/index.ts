import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import { parseForm } from "../../../lib/parse-form";
import { verify } from '../../../lib/jwt-provider';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    if (req.method === "GET") {
        get(req, res)
    }
    else if (req.method === "POST") {
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
    let obj = await prisma.realEstate.findMany({
        // where: {
        //     name: { contains: req.query.name },
        //     phoneNumber: { contains: req.query.phoneNumber },
        //     description: { contains: req.query.description },
        //     roomCount: { equals: req.query.roomCount },
        //     assignmentType: { equals: req.query.assignmentType },
        //     type: { equals: req.query.type },
        //     price: { equals: req.query.price },
        //     areaName: { contains: req.query.areaName },
        //     cityName: { contains: req.query.cityName },
        //     longitude: { contains: req.query.longitude },
        //     latitude: { contains: req.query.latitude },
        //     isActive: { equals: req.query.isActive },

        // },
        // orderBy: [
        //     {
        //         createdAt: req.query.dateSort , //'desc',
        //     },

        //   ],
        select: {
            id: true,
            name: true,
            phoneNumber: true,
            description: true,
            roomCount: true,
            meter: true,
            Photos: true,
            assignmentType: true,
            type: true,
            price: true,
            areaName: true,
            cityName: true,
            latitude: true,
            longitude : true,
            createdAt: true,
            isActive: true,
            AdStatus: true,
            cityArea:{
                select:{
                    name: true
                }
            }
          },


        skip: 0,
        take: 20,
    });
    res.status(200).json(obj);
}

async function upsert(req, res) {
    const uploadDirCategory = 'advertising'
    const { fields, files } = await parseForm(req, uploadDirCategory);
    const media = JSON.stringify(files.media.filepath).split("advertising/")[1].replace('"','');
    const user = await verify(req, String(env.JWT_SECRET));
    const estateId : string = String(fields.id) || '';
    delete fields.id;
    let obj = await prisma.realEstate.upsert({
        where: {
            id: estateId,
        },
        update: {
            ...fields,
            Photos: media
        },
        create: {
            ...fields,
            Photos: media,
            userId: user._id
        },
    });
    res.status(200).json(obj);
}

async function remove(req, res) {
    let obj = await prisma.realEstate.delete({ where: { id: req.query.id } });
    res.status(200).json(obj);
}
