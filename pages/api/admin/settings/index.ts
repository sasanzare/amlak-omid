// pages/api/settings.ts

import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Handle GET request to fetch settings
        try {
            const settings = await prisma.setting.findFirst();
            if (!settings) {
                const setting = await prisma.setting.create({ data: {} });
                res.status(200).json(setting);
            }
            res.status(200).json(settings);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'PUT') {
        // Handle PUT request to update settings
        const { priceFiltersMin, priceFiltersMax, surfaceFiltersMin, surfaceFiltersMax, maximumDailyRealEstatesForClient, maximumDailyRealEstatesForAgency, maximumDailyRealEstatesForAgentOfAgencies, maximumNumberOfRooms } = req.body;
        try {
            const existingSettings = await prisma.setting.findFirst();
            if (existingSettings) {
                const updatedSettings = await prisma.setting.update({
                    where: { id: existingSettings.id },
                    data: {
                        priceFiltersMin,
                        priceFiltersMax,
                        surfaceFiltersMin,
                        surfaceFiltersMax,
                        maximumDailyRealEstatesForClient,
                        maximumDailyRealEstatesForAgency,
                        maximumDailyRealEstatesForAgentOfAgencies,
                        maximumNumberOfRooms
                    },
                });
                res.status(200).json(updatedSettings);
            } else {
                const newSetting = await prisma.setting.create({
                    data: {
                        priceFiltersMin,
                        priceFiltersMax,
                        surfaceFiltersMin,
                        surfaceFiltersMax,
                        maximumDailyRealEstatesForClient,
                        maximumDailyRealEstatesForAgency,
                        maximumDailyRealEstatesForAgentOfAgencies,
                    },
                });
                res.status(201).json(newSetting);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
