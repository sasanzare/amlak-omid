import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { verify } from '../../../lib/jwt-provider';
import { env } from 'process';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        getSavedRealEstates(req, res)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getSavedRealEstates = async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        // Retrieve the user's saved real estates
        const reqUser = await verify(req, String(env.JWT_SECRET));
        console.log(reqUser)
        const user = await prisma.user.findUnique({
            where: { id: reqUser._id },
            include: { save: { include: { realEstate: true } } },
        });


        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const savedRealEstates = user.save.map((save) => save.realEstate);

        return res.status(200).json(savedRealEstates);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

