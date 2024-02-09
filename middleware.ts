import { NextRequest, NextResponse } from "next/server";

export default async function middelware(req: NextRequest, res: NextResponse) {

  console.log('>> middleware >> req.url', req.nextUrl.pathname);

  return NextResponse.next();

}