import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from "process";
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // const token = res.cookies.get('tokenAdmin')
  const token = req.cookies.get('token')
  if (!token && req.nextUrl.pathname.startsWith('/Admin')){
    return NextResponse.rewrite(new URL('/Admin/login', req.url))
  }
  return res;
}