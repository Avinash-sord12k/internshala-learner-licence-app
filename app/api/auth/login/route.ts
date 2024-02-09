import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/connect";
import Users from "@/db/Modals/User";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import Sessions from "@/db/Modals/Session";


export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest) => {

  const { email, password } = await req.json();
  console.log('-> login', { email, password });

  try {
    await connect();

    const existingUser = await Users.findOne({ email });
    console.log('-> existing user', existingUser);
    console.log('-> existing user', existingUser?.password)
    if (!existingUser) {
      console.log('-> user does not exist');
      return NextResponse.json({
        status: 500,
        message: 'User does not exist',
        ok: false,
      }, { status: 500 });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    console.log('-> is password valid', isPasswordValid);
    if (!isPasswordValid) {
      console.log('-> invalid password');
      return NextResponse.json({
        status: 400,
        message: 'Invalid password',
        ok: false,
      }, { status: 400 });
    }

    const existingSession = await Sessions.findOne({ userId: existingUser._id });
    if (existingSession && existingSession?.expiresAt > new Date()) {
      console.log('-> session already exists');
      return NextResponse.json({
        status: 200,
        message: 'User logged in successfully',
        ok: true,
        isActive: true,
      }, {
        status: 200,
        headers: { 'Set-Cookie': `token=${existingSession.jwt}; path=/; HttpOnly` }
      })
    }

    const secret = new TextEncoder().encode("secret");

    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .setIssuer("marriage-dashboard")
      .setAudience("marriage-dashboard-users")
      .sign(secret);

    await Sessions.create({
      userId: existingUser._id,
      jwt: token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    return NextResponse.json({
      status: 200,
      message: 'User logged in successfully',
      ok: true,
      isActive: true,
    },
      {
        status: 200,
        headers: { 'Set-Cookie': `token=${token}; path=/; HttpOnly` }
      })

  } catch (error) {
    console.log('-> error', error);
    return NextResponse.json({
      status: 500,
      message: 'Internal server error',
      ok: false,
    }, { status: 500 });
  }

};