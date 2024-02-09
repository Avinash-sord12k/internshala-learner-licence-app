import { NextRequest, NextResponse } from 'next/server';

export default async function POST(req: NextRequest, res: NextResponse) {
  const { email, password } = await req.json();
  console.log('-> register', { email, password });
  return NextResponse.json({
    status: 200,
    message: 'User registered successfully',
    ok: true,
  }, {
    status: 200
  });
}