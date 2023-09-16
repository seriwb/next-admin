import { forwardRef } from 'react';
import clsx from 'clsx';
import ss from './input-text-field.module.scss';

type Props = React.ComponentPropsWithoutRef<'input'> & {
  valid?: boolean;
  invalid?: boolean;
};

export const InputTextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { valid, invalid, className, ...rest } = props;
  const readOnly = props.disabled || props.readOnly;
  return (
    <div className={ss.container}>
      <input
        className={clsx(ss.input, className, {
          [ss.readonly]: readOnly,
          [ss.valid]: valid,
          [ss.invalid]: invalid,
        })}
        {...rest}
        ref={ref}
      />
    </div>
  );
});
InputTextField.displayName = 'InputTextField';
