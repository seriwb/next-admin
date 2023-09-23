import { createContext, createRef, useContext, useRef, useState } from 'react';
import clsx from 'clsx';
import { useClickAway } from 'react-use';
import ss from './dropdown.module.scss';

const ref = createRef<HTMLDivElement>();
const DropdownContext = createContext({
  ref: ref,
  show: false,
  setShow: (v: boolean) => {
    v;
  },
});

const useDropdownContext = () => {
  return useContext(DropdownContext);
};

type Props = {
  children: React.ReactNode;
};

export const Dropdown = ({ children }: Props) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className={ss.dropdown}>
      <DropdownContext.Provider value={{ ref, show, setShow }}>{children}</DropdownContext.Provider>
    </div>
  );
};

export const DropdownToggle = ({ children }: Props) => {
  const { show, setShow } = useDropdownContext();

  return (
    <button
      className={ss.toggle}
      onClick={() => {
        setShow(!show);
      }}
    >
      {children}
    </button>
  );
};

type MenuProps = {
  position?: 'left' | 'right';
  children: React.ReactNode;
};

// Specify the menu display size using children.
export const DropdownMenu = ({ position = 'left', children }: MenuProps) => {
  const { ref, show, setShow } = useDropdownContext();

  useClickAway(ref, () => {
    setShow(false);
  });
  return <>{show && <div className={clsx(ss.menu, ss[position])}>{children}</div>}</>;
};
