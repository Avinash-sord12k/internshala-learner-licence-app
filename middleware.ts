import { NextRequest, NextResponse } from "next/server";

export default async function middelware(req: NextRequest, res: NextResponse) {

  console.log('>> middleware >> req.url', req.nextUrl.pathname);

  // const token = req.cookies.get('token')?.value;
  // console.log('-> token', token);

  // // if there is no cookie, redirect to login
  // if (!token) {
  //   console.log('-> no cookie');
  //   return NextResponse.redirect(`${req.nextUrl.origin}/login`);
  // }

  return NextResponse.next();

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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}