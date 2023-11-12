import { ThreeDots } from 'react-bootstrap-icons';
import { Dropdown, DropdownMenu, DropdownToggle } from '@/components/dropdown';
import ss from './inline-menu.module.scss';

type Props = {
  children: React.ReactNode;
};

export const InlineMenu = (props: Props) => {
  return (
    <Dropdown>
      <DropdownToggle>
        <div className={ss.dropdownIcon}>
          <ThreeDots size={22} />
        </div>
      </DropdownToggle>
      <DropdownMenu position='right'>{props.children}</DropdownMenu>
    </Dropdown>
  );
};
