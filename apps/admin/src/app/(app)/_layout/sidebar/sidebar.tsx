import React from "react";
import Link from "next/link";
import clsx from "clsx";
import SimpleBar from "simplebar-react";
import { APP_NAME } from "@/constants/application";
import type { Navigation } from "./_nav";
import ss from "./sidebar.module.scss";

type Props = {
  pathname: string;
  navigation: Navigation[];
};

export const Sidebar = (props: Props) => {
  return (
    <div className={ss.container}>
      <Link href="/">
        <div className={ss.brand}>{APP_NAME}</div>
      </Link>
      <div className={ss.nav}>
        <SimpleBar>
          <div className={ss.navList}>
            {props.navigation.map((item, index) => navItem(item, index, props.pathname))}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

const navItem = (item: Navigation, index: number, pathname: string) => {
  const { component, name, to, icon, items } = item;

  const isActive = component === "item" && !items;
  return (
    <React.Fragment key={index}>
      {to ? (
        <Link href={to}>
          <div
            className={clsx(
              ss.navLink,
              isActive && pathname.startsWith(to) && ss.active,
              component === "item" && ss.selected
            )}
          >
            {icon && icon}
            {name && name}
          </div>
        </Link>
      ) : (
        <div
          className={clsx(
            ss.navLink,
            isActive && ss.active,
            component === "title" && ss.title,
            component === "item" && ss.selected
          )}
        >
          {icon && icon}
          {name && name}
        </div>
      )}
    </React.Fragment>
  );
};
