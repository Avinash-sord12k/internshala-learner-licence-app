import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
// import { withContext } from "./context";

const allowedKeys = [
  'email',
  'role',
  'userId',
];

export default async function middelware(req: NextRequest, res: NextResponse) {

  console.log('>> middleware >> req.url', req.nextUrl.pathname);

  const token = req.cookies.get('token')?.value;
  console.log('-> token: ', token);

  if (!token) {
    console.log('-> no cookie');
    return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  if (!secret) {
    console.log('-> no secret');
    return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  }

  const reqHeaders: any = {};

  try {
    const dataInToken = await jwtVerify(token, secret);
    console.log('-> dataInToken: ', dataInToken);

    for (const key of allowedKeys) {
      if (!dataInToken?.payload[key]) {
        throw new Error(`Value for ${key} is undefined`);
      }

      if (req.headers.get(key) || req.nextUrl.searchParams.get(key)) {
        throw new Error(`Key ${key} is being spoofed. Blocking this request.`);
      }
      reqHeaders[key] = (dataInToken.payload as any)[key];
    }

    return NextResponse.rewrite(req.nextUrl.href, {
      headers: {
        ...req.headers,
        ...reqHeaders,
      },
      statusText: 'rewritten in api',
    });

  } catch (error) {
    console.log('-> error: ', error);
    return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  }


}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
}