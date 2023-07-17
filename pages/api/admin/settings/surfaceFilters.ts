import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Handle GET request to fetch surface filters
        try {
            const surfaceFilters = await prisma.surfaceFilter.findMany();
            res.status(200).json(surfaceFilters);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'POST') {
        // Handle POST request to create a new surface filter
        const { minValue, maxValue } = req.body;
        try {
            const settings = await prisma.setting.findFirst();
            if (!settings) {
                res.status(404).json({ error: 'Settings not found' });
                return;
            }

            // Check for overlapping filters
            const overlappingFilters = await prisma.surfaceFilter.findMany({
                where: {
                    settingId: settings.id,
                    OR: [
                        {
                            minValue: {
                                lte: maxValue,
                            },
                            maxValue: {
                                gte: minValue,
                            },
                        },
                        {
                            minValue: {
                                gte: minValue,
                                lte: maxValue,
                            },
                        },
                        {
                            minValue: {
                                lte: minValue,
                            },
                            maxValue: {
                                gte: maxValue,
                            },
                        },
                    ],
                },
            });

            if (overlappingFilters.length > 0) {
                res.status(401).json({ error: 'فیلترهای مساحت با یکدیگر تداخل دارند' });
                return;
            }

            const createdSurfaceFilter = await prisma.surfaceFilter.create({
                data: {
                    minValue,
                    maxValue,
                    setting: {
                        connect: {
                            id: settings.id,
                        },
                    },
                },
            });
            res.status(201).json(createdSurfaceFilter);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'PUT') {
        // Handle PUT request to update an existing surface filter
        const { id, minValue, maxValue } = req.body;
        try {
            const settings = await prisma.setting.findFirst();
            if (!settings) {
                res.status(404).json({ error: 'Settings not found' });
                return;
            }

            const overlappingFilters = await prisma.surfaceFilter.findMany({
                where: {
                    settingId: settings.id,
                    id: { not: id },
                    OR: [
                        {
                            minValue: {
                                lte: maxValue,
                            },
                            maxValue: {
                                gte: minValue,
                            },
                        },
                        {
                            minValue: {
                                gte: minValue,
                                lte: maxValue,
                            },
                        },
                        {
                            minValue: {
                                lte: minValue,
                            },
                            maxValue: {
                                gte: maxValue,
                            },
                        },
                    ],
                },
            });

            if (overlappingFilters.length > 0) {
                res.status(401).json({ error: 'فیلترهای مساحت با یکدیگر تداخل دارند' });
                return;
            }

            const updatedSurfaceFilter = await prisma.surfaceFilter.update({
                where: { id },
                data: {
                    minValue,
                    maxValue,
                },
            });
            res.status(200).json(updatedSurfaceFilter);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'DELETE') {
        // Handle DELETE request to delete a surface filter
        const { id } = req.body;
        try {
            await prisma.surfaceFilter.delete({
                where: { id },
            });
            res.status(200).json({ message: 'فیلتر مساحت با موفقیت حذف شد' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
