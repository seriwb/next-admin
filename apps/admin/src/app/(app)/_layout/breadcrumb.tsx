"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { BREADCRUMB_ROUTES } from "@/app/(app)/_layout/navigation";
import { Link } from "@/components/link";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbType = {
  name: string;
  href: string;
  active: boolean;
  disabled: boolean;
};

// ルートパスの [xxx] を正規表現のキャプチャグループに変換する
const pathToRegex = (routePath: string): RegExp => {
  const pattern = routePath.replace(/\[([^\]]+)\]/g, "([^/]+)");
  return new RegExp(`^${pattern}$`);
};

export const Breadcrumb = () => {
  const pathname = usePathname();

  const getBreadcrumbs = (location: string): BreadcrumbType[] => {
    const results: BreadcrumbType[] = [];

    location.split("/").reduce((prev, curr, index, array) => {
      const currentPath = `${prev}/${curr}`;
      // [id] のような動的セグメントを含むルートもマッチできるよう正規表現で比較する
      const route = BREADCRUMB_ROUTES.find((route) => pathToRegex(route.path).test(currentPath));

      // route.path の動的セグメント [xxx] を currentPath の実際の値で置換してリンクを生成する
      let realpath = currentPath;
      if (route?.path) {
        const routeSegments = route.path.split("/");
        const currentSegments = currentPath.split("/");
        realpath = route.path;
        routeSegments.forEach((seg, i) => {
          if (/\[.*?\]/.test(seg)) {
            realpath = realpath.replace(seg, currentSegments[i]);
          }
        });
      }

      if (route?.name) {
        const disabled: boolean = route.disable === true;
        const active: boolean = !disabled && index + 1 === array.length;
        results.push({
          href: realpath,
          name: route.name,
          active,
          disabled,
        });
      }
      return currentPath;
    });

    return results;
  };

  const breadcrumbs = useMemo(() => getBreadcrumbs(pathname), [pathname]);

  return (
    <BreadcrumbRoot>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              {breadcrumb.active ? (
                <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
              ) : breadcrumb.disabled ? (
                <span className="transition-colors">{breadcrumb.name}</span>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbRoot>
  );
};
