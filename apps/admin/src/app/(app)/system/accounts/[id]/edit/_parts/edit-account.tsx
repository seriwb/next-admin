"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { AccountDetail } from "@/app/api/admin/accounts/[id]/route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { deleteAccountAction, updateAccountAction } from "./actions";
import { type EditAccountInput, editAccountSchema } from "./lib";

type Props = {
  account: AccountDetail;
};

export const EditAccount = ({ account }: Props) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const form = useForm<EditAccountInput>({
    resolver: zodResolver(editAccountSchema),
    mode: "onBlur",
    defaultValues: {
      name: account.name ?? "",
      privilege: account.privilege as "Normal" | "Admin" | "Owner",
      status: account.status as "active" | "inactive" | "suspended",
      caution: account.caution ?? "",
    },
  });
  const { isSubmitting } = form.formState;
  const watchStatus = form.watch("status");

  const onSubmit = async (data: EditAccountInput) => {
    setErrorMessage("");
    try {
      const result = await updateAccountAction(account.id, data);
      if (result.success) {
        toast.success("アカウントを更新しました");
        router.push("/system/accounts");
      } else {
        setErrorMessage(result.error || "");
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            form.setError(field as keyof EditAccountInput, { message: errors[0] });
          });
        }
      }
    } catch (e) {
      console.error(e);
      setErrorMessage("アカウントの更新に失敗しました");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAccountAction(account.id);
      if (result.success) {
        toast.success("アカウントを削除しました");
        router.push("/system/accounts");
      } else {
        toast.error(result.error || "削除に失敗しました");
        setShowDeleteDialog(false);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>アカウント編集</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              {/* メールアドレス（読み取り専用） */}
              <div className="flex flex-col gap-2">
                <label className="text-sm leading-none font-medium">メールアドレス</label>
                <Input value={account.email} disabled />
              </div>

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

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      ステータス
                      <span className="text-destructive"> *</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="ステータスを選択" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">active</SelectItem>
                        <SelectItem value="inactive">inactive</SelectItem>
                        <SelectItem value="suspended">suspended</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchStatus === "suspended" && (
                <FormField
                  control={form.control}
                  name="caution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>注意事項（停止理由）</FormLabel>
                      <FormControl>
                        <Textarea placeholder="停止理由を入力..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {errorMessage && <p className="text-sm font-medium text-destructive">{errorMessage}</p>}

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                  disabled={isSubmitting}
                >
                  削除する
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/system/accounts")}
                    disabled={isSubmitting}
                  >
                    キャンセル
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 animate-spin" size={16} />}
                    保存する
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* 削除確認ダイアログ */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>アカウントを削除しますか？</DialogTitle>
            <DialogDescription>{account.email} を削除します。この操作は元に戻せません。</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isDeleting}>
              キャンセル
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting && <Loader2 className="mr-2 animate-spin" size={16} />}
              削除する
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
