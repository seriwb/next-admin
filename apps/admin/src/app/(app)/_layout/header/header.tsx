"use client";

import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Dropdown, DropdownMenu, DropdownToggle } from "@/components/dropdown";
import { signOut } from "@/lib/auth-client";
import ss from "./header.module.scss";

export const Header = () => {
  const router = useRouter();

  const handleSignout = async () => {
    const ok = confirm("ログアウトしてもよろしいですか？");
    if (ok) {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/signin?code=SignOut");
          },
        },
      });
    }
  };

  return (
    <div className={ss.container}>
      <div className={ss.nav}>
        <div className={ss.navLeft}></div>
        <div className={ss.navRight}>
          <Dropdown>
            <DropdownToggle>
              <div className={ss.dropdownIcon}>
                <User size={40} />
              </div>
            </DropdownToggle>
            <DropdownMenu position="right">
              <div className={ss.dropdownMenu}>
                <h3 className={ss.title}>設定</h3>
                <div className={ss.menu}>
                  メニュー
                  <div className={ss.divider} />
                  <div className={ss.item} onClick={handleSignout}>
                    <LogOut size={18} />
                    ログアウト
                  </div>
                </div>
              </div>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className={ss.divider} />
      <div className={ss.breadcrumb}>
        <Breadcrumb />
      </div>
    </div>
  );
};
