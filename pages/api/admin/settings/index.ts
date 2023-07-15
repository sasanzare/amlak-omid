// pages/api/settings.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Handle GET request to fetch settings
        try {
            const settings = await prisma.setting.findMany();
            res.status(200).json(settings);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'PUT') {
        // Handle PUT request to update settings
        const { priceFiltersMin, priceFiltersMax, surfaceFiltersMin, surfaceFiltersMax } = req.body;
        try {
            const updatedSettings = await prisma.setting.update({
                where: { id: 'your-setting-id' }, // Replace with the actual setting ID
                data: {
                    priceFiltersMin,
                    priceFiltersMax,
                    surfaceFiltersMin,
                    surfaceFiltersMax,
                },
            });
            res.status(200).json(updatedSettings);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
