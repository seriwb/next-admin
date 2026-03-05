// ナビゲーション定義とパンくずルート定義を一元管理するファイル
// 追加・変更時は両方の定数を合わせて更新すること

export type Navigation = {
  component: "title" | "item" | "group";
  name: string;
  to?: string;
  icon?: string; // LucideIconコンポーネント名の文字列
  items?: Navigation[];
  privilege?: string;
};

/**
 * ユーザーの権限でナビゲーションの表示制御を行う
 * privilegeが未設定のアイテムは全ユーザーに表示
 */
export const filterNavigationByPrivilege = (nav: Navigation[], userPrivilege: string): Navigation[] => {
  return nav.filter((item) => !item.privilege || item.privilege === userPrivilege);
};

export const NAVIGATIONS: Navigation[] = [
  {
    component: "item",
    name: "Dashboard",
    to: "/dashboard",
    icon: "Gauge",
  },
  {
    component: "item",
    name: "Users",
    to: "/users",
    icon: "Users",
  },
  {
    component: "title",
    name: "System management",
    privilege: "SuperAdmin",
  },
  {
    component: "item",
    name: "Accounts",
    to: "/system/accounts",
    icon: "Users",
    privilege: "SuperAdmin",
  },
];

export type RouteType = {
  path: string; // routing path
  name: string; // display name
  disable?: boolean; // disabled to click
};

export const BREADCRUMB_ROUTES: RouteType[] = [
  { path: "/", name: "Home" },
  { path: "/dashboard", name: "Dashboard" },
  { path: "/articles", name: "Articles" },
  { path: "/analyses/new", name: "New" },
  { path: "/users", name: "Users" },
  { path: "/users/new", name: "New" },
  { path: "/users/[id]/edit", name: "Edit" },
  { path: "/system", name: `System`, disable: true },
  { path: "/system/accounts", name: "Accounts" },
  { path: "/system/accounts/new", name: "New" },
  { path: "/system/accounts/[id]/edit", name: "Edit" },
];
