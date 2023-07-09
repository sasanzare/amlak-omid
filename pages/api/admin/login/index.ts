import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'

import { env } from "process";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,

) {
  if (req.method === "POST") {
    login(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}


async function login(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body
  // Validate user's credentials

  // $2a$10$A0avMr7BAnUSuh6An8FP.ut7OJKzk97viYJBO/CzD5Xkp/JCCje3W

  //   const salt = bcrypt.genSaltSync(10);

  //   // Hash the password using the salt
  //   const hashedPassword = bcrypt.hashSync(username, salt);

  //   console.log(hashedPassword);



  // const isValidUsername = await bcrypt.compare(username, "2a$10$vcGhRymgRJ.pOZwshMCgV.tI9c78SMJ3CfxypQTFN5CoB8JHZ/br2")
  const isValid = true
  const isValidUsername = true
  // const isValid = await bcrypt.compare(password, "$2a$10$A0avMr7BAnUSuh6An8FP.ut7OJKzk97viYJBO/CzD5Xkp/JCCje3W")
  if (isValidUsername) {
    if (isValid) {
      const token = jwt.sign({ username, password }, String(env.JWT_SECRET), { expiresIn: '1h' })
      console.log(token)
      res.status(200).json({ token })
    } else {
      res.status(401).json({ message: 'نام کاربری یا کلمه عبور اشتباه است!' })
    }
    // const token = jwt.sign({ username }, 'secretKey', { expiresIn: '1h' })
    // res.status(200).json({ token })
  } else {
    res.status(401).json({ message: 'نام کاربری یا کلمه عبور اشتباه است!' })
  }
}



