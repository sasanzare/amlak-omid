// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { stdout } from 'process';
import prisma from '../../../lib/prisma';
var jwt = require('jsonwebtoken');
import initMiddleware from '../../../lib/init-middleware'
import validateMiddleware from '../../../lib/validate-middleware'
import { check, validationResult } from 'express-validator'
import { sign } from '../../../lib/jwt-provider';

const validateBody = initMiddleware(
  validateMiddleware([
    check('phoneNumber').isMobilePhone("fa-IR"),
    check('verificationCode').isString(),
  ], validationResult)
)


/**
 * @swagger
 * /api/auth:
 *   post:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,

) {
  await validateBody(req, res)
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  var { phoneNumber, verificationCode } = req.body
  var tempUser = await prisma.tempUser.findFirst({
    where: {
      phoneNumber: { equals: phoneNumber },
      verificationCode: { equals: verificationCode }
    },
  });
  if (!tempUser) {
    res.status(400).json({
      errors: ["احراز هویت تایید نشد !"]
    });
  } else {
    console.log(phoneNumber)
    prisma.tempUser.delete({ where: { id: tempUser.id } });

    var user = await prisma.user.upsert({
      where: {
        phoneNumber,
      },
      update: {
        lastLogin: new Date(),
      },
      create: {
        phoneNumber,
        role: 'normal',
      },
    })

    let token = await sign(
      {
        phoneNumber,
        _id: user.id,
        role: user.role
      }, String(process.env.JWT_SECRET));
    res.status(200).json({ token });
  }
}
