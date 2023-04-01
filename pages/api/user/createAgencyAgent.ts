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

function createDate(id, agentOf) {
  let data = new Array();
  agentOf.forEach(function (value, i) {
    data[i] = { "userId": id, "agencyId": value };
  });
  return data;
}

async function update(req: NextApiRequest, res: NextApiResponse) {
  const uploadDirCategory = "users";
  const { fields, files } = await parseForm(req, uploadDirCategory);
  const nationalImage = JSON.stringify(files.media[0].filepath)
    .split("users/")[1]
    .replace('"', "");
  const userImage = JSON.stringify(files.media[1].filepath)
    .split("users/")[1]
    .replace('"', "");
  const user = await verify(req, String(env.JWT_SECRET));
  const nationalCode = parseInt(fields.nationalCode);
  const postalCode = parseInt(fields.postalCode);
  const agentOf = fields.agentOf.split(",");
  const firstName = fields.firstName;
  const lastName = fields.lastName;
  const address = fields.address;

  let obj = await prisma.user.update({
    where: {
      id: user._id,
    },
    data: {
      firstName,
      lastName,
      address,
      nationalImage,
      userImage,
      nationalCode,
      postalCode,
      role: "agencyAgent",
    },
  });
  const createMany = await prisma.agentInterface.createMany({
    data: createDate(user._id, agentOf),
  });
  res.status(200).json(obj,createMany);
}
