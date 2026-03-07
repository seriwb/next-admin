"use client";

import { ChevronsUpDown, Gauge, LogOut, type LucideIcon, Shield, User, Users } from "lucide-react";
import { Link } from "@/components/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { APP_NAME } from "@/constants/application";
import { signOut } from "@/lib/auth-client";
import type { Navigation } from "./navigation";

// アイコン名→コンポーネントのマッピング
const iconMap: Record<string, LucideIcon> = {
  Gauge,
  Users,
};

const NavIcon = ({ name }: { name: string }) => {
  const Icon = iconMap[name];
  return Icon ? <Icon /> : null;
};

// ナビゲーション配列をグループに変換するヘルパー
// "title"アイテムでグループ境界を作り、"item"アイテムをグループ内に配置
type NavGroup = {
  label?: string;
  items: Navigation[];
};

const buildNavGroups = (navigation: Navigation[]): NavGroup[] => {
  const groups: NavGroup[] = [];
  let currentGroup: NavGroup = { items: [] };

  for (const item of navigation) {
    if (item.component === "title") {
      // 前のグループにアイテムがあれば保存
      if (currentGroup.items.length > 0 || currentGroup.label) {
        groups.push(currentGroup);
      }
      currentGroup = { label: item.name, items: [] };
    } else if (item.component === "item") {
      currentGroup.items.push(item);
    }
  }

  // 最後のグループを追加
  if (currentGroup.items.length > 0 || currentGroup.label) {
    groups.push(currentGroup);
  }

  return groups;
};

type Props = {
  pathname: string;
  navigation: Navigation[];
  userName: string;
  userEmail: string;
};

export const AppSidebar = ({ pathname, navigation, userName, userEmail }: Props) => {
  const navGroups = buildNavGroups(navigation);

  const handleSignout = async () => {
    const ok = confirm("ログアウトしてもよろしいですか？");
    if (ok) {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/signin?code=SignOut";
          },
        },
      });
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Shield className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{APP_NAME}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group, index) => (
          <SidebarGroup key={index}>
            {group.label && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.to ? pathname.startsWith(item.to) : false}
                    tooltip={item.name}
                  >
                    <Link href={item.to ?? "/"}>
                      {item.icon && iconMap[item.icon] && <NavIcon name={item.icon} />}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent">
                    <User className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{userName}</span>
                    <span className="truncate text-xs">{userEmail}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="top"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted">
                      <User className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{userName}</span>
                      <span className="truncate text-xs">{userEmail}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignout}>
                  <LogOut />
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
