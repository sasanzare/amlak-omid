// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { stdout } from 'process';
import prisma from '../../../lib/prisma';
var jwt = require('jsonwebtoken');

// type Data = {
//   name: any,

// }
// type ResponseData = {
//   errors: any
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,

) {
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

    let token = jwt.sign(
      {
        phoneNumber,
        _id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    console.log(jwt.verify(token, process.env.JWT_SECRET))
    res.status(200).json({ token });
  }
}
