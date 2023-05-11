import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    get(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

async function get(req, res) {
  const obj = await prisma.agency.findMany({
    where: { isActive: true },
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
  });

  const sortedAgencies = obj.sort((a, b) => {
    const aTotalRate = a.rate.reduce((acc, curr) => acc + curr.rate, 0);
    const aAvgRate = aTotalRate / a.rate.length;
    const bTotalRate = b.rate.reduce((acc, curr) => acc + curr.rate, 0);
    const bAvgRate = bTotalRate / b.rate.length;
    return bAvgRate - aAvgRate;
  });

  const top5Agencies = sortedAgencies.slice(0, 6);

  const agencies = top5Agencies.map((agency) => {
    const totalRate = agency.rate.reduce((acc, curr) => acc + curr.rate, 0);
    const avgRate = totalRate / agency.rate.length;
    return { ...agency, rate: avgRate };
  });

  res.status(200).json(agencies);
}
