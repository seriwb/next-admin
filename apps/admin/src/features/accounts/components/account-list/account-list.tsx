import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PaginationLayout, RowProps } from '@/layouts/pagination-layout';
import { trpc } from '@/server/trpc';
import { AccountSummary } from '../../types';
import ss from './account-list.module.scss';
import { Condition } from './condition';

export const AccountList = () => {
  const [page, setPage] = useState(1);
  const params = useSearchParams();
  const [query, setQuery] = useState<URLSearchParams>(new URLSearchParams(params));
  const { data, error, isLoading } = trpc.account.list.useQuery({
    page: page, //parseInt(params.get('page') || '0'),
    perPage: 20,
  });

  return (
    <PaginationLayout<AccountSummary>
      data={data}
      errorMessage={error?.message}
      isLoading={isLoading}
      page={page - 1}
      setPage={setPage}
      Condition={<Condition query={query} setQuery={setQuery} />}
      Header={Header}
      Row={Row}
    />
  );
};

const Header = (
  <>
    <td className={ss.account}>account</td>
    <td className={ss.privilege}>privilege</td>
    <td></td>
  </>
);

const Row = ({ data }: RowProps<AccountSummary>) => {
  return (
    <>
      <td className={ss.account}>
        <Link href={`/system/accounts/${data.id}`}>{data.email}</Link>
        <p>{data.name}</p>
      </td>
      <td className={ss.privilege}>{data.privilege}</td>
      <td></td>
    </>
  );
};
