import React from 'react';
import clsx from 'clsx';
import { ClipLoader } from 'react-spinners';
import ss from './button.module.scss';

type Props = React.ComponentPropsWithoutRef<'button'> & {
  label: string;
  shape?: 'round' | 'square';
  loading?: boolean;
  loadingLabel?: string;
};

export const Button = (props: Props) => {
  const { shape = 'round', label, loading, loadingLabel, ...rest } = props;
  return (
    <div className={ss[shape]}>
      <button {...rest} className={clsx(ss.button, ss[shape], rest.className)}>
        {loading !== undefined && loading && (
          <ClipLoader
            size={20}
            color='#2155cd'
            cssOverride={{
              marginRight: 8,
            }}
          />
        )}
        {loading !== undefined && loading ? loadingLabel || label : label}
      </button>
    </div>
  );
};
