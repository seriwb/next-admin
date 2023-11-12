import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import ROUTES from './_routes';
import ss from './breadcrumb.module.scss';

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

    location.split('/').reduce((prev, curr, index, array) => {
      const currentPath = `${prev}/${curr}`;
      const route = ROUTES.find((route) => route.path === currentPath);

      const regexp = /\[(.*?)\]/g; // ex:[id]
      let realpath = route?.path || '';
      const param = realpath.match(regexp);
      if (param) {
        const regexp2 = /\[(.*?)\]/; // ex:id
        for (let i = 0; i < param.length; i++) {
          const bracketValue = param[i] as string;
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const id = bracketValue.match(regexp2)![1];
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
    <div className={ss.container}>
      <div className={ss.item}>
        <Link href='/'>Home</Link>
      </div>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <React.Fragment key={index}>
            <span className={ss.separator}>{">"}</span>
            {breadcrumb.active ? (
              <div className={clsx(ss.item, ss.active)}>{breadcrumb.name}</div>
            ) : (
              <div className={ss.item}>
                <Link href={breadcrumb.href}>{breadcrumb.name}</Link>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
