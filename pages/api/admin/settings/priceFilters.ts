import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Handle GET request to fetch price filters
        try {
            const priceFilters = await prisma.priceFilter.findMany();
            res.status(200).json(priceFilters);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'POST') {
        // Handle POST request to create a new price filter
        const { minValue, maxValue } = req.body;
        try {
            const createdPriceFilter = await prisma.priceFilter.create({
                data: {
                    minValue,
                    maxValue,
                },
            });
            res.status(201).json(createdPriceFilter);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else if (req.method === 'PUT') {
        // Handle PUT request to update an existing price filter
        const { id, minValue, maxValue } = req.body;
        try {
            const updatedPriceFilter = await prisma.priceFilter.update({
                where: { id },
                data: {
                    minValue,
                    maxValue,
                },
            });
            res.status(200).json(updatedPriceFilter);
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
            res.status(200).json({ message: 'Price filter deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
