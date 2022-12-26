import { NextApiRequest } from "next";
import jwt, { JwtPayload } from 'jsonwebtoken';
export async function sign(payload: object, secret: string): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 24 * 3600;
    return jwt.sign(
        payload,
        secret,
        {
            expiresIn: exp,
        }
    );
}

export async function verify(req: NextApiRequest, secret: string): Promise<string | JwtPayload> {
    const token = String(req.headers.authorization).replace(/^Bearer\s+/, "")
    return jwt.verify(token, secret);
}