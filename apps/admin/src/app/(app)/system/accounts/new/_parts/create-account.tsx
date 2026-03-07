"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigationRouter } from "@/hooks/use-navigation-progress";
import { createAccountAction } from "./actions";
import { type CreateAccountInput, createAccountSchema } from "./lib";

export const CreateAccount = () => {
  const { push, back } = useNavigationRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<CreateAccountInput>({
    resolver: zodResolver(createAccountSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      privilege: "Normal",
    },
  });
  const { isSubmitting } = form.formState;

  const onSubmit = async (data: CreateAccountInput) => {
    setErrorMessage("");
    try {
      const result = await createAccountAction(data);
      if (result.success) {
        toast.success("アカウントを作成しました");
        push("/system/accounts");
      } else {
        setErrorMessage(result.error || "");
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            form.setError(field as keyof CreateAccountInput, { message: errors[0] });
          });
        }
      }
    } catch (e) {
      console.error(e);
      setErrorMessage("アカウントの作成に失敗しました");
    }
  };

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>新規アカウント作成</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    メールアドレス
                    <span className="text-destructive"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="sample@example.com" autoComplete="username" autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名前</FormLabel>
                  <FormControl>
                    <Input placeholder="山田 太郎" {...field} />
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
                    パスワード
                    <span className="text-destructive"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="4文字以上" autoComplete="new-password" {...field} />
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
                    パスワード（確認）
                    <span className="text-destructive"> *</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="パスワードを再入力" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privilege"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    権限
                    <span className="text-destructive"> *</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="権限を選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Owner">Owner</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage && <p className="text-sm font-medium text-destructive">{errorMessage}</p>}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => back()} disabled={isSubmitting}>
                キャンセル
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 animate-spin" size={16} />}
                作成する
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
