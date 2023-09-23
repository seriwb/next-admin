'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/buttons';
import { TextInput } from '@/components/forms';
import { ErrorMessages, LoginUser } from '@/features/auth';
import ss from './signin.module.scss';

type SignInForm = {
  username: string;
  password: string;
};

type Props = {
  user?: LoginUser;
};

export const SignIn = ({ user }: Props) => {
  const [errorType, setErrorType] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    mode: 'onBlur',
  });

  const signInSubmit = handleSubmit(async (data: SignInForm) => {
    const result = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
    });

    if (result?.error) {
      setErrorType(result.error);
    } else if (result?.ok) {
      router.refresh();
    }
  });

  const error = errorType && (ErrorMessages[errorType] ?? ErrorMessages.default);

  return (
    <div className={ss.container}>
      <h1 className={ss.title}>Sign in</h1>
      {user && user.status === 'suspend' && (
        <div className={ss.error}>
          <p className={ss.message}>Your account has been suspended for the following reasons:</p>
          <p className={ss.message}>f</p>
        </div>
      )}
      <form className={ss.form}>
        <TextInput
          name='username'
          label='ID (Email)'
          validate={{ maxLength: 128 }}
          placeholder='sample@sample.com'
          errorMessage={errors?.username?.message}
          autoComplete='username'
          autoFocus={true}
          register={register}
        />
        <TextInput
          name='password'
          type='password'
          label='Password'
          validate={{ maxLength: 128 }}
          placeholder='enter password...'
          autoComplete='current-password'
          errorMessage={errors?.password?.message}
          register={register}
        />
        {error && <p>{error}</p>}
        <div className={ss.box}>
          <div className={ss.login}>
            <Button label='sign in' loading={isSubmitting} onClick={signInSubmit} />
          </div>
        </div>
      </form>
      <div className={ss.box}>
        <Link className={ss.forget} href={'/auth/password/request'}>
          Forgot password?
        </Link>
      </div>
    </div>
  );
};
