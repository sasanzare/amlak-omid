import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { parseForm } from "../../../lib/parse-form";
import { verify } from "../../../lib/jwt-provider";
import { env } from "process";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    get(req, res);
  } else if (req.method === "POST") {
    // upsert(req, res)
  } else if (req.method === "DELETE") {
    remove(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

async function get(req, res) {
  const { id } = req.query;
  let { number } = req.query;
  let obj = null;
  if (id) {
    let isSaved
    if (req.headers.authorization) {
      const user = await verify(req, String(env.JWT_SECRET));
      console.log(user)
      isSaved = await prisma.save.findFirst({
        where: { userId: user._id, realEstateId: id },
      });
      console.log(isSaved)
      isSaved = isSaved ? true : false
    }
    obj = await prisma.realEstate.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        description: true,
        roomCount: true,
        meter: true,
        estateImage: true,
        assignmentType: true,
        type: true,
        price: true,
        latitude: true,
        longitude: true,
        createdAt: true,
        isActive: true,
        AdStatus: true,
        cityArea: {
          select: {
            id: true,
            name: true,
          },
        },
        city: {
          select: {
            name: true,
          },
        },
        agency: {
          select: {
            name: true,
            agencyImage: true,
          },
        },
        gallery: true
      },
    });
    console.log(isSaved)
    const myshit = { ...obj, isSaved }
    console.log(myshit)
    if (isSaved == true) {
      res.status(200).json(myshit);
    }
    else {
      res.status(200).json(obj);
    }
  } else {
    obj = await prisma.realEstate.findMany({
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        description: true,
        roomCount: true,
        meter: true,
        estateImage: true,
        assignmentType: true,
        type: true,
        price: true,
        latitude: true,
        longitude: true,
        createdAt: true,
        isActive: true,
        AdStatus: true,
        cityArea: {
          select: {
            id: true,
            name: true,
          },
        },
        city: {
          select: {
            name: true,
          },
        },
        agency: {
          select: {
            name: true,
            agencyImage: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },

      skip: 0,
      take: parseInt(number) ? parseInt(number) : 20,
    });
    res.status(200).json(obj);
  }
}

async function remove(req, res) {
  let obj = await prisma.realEstate.delete({ where: { id: req.query.id } });
  res.status(200).json(obj);
}
