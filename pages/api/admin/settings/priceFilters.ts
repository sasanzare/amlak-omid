import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Handle GET request to fetch price filters
        try {
            const priceFilters = await prisma.priceFilter.findMany();
            const serializedPriceFilters = priceFilters.map(filter => ({
                ...filter,
                minValue: filter.minValue.toString(),
                maxValue: filter.maxValue.toString(),
            }));
            res.status(200).json(serializedPriceFilters);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'POST') {
        // Handle POST request to create a new price filter
        const { minValue, maxValue } = req.body;
        try {
            // Convert BigInt values to string
            const serializedMinValue = minValue
            const serializedMaxValue = maxValue

            const settings = await prisma.setting.findFirst();
            if (!settings) {
                res.status(404).json({ error: 'Settings not found' });
                return;
            }

            // Check for overlapping filters
            const overlappingFilters = await prisma.priceFilter.findMany({
                where: {
                    settingId: settings.id,
                    OR: [
                        {
                            minValue: {
                                lte: serializedMaxValue,
                            },
                            maxValue: {
                                gte: serializedMinValue,
                            },
                        },
                        {
                            minValue: {
                                gte: serializedMinValue,
                                lte: serializedMaxValue,
                            },
                        },
                        {
                            minValue: {
                                lte: serializedMinValue,
                            },
                            maxValue: {
                                gte: serializedMaxValue,
                            },
                        },
                    ],
                },
            });

            if (overlappingFilters.length > 0) {
                res.status(401).json({ error: 'فیلترهای قیمت با یکدیگر تداخل دارند' });
                return;
            }

            const createdPriceFilter = await prisma.priceFilter.create({
                data: {
                    minValue: serializedMinValue,
                    maxValue: serializedMaxValue,
                    setting: {
                        connect: {
                            id: settings.id,
                        },
                    },
                },
            });
            const serializedPriceFilter = {
                ...createdPriceFilter,
                minValue: createdPriceFilter.minValue.toString(),
                maxValue: createdPriceFilter.maxValue.toString(),
            };

            res.status(201).json(serializedPriceFilter);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'PUT') {
        // Handle PUT request to update an existing price filter
        const { id, minValue, maxValue } = req.body;
        try {
            // Convert BigInt values to string
            const serializedMinValue = Number(minValue)
            const serializedMaxValue = Number(maxValue)
            console.log(typeof serializedMaxValue)

            const settings = await prisma.setting.findFirst();
            if (!settings) {
                res.status(404).json({ error: 'Settings not found' });
                return;
            }

            const overlappingFilters = await prisma.priceFilter.findMany({
                where: {
                    settingId: settings.id,
                    id: { not: id },
                    OR: [
                        {
                            minValue: {
                                lte: serializedMaxValue,
                            },
                            maxValue: {
                                gte: serializedMinValue,
                            },
                        },
                        {
                            minValue: {
                                gte: serializedMinValue,
                                lte: serializedMaxValue,
                            },
                        },
                        {
                            minValue: {
                                lte: serializedMinValue,
                            },
                            maxValue: {
                                gte: serializedMaxValue,
                            },
                        },
                    ],
                },
            });

            if (overlappingFilters.length > 0) {
                res.status(401).json({ error: 'فیلترهای قیمت با یکدیگر تداخل دارند' });
                return;
            }

            const updatedPriceFilter = await prisma.priceFilter.update({
                where: { id },
                data: {
                    minValue: serializedMinValue,
                    maxValue: serializedMaxValue,
                },
            });
            const serializedPriceFilter = {
                ...updatedPriceFilter,
                minValue: updatedPriceFilter.minValue.toString(),
                maxValue: updatedPriceFilter.maxValue.toString(),
            };

            res.status(201).json(serializedPriceFilter);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'DELETE') {
        // Handle DELETE request to delete a price filter
        const { id } = req.body;
        try {
            await prisma.priceFilter.delete({
                where: { id },
            });
            res.status(200).json({ message: 'فیلتر قیمت با موفقیت حذف شد' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
