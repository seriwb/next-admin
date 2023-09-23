export type RouteType = {
  path: string; // routing path
  name: string; // display name
  disable?: boolean; // disabled to click
};

const ROUTES: RouteType[] = [
  { path: '/', name: 'Home' },
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/articles', name: 'Articles' },
  { path: '/analyses/new', name: 'New' },
  { path: '/users', name: 'Users' },
  { path: '/system', name: `System`, disable: true },
  { path: '/system/accounts', name: 'Accounts' },
  { path: '/system/accounts/new', name: 'New' },
  { path: '/system/accounts/[id]/edit', name: 'Edit' },
];

export default ROUTES;
