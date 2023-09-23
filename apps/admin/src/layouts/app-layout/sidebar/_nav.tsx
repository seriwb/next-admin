import { PersonLinesFill, Speedometer2 } from 'react-bootstrap-icons';
import { ACCOUNT_PRIVILEGE } from '@/constants/application';

type Privilege = keyof typeof ACCOUNT_PRIVILEGE;

export type Navigation = {
  component: 'title' | 'item' | 'group';
  name: string;
  to?: string;
  icon?: React.ReactElement;
  items?: Navigation[];
  privilege?: Privilege;
};

// if you add it here, please edit the breadcrumb component as well.
const _nav: Navigation[] = [
  {
    component: 'item',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <Speedometer2 />,
  },
  {
    component: 'title',
    name: 'System management',
    privilege: 'SuperAdmin',
  },
  {
    component: 'item',
    name: 'Accounts',
    to: '/system/accounts',
    icon: <PersonLinesFill />,
    privilege: 'SuperAdmin',
  },
];
export default _nav;
