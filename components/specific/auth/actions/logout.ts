'use server';

import SessionModel from "@/db/Modals/Session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const logout = async () => {
  console.log('logout called from context/actions/logout.ts');

  const cookieStore = cookies();

  try {
    const token = cookieStore.get('token')?.value;
    console.log({token});
    await SessionModel.findOneAndUpdate({ token }, {
      $set: {
        expiresAt: new Date()
      }
    });
    cookieStore.delete('token');

    
  } catch (error) {
    console.log('error', error);
    throw new Error('User not found');
  }
  
  return redirect('/');
}