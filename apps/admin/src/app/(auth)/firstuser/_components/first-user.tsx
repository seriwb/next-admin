"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { createNewAccount } from "../_lib/actions";
import { type FirstUserFormInput, firstUserFormSchema } from "../_lib/schemas";

export const FirstUser = () => {
  const router = useRouter();
  const form = useForm<FirstUserFormInput>({
    resolver: zodResolver(firstUserFormSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { isSubmitting } = form.formState;
  const [errorMessage, setErrorMessage] = useState("");

  const signUpSubmit = async (data: FirstUserFormInput) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Password and Verify password are different.");
      return;
    }

    try {
      const result = await createNewAccount({
        username: data.username,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      if (!result.success) {
        setErrorMessage(result.error || "");
        return;
      }

      const account = await signIn.email({
        email: data.username,
        password: data.password,
      });

      if (account?.error) {
        setErrorMessage(account.error.message || "");
      } else if (account.data.user) {
        router.push("/dashboard");
      }
      setErrorMessage("");
    } catch (e) {
      console.error(e);
      setErrorMessage("Sign up failed. Try again or contact support.");
    }
  };

  return (
    <div className="w-[400px] border border-border bg-white px-8 pt-4 pb-8 max-md:mx-auto max-md:mt-4 max-md:w-[90%]">
      <h1 className="mb-4 pb-4 text-3xl leading-tight">Register first user</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signUpSubmit)}
          className="mt-8 flex flex-col gap-6 max-md:mb-8 max-md:w-full max-md:p-0"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ID (Email)
                  <span className="text-destructive"> *</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="sample@sample.com" autoComplete="username" autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Password
                  <span className="text-destructive"> *</span>
                </FormLabel>
                <FormControl>
                  <Input type="password" placeholder="enter password..." autoComplete="new-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Verify password
                  <span className="text-destructive"> *</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="enter verify password..."
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errorMessage && <p className="m-0 text-sm leading-5 font-medium text-destructive">{errorMessage}</p>}
          <div className="mt-6 max-md:flex max-md:w-full max-md:justify-center">
            <div className="w-[130px]">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 animate-spin" size={16} />}
                register
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
