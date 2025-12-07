import { Gauge, Users } from "lucide-react";
import type { Privilege } from "@/types/application";

export type Navigation = {
  component: "title" | "item" | "group";
  name: string;
  to?: string;
  icon?: React.ReactElement;
  items?: Navigation[];
  privilege?: Privilege;
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
