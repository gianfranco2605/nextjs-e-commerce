'use server';

import prisma from '@/lib/prisma';
import bycryptjs from 'bcryptjs';

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLocaleLowerCase(),
        password: bycryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      user: user,
      message: 'User Created Successfully',
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'User already exists',
    };
  }
};
