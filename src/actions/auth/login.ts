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
