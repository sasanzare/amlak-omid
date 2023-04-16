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

  let obj = await prisma.agencyRatingInterface.upsert({
    where: {
        userId: user._id,
        agencyId : fields.agencyId
    },
    update: {
        ...fields,
    },
    create: {
        ...fields,
        userId: user._id,
        
    },
  });

  res.status(200).json(obj);
}


