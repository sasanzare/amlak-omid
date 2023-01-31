import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import initMiddleware from '../../../lib/init-middleware';
import validateMiddleware from '../../../lib/validate-middleware';
import { check, validationResult } from 'express-validator';

const validateBody = initMiddleware(
  validateMiddleware([
    check('question').isString().notEmpty(),
    check('answer').isString().notEmpty(),
    check('status').isBoolean().optional()
  ], validationResult)
)


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    get(req, res);
  } else if (req.method === "POST") {
    await validateBody(req, res)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
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
  let obj = await prisma.faq.findMany({});
  res.status(200).json(obj);
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
