import { Dispatch, SetStateAction, useState } from 'react';
import { clsx } from 'clsx';
import { SearchText } from '@/components/search-text';
import { SelectField } from '@/components/select-field';
import ss from './condition.module.scss';

type Props = {
  query: URLSearchParams;
  setQuery: Dispatch<SetStateAction<URLSearchParams>>;
};

export const Condition = (props: Props) => {
  const [name, setName] = useState(props.query.get('query'));
  const [sort, setSort] = useState(props.query.get('sort'));

  return (
    <div className={ss.container}>
      <div className={ss.search}>
        <SearchText value={name} setValue={setName} placeholder='Search for account name...' />
      </div>
      <SelectField options={[]} value={sort} setValue={setSort} />
    </div>
  );
};
