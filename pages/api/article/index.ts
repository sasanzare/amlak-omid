import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process';
import prisma from '../../../lib/prisma';
import { parseForm } from "../../../lib/parse-form";
import { verify } from '../../../lib/jwt-provider';

export const config = {
    api: {
        bodyParser: false,
    },
};

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
    let obj = await prisma.article.findMany({
        where: {
            title: { contains: req.query.title },
            summary: { contains: req.query.summary },
            text: { contains: req.query.text },
            normalName: { contains: req.query.normalName },
            articleImage: { contains: req.query.articleImage },

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

async function upsert(req: NextApiRequest, res: NextApiResponse) {
    const uploadDirCategory = 'articles'
    const { fields, files } = await parseForm(req, uploadDirCategory);
    const media = files.media
    const user = await verify(req, String(env.JWT_SECRET))
    const articleId: string = String(fields.id) || '';
    delete fields.id;
    const obj = await prisma.article.upsert({
        where: {
            id: articleId,
        },
        update: {
            ...fields,
            articleImage: media.newFilename
        },
        create: {
            ...fields,
            articleImage: media.newFilename,
            userId: user._id
        },
    });
    res.status(200).json(obj);
}

async function remove(req, res) {
    let obj = await prisma.article.delete({ where: { id: req.query.id } });
    res.status(200).json(obj);
}
