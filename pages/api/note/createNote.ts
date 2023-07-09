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
    create(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

async function create(req: NextApiRequest, res: NextApiResponse) {
  const { fields } = await parseForm(req);
  const user = await verify(req, String(env.JWT_SECRET));
  console.log(user)
  const obj = await prisma.note.create({
    data: {
      ...fields,
      userId: user._id,
    },
  });

  res.status(200).json(obj);
}
