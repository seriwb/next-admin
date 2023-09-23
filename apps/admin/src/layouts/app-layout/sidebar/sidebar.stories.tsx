import { Meta, StoryFn } from '@storybook/react';
import { Sidebar } from './index';

export default {
  title: 'Layouts/app/sidebar',
  component: Sidebar,
} as Meta<typeof Sidebar>;

const Template: StoryFn<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Sample = Template.bind({});
Sample.storyName = 'Default';
Sample.args = {
  pathname: '/',
  userPrivilege: 'SuperAdmin',
};

export const Sample2 = Template.bind({});
Sample2.storyName = 'Selected';
Sample2.args = {
  pathname: '/dashboard',
  userPrivilege: 'SuperAdmin',
};

export const Sample3 = Template.bind({});
Sample3.storyName = 'Normal';
Sample3.args = {
  pathname: '/',
  userPrivilege: '',
};
