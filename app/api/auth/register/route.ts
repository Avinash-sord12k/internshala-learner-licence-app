import UserModel, { User } from '@/db/Modals/User';
import { cahchedConnect } from '@/db/connect';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  cahchedConnect();
  try {
    const data = (await req.json()) as User;
    console.log("🚀 ~ POST ~ data:", data)

    const user = new UserModel(data);
    await user.save();


    return NextResponse.json({
      status: 200,
      message: 'User registered successfully',
      ok: true,
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: 'User registration failed',
      ok: false,
      error: (error as any)?.message
    }, {
      status: 400
    });
  }
}