"use client";

import { Loader2 } from "lucide-react";
import type { AccountSummary } from "@/app/api/admin/accounts/route";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  account: AccountSummary | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const DeleteAccountDialog = ({ account, isDeleting, onConfirm, onCancel }: Props) => {
  return (
    <Dialog open={!!account} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>アカウントを削除しますか？</DialogTitle>
          <DialogDescription>{account?.email} を削除します。この操作は元に戻せません。</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
            キャンセル
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting && <Loader2 className="mr-2 animate-spin" size={16} />}
            削除する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
