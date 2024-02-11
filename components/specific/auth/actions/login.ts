'use server'

import SessionModel from "@/db/Modals/Session";
import UserModel from "@/db/Modals/User";
import { cahchedConnect } from "@/db/connect";
import loginResolver from "@/resolvers/LoginResolver";
import { SignInDto } from "@/types/Auth.types";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export const loginAction = async (data: SignInDto) => {
  await cahchedConnect();
  try {
    const validatedData = await loginResolver.validate(data);

    const user = await UserModel.findOne({ email: validatedData.email });

    if (!user) {
      throw new Error("User not found");
    }

    const comparePassword = await bcrypt.compare(user.password, data.password);
    if (comparePassword) {
      throw new Error("Invalid password");
    }

    // if session already exists, use it
    const newSession = await SessionModel.findOne({ email: user.email, expiresAt: { $gt: new Date() } });

    const cookie = cookies();
    if (newSession) {
      cookie.set("token", newSession.jwt, {
        httpOnly: true,
        maxAge: 60 * 60 * 2,
        sameSite: "strict",
        secure: true
      });

      return true;
    }

    else {
      // create new session
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const token = await new SignJWT({
        email: user.email,
        role: user.role,
        userId: user.id,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret);

      const newSession = new SessionModel({
        userId: user.id,
        jwt: token,
        expiresAt: new Date(Date.now() + 60 * 60 * 24 * 1000)
      });

      await newSession.save();

      cookie.set("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "strict",
        secure: true
      });

      return true;
    }

  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error)
    throw new Error("User registration failed");
  }
}