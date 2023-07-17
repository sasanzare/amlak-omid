import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma';
import { faker } from '@faker-js/faker'
import { AdStatus, assignmentType, meter, propertyType, requestStatus, role, roomCount } from '@prisma/client';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,

) {
    if (req.method === "GET") {
        const obj = await drop()
        res.status(200).json({ status: "ok" });
    }
    else if (req.method === "POST") {
        res.status(200).json({ "status": "ok" });
    }
    else if (req.method === "DELETE") {
        res.status(200).json({ "status": "ok" });
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`
        )
    }
}
async function drop() {
    // Generate fake data
    try {
        await prisma.$queryRaw`SET CONSTRAINTS ALL DEFERRED`;
        await prisma.city.deleteMany({})
        await prisma.cityArea.deleteMany({})
        await prisma.article.deleteMany({})
        await prisma.contactFrom.deleteMany({})
        await prisma.faq.deleteMany({})
        await prisma.user.deleteMany({})
        await prisma.agency.deleteMany({})
        await prisma.agentInterface.deleteMany({})
        await prisma.realEstate.deleteMany({})
        await prisma.$queryRaw`SET CONSTRAINTS ALL IMMEDIATE`;
        await console.log('All models dropped successfully!');
    } catch (error) {
        console.error('Error droping data:', error);
    } finally {
        // Disconnect the Prisma client
        await prisma.$disconnect();
    }
}