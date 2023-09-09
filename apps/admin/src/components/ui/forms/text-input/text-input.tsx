import { UseFormRegister } from 'react-hook-form';
import { FormFeedback } from '@/components/ui/forms/form-feedback';
import { InputTextField } from '@/components/ui/forms/input-text-field';
import ss from './text-input.module.scss';

export type Validate = {
  maxLength?: number; // defalut 255
  minLength?: number; // defalut 0
  pattern?: {
    value: RegExp;
    message: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate?: any;
};

type Props = {
  name: string; // form name
  className?: string;
  label?: string;
  type?: 'text' | 'password' | 'search' | 'email' | 'tel' | 'url'; // default text
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  required?: boolean;
  validate?: Validate;
  disabled?: boolean;
  isDirty?: boolean;
  errorMessage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
};

export const TextInput = ({
  name,
  className,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  autoFocus,
  required,
  validate,
  disabled,
  isDirty,
  errorMessage,
  register,
}: Props) => {
  const maxLength = validate?.maxLength ?? 255;
  const MAX_LENGTH = {
    maxLength: {
      value: maxLength,
      message: `${maxLength} or less characters.`,
    },
  };
  const minLength = validate?.minLength ?? 0;
  const MIN_LENGTH = {
    minLength: {
      value: minLength,
      message: `${minLength} or more characters.`,
    },
  };

  const validCondition = required
    ? {
        required: 'This is a required field.',
        ...MAX_LENGTH,
        ...MIN_LENGTH,
        pattern: validate?.pattern,
        validate: validate?.validate,
      }
    : {
        ...MAX_LENGTH,
        ...MIN_LENGTH,
        pattern: validate?.pattern,
        validate: validate?.validate,
      };

  return (
    <div className={ss.container}>
      {label && (
        <label className={ss.label}>
          {label}
          {required && <div className={ss.require}>*</div>}
        </label>
      )}
      {!disabled ? (
        <>
          <InputTextField
            className={className}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            required={required}
            invalid={errorMessage ? true : false}
            valid={isDirty}
            {...register(name, validCondition)}
          />
        </>
      ) : (
        <InputTextField
          className={className}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          required={required}
          disabled={disabled}
          {...register(name)}
        />
      )}
      <FormFeedback>{errorMessage}</FormFeedback>
    </div>
  );
};
