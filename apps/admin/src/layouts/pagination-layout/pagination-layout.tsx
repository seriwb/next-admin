import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { ParsedUrlQuery } from 'querystring';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@/components/pagination';
import { PER_PAGE } from '@/constants/application';
import { OffsetPaginator } from '@/types/api';
import ss from './pagination-layout.module.scss';

export type RowProps<T> = { data: T };

type Props<T> = {
  data: OffsetPaginator<T> | undefined;
  errorMessage?: string;
  isLoading: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>; // TODO: Isn't it unnecessary if I fly it?
  // query: ParsedUrlQuery;
  // setQuery: Dispatch<SetStateAction<ParsedUrlQuery>>;

  Condition?: React.ReactNode;
  Header?: React.ReactNode;
  headers?: { name: string; width?: string }[];
  Row: ({ data }: RowProps<T>) => React.ReactNode;
};

export const PaginationLayout = function <T>(props: Props<T>) {
  const router = useRouter();
  const pathname = usePathname();
  // const params = useSearchParams();
  // const currentPage = params.get('page');
  // const [page, setPage] = useState(currentPage ? parseInt(currentPage) : 0);
  // const [query, setQuery] = useState<URLSearchParams>(new URLSearchParams(params));
  const ref = useRef<HTMLDivElement>(null);
  const scrollTop = useCallback(() => {
    ref?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  // useEffect(() => {
  //   query.set('page', page.toString());
  //   setQuery(query);
  // }, [page]);

  // useEffect(() => {
  //   router.push(`${pathname}?${query}`);
  // }, [pathname, query, router]);

  const total = props.data?.total ?? 0;
  const countMessage = `${total} results`;

  if (props.errorMessage) {
    return <>{props.errorMessage}</>;
  }

  return (
    <div className={ss.container}>
      <div className={ss.condition}>{props.Condition}</div>
      <div className={ss.content}>
        <p className={ss.results}>{countMessage}</p>
        <table className={ss.table}>
          {props.Header && (
            <thead className={ss.head}>
              <tr className={ss.header}>{props.Header}</tr>
            </thead>
          )}
          <tbody className={ss.body}>
            {props.isLoading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : props.data && props.data.total > 0 ? (
              props.data.rows.map((v: T, i: number) => (
                <tr key={i} className={ss.row}>
                  <props.Row data={v} />
                </tr>
              ))
            ) : (
              <tr>
                <td>No results</td>
              </tr>
            )}
          </tbody>
        </table>
        {total > 0 && (
          <div className={ss.paginationBox}>
            <Pagination
              className={ss.pagination}
              page={props.page}
              totalNumber={total}
              perPage={PER_PAGE}
              onPaging={(page) => {
                props.setPage(page);
                scrollTop();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
