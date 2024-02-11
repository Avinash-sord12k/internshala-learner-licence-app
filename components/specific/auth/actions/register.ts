"use server"
import UserModel from "@/db/Modals/User";
import { cahchedConnect } from "@/db/connect";
import RegisterResolver from '@/resolvers/RegisterResolver';
import { UserInput, UserRole } from "@/types/User.types";
import bcrypt from 'bcrypt';

export const registerAction = async (data: UserInput) => {
  await cahchedConnect();
  try {

    const { password, ...rest } = await RegisterResolver.validate(data);
    console.log("🚀 register action: new user request: ", true);

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      ...rest,
      password: encryptedPassword,
      role: UserRole.USER
    });
    await newUser.save();
    console.log("🚀 new user created email: ", newUser?.email);
    return true;
  } catch (error) {
    console.log("🚀 error in registring user: ", (error as any)?.message)
    throw new Error("Server Error: User registration failed");
  }
}