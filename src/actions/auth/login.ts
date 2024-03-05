'use server';
import { signIn } from '@/auth.config';
import { sleep } from '@/utils';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success';
  } catch (error) {
    if ((error as any).type === 'CredentialsSignin') {
      return 'CredentialsSignin';
    }
    console.log(error);

    return 'Unknown Error';
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password });
    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Invalid credentials',
    };
  }
};
