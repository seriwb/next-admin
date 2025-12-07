import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { Breadcrumb } from "@/components/breadcrumb";
import { Dropdown, DropdownMenu, DropdownToggle } from "@/components/dropdown";
import ss from "./header.module.scss";

export const Header = () => {
  const handleSignout = () => {
    const ok = confirm("Are you sure you want to sign out?");
    if (ok) {
      signOut();
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
                <h3 className={ss.title}>Settings</h3>
                <div className={ss.menu}>
                  menu
                  <div className={ss.divider} />
                  <div className={ss.item} onClick={handleSignout}>
                    <LogOut size={18} />
                    Sign out
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
