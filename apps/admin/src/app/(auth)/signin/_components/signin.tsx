"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/buttons";
import { TextInput } from "@/components/forms";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { signIn } from "@/lib/auth-client";
import { ErrorMessages } from "./constants";

type SignInForm = {
  username: string;
  password: string;
};

export const SignIn = () => {
  const [errorType, setErrorType] = useState("");
  const router = useRouter();
  const form = useForm<SignInForm>({
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { errors, isSubmitting } = form.formState;

  const signInSubmit = async (data: SignInForm) => {
    const result = await signIn.email({
      email: data.username,
      password: data.password,
    });

    if (result.error) {
      setErrorType(result.error.code || "CredentialsSignin");
    } else if (result.data) {
      router.refresh();
    }
  };

  const error = errorType && (ErrorMessages[errorType] ?? ErrorMessages.default);

  return (
    <Card className="flex w-[90%] flex-col items-center gap-2 rounded-md bg-primary-foreground p-4 text-start md:w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(signInSubmit)}>
          <TextInput
            name="username"
            label="ID (Email)"
            validate={{ maxLength: 128 }}
            placeholder="sample@sample.com"
            errorMessage={errors?.username?.message}
            autoComplete="username"
            autoFocus={true}
            register={form.register}
          />
          <TextInput
            name="password"
            type="password"
            label="Password"
            validate={{ maxLength: 128 }}
            placeholder="enter password..."
            autoComplete="on"
            errorMessage={errors?.password?.message}
            register={form.register}
          />
          {error && <p className="text-destructive">{error}</p>}
          <div className="flex w-full justify-center md:mt-4">
            <Button className="w-full" type="submit" label="Login" loading={isSubmitting} />
          </div>
        </form>
      </Form>
      <CardFooter className="mt-3">
        <Link className="text-sm font-medium text-[#1b47ac] hover:text-[#0aa1dd]" href={"/password/request"}>
          Forgot password?
        </Link>
      </CardFooter>
    </Card>
  );
};
