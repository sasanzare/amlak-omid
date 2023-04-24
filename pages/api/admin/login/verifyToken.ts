import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'
// import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from "process";

export const verifyToken = (handler: (arg0: any, arg1: any) => any) => async (req: { user: string | jwt.JwtPayload }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) => {
  const token = Cookies.get('tokenAdmin')
  try {
    if (!token) throw new Error('Token not found')
    const decodedToken = jwt.verify(token,  String(env.JWT_SECRET))
    req.user = decodedToken
    return handler(req, res)
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}