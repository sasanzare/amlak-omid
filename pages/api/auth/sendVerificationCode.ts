// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const Kavenegar = require("kavenegar");
import prisma from '../../../lib/prisma';

const api = Kavenegar.KavenegarApi({
  apikey:
    "6841684B7A3576694F63544743304F6257666D2F4A7A4F4F4A376367566F745334394236366F2F556748733D",
});


type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,

) {
  try {
    const { phoneNumber } = req.body;

    const verificationCode = Math.floor(Math.random() * 100000);

   await prisma.tempUser.upsert({
      where: {
         phoneNumber,
      },
      update:{  verificationCode: verificationCode.toString() },
      create: {
        phoneNumber,
        verificationCode:verificationCode.toString()
      },
    })
  
    api.VerifyLookup(
      {
        receptor: phoneNumber,
        token: verificationCode,
        template: "verify",
      },
      function (response, status) {
        console.log(response);
        console.log(status);
      }
    );
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
