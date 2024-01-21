import { useId } from 'react';
import Select, { OnChangeValue } from 'react-select';
import ss from './select-field.module.scss';

export type Option<L = string, V = string> = {
  label: L;
  value: V;
};

type Props = {
  label?: string;
  options: Option[];
  value?: string | null;
  placeholder?: string;
  setValue: (value: string) => void;
};

export const SelectField = (props: Props) => {
  const selectId = useId();

  const handleSortChange = (v: OnChangeValue<Option, false>) => {
    const option = v as Option;
    props.setValue(option?.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let args: any = {
    className: ss.select,
    instanceId: selectId,
    options: props.options,
    placeholder: props.placeholder,
    onChange: handleSortChange,
    isClearable: true,
  };

  const selectedValue = props.options.find((option) => option.value == props.value);
  if (selectedValue) {
    args = {
      ...args,
      value: selectedValue,
    };
  }

  return (
    <div className={ss.container}>
      {props.label && (
        <label className={ss.label} htmlFor={selectId}>
          {props.label}
        </label>
      )}
      <Select
        {...args}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            boxShadow: state.isFocused ? '0 0 0 1.5px #2155cd' : 'none',
          }),
        }}
      />
    </div>
  );
};
