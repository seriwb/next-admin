import { Gauge, Users } from "lucide-react";

export type Navigation = {
  component: "title" | "item" | "group";
  name: string;
  to?: string;
  icon?: React.ReactElement;
  items?: Navigation[];
  privilege?: string;
};

/**
 * セッションのprivilege値に基づいてナビゲーションをフィルタリング
 * privilegeが未設定のアイテムは全ユーザーに表示
 */
export const filterNavigationByPrivilege = (nav: Navigation[], userPrivilege: string): Navigation[] => {
  return nav.filter((item) => !item.privilege || item.privilege === userPrivilege);
};

// ここに追加した場合は、パンくずコンポーネントも編集してください
const _nav: Navigation[] = [
  {
    component: "item",
    name: "Dashboard",
    to: "/dashboard",
    icon: <Gauge size={18} />,
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
    icon: <Users size={18} />,
    privilege: "SuperAdmin",
  },
];
export default _nav;
