"use client";

import { useLinkStatus } from "next/link";

// ページ遷移中にプログレスバーを表示するインディケーター
export const LinkIndicator = () => {
  const { pending } = useLinkStatus();

  if (!pending) {
    return null;
  }

  return <span className="fixed top-0 left-0 z-100 h-0.5 w-0 animate-indicator-bar bg-ring" />;
};
