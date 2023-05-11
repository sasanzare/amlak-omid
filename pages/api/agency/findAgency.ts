import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    get(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

async function get(req, res) {
  const obj = await prisma.agency.findMany({
    where: {
      isActive: true,
      name: {
        contains: req.body.name,
      },
    },
    select: {
      id: true,
      name: true,
      agencyImage: true,
      rate: {
        select: {
          rate: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  const agencies = obj.map((agency) => {
    const totalRate = agency.rate.reduce((acc, curr) => acc + curr.rate, 0);
    const avgRate = totalRate / agency.rate.length;
    return { ...agency, rate: avgRate };
  });

  res.status(200).json(agencies);
}
