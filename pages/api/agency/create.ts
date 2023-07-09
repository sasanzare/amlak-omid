import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from 'process';
import prisma from '../../../lib/prisma';
import { parseForm } from '../../../lib/parse-form';
import { verify } from '../../../lib/jwt-provider';
import { requestStatus } from '@prisma/client';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const uploadDirCategory = 'agency';
        const { fields, files } = await parseForm(req, uploadDirCategory);
        const media = JSON.stringify(files.media.filepath).split('agency/')[1].replace('"', '');
        const agencyId: string = String(fields.id) || '';
        delete fields.id;
        const isActive = fields.isActive === 'true';
        const obj = await prisma.agency.upsert({
            where: {
                id: agencyId,
            },
            update: {
                ...fields,
                agencyImage: media,
                isActive,
            },
            create: {
                ...fields,
                agencyImage: media,
                isActive,
                status: requestStatus.pending,
                // userId: user._id
            },
        });
        res.status(200).json(obj);
    } else {
        throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
    }
}
