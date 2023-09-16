'use client';

import { useEffect, useState } from 'react';
import { TRPCClientError } from '@trpc/client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/buttons';
import { TextInput } from '@/components/forms';
import { ErrorMessages } from '@/features/auth';
import { trpc } from '@/server/trpc';
import ss from './first-user.module.scss';

type FirstUserForm = {
  username: string;
  password: string;
  confirmPassword: string;
};

export const FirstUser = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FirstUserForm>({
    mode: 'onBlur',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const ret = trpc.account.checkActiveAccountExist.useQuery();
  const { mutateAsync: firstuserMutation } = trpc.account.createFirstuser.useMutation();

  const signUpSubmit = handleSubmit(async (data: FirstUserForm) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage('Password and Verify password are different.');
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newUser = await firstuserMutation({
        username: data.username,
        password: data.password,
      });

      signIn('credentials', {
        redirect: false,
        username: data.username,
        password: data.password,
      }).then((result) => {
        if (result?.error) {
          const message = ErrorMessages[result.error] ?? ErrorMessages.default;
          setErrorMessage(message);
        } else if (result?.ok) {
          router.push('/dashboard');
        }
      });
      setErrorMessage('');
    } catch (e) {
      if (e instanceof TRPCClientError) {
        console.error(e.message);
        setErrorMessage(`Input invalid: ${e.message}`);
      } else {
        console.error(e);
        setErrorMessage('Sign up failed. Try again or contact support.');
      }
    }
  });

  useEffect(() => {
    if (ret.isLoading) {
      return;
    }
    if (ret.data?.existed) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [ret, router]);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className={ss.container}>
      <h1 className={ss.title}>Register first user</h1>
      <form className={ss.form}>
        <TextInput
          name='username'
          label='ID (Email)'
          required={true}
          validate={{
            maxLength: 128,
            validate: (v: string) => {
              if (!/\S+@\S+\.\S+/.test(v)) {
                return 'This field must be in email format.';
              }
            },
          }}
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
          required={true}
          validate={{ maxLength: 128 }}
          placeholder='enter password...'
          autoComplete='current-password'
          errorMessage={errors?.password?.message}
          register={register}
        />
        <TextInput
          name='confirmPassword'
          type='password'
          label='Verify password'
          required={true}
          validate={{
            maxLength: 128,
            validate: (v: string) => {
              if (v !== watch('password')) {
                return 'Passwords do not match.';
              }
            },
          }}
          placeholder='enter verify password...'
          autoComplete='current-password'
          errorMessage={errors?.confirmPassword?.message}
          register={register}
        />
        {errorMessage && <p className={ss.error}>{errorMessage}</p>}
        <div className={ss.register}>
          <div className={ss.button}>
            <Button label='register' loading={isSubmitting} onClick={signUpSubmit} />
          </div>
        </div>
      </form>
    </div>
  );
};
