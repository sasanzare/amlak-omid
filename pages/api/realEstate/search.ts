
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,

) {
  console.log(req.body)
  let obj;
  if (req.method === "POST") {
    let list = {};
    if (req.body.type) {
      list = {
        type: req.body.type,
      }
    }
    if (req.body.roomCount) {
      list = Object.assign(list, { roomCount: req.body.roomCount });
    }
    if (req.body.cityId) {
      list = Object.assign(list, { cityId: req.body.cityId });
    }
    if (req.body.cityAreaId) {
      list = Object.assign(list, { cityAreaId: req.body.cityAreaId });
    }
    if (req.body.meter) {
      list = Object.assign(list, { meter: req.body.meter });
    }
    if (req.body.assignmentType) {
      list = Object.assign(list, { assignmentType: req.body.assignmentType });
    }

    // Retrieve the price filter from the database
    const priceFilter = await prisma.priceFilter.findUnique({
      where: {
        id: req.body.price,
      },
    });

    // Apply the price filter if it exists
    if (priceFilter) {
      list = {
        ...list,
        price: {
          gte: priceFilter.minValue,
          lte: priceFilter.maxValue,
        },
      };
    }
    const surfaceFilter = await prisma.surfaceFilter.findUnique({
      where: {
        id: req.body.surface,
      },
    });

    // Apply the price filter if it exists
    if (surfaceFilter) {
      list = {
        ...list,
        meter: {
          gte: surfaceFilter.minValue,
          lte: surfaceFilter.maxValue,
        },
      };
    }


    const { pageNumber = 1, pageSize = 8 } = req.query;

    const skip = (Number(pageNumber) - 1) * Number(pageSize);
    const take = Number(pageSize);

    try {
      const realEstates = await prisma.realEstate.findMany({
        where: list,
        skip,
        take,
      });

      obj = {
        realEstates,
        pageNumber: Number(pageNumber),
        pageSize: Number(pageSize),
      };
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
  }

  res.status(200).json(obj);
}
