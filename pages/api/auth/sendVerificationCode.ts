// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Kavenegar from "kavenegar";
import prisma from '../../../lib/prisma';
import { SmsProvider } from '../../../lib/sms-provider';
import initMiddleware from '../../../lib/init-middleware'
import validateMiddleware from '../../../lib/validate-middleware'
import { check, validationResult } from 'express-validator'

const validateBody = initMiddleware(
  validateMiddleware([
    check('phoneNumber').isMobilePhone("fa-IR"),
  ], validationResult)
)
type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | any>,

) {
  try {
    await validateBody(req, res)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { phoneNumber } = req.body;
    const verificationCode = String(Math.floor(Math.random() * 100000));
    try {
      await prisma.tempUser.upsert({
        where: {
          phoneNumber,
        },
        update: { verificationCode: verificationCode.toString() },
        create: {
          phoneNumber,
          verificationCode: verificationCode.toString()
        },
      })
    }
    catch (error) {
      console.log(error)
    }
    try {
      const smsProvider = new SmsProvider()
      smsProvider.sendMessage(`کد تایید با موفقیت ارسال شد ! ${verificationCode}`, [phoneNumber])
    }
    catch (error) {
      console.log(error)
    }
    res
      .status(200)
      .json({ message: "کد تایید با موفقیت ارسال شد !" + verificationCode });
  } catch (ex) {
    let errors = ex.message.split(",").map((item) => {
      let error = item.split(":");
      return error[error.length - 1];
    });
    res.status(400).json({ errors });
    // console.log(errors);
  }
}
