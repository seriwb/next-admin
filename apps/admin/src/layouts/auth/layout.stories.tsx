
import { SignIn } from '@/features/auth/components/signin';
import { Layout } from './index';
import type { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Layouts/auth',
  component: Layout,
} as Meta<typeof Layout>;

const Template: StoryFn<typeof Layout> = (args) => <Layout {...args} />;

export const Sample1 = Template.bind({});
Sample1.storyName = 'default';
Sample1.args = {
  title: 'Page title',
  children: <SignIn />,
};
Sample1.parameters = {
  nextjs: {
    appDirectory: true,
  },
};
