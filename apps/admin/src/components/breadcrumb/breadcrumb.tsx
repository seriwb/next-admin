"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BREADCRUMB_ROUTES } from "@/constants/navigation";

type BreadcrumbType = {
  name: string;
  href: string;
  active: boolean;
};

export const Breadcrumb = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbType[]>([]);

  const getBreadcrumbs = (location: string): BreadcrumbType[] => {
    const results: BreadcrumbType[] = [];

    location.split("/").reduce((prev, curr, index, array) => {
      const currentPath = `${prev}/${curr}`;
      const route = BREADCRUMB_ROUTES.find((route) => route.path === currentPath);

      const regexp = /\[(.*?)\]/g; // ex:[id]
      let realpath = route?.path || "";
      const param = realpath.match(regexp);
      if (param) {
        const regexp2 = /\[(.*?)\]/; // ex:id
        for (const bracketValue of param) {
          const id = regexp2.exec(bracketValue)![1];
          const idValue = searchParams.get(id);
          if (idValue) {
            realpath = realpath.replace(bracketValue, idValue);
          }
        }
      }

      if (route?.name) {
        const active: boolean = route?.disable || index + 1 === array.length ? true : false;
        results.push({
          href: realpath || currentPath,
          name: route.name,
          active: active,
        });
      }
      return currentPath;
    });

    return results;
  };

  useEffect(() => {
    const newBreadcrumbs = getBreadcrumbs(pathname);
    setBreadcrumbs(newBreadcrumbs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!breadcrumbs) {
    return null;
  }

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
