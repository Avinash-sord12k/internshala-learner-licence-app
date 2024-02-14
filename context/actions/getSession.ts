'use server';
import UserModel from '@/db/Modals/User';
import { cahchedConnect } from '@/db/connect';
import { headers } from 'next/headers';

export const getSession = async () => {
  console.log('getSession called from context/actions/getSession.ts');
  const headerList = headers();
  const userId = headerList.get('userId');

  try {
    await cahchedConnect();
    const userData = (await UserModel.findById(userId)).toObject();
    if (!userData) throw new Error('User not found');
    const { password, __v, ...user } = userData;
    return {
      ...user,
    };

  } catch (error) {
    console.log('error', error);
    throw new Error('User not found');
  }
}