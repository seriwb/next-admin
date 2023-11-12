import { Dispatch, SetStateAction } from 'react';
import { SearchText } from '@/components/search-text';
import { SelectField } from '@/components/select-field';
import ss from './condition.module.scss';

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
};

export const Condition = (props: Props) => {
  return (
    <div className={ss.container}>
      <div className={ss.search}>
        <SearchText value={props.query} setValue={props.setQuery} placeholder='Search for account...' />
      </div>
      <SelectField options={[]} value={props.sort} setValue={props.setSort} />
    </div>
  );
};
