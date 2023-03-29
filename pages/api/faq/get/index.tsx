import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../../lib/prisma";

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
  let obj = await prisma.faq.findMany({
    where: {
      status: true,
    },
    select: {
      question: true,
      answer: true,
    },
    orderBy: [
      {
        id: 'asc',
      },
    ],
  });
  res.status(200).json(obj);
}
