import { startTransition, useId, useState } from 'react';
import { useDebounce } from 'react-use';
import ss from './search-text.module.scss';

type Props = {
  label?: string;
  value?: string | null;
  placeholder?: string;
  setValue: (value: string) => void;
};

export const SearchText = ({ label, value, setValue, placeholder }: Props) => {
  const searchId = useId();
  const [input, setInput] = useState(value ?? '');

  useDebounce(
    () => {
      startTransition(() => {
        setValue(input);
      });
    },
    1000,
    [input],
  );

  return (
    <div className={ss.container}>
      {label && (
        <label className={ss.label} htmlFor={searchId}>
          {label}
        </label>
      )}
      <input
        className={ss.search}
        type='search'
        id={searchId}
        placeholder={placeholder || 'search...'}
        value={input}
        onChange={({ currentTarget }) => {
          setInput(currentTarget.value);
        }}
      />
    </div>
  );
};
