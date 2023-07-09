import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { verify } from '../../../lib/jwt-provider';
import { env } from 'process';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { rentid } = req.query;
        console.log(req.headers)
        console.log(rentid)
        const reqUser = await verify(req, String(env.JWT_SECRET));

        console.log(rentid)
        console.log(reqUser)
        // Find the user and real estate property
        const [user, realEstate] = await Promise.all([
            prisma.user.findUnique({
                where: { id: reqUser._id },
                include: { save: true },
            }),
            prisma.realEstate.findUnique({ where: { id: rentid } }),
        ]);
        console.log(user)
        console.log(realEstate)

        if (!user || !realEstate) {
            return res.status(404).json({ message: 'User or Real Estate not found' });
        }

        // Check if the real estate is already saved by the user
        const isSaved = await prisma.save.findFirst({
            where: { userId: user.id, realEstateId: realEstate.id },
        });

        if (isSaved) {
            const removedSave = await prisma.save.delete({
                where: { id: isSaved.id },
            });
            return res.status(200).json({
                message: 'ملک از لیست ذخیره‌ها حذف شد',
                isSaved: false
            });
        }

        // Add the real estate to the user's save array
        const obj = await prisma.save.create({
            data: {
                userId: user.id,
                realEstateId: realEstate.id,
            },
        });
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                save: {
                    create: {
                        realEstateId: realEstate.id,
                    }
                },
            },
            include: { save: true },
        });

        return res.status(200).json({
            message: 'ملک به لیست ذخیره‌ها اضافه شد',
            isSaved: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
