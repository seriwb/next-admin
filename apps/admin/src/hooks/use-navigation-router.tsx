"use client";

import { createContext, useCallback, useContext, useTransition } from "react";
import { useRouter } from "next/navigation";

type NavigationProgressContextType = {
  push: (href: string) => void;
  replace: (href: string) => void;
  back: () => void;
};

const NavigationProgressContext = createContext<NavigationProgressContextType>({
  push: (_href: string) => {
    return;
  },
  replace: (_href: string) => {
    return;
  },
  back: () => {
    return;
  },
});

type Props = {
  children: React.ReactNode;
};

// router.push/replace/back をラップしてページ遷移中にプログレスバーを表示するプロバイダー
export const NavigationProgressProvider = ({ children }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const push = useCallback(
    (href: string) => {
      startTransition(() => {
        router.push(href);
      });
    },
    [router]
  );

  const replace = useCallback(
    (href: string) => {
      startTransition(() => {
        router.replace(href);
      });
    },
    [router]
  );

  const back = useCallback(() => {
    startTransition(() => {
      router.back();
    });
  }, [router]);

  return (
    <NavigationProgressContext.Provider value={{ push, replace, back }}>
      {isPending && <span className="fixed top-0 left-0 z-100 h-0.5 w-0 animate-indicator-bar bg-ring" />}
      {children}
    </NavigationProgressContext.Provider>
  );
};

// router.push/replace/back の代わりに使うフック（遷移中にプログレスバーを表示）
export const useNavigationRouter = () => useContext(NavigationProgressContext);
