import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";
const jwt = require("jsonwebtoken");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    get(req, res);
  } else if (req.method === "POST") {
    upsert(req, res);
  } else if (req.method === "DELETE") {
    remove(req, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

async function get(req, res) {
  let result;
  if (req.query.id) {
    result = await prisma.faq.findUnique({
      where: {
        id: parseInt(req.query.id),
      },
    });
  } else {
    result = await prisma.faq.findMany({});
  }
  res.status(200).json(result);
}

async function upsert(req, res) {
  let id = parseInt(req.body.id) || 0;
  delete req.body.id;
  // req.body.status = (parseInt(req.body.status) == 1)? true :false ;
  let obj = await prisma.faq.upsert({
    where: {
      id,
    },
    update: {
      ...req.body,
    },
    create: {
      ...req.body,
    },
  });
  res.status(200).json(obj);
}

async function remove(req, res) {
  let obj = await prisma.faq.delete({ where: { id: parseInt(req.query.id) } });
  res.status(200).json(obj);
}
