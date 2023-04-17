import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";
import prisma from "../../../lib/prisma";
import { parseForm } from "../../../lib/parse-form";
import { verify } from "../../../lib/jwt-provider";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    update(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}



async function update(req: NextApiRequest, res: NextApiResponse) {
  const { fields} = await parseForm(req);
  const user = await verify(req, String(env.JWT_SECRET));
  const rate = parseInt(fields.rate)
  const del = await prisma.agencyRatingInterface.deleteMany({
    where: {
        userId: user._id,
        agencyId : fields.agencyId,
    },
  });

  const obj = await prisma.agencyRatingInterface.create({
    data: {
        userId: user._id,
        agencyId : fields.agencyId,
        rate
    },
  });

  res.status(200).json(obj);
}


